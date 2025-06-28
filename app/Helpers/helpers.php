<?php

use App\Services\DeviceDetectionService;

if (!function_exists('amMobile')) {
    /**
     * Check if the current request is from a mobile device.
     * 
     * @deprecated Use DeviceDetectionService::isMobile() instead
     */
    function amMobile(): bool
    {
        return DeviceDetectionService::isMobile();
    }
}
