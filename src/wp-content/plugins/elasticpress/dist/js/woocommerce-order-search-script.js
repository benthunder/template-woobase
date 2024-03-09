!function(){"use strict";var e={5251:function(e,t,s){var r=s(9196),a=60103;if(60107,"function"===typeof Symbol&&Symbol.for){var n=Symbol.for;a=n("react.element"),n("react.fragment")}var o=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i=Object.prototype.hasOwnProperty,c={key:!0,ref:!0,__self:!0,__source:!0};function l(e,t,s){var r,n={},l=null,u=null;for(r in void 0!==s&&(l=""+s),void 0!==t.key&&(l=""+t.key),void 0!==t.ref&&(u=t.ref),t)i.call(t,r)&&!c.hasOwnProperty(r)&&(n[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===n[r]&&(n[r]=t[r]);return{$$typeof:a,type:e,key:l,ref:u,props:n,_owner:o.current}}t.jsx=l,t.jsxs=l},5893:function(e,t,s){e.exports=s(5251)},9196:function(e){e.exports=window.React}},t={};function s(r){var a=t[r];if(void 0!==a)return a.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,s),n.exports}!function(){var e=window.wp.element,t=window.wp.i18n,r=window.wp.hooks;var a={randomUUID:"undefined"!==typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let n;const o=new Uint8Array(16);function i(){if(!n&&(n="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!n))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(o)}const c=[];for(let e=0;e<256;++e)c.push((e+256).toString(16).slice(1));function l(e,t=0){return c[e[t+0]]+c[e[t+1]]+c[e[t+2]]+c[e[t+3]]+"-"+c[e[t+4]]+c[e[t+5]]+"-"+c[e[t+6]]+c[e[t+7]]+"-"+c[e[t+8]]+c[e[t+9]]+"-"+c[e[t+10]]+c[e[t+11]]+c[e[t+12]]+c[e[t+13]]+c[e[t+14]]+c[e[t+15]]}var u=function(e,t,s){if(a.randomUUID&&!t&&!e)return a.randomUUID();const r=(e=e||{}).random||(e.rng||i)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,t){s=s||0;for(let e=0;e<16;++e)t[s+e]=r[e];return t}return l(r)};const d=(s,a,n,o,i="")=>{const c=(0,e.useRef)(new AbortController),l=(0,e.useRef)(null),d=(0,e.useRef)(o);return(0,e.useCallback)((async e=>{const o=`${s}${a}?${e.toString()}`;c.current.abort(),c.current=new AbortController;const p={Accept:"application/json",Authorization:n},g=(e=>{const t=u().replaceAll("-","");return(0,r.applyFilters)("ep.requestId",e+t)})(i);return g&&(p["X-ElasticPress-Request-ID"]=g),l.current=fetch(o,{signal:c.current.signal,headers:p}).then((e=>{if(!e.ok){if(401===e.status&&d.current)return d.current(),"";throw new Error((0,t.sprintf)((0,t.__)("HTTP %d.","elasticpress"),e.status))}return e.json()})).catch((e=>{if("AbortError"!==e?.name)throw e})).finally((()=>{l.current=null})),l.current}),[s,a,n,i])},p=(e,t,s="")=>{const r=new URLSearchParams;return Object.entries(t).forEach((([t,a])=>{const n=s+t,o="undefined"!==typeof e[t]?((e,t,s=!0)=>{let r=null;switch(e&&t.type){case"number":case"string":r=e;break;case"numbers":case"strings":r=e.join(",")}return t.allowedValues&&(r=t.allowedValues.includes(r)?r:null),s&&null===r&&"undefined"!==typeof t.default&&(r=t.default),r})(e[t],a):null;null!==o&&r.set(n,o)})),r},g=(e,t="")=>{const s=new URLSearchParams(window.location.search);return Object.entries(e).reduce(((e,[r,a])=>{const n=s.get(t+r),o="undefined"!==typeof n?((e,t,s=!0)=>{let r=null;switch(e&&t.type){case"number":r=parseFloat(e,10)||null;break;case"numbers":r=decodeURIComponent(e).split(",").map((e=>parseFloat(e,10))).filter(Boolean);break;case"string":r=e.toString();break;case"strings":r=decodeURIComponent(e).split(",").map((e=>e.toString().trim()))}return t.allowedValues&&(r=t.allowedValues.includes(r)?r:null),s&&null===r&&"undefined"!==typeof t.default&&(r=t.default),r})(n,a,!1):null;return null!==o&&(e[r]=o),e}),{})},f=(e,t)=>{const s=new URL(window.location.href),r=Array.from(s.searchParams.keys());for(const t of r)t.startsWith(e)&&s.searchParams.delete(t);return t&&t.forEach(((e,t)=>{s.searchParams.set(t,e)})),s.toString()},m=(e,t)=>{const s={...e};return Object.entries(t).forEach((([e,t])=>{Object.hasOwnProperty.call(t,"default")||delete s[e]})),s};var h=(e,t)=>{const s={...e,isPoppingState:!1};switch(t.type){case"CLEAR_CONSTRAINTS":{const e=m(s.args,s.argsSchema);s.args=e,s.args.offset=0;break}case"CLEAR_RESULTS":s.aggregations={},s.searchResults=[],s.totalResults=0;break;case"SEARCH":s.args={...s.args,...t.args,offset:0},s.isOn=!0;break;case"SEARCH_FOR":{const e=m(s.args,s.argsSchema);s.args=e,s.args.search=t.searchTerm,s.args.offset=0,s.isOn=!0;break}case"SET_IS_LOADING":s.isLoading=t.isLoading;break;case"TURN_OFF":s.args={...s.args},s.isOn=!1;break;case"SET_RESULTS":{const{hits:{hits:e,total:r},aggregations:a,suggest:n}=t.response;s.isFirstSearch=!1;const o="number"===typeof r?r:r.value;s.aggregations=a,s.searchResults=e,s.searchTerm=s.args.search,s.totalResults=o,s.suggestedTerms=n?.ep_suggestion?.[0]?.options||[];break}case"NEXT_PAGE":s.args.offset+=s.args.per_page;break;case"PREVIOUS_PAGE":s.args.offset=Math.max(s.args.offset-s.args.per_page,0);break;case"POP_STATE":{const{isOn:e,args:r}=t.args;s.args=r,s.isOn=e,s.isPoppingState=!0;break}}return s},b=s(5893);const _=(0,e.createContext)(),w=({apiEndpoint:s,apiHost:r,authorization:a,requestIdBase:n,argsSchema:o,children:i,paramPrefix:c,onAuthError:l})=>{const u=(0,e.useMemo)((()=>c?g(o,c):{}),[o,c]),m=(0,e.useMemo)((()=>{const e=(e=>Object.entries(e).reduce(((e,[t,s])=>(Object.hasOwnProperty.call(s,"default")&&(e[t]=s.default),e)),{}))(o);return{...e,...u}}),[o,u]),w=(0,e.useMemo)((()=>Object.keys(u).length>0),[u]),y=d(r,s,a,l,n),[S,R]=(0,e.useReducer)(h,{aggregations:{},args:m,argsSchema:o,isLoading:!1,isOn:w,isPoppingState:!1,searchResults:[],totalResults:0,suggestedTerms:[],isFirstSearch:!0,searchTerm:""}),E=(0,e.useRef)(S);E.current=S;const v=(0,e.useCallback)((()=>{R({type:"CLEAR_CONSTRAINTS"})}),[]),k=(0,e.useCallback)((()=>{R({type:"CLEAR_RESULTS"})}),[]),x=(0,e.useCallback)((e=>{R({type:"SEARCH",args:e})}),[]),O=e=>{R({type:"SET_IS_LOADING",isLoading:e})},T=e=>{R({type:"SET_RESULTS",response:e})},C=(0,e.useCallback)((()=>{if("undefined"===typeof c)return;const{args:e,isOn:t}=E.current,s={args:e,isOn:t};if(window.history.state)if(t){const t=p(e,o,c),r=f(c,t);window.history.pushState(s,document.title,r)}else{const e=f(c);window.history.pushState(s,document.title,e)}else window.history.replaceState(s,document.title,window.location.href)}),[o,c]),j=(0,e.useCallback)((e=>{if("undefined"===typeof c)return;e.state&&Object.keys(e.state).length>0&&(e=>{R({type:"POP_STATE",args:e})})(e.state)}),[c]),P=(0,e.useCallback)((()=>(window.addEventListener("popstate",j),()=>{window.removeEventListener("popstate",j)})),[j]),U=(0,e.useCallback)((()=>{(async()=>{const{args:e,isOn:s,isPoppingState:r}=E.current;if(r||C(),!s)return;const a=p(e,o);O(!0);try{const e=await y(a);if(!e)return;T(e)}catch(e){const s=(0,t.sprintf)((0,t.__)("ElasticPress: Unable to fetch results. %s","elasticpress"),e.message);console.error(s)}O(!1)})()}),[o,y,C]);(0,e.useEffect)(P,[P]),(0,e.useEffect)(U,[U,S.args,S.args.orderby,S.args.order,S.args.offset,S.args.search]);const{aggregations:A,args:L,isLoading:F,isOn:I,searchResults:N,searchTerm:$,totalResults:D,suggestedTerms:V,isFirstSearch:B}=E.current,H={aggregations:A,args:L,clearConstraints:v,clearResults:k,getUrlParamsFromArgs:p,getUrlWithParams:f,isLoading:F,isOn:I,searchResults:N,searchTerm:$,search:x,searchFor:e=>{R({type:"SEARCH_FOR",searchTerm:e})},setResults:T,nextPage:()=>{R({type:"NEXT_PAGE"})},previousPage:()=>{R({type:"PREVIOUS_PAGE"})},totalResults:D,turnOff:()=>{R({type:"TURN_OFF"})},suggestedTerms:V,isFirstSearch:B};return(0,b.jsx)(_.Provider,{value:H,children:i})};var y=({children:s,id:r,isBusy:a,onSelect:n,...o})=>{const[i,c]=(0,e.useState)(!1),[l,u]=(0,e.useState)(!1),d=(0,e.useMemo)((()=>s[l]?s[l].props.id:null),[s,l]),p=(0,e.useMemo)((()=>s.length&&!a?(0,t.sprintf)((0,t._n)("%d suggestion available, use the up and down keys to browse and the enter key to open","%d suggestions available, use the up and down keys to browse and the enter key to open",s.length,"elasticpress"),s.length):""),[s,a]),g=(0,e.useMemo)((()=>!(!1===l||!s[l])&&s[l].props.value),[s,l]),f=(0,e.useCallback)((()=>!!s.length&&0),[s]),m=(0,e.useCallback)((()=>!!s.length&&s.length-1),[s]),h=(0,e.useCallback)((()=>{const e=f(s);if(!1===l)return e;const t=l+1;return s?.[t]?t:e}),[s,f,l]),_=(0,e.useCallback)((()=>{const e=m(s);if(!1===l)return e;const t=l-1;return s?.[t]?t:e}),[s,m,l]),w=(0,e.useCallback)((()=>{c(!!s.length)}),[s]),y=(0,e.useCallback)((e=>{e.currentTarget.contains(e.relatedTarget)||(u(!1),c(!1))}),[]),S=(0,e.useCallback)((e=>{const t=h(l,s),r=_(l,s);switch(e.key){case"ArrowDown":e.preventDefault(),u(t);break;case"ArrowUp":e.preventDefault(),u(r);break;case"Enter":!1!==g&&(e.preventDefault(),n(g,e));break;case"Escape":i&&(e.preventDefault(),u(!1),c(!1))}}),[s,h,_,i,n,l,g]);return(0,e.useEffect)((()=>{u(!1),c(!!s.length)}),[s]),(0,e.useEffect)((()=>{!1!==l&&c(!0)}),[l]),(0,b.jsxs)("div",{className:"ep-combobox",onBlur:y,children:[(0,b.jsx)("input",{"aria-activedescendant":d,"aria-autocomplete":"list","aria-controls":r,"aria-describedby":`${r}-description`,"aria-expanded":!a&&i,autoComplete:"off",className:"ep-combobox__input",onFocus:w,onKeyDown:S,role:"combobox",...o}),(0,b.jsx)("div",{id:`${r}-description`,className:"screen-reader-text",children:p}),(0,b.jsx)("ul",{id:r,role:"listbox",className:"ep-combobox__list",children:s.map(((e,t)=>{const{id:s,value:r}=e.props;return(0,b.jsx)("li",{"aria-selected":l===t,className:"ep-combobox__option",onClick:e=>{n(r,e)},role:"option",tabIndex:"-1",children:e},s)}))})]})},S=window.wp.date,R=({dateFormat:e,hit:s,statusLabels:r,timeFormat:a})=>{const{meta:{_billing_email:[{value:n}={}]=[],_billing_first_name:[{value:o}={}]=[],_billing_last_name:[{value:i}={}]=[],_items:[{value:c}={}]=[]},post_date_gmt:l,post_id:u,post_status:d}=s._source,p=`${l.split(" ").join("T")}+00:00`,g=(0,S.dateI18n)(e,p),f=(0,S.dateI18n)(a,p),m=c?c.split("|").length:0,h=`status-${d.substring(3)}`,_=r[d];return(0,b.jsxs)("div",{className:"ep-suggestion",children:[(0,b.jsxs)("div",{className:"ep-suggestion__header",children:[(0,b.jsxs)("div",{className:"ep-suggestion__title",children:[`#${u}`," ",o," ",i]}),n]}),(0,b.jsxs)("div",{className:"ep-suggestion__footer",children:[(0,b.jsxs)("div",{className:"ep-suggestion__details",children:[(0,t.sprintf)((0,t._n)("%1$d item @ %2$s","%1$d items @ %2$s",m,"elasticpress"),m,f),(0,b.jsx)("br",{}),g]}),_&&(0,b.jsx)("div",{className:`order-status ${h} tips`,children:(0,b.jsx)("span",{children:_})})]})]})},E=({adminUrl:t,dateFormat:s,statusLabels:r,timeFormat:a,value:n,...o})=>{const{clearResults:i,isLoading:c,searchFor:l,searchResults:u}=(0,e.useContext)(_),d=((t,s)=>{const r=(0,e.useRef)(null);return(0,e.useCallback)(((...e)=>{window.clearTimeout(r.current),r.current=window.setTimeout((()=>{t(...e)}),s)}),[t,s])})((e=>{l(e)}),300),p=(0,e.useCallback)((e=>{const{value:t}=e.target;t?d(e.target.value):i()}),[i,d]),g=(0,e.useCallback)(((e,s)=>{window.open(`${t}?post=${e}&action=edit`,s.metaKey?"_blank":"_self")}),[t]);return(0,b.jsx)(y,{defaultValue:n,id:"ep-orders-suggestions",isBusy:c,onInput:p,onSelect:g,...o,children:u.map((e=>{const{_id:t,_source:{post_id:n}}=e;return(0,b.jsx)(R,{dateFormat:s,id:`ep-order-suggestion-${t}`,hit:e,statusLabels:r,timeFormat:a,value:n},t)}))})};const{adminUrl:v,apiEndpoint:k,apiHost:x,credentialsApiUrl:O,credentialsNonce:T,argsSchema:C,dateFormat:j,statusLabels:P,timeFormat:U,requestIdBase:A}=window.epWooCommerceOrderSearch,L=({children:t})=>{const[s,r]=(0,e.useState)(null),a=(0,e.useRef)(!1);return(0,e.useEffect)((()=>{fetch(O,{headers:{"X-WP-Nonce":T}}).then((e=>e.text())).then(r)}),[]),s?(0,b.jsx)(w,{apiEndpoint:k,apiHost:x,argsSchema:C,authorization:`Basic ${s}`,requestIdBase:A,onAuthError:()=>{a.current?r(null):(fetch(O,{headers:{"X-WP-Nonce":T},method:"POST"}).then((e=>e.text())).then(r),a.current=!0)},children:t}):null};(async()=>{const t=document.querySelector("#posts-filter, #wc-orders-filter").s;if(!t)return;const s=Object.values(t.attributes).reduce(((e,t)=>({...e,[t.name]:t.value})),{}),r=document.createElement("div");if(r.setAttribute("id","ep-woocommerce-order-search"),t.replaceWith(r),"function"===typeof e.createRoot){(0,e.createRoot)(r).render((0,b.jsx)(L,{children:(0,b.jsx)(E,{adminUrl:v,dateFormat:j,statusLabels:P,timeFormat:U,...s})}))}else(0,e.render)((0,b.jsx)(L,{children:(0,b.jsx)(E,{adminUrl:v,dateFormat:j,statusLabels:P,timeFormat:U,...s})}),r)})()}()}();