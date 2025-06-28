<!doctype html>
<html class="first--load ajax--first" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @vite('resources/css/main.scss')

    @stack('styles')
</head>
<body class="page-template-default page theme-leksa {{ !amMobile() ? 'smooth-scroll' : '' }}" data-barba="wrapper">
    <span hidden class="layout--colors"></span>
    
    <div id="smooth-wrapper">
        <div id="page" class="site">
            <a class="skip-link screen-reader-text" href="#primary">Skip to content</a>
            
            @include('components.navigation')
            
            <div id="smooth-content">
                <main id="primary" class="site-main" data-barba="container">
                    @yield('content')
                </main>
                
                @include('components.footer')
            </div>
            
            @include('components.ai-assistant')
        </div>
    </div>

    @stack('scripts')
</body>
</html>
