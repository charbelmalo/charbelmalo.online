<?php

if (!function_exists('amMobile')) {
    function amMobile() {
        $userAgent = strtolower($_SERVER['HTTP_USER_AGENT']);
        return preg_match('/iphone|ipod|ipad|android|blackberry|mini|windows\sce|palm/i', $userAgent);
    }
}

?>