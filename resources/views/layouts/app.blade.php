<!doctype html>
<html class="first--load ajax--first" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
@include('component.head')
<body class="page-template-default page theme-leksa {{ !amMobile() ? 'smooth-scroll' : '' }}" data-barba="wrapper">
    <span hidden class="layout--colors"></span>
    
    <div id="smooth-wrapper">
        <div id="page" class="site">
            <a class="skip-link screen-reader-text" href="#primary">Skip to content</a>
            
            @include('component.navigation')
            
            <div id="smooth-content">
                <main id="primary" class="site-main" data-barba="container" data-barba-namespace="{{ $namespace ?? 'default' }}" style="opacity: 0; visibility: hidden;">
                    @yield('content')
                </main>
                
                @include('component.footer')
            </div>
            
            <div class="elementor-widget-container">
                @include('component.aiassistant')
            </div>
        </div>
    </div>

    @include('component.scripts')
    @stack('scripts')
</body>
</html>
