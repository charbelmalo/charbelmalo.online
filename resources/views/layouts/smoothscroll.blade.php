<!doctype html>
<html class="first--load ajax--first" lang="en-US">
 @include('component.head')
  <body class="page-template-default page page-id-161 theme-leksa woocommerce-no-js show--footer layout--default elementor-default elementor-kit-11 elementor-page elementor-page-161 {{ !amMobile() ? 'smooth-scroll' : '' }} loader__slide" data-barba="wrapper"><span hidden class="layout--colors"></span>
    <div id="smooth-wrapper">
      <div id="page" class="site">
        <a class="skip-link screen-reader-text" href="{{ url("#primary") }}">Skip to content</a>
     @include('component.navigation')
        <div id="smooth-content">
          <main id="primary" class="site-main" data-barba="container">
            @yield('content')
          </main>
          @include('component.footer')
        </div>
        @include('component.aiassistant')
      </div>
    </div>

   @include('component.scripts')
 <!-- Include the GLTFLoader (needed to load glTF files) -->
 <script type="module" src="https://unpkg.com/three@0.126.1/build/three.module.js"></script>
 <script src={{ asset('js/three.js') }} type="module"></script>
  </body>
</html>