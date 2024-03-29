/* SET THE HOST AND PORT OF WORDPRESS
 * *********************************************************/
vcl 4.0;
import std;

backend default {
  .host = "wordpress";
  .port = "80";
  .first_byte_timeout = 60s;
  .connect_timeout = 300s;
}

# SET THE ALLOWED IP OF PURGE REQUESTS
# ##########################################################
acl purge {
  "localhost";
  "127.0.0.1";
}

#THE RECV FUNCTION
# ##########################################################
sub vcl_recv {

# set realIP by trimming CloudFlare IP which will be used for various checks
set req.http.X-Actual-IP = regsub(req.http.X-Forwarded-For, "[, ].*$", "");

# FORWARD THE IP OF THE REQUEST
  if (req.restarts == 0) {
    if (req.http.x-forwarded-for) {
      set req.http.X-Forwarded-For =
      req.http.X-Forwarded-For + ", " + client.ip;
    } else {
      set req.http.X-Forwarded-For = client.ip;
    }
  }

 # Purge request check sections for hash_always_miss, purge and ban
 # BLOCK IF NOT IP is not in purge acl
 # ##########################################################

  # Enable smart refreshing using hash_always_miss
if (req.http.Cache-Control ~ "no-cache") {
    if (client.ip ~ purge || std.ip(req.http.X-Actual-IP, "1.2.3.4") ~ purge) {
         set req.hash_always_miss = true;
    }
}

if (req.method == "PURGE") {
    if (!client.ip ~ purge || !std.ip(req.http.X-Actual-IP, "1.2.3.4") ~ purge) {
        return(synth(405,"Not allowed."));
        }
    return (purge);
  }

if (req.method == "BAN") {
        # Same ACL check as above:
        if (!client.ip ~ purge || !std.ip(req.http.X-Actual-IP, "1.2.3.4") ~ purge) {
                        return(synth(403, "Not allowed."));
        }
        ban("req.http.host == " + req.http.host +
                  " && req.url == " + req.url);

        # Throw a synthetic page so the
        # request won't go to the backend.
        return(synth(200, "Ban added"));
}

# Unset cloudflare cookies
# Remove has_js and CloudFlare/Google Analytics __* cookies.
      set req.http.Cookie = regsuball(req.http.Cookie, "(^|;\s*)(_[_a-z]+|has_js)=[^;]*", "");
      # Remove a ";" prefix, if present.
     set req.http.Cookie = regsub(req.http.Cookie, "^;\s*", "");

  # For Testing: If you want to test with Varnish passing (not caching) uncomment
  # return( pass );

# DO NOT CACHE RSS FEED
 if (req.url ~ "/feed(/)?") {
        return ( pass );
}

#Pass wp-cron

if (req.url ~ "wp-cron\.php.*") {
 return ( pass );
}

## Do not cache search results, comment these 3 lines if you do want to cache them

if (req.url ~ "/\?s\=") {
        return ( pass );
}

# CLEAN UP THE ENCODING HEADER.
  # SET TO GZIP, DEFLATE, OR REMOVE ENTIRELY.  WITH VARY ACCEPT-ENCODING
  # VARNISH WILL CREATE SEPARATE CACHES FOR EACH
  # DO NOT ACCEPT-ENCODING IMAGES, ZIPPED FILES, AUDIO, ETC.
  # ##########################################################
  if (req.http.Accept-Encoding) {
    if (req.url ~ "\.(jpg|png|gif|gz|tgz|bz2|tbz|mp3|ogg)$") {
      # No point in compressing these
      unset req.http.Accept-Encoding;
    } elsif (req.http.Accept-Encoding ~ "gzip") {
      set req.http.Accept-Encoding = "gzip";
    } elsif (req.http.Accept-Encoding ~ "deflate") {
      set req.http.Accept-Encoding = "deflate";
    } else {
      # unknown algorithm
      unset req.http.Accept-Encoding;
    }
  }

  # PIPE ALL NON-STANDARD REQUESTS
  # ##########################################################
  if (req.method != "GET" &&
    req.method != "HEAD" &&
    req.method != "PUT" &&
    req.method != "POST" &&
    req.method != "TRACE" &&
    req.method != "OPTIONS" &&
    req.method != "DELETE") {
      return (pipe);
  }

  # ONLY CACHE GET AND HEAD REQUESTS
  # ##########################################################
  if (req.method != "GET" && req.method != "HEAD") {
    return (pass);
  }

  # OPTIONAL: DO NOT CACHE LOGGED IN USERS (THIS OCCURS IN FETCH TOO, EITHER
  # COMMENT OR UNCOMMENT BOTH
  # ##########################################################
  if ( req.http.cookie ~ "wordpress_logged_in|resetpass" ) {
    return( pass );
  }

  #fix CloudFlare Mixed Content with Flexible SSL
  if (req.http.X-Forwarded-Proto) {
    return(hash);
  }

  # IF THE REQUEST IS NOT FOR A PREVIEW, WP-ADMIN OR WP-LOGIN
  # THEN UNSET THE COOKIES
  # ##########################################################
  if (!(req.url ~ "wp-(login|admin)")
    && !(req.url ~ "&preview=true" )
  ){
    unset req.http.cookie;
  }

  # IF BASIC AUTH IS ON THEN DO NOT CACHE
  # ##########################################################
  if (req.http.Authorization || req.http.Cookie) {
    return (pass);
  }

}

sub vcl_hash {

if (req.http.X-Forwarded-Proto) {
    hash_data(req.http.X-Forwarded-Proto);
    }
}


# HIT FUNCTION
# ##########################################################
sub vcl_hit {
  return (deliver);
}

# MISS FUNCTION
# ##########################################################
sub vcl_miss {
  return (fetch);
}

# FETCH FUNCTION
# ##########################################################
sub vcl_backend_response {
  # I SET THE VARY TO ACCEPT-ENCODING, THIS OVERRIDES W3TC
  # TENDANCY TO SET VARY USER-AGENT.  YOU MAY OR MAY NOT WANT
  # TO DO THIS
  # ##########################################################
  set beresp.http.Vary = "Accept-Encoding";

  # IF NOT WP-ADMIN THEN UNSET COOKIES AND SET THE AMOUNT OF
  # TIME THIS PAGE WILL STAY CACHED (TTL), add other locations or subdomains you do not want to cache here in case they set cookies
  # ##########################################################
  if (!(bereq.url ~ "wp-(login|admin)") && !bereq.http.cookie ~ "wordpress_logged_in|resetpass" ) {
    unset beresp.http.set-cookie;
    set beresp.ttl = 1w;
    set beresp.grace =3d;
  }

  if (beresp.ttl <= 0s ||
    beresp.http.Set-Cookie ||
    beresp.http.Vary == "*") {
      set beresp.ttl = 120 s;
      set beresp.uncacheable = true;
      return (deliver);
  }

  return (deliver);
}

# DELIVER FUNCTION
# ##########################################################
sub vcl_deliver {
  # IF THIS PAGE IS ALREADY CACHED THEN RETURN A 'HIT' TEXT
  # IN THE HEADER (GREAT FOR DEBUGGING)
  # ##########################################################
  if (obj.hits > 0) {
    set resp.http.X-Cache = "HIT";
  # IF THIS IS A MISS RETURN THAT IN THE HEADER
  # ##########################################################
  } else {
    set resp.http.X-Cache = "MISS";
  }

  # Remove some headers: PHP version
  unset resp.http.X-Powered-By;

  # Remove some headers: Apache version & OS
  unset resp.http.Server;

  # Remove some heanders: Varnish
  unset resp.http.Via;
  unset resp.http.X-Varnish;

}