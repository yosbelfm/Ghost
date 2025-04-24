var disqus_shortname=theme_config.disqus_shortname;

(function($){
	/* All Images Loaded */
	$(window).load(function(){   
        var document_width = $(document).width();
        if( document_width > 1024 ){
            if( theme_config.sticky_sidebar == 'on' ){
                setTimeout(function(){
                    $('#sidebar').theiaStickySidebar({
                        additionalMarginTop: 120,
                        additionalMarginBottom: 20
                    });
                }, 1000);
            } 
        }
	});
	/* Dom Loaded */
	$(document).ready(function($){

        $('[data-aos]').addClass('aos-animate');

        // Prism Loaded by ajax
        if( ($('pre[class]').length > 0 || $('code[class]').length > 0) ){
            $.ajax({
                url: site_url+'/assets/js/prism.min.js',
                dataType: 'script',
                async: false,
                cache: true,
            });
        }

        $(".epcl-switch button").on('click', function(){
            var current = $(this).data('price');
            $(".epcl-switch, .epcl-plans").attr( 'data-active-price', current );
        });
        
		$(".lazy, img[data-src], iframe[data-src]").Lazy({
            defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
            placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
            threshold: 0,
            enableThrottle: true,
            throttle: 50,
			afterLoad: function(element){
				element.addClass('loaded');
                element.parents('.epcl-loader').addClass('loaded');
			}
        });

        // Sticky elements

        var document_width = $(document).width();
        if( document_width > 1200 && $('#header').hasClass('enable-sticky') ){
            var header_height = $('#header div.menu-wrapper').outerHeight();
            $('#header').height( header_height );
        }

        $(window).scroll(function(){
            if( document_width > 1200 && $('#header').hasClass('enable-sticky') ){
                if( $(window).scrollTop() >= 300) {
                    $('#header').addClass('is-sticky');                    
                } else {
                    $('#header').removeClass('is-sticky');
                }
            } else{
                $('#header').removeClass('is-sticky');  
            }
            if( document_width > 1200){
                if( $(window).scrollTop() >= 300) {
                    $('#back-to-top').addClass('visible');                    
                } else {
                    $('#back-to-top').removeClass('visible');   
                }
            }
        }); 

        $('a.scrollto').on('click', function(e){
            var target = $(this).attr('href');
            var offset = $(target).offset().top;
            $('html, body').animate({scrollTop: offset}, 500);
            e.preventDefault();
        });


        $(window).on('resize', function() {
            var document_width = $(document).width();
            $('#header').removeClass('is-sticky');
            var header_height = $('#header div.menu-wrapper').outerHeight();
            $('#header').height( header_height );
            if( document_width < 1200 ){
                $('#header').removeClass('enable-sticky is-sticky');
                $('#header').height( 'auto' );
            }
        });

        // Account page
                          
        if( $(".plan-price").length > 0 ){
            $(".plan-price").each(function(){
                var planAmount = $(this).data('value') / 100;
                $(this).html(planAmount);
            })
        }

        // Single Post copy button
        
        $(".permalink .copy").on('click', function(){
            $("#copy-link").select();
            document.execCommand('copy');
        });
        
        /* Gallery Ghost v2.1 */

        var images = document.querySelectorAll('.kg-gallery-image img');
        images.forEach(function (image) {
            var container = image.closest('.kg-gallery-image');
            var width = image.attributes.width.value;
            var height = image.attributes.height.value;
            var ratio = width / height;
            container.style.flex = ratio + ' 1 0%';
        })

        $('.kg-gallery-card').each(function(){
			$(this).find('img').wrap(function() {
				return '<a href="'+$(this).attr('src')+'" class="hover-effect" rel="gallery"></a>';
			});
			$(this).magnificPopup({
				type: 'image',
				gallery:{
					enabled: true,
					arrowMarkup: '<i class="mfp-arrow mfp-arrow-%dir% fa fa-chevron-%dir%"></i>'
				},
				delegate: 'a',
				mainClass: 'my-mfp-zoom-in',
				removalDelay: 300,
				closeMarkup: '<span title="%title%" class="mfp-close">&times;</span>',
			});
		});

		/* Global */

		// Open mobile menu        

        $('#header div.menu-mobile').on('click', function(){
			$('body').toggleClass('menu-open');
        });
        $('.menu-overlay').on('click', function(){
			$('body').removeClass('menu-open');
        });

		$('#back-to-top').click(function(event) {
			event.preventDefault();
			$('html, body').animate({scrollTop: 0}, 500);
			return false;
		});

        // Module: carousel
        
        $('.epcl-carousel').each(function(index, el) {
            var slides_to_show = parseInt( $(this).data('show') );
            var rtl = false;
            if( parseInt( $(this).data('rtl') ) > 0 ){
                rtl = true;
            }
            $(this).slick({
                cssEase: 'ease',
                fade: false,
                arrows: true,
                infinite: true,
                dots: false,
                autoplay: false,
                speed: 600,
                rtl: rtl,
                slidesToShow: slides_to_show,
                slidesToScroll: slides_to_show,
            });
            $(this).on('setPosition', function(event, slick, currentSlide, nextSlide){
                $(".lazy, img[data-src], iframe[data-src]").Lazy({
                    placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
                    enableThrottle: true,
                    throttle: 50,
                    afterLoad: function(element){
                        element.addClass('loaded');
                    }
                });
            });
        });



        var epcl_slider = $('.epcl-slider .slick-slider').slick({
                cssEase: 'ease',
                fade: true,
                arrows: true,
                infinite: true,
                dots: true,
                autoplay: false,
                speed: 600,
                rtl: false,
                slidesToShow: 1,
                responsive: [,
                    {
                        breakpoint: 1025,
                        settings: {
                            arrows: true,
                            dots: false
                        }
                    },
                ]
        });

        epcl_slider.on('setPosition', function(event, slick, currentSlide, nextSlide){
            $(".lazy, img[data-src], iframe[data-src]").Lazy({
                placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
                enableThrottle: true,
                throttle: 50,
                afterLoad: function(element){
                    element.addClass('loaded');
                }
            });
        });
        
        epcl_slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            var elem = $('.epcl-slider .slider-index .item[data-index="'+nextSlide+'"]');
            if( !elem.hasClass('active') ){
                $('.epcl-slider .slider-index .active .toggle').stop().slideUp('700ms');
                $('.epcl-slider .slider-index .active').removeClass('active');
                elem.addClass('active');
                elem.find('.toggle').stop().slideDown('700ms');
                
            }
        });

        $('.epcl-slider .slider-index .item[data-index="0"]').addClass('active').find('.toggle').slideDown('fast');
        $('.epcl-slider .slider-index .item').on('mouseenter', function(){
            var index = $(this).data('index');
            epcl_slider.slick('slickGoTo', index);
            var elem = $(this);
            if( !elem.hasClass('active') ){
                $('.epcl-slider .slider-index .active .toggle').stop().slideUp('700ms');
                $('.epcl-slider .slider-index .active').removeClass('active');
                elem.addClass('active');
                elem.find('.toggle').stop().slideDown('700ms');
                
            }            
        });

		/* Global Lightbox */

		$('.lightbox').magnificPopup({
			mainClass: 'my-mfp-zoom-in',
			removalDelay: 300,
			closeMarkup: '<i title="%title%" class="mfp-close fa fa-times"></i>',
			fixedContentPos: true
        });

        // Lazy Disqus
        if( $('#disqus_thread').length > 0 ){
            disqusLazy({    
                // threashold: win.innerHeight * .75,
                throttle: 350,
                shortname: theme_config.disqus_shortname,
            });
        }

        // Demo
        $('.epcl-demo-tool a').on('click', function(e){
            var body_class = $(this).data('class');
            $('body').toggleClass( body_class );
            $(this).toggleClass('active');
            if( $('body').hasClass('disable-custom-colors') ){
                $('.epcl-category-overlay').hide();
            }else{
                $('.epcl-category-overlay').show();
            }
            if( $('body').hasClass('disable-decorations') ){
                $('.epcl-waves-page').hide();
            }else{
                $('.epcl-waves-page').show();
            }
            e.preventDefault();
        });
        $(' .epcl-demo-tool input[type=color]').on('input', function(e){
            var value = e.target.value;
            var data_class = $(this).data('class');
            var data_target = String( $(this).data('target') );
            var data_attr = String( $(this).data('attr') );
            if( data_class !== 'undefined' && data_attr !== 'undefined') {
                $(data_class).css(data_attr, value);
            } else {
                $(":root").css({
                    [data_target]: value
                });                
            }    
        });

	});

})(jQuery);

(function() {
    var supportsPassive = eventListenerOptionsSupported();  

    if (supportsPassive) {
      var addEvent = EventTarget.prototype.addEventListener;
      overwriteAddEvent(addEvent);
    }

    function overwriteAddEvent(superMethod) {
      var defaultOptions = {
        passive: true,
        capture: false
      };

      EventTarget.prototype.addEventListener = function(type, listener, options) {
        var usesListenerOptions = typeof options === 'object';
        var useCapture = usesListenerOptions ? options.capture : options;
        options = usesListenerOptions ? options : {};
        if( type == 'touchstart' || type == 'touchmove'){
            options.passive = options.passive !== undefined ? options.passive : defaultOptions.passive;
        }        
        options.capture = useCapture !== undefined ? useCapture : defaultOptions.capture;

        superMethod.call(this, type, listener, options);
      };
    }

    function eventListenerOptionsSupported() {
      var supported = false;
      try {
        var opts = Object.defineProperty({}, 'passive', {
          get: function() {
            supported = true;
          }
        });
        window.addEventListener("test", null, opts);
      } catch (e) {}

      return supported;
    }

  })();

