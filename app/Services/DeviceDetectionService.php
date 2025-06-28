<?php

namespace App\Services;

use Illuminate\Http\Request;

class DeviceDetectionService
{
    /**
     * Check if the request is coming from a mobile device.
     */
    public static function isMobile(Request $request = null): bool
    {
        $request = $request ?? request();
        
        $userAgent = strtolower($request->header('User-Agent', ''));
        
        $mobilePatterns = [
            'iphone', 'ipod', 'ipad', 'android', 'blackberry', 
            'mini', 'windows ce', 'palm', 'mobile', 'webos'
        ];
        
        foreach ($mobilePatterns as $pattern) {
            if (str_contains($userAgent, $pattern)) {
                return true;
            }
        }
        
        return false;
    }
}
