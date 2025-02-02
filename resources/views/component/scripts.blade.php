
    <script data-cfasync="false" src="{{ asset("cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js") }}"></script>
    <script type="text/javascript">
      const lazyloadRunObserver = () => {
        const lazyloadBackgrounds = document.querySelectorAll(`.e-con.e-parent:not(.e-lazyloaded)`);
        const lazyloadBackgroundObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              let lazyloadBackground = entry.target;
              if (lazyloadBackground) {
                lazyloadBackground.classList.add('e-lazyloaded');
              }
              lazyloadBackgroundObserver.unobserve(entry.target);
            }
          });
        }, {
          rootMargin: '200px 0px 200px 0px'
        });
        lazyloadBackgrounds.forEach((lazyloadBackground) => {
          lazyloadBackgroundObserver.observe(lazyloadBackground);
        });
      };
      const events = ['DOMContentLoaded', 'elementor/lazyload/observe', ];
      events.forEach((event) => {
        document.addEventListener(event, lazyloadRunObserver);
      });
    </script>
    <script>
      (function() {
        var c = document.body.className;
        c = c.replace(/woocommerce-no-js/, 'woocommerce-js');
        document.body.className = c;
      })();
    </script>
    <link rel="stylesheet" id="wc-blocks-style-css" href="{{ asset("/wp-content/plugins/woocommerce/assets/client/blocks/wc-blocks%EF%B9%96ver=wc-8.8.3.css") }}" media="all" />
    <link rel="stylesheet" id="redux-custom-fonts-css" href="{{ asset("/wp-content/uploads/redux/custom-fonts/fonts%EF%B9%96ver=1716982401.css") }}" media="all" />
    <link rel="stylesheet" id="elementor-post-5647-css" href="{{ asset("/wp-content/uploads/elementor/css/post-5647%EF%B9%96ver=1716621679.css") }}" media="all" />
    <link rel="stylesheet" id="elementor-post-10646-css" href="{{ asset("/wp-content/uploads/elementor/css/post-10646%EF%B9%96ver=1716621679.css") }}" media="all" />
    <link rel="stylesheet" id="elementor-post-11332-css" href="{{ asset("/wp-content/uploads/elementor/css/post-11332%EF%B9%96ver=1716621680.css") }}" media="all" />
    <link rel="stylesheet" id="elementor-post-5689-css" href="{{ asset("/wp-content/uploads/elementor/css/post-5689%EF%B9%96ver=1716621681.css") }}" media="all" />
    <link rel="stylesheet" id="elementor-post-6855-css" href="{{ asset("/wp-content/uploads/elementor/css/post-6855%EF%B9%96ver=1716622272.css") }}" media="all" />
    <link rel="stylesheet" id="elementor-post-8823-css" href="{{ asset("/wp-content/uploads/elementor/css/post-8823%EF%B9%96ver=1716621744.css") }}" media="all" />
    <link rel="stylesheet" id="elementor-post-6175-css" href="#comingsoon" media="all" />
    <link rel="stylesheet" id="elementor-icons-material-design-icons-sharp-css" href="{{ asset("/wp-content/plugins/material-design-icons-for-elementor/assets/material-icons/css/material-icons-sharp%EF%B9%96ver=1.5.1.css") }}" media="all" />
    <script src="{{ asset("/wp-content/themes/leksa/js/jquery.validate.min%EF%B9%96ver=6.5.3.js") }}" id="jquery-validate-js"></script>
    <script src="{{ asset("/wp-content/themes/leksa/js/gsap%EF%B9%96ver=6.5.3.js") }}" id="gsap-js"></script>
    <script src="{{ asset("/wp-content/themes/leksa/js/barba.min%EF%B9%96ver=6.5.3.js") }}" id="barba-js"></script>
    <script src="{{ asset("/wp-content/themes/leksa/js/plugins%EF%B9%96ver=6.5.3.js") }}" id="plugins-js"></script>
    <script src="{{ asset("/wp-content/themes/leksa/js/scripts%EF%B9%96ver=6.5.3.js") }}" id="scripts-js"></script>
    <script src="{{ asset("/wp-content/plugins/pe-core/assets/js/pe-text-animations%EF%B9%96ver=6.5.3.js") }}" id="pe-text-ans-js"></script>
    <script src="{{ asset("/wp-content/plugins/pe-core/assets/js/pe-general-animations%EF%B9%96ver=6.5.3.js") }}" id="pe-general-ans-js"></script>
    <script src="{{ asset("/wp-content/plugins/pe-core/assets/js/pe-image-animations%EF%B9%96ver=6.5.3.js") }}" id="pe-image-ans-js"></script>
    <script src="{{ asset("/wp-content/plugins/pe-core/assets/js/pe-video-player%EF%B9%96ver=6.5.3.js") }}" id="pe-video-player-js"></script>
    <script src="{{ asset("/wp-content/plugins/pe-core/assets/js/pe-bulge-effect%EF%B9%96ver=6.5.3.js") }}" id="pe-bulge-effect-js"></script>
    <script src="{{ asset("/wp-content/plugins/pe-core/assets/js/widget-scripts%EF%B9%96ver=6.5.3.js") }}" id="widget-scripts-js"></script>
    <script src="{{ asset("/wp-content/plugins/contact-form-7/includes/swv/js/index%EF%B9%96ver=5.9.4.js") }}" id="swv-js"></script>
    <script id="contact-form-7-js-extra">
      var wpcf7 = {
        "api": {
          "root": "https:\/\/leksa.pethemes.com\/wp-json\/",
          "namespace": "contact-form-7\/v1"
        },
        "cached": "1"
      };
    </script>
    <script src="{{ asset("/wp-content/plugins/contact-form-7/includes/js/index%EF%B9%96ver=5.9.4.js") }}" id="contact-form-7-js"></script>
    <script src="{{ asset("/wp-content/plugins/woocommerce/assets/js/sourcebuster/sourcebuster.min%EF%B9%96ver=8.8.3.js") }}" id="sourcebuster-js-js"></script>
    <script id="wc-order-attribution-js-extra">
      var wc_order_attribution = {
        "params": {
          "lifetime": 1.0e-5,
          "session": 30,
          "ajaxurl": "https:\/\/leksa.pethemes.com\/wp-admin\/admin-ajax.php",
          "prefix": "wc_order_attribution_",
          "allowTracking": true
        },
        "fields": {
          "source_type": "current.typ",
          "referrer": "current_add.rf",
          "utm_campaign": "current.cmp",
          "utm_source": "current.src",
          "utm_medium": "current.mdm",
          "utm_content": "current.cnt",
          "utm_id": "current.id",
          "utm_term": "current.trm",
          "session_entry": "current_add.ep",
          "session_start_time": "current_add.fd",
          "session_pages": "session.pgs",
          "session_count": "udata.vst",
          "user_agent": "udata.uag"
        }
      };
    </script>
    <script src="{{ asset("/wp-content/plugins/woocommerce/assets/js/frontend/order-attribution.min%EF%B9%96ver=8.8.3.js") }}" id="wc-order-attribution-js"></script>
    <script src="{{ asset("/wp-content/plugins/elementor-pro/assets/js/webpack-pro.runtime.min%EF%B9%96ver=3.21.2.js") }}" id="elementor-pro-webpack-runtime-js"></script>
    <script src="{{ asset("/wp-content/plugins/elementor/assets/js/webpack.runtime.min%EF%B9%96ver=3.21.4.js") }}" id="elementor-webpack-runtime-js"></script>
    <script src="{{ asset("/wp-content/plugins/elementor/assets/js/frontend-modules.min%EF%B9%96ver=3.21.4.js") }}" id="elementor-frontend-modules-js"></script>
    <script src="{{ asset("/wp-includes/js/dist/vendor/wp-polyfill-inert.min%EF%B9%96ver=3.1.2.js") }}" id="wp-polyfill-inert-js"></script>
    <script src="{{ asset("/wp-includes/js/dist/vendor/regenerator-runtime.min%EF%B9%96ver=0.14.0.js") }}" id="regenerator-runtime-js"></script>
    <script src="{{ asset("/wp-includes/js/dist/vendor/wp-polyfill.min%EF%B9%96ver=3.15.0.js") }}" id="wp-polyfill-js"></script>
    <script src="{{ asset("/wp-includes/js/dist/hooks.min%EF%B9%96ver=2810c76e705dd1a53b18.js") }}" id="wp-hooks-js"></script>
    <script src="{{ asset("/wp-includes/js/dist/i18n.min%EF%B9%96ver=5e580eb46a90c2b997e6.js") }}" id="wp-i18n-js"></script>
    <script id="wp-i18n-js-after">
      wp.i18n.setLocaleData({
        'text direction\u0004ltr': ['ltr']
      });
    </script>
    <script id="elementor-pro-frontend-js-before">
      var ElementorProFrontendConfig = {
        "ajaxurl": "https:\/\/leksa.pethemes.com\/wp-admin\/admin-ajax.php",
        "nonce": "86cd87e5f7",
        "urls": {
          "assets": "https:\/\/leksa.pethemes.com\/wp-content\/plugins\/elementor-pro\/assets\/",
          "rest": "https:\/\/leksa.pethemes.com\/wp-json\/"
        },
        "shareButtonsNetworks": {
          "facebook": {
            "title": "Facebook",
            "has_counter": true
          },
          "twitter": {
            "title": "Twitter"
          },
          "linkedin": {
            "title": "LinkedIn",
            "has_counter": true
          },
          "pinterest": {
            "title": "Pinterest",
            "has_counter": true
          },
          "reddit": {
            "title": "Reddit",
            "has_counter": true
          },
          "vk": {
            "title": "VK",
            "has_counter": true
          },
          "odnoklassniki": {
            "title": "OK",
            "has_counter": true
          },
          "tumblr": {
            "title": "Tumblr"
          },
          "digg": {
            "title": "Digg"
          },
          "skype": {
            "title": "Skype"
          },
          "stumbleupon": {
            "title": "StumbleUpon",
            "has_counter": true
          },
          "mix": {
            "title": "Mix"
          },
          "telegram": {
            "title": "Telegram"
          },
          "pocket": {
            "title": "Pocket",
            "has_counter": true
          },
          "xing": {
            "title": "XING",
            "has_counter": true
          },
          "whatsapp": {
            "title": "WhatsApp"
          },
          "email": {
            "title": "Email"
          },
          "print": {
            "title": "Print"
          },
          "x-twitter": {
            "title": "X"
          },
          "threads": {
            "title": "Threads"
          }
        },
        "woocommerce": {
          "menu_cart": {
            "cart_page_url": "https:\/\/leksa.pethemes.com\/cart\/",
            "checkout_page_url": "https:\/\/leksa.pethemes.com\/checkout\/",
            "fragments_nonce": "b18d6b72ec"
          }
        },
        "facebook_sdk": {
          "lang": "en_US",
          "app_id": ""
        },
        "lottie": {
          "defaultAnimationUrl": "https:\/\/leksa.pethemes.com\/wp-content\/plugins\/elementor-pro\/modules\/lottie\/assets\/animations\/default.json"
        }
      };
    </script>
    <script src="{{ asset("/wp-content/plugins/elementor-pro/assets/js/frontend.min%EF%B9%96ver=3.21.2.js") }}" id="elementor-pro-frontend-js"></script>
    <script src="{{ asset("/wp-content/plugins/elementor/assets/lib/waypoints/waypoints.min%EF%B9%96ver=4.0.2.js") }}" id="elementor-waypoints-js"></script>
    <script src="{{ asset("/wp-includes/js/jquery/ui/core.min%EF%B9%96ver=1.13.2.js") }}" id="jquery-ui-core-js"></script>
    <script id="elementor-frontend-js-before">
      var elementorFrontendConfig = {
        "environmentMode": {
          "edit": false,
          "wpPreview": false,
          "isScriptDebug": false
        },
        "i18n": {
          "shareOnFacebook": "Share on Facebook",
          "shareOnTwitter": "Share on Twitter",
          "pinIt": "Pin it",
          "download": "Download",
          "downloadImage": "Download image",
          "fullscreen": "Fullscreen",
          "zoom": "Zoom",
          "share": "Share",
          "playVideo": "Play Video",
          "previous": "Previous",
          "next": "Next",
          "close": "Close",
          "a11yCarouselWrapperAriaLabel": "Carousel | Horizontal scrolling: Arrow Left & Right",
          "a11yCarouselPrevSlideMessage": "Previous slide",
          "a11yCarouselNextSlideMessage": "Next slide",
          "a11yCarouselFirstSlideMessage": "This is the first slide",
          "a11yCarouselLastSlideMessage": "This is the last slide",
          "a11yCarouselPaginationBulletMessage": "Go to slide"
        },
        "is_rtl": false,
        "breakpoints": {
          "xs": 0,
          "sm": 480,
          "md": 768,
          "lg": 1025,
          "xl": 1440,
          "xxl": 1600
        },
        "responsive": {
          "breakpoints": {
            "mobile": {
              "label": "Mobile Portrait",
              "value": 767,
              "default_value": 767,
              "direction": "max",
              "is_enabled": true
            },
            "mobile_extra": {
              "label": "Mobile Landscape",
              "value": 880,
              "default_value": 880,
              "direction": "max",
              "is_enabled": false
            },
            "tablet": {
              "label": "Tablet Portrait",
              "value": 1024,
              "default_value": 1024,
              "direction": "max",
              "is_enabled": true
            },
            "tablet_extra": {
              "label": "Tablet Landscape",
              "value": 1200,
              "default_value": 1200,
              "direction": "max",
              "is_enabled": true
            },
            "laptop": {
              "label": "Laptop",
              "value": 1366,
              "default_value": 1366,
              "direction": "max",
              "is_enabled": true
            },
            "widescreen": {
              "label": "Widescreen",
              "value": 2400,
              "default_value": 2400,
              "direction": "min",
              "is_enabled": true
            }
          }
        },
        "version": "3.21.4",
        "is_static": false,
        "experimentalFeatures": {
          "e_optimized_assets_loading": true,
          "e_optimized_css_loading": true,
          "e_font_icon_svg": true,
          "additional_custom_breakpoints": true,
          "container": true,
          "e_swiper_latest": true,
          "container_grid": true,
          "theme_builder_v2": true,
          "home_screen": true,
          "ai-layout": true,
          "landing-pages": true,
          "e_lazyload": true,
          "display-conditions": true,
          "form-submissions": true,
          "taxonomy-filter": true
        },
        "urls": {
          "assets": "https:\/\/leksa.pethemes.com\/wp-content\/plugins\/elementor\/assets\/"
        },
        "swiperClass": "swiper",
        "settings": {
          "page": [],
          "editorPreferences": []
        },
        "kit": {
          "active_breakpoints": ["viewport_mobile", "viewport_tablet", "viewport_tablet_extra", "viewport_laptop", "viewport_widescreen"],
          "global_image_lightbox": "yes",
          "lightbox_enable_counter": "yes",
          "lightbox_enable_fullscreen": "yes",
          "lightbox_enable_zoom": "yes",
          "lightbox_enable_share": "yes",
          "lightbox_title_src": "title",
          "lightbox_description_src": "description",
          "woocommerce_notices_elements": []
        },
        "post": {
          "id": 9340,
          "title": "UXUnleashed%20%E2%80%93%20Leksa",
          "excerpt": "",
          "featuredImage": false
        }
      };
    </script>
    <script src="{{ asset("/wp-content/plugins/elementor/assets/js/frontend.min%EF%B9%96ver=3.21.4.js") }}" id="elementor-frontend-js"></script>
    <script src="{{ asset("/wp-content/plugins/elementor-pro/assets/js/elements-handlers.min%EF%B9%96ver=3.21.2.js") }}" id="pro-elements-handlers-js"></script>
    <script src="{{ asset("/assets/js/main.js") }}" id="custom-js"></script>