<?php
/**
 * @license MIT
 *
 * Modified by Taylor Lovett on 16-January-2024 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace ElasticPress\Vendor_Prefixed\Composer\Installers;

class MODULEWorkInstaller extends BaseInstaller
{
    /** @var array<string, string> */
    protected $locations = array(
        'module'    => 'modules/{$name}/',
    );
}