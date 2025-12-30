(function ($) {
    'use strict';

    var $window = $(window);
    var preloaderHidden = false;

    // Función para ocultar el preloader de manera segura
    function hidePreloader() {
        if (preloaderHidden) return; // Evitar múltiples ejecuciones
        
        preloaderHidden = true;
        var $preloader = $('#preloader');
        
        if ($preloader.length) {
            $preloader.fadeOut('slow', function () {
                $(this).remove();
            });
        }
    }

    // Preloader Active Code - múltiples triggers
    $window.on('load', function() {
        hidePreloader();
    });
    
    // Fallback 1: Si los componentes están listos
    document.addEventListener('componentsLoaded', function() {
        setTimeout(hidePreloader, 500);
    });
    
    // Fallback 2: Timeout de seguridad absoluto
    setTimeout(function() {
        if (!preloaderHidden) {
            hidePreloader();
            // Si aún así falla, usar método más agresivo
            setTimeout(function() {
                if (document.getElementById('preloader')) {
                    window.forceHidePreloader();
                }
            }, 1000);
        }
    }, 8000);
    
    // Fallback 3: DOMContentLoaded + delay
    $(document).ready(function() {
        setTimeout(function() {
            if (!preloaderHidden && document.readyState === 'complete') {
                hidePreloader();
            }
        }, 2000);
    });

    // Questions area - solo inicializar después de que componentes estén listos
    document.addEventListener('componentsLoaded', function() {
        var $listCollection = $(".questions-area > ul > li");
        var $firstItem = $listCollection.first();
        
        // Solo iniciar rotación si hay más de un elemento visible
        var visibleItems = $listCollection.filter('.question-show');
        if (visibleItems.length === 0 && $listCollection.length > 0) {
            // Fallback: mostrar el primero si ninguno está visible
            $firstItem.addClass("question-show");
        }
        
        // No iniciar rotación automática ya que ahora mostramos solo uno aleatorio
        // Mantener solo el seleccionado por configureRandomFact()
    });

    // ÚLTIMO RECURSO: Check inmediato si ya todo está cargado
    setTimeout(function() {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            if (document.getElementById('preloader') && !preloaderHidden) {
                hidePreloader();
            }
        }
    }, 100);

    // Fullscreen Active Code
    $window.on('resizeEnd', function () {
        $(".full_height").height($window.height());
    });

    $window.on('resize', function () {
        if (this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function () {
            $(this).trigger('resizeEnd');
        }, 300);
    }).trigger("resize");

    // Welcome Carousel Active Code
    $('#welcomeSlider').carousel({
        pause: false,
        interval: 4000
    })

    // Tooltip Active Code
    $('[data-toggle="tooltip"]').tooltip()

    // Nicescroll Active Code
    // $("body, .gallery_area").niceScroll({
    //     cursorcolor: "#717171",
    //     cursorwidth: "5px",
    //     background: "#f0f0f0"
    // });

    // Instagram Feeds Slider - Inicializar después de cargar componentes
    function initInstagramCarousel() {
        if ($.fn.owlCarousel) {
            $('.instagram-feeds-area').owlCarousel({
                items: 7,
                margin: 0,
                loop: true,
                nav: false,
                dots: false,
                autoplay: true,
                autoplayTimeout: 5000,
                smartSpeed: 1000,
                responsive: {
                    0: {
                        items: 3
                    },
                    768: {
                        items: 4
                    },
                    992: {
                        items: 5
                    },
                    1280: {
                        items: 7
                    }
                }
            });
        }
    }

    // Ejecutar cuando los componentes estén listos
    $(document).on('componentsLoaded', function() {
        initInstagramCarousel();
    });

    // Fallback para páginas sin componentes
    $(document).ready(function() {
        setTimeout(initInstagramCarousel, 100);
    });

    // Search Btn Active Code
    $('#searchbtn').on('click', function () {
        $('body').toggleClass('search-form-on');
    })

    // Video Active Code
    if ($.fn.magnificPopup) {
        $('.videobtn').magnificPopup({
            disableOn: 0,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false
        });
        $('.gallery_img').magnificPopup({
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-fade',
            fixedContentPos: true,
            fixedBgPos: true,
            overflowY: 'hidden',
            closeOnContentClick: true,
            closeOnBgClick: true,
            closeBtnInside: false,
            callbacks: {
                open: function() {
                    // Bloquear scroll del body en móvil
                    $('body').addClass('mfp-no-scroll');
                },
                close: function() {
                    // Restaurar scroll del body
                    $('body').removeClass('mfp-no-scroll');
                }
            },
            gallery: {
                enabled: true,
                preload: [0, 2],
                navigateByImgClick: true,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
                tPrev: 'Previous (Left arrow key)', // title for left button
                tNext: 'Next (Right arrow key)', // title for right button
                tCounter: '<span class="mfp-counter">%curr% of %total%</span>'
            }
        });
    }

    // Gallery Menu Style Active Code
    $('.portfolio-menu button.btn').on('click', function () {
        $('.portfolio-menu button.btn').removeClass('active');
        $(this).addClass('active');
    })

    // Masonary Gallery Active Code
    if ($.fn.imagesLoaded) {
        $('.portfolio-column').imagesLoaded(function () {
            // filter items on button click
            $('.portfolio-menu').on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                    filter: filterValue
                });
            });
            // init Isotope
            var $grid = $('.portfolio-column').isotope({
                itemSelector: '.column_single_gallery_item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.column_single_gallery_item'
                }
            });
        });
    }

    // Progress Bar Active Code
    if ($.fn.barfiller) {
        $('#bar1').barfiller({
            tooltip: true,
            duration: 1000,
            barColor: '#1d1d1d',
            animateOnResize: true
        });
        $('#bar2').barfiller({
            tooltip: true,
            duration: 1000,
            barColor: '#1d1d1d',
            animateOnResize: true
        });
        $('#bar3').barfiller({
            tooltip: true,
            duration: 1000,
            barColor: '#1d1d1d',
            animateOnResize: true
        });
        $('#bar4').barfiller({
            tooltip: true,
            duration: 1000,
            barColor: '#1d1d1d',
            animateOnResize: true
        });
    }

    // CounterUp Active Code
    if ($.fn.counterUp) {
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });
    }

    // ScrollUp Active Code
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1000,
            easingType: 'easeInOutQuart',
            scrollText: '<i class="fa fa-angle-up" aria-hidden="true"></i>'
        });
    }

    // PreventDefault a Click
    $("a[href='#']").on('click', function ($) {
        $.preventDefault();
    });

    // wow Active Code
    if ($window.width() > 767) {
        new WOW().init();
    }

})(jQuery);