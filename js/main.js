(function ($)
  { "use strict"
  
    
/* 1. Proloder */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });


/* 2. sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });

  // Scroll Up
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  


/* 3. slick Nav */
// mobile_menu
    var menu = $('nav ul#navigation');
    if(menu.length){
      // Add overlay element to mobile_menu instead of body
      $('.mobile_menu').append('<div class="slicknav_overlay"></div>');
      
      menu.slicknav({
        prependTo: ".mobile_menu",
        closedSymbol: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16" fill="currentColor"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>',
        openedSymbol: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16" fill="currentColor"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>',
        label: '',
        removeIds: true,
        allowParentLinks: true,
        nestedParentLinks: true,
        showChildren: false,
        beforeOpen: function(trigger) {
          $('body').addClass('slicknav_open');
          $('.slicknav_btn').addClass('slicknav_open');
          $('.slicknav_nav').addClass('slicknav_open');
          // Only toggle the clicked submenu
          $(trigger).parent().toggleClass('slicknav_open');
        },
        beforeClose: function(trigger) {
          // Only remove classes if closing the main menu
          if ($(trigger).hasClass('slicknav_btn')) {
            $('body').removeClass('slicknav_open');
            $('.slicknav_btn').removeClass('slicknav_open');
            $('.slicknav_nav').removeClass('slicknav_open');
          }
          // Toggle the clicked submenu
          $(trigger).parent().toggleClass('slicknav_open');
        }
      });

      // Handle overlay click
      $(document).on('click', '.slicknav_overlay', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('.slicknav_btn').click();
      });

      // Desktop main menu: tap to toggle submenus (hover alone fails on touch)
      var desktopNavMq = window.matchMedia('(min-width: 1301px)');

      function isDesktopMainMenu() {
        return desktopNavMq.matches && $('.main-header .main-menu').is(':visible');
      }

      function closeDesktopSubmenus() {
        menu.children('li').removeClass('submenu-open');
      }

      // Close tap-opened submenu when pointer moves to another top-level item
      menu.on('mouseenter', '> li', function () {
        if (!isDesktopMainMenu()) {
          return;
        }
        var $li = $(this);
        menu.children('li').not($li).removeClass('submenu-open');
      });

      menu.on('click', '> li', function (e) {
        if (!isDesktopMainMenu()) {
          return;
        }

        var $li = $(this);
        var $submenu = $li.children('ul.submenu');

        if (!$submenu.length) {
          closeDesktopSubmenus();
          return;
        }

        if ($(e.target).closest('ul.submenu a').length) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        var willOpen = !$li.hasClass('submenu-open');
        closeDesktopSubmenus();
        if (willOpen) {
          $li.addClass('submenu-open');
        }
      });

      $(document).on('click', function (e) {
        if (!isDesktopMainMenu()) {
          return;
        }
        if ($(e.target).closest('.main-header .main-menu #navigation').length) {
          return;
        }
        closeDesktopSubmenus();
      });

      if (typeof desktopNavMq.addEventListener === 'function') {
        desktopNavMq.addEventListener('change', closeDesktopSubmenus);
      } else if (typeof desktopNavMq.addListener === 'function') {
        desktopNavMq.addListener(closeDesktopSubmenus);
      }
    };



/* 4. MainSlider-1 */
    // h1-hero-active
    function mainSlider() {
      var BasicSlider = $('.slider-active');
      BasicSlider.on('init', function (e, slick) {
        var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
        doAnimations($firstAnimatingElements);
      });
      BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
        var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
        doAnimations($animatingElements);
      });
      BasicSlider.slick({
        autoplay: false,
        autoplaySpeed: 4000,
        dots: false,
        fade: true,
        arrows: false, 
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>',
        responsive: [{
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false
            }
          }
        ]
      });

      function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function () {
          var $this = $(this);
          var $animationDelay = $this.data('delay');
          var $animationType = 'animated ' + $this.data('animation');
          $this.css({
            'animation-delay': $animationDelay,
            '-webkit-animation-delay': $animationDelay
          });
          $this.addClass($animationType).one(animationEndEvents, function () {
            $this.removeClass($animationType);
          });
        });
      }
    }
    mainSlider();

 
    
// 4. Single Img slder
    $('.items-active').slick({
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 400,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        },
      ]
    });


// Brand Active
  $('.brand-active').slick({
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 7000,
    cssEase: 'linear',
    arrows: false,
    variableWidth: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToScroll: 1
        }
      }
    ]
  });

    
/* 4. Testimonial Active*/
var testimonial = $('.h1-testimonial-active');
if(testimonial.length){
testimonial.slick({
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay:true,
    loop:true,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="ti-arrow-top-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="ti-arrow-top-right"></i></button>',
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows:true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows:true
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots:false
        }
      }
    ]
  });
}


/* 6. Nice Selectorp  */
  var nice_Select = $('select');
    if(nice_Select.length){
      nice_Select.niceSelect();
    }


/* 7. data-background */
    $("[data-background]").each(function () {
      $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
      });


/* 10. WOW active */
    new WOW().init();

// 11. ---- Mailchimp js --------//  
    function mailChimp() {
      $('#mc_embed_signup').find('form').ajaxChimp();
    }
    mailChimp();


// 12 Pop Up Img
    var popUp = $('.single_gallery_part, .img-pop-up');
      if(popUp.length){
        popUp.magnificPopup({
          type: 'image',
          mainClass: 'mfp-with-zoom mfp-gallery',
          removalDelay: 300, 
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1],
            arrowMarkup:
              '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%">' +
              '<img src="/img/icon/chevron-%dir%-solid-full.svg" alt="" class="mfp-gallery-nav__icon" width="24" height="24">' +
              '</button>',
            tPrev: 'Previous',
            tNext: 'Next',
            tCounter: '<span class="mfp-counter">%curr% of %total%</span>'
          },
          zoom: {
            enabled: true,
            duration: 300,
            easing: 'ease-in-out',
            opener: function (openerElement) {
              if (openerElement.is('img')) {
                return openerElement;
              }
              var thumb = openerElement.find('.single-gallery-image');
              return thumb.length ? thumb : openerElement;
            }
          },
          image: {
            verticalFit: true
          }
        });
      }

// 12 Pop Up Video
    var popUp = $('.popup-video');
    if(popUp.length){
      popUp.magnificPopup({
        type: 'iframe'
      });
    }

// 12.1 Autoplay inline videos when in view (once)
    (function initAutoplayOnViewVideos() {
      function run() {
        var videos = document.querySelectorAll('video[data-autoplay-on-view="true"]');
        if (!videos.length) return;

        // Fallback: best-effort autoplay without scroll detection.
        if (!("IntersectionObserver" in window)) {
          videos.forEach(function (v) {
            v.play().catch(function () {});
          });
          return;
        }

        var observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (!entry.isIntersecting) return;
              var v = entry.target;
              v.play().catch(function () {});
              // Once started, keep it playing even after leaving viewport.
              observer.unobserve(v);
            });
          },
          { threshold: 0.35 }
        );

        videos.forEach(function (v) {
          observer.observe(v);
        });
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", run);
      } else {
        run();
      }
    })();

/* 13. counterUp*/
    $('.counter').counterUp({
      delay: 10,
      time: 3000
    });


// Modal Activation
  $('.search-switch').on('click', function () {
    $('.search-model-box').fadeIn(400);
  });

  $('.search-close-btn').on('click', function () {
    $('.search-model-box').fadeOut(400, function () {
        $('#search-input').val('');
    });
  });

  //14. active class added to li item on section navigation
  $(window).on('scroll', function () {
    var scrollPos = $(document).scrollTop();

    // Loop through each section that has an ID
    $('section[id]').each(function () {
        var currSection = $(this);
        var sectionTop = currSection.offset().top - 100; // 100px offset for fixed/sticky headers
        var sectionBottom = sectionTop + currSection.outerHeight();

        // Check if the current scroll position rests inside this section
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            var id = currSection.attr('id');
            var matchingLink;
            if (id === 'home') {
                matchingLink = $('#navigation a[href$="index.html#home"], #navigation a[href$="index.html"], #navigation a[href$="/"]');
            } else {
                matchingLink = $('#navigation a[href*="' + id + '"]');
            }

            // Remove active class from all menu li elements
            $('#navigation li').removeClass('active');
            
            // Add active class to the parent li of the visible section's link
            matchingLink.closest('li').addClass('active');
            
            // Also add active to the parent item if it's nested in a submenu
            matchingLink.closest('.submenu').closest('li').addClass('active');
        }
    });
});

// Medical product gallery (medical_product.html)
(function initMedicalProductGallery() {
  var $app = $('#medical-product-app');
  if (!$app.length) {
    return;
  }

  var checkIcon = '/img/icon/check-solid-full.svg';
  var checkStyle = 'width:14px;height:14px;margin-right:8px;display:inline-block;vertical-align:middle;';

  var products = [
    {
      slug: 'injection_site',
      title: 'Rubber Bulb / Injection Site',
      image: '/img/gallery/injection_site.jpeg',
      features: [
        'Quick Resealability',
        'Excellent Surface Finish',
        'Low Needle Penetration Force',
        'Chemical Compatibillity of all types of IV fluids',
        'Low Extractables and Leachables',
        'Lot to Lot Consistency',
        'ISO 8871 Compliant',
        'Lot Traceability'
      ]
    },
    {
      slug: 'rubber_discs',
      title: 'Rubber Discs for Volumetric Sets',
      image: '/img/gallery/discs.jpg',
      features: [
        'Complete Sealing Performance due to high level of Flatness & Planarity of Center Disc',
        'Excellent Surface Smoothness',
        'Sterilization Stability',
        'Chemical Compatibillity of all types of IV fluids',
        'Low Extractables and Leachables',
        'Lot to Lot Consistency',
        'ISO 8871 Compliant',
        'Lot Traceability'
      ]
    },
    {
      slug: 'stoppers_injection_site',
      title: 'Injection Site Stoppers & Plugs',
      image: '/img/gallery/injection_site_stoppers.jpg',
      features: [
        'Excellent Coring Properties',
        'Quick Resealability',
        'High Level of Dimensional Consistency',
        'Chemical Compatibillity of all types of IV fluids',
        'Low Extractables and Leachables',
        'Low Needle Penetration Force',
        'Sterilization Stability',
        'ISO 8871 Compliant'
      ]
    },
    {
      slug: 'bctp_stoppers',
      title: 'Blood Collection Tube Stoppers & Plugs',
      image: '/img/gallery/bctp.jpg',
      features: [
        'Excellent Coring Properties',
        'Superior Vacuum Retention Properties',
        'Low Needle Penetration Force',
        'Rapid Prototyping',
        'Low Extractables and Leachables',
        'Quality Compatibility with Major Pharmacopoeia Standards',
        'Lot Traceability',
        'Lot Consistency'
      ]
    },
    {
      slug: 'closures',
      title: 'Pharmaceutical Rubber Closures',
      image: '/img/gallery/closures.jpg',
      features: [
        'Quick Resealability',
        'Excellent Surface Finish',
        'Low Needle Penetration Force',
        'Chemical Compatibillity of all types of IV fluids',
        'Low Extractables and Leachables',
        'Lot to Lot Consistency',
        'ISO 8871 Compliant',
        'Lot Traceability'
      ]
    },
    {
      slug: 'gaskets',
      title: 'Rubber Gaskets For Disposable Syringes',
      image: '/img/gallery/gaskets.jpg',
      features: [
        'Smooth Surface Finish for Easy Glide Force',
        'High Level of Dimensional Accuracy',
        'Lot to Lot Consistency',
        'Lot Traceability',
        'Superior Ageing Properties',
        'Quality Compatibility with Major Pharmacopoeia standards'
      ]
    }
  ];

  var $hero = $('#medical-product-hero-title');
  var $mainImg = $('#medical-product-main-img');
  var $mainLink = $('#medical-product-main-link');
  var $features = $('#medical-product-features');
  var $thumbs = $('.medical-product-thumb');
  var index = 0;

  function featureHtml(text) {
    return '<li><img src="' + checkIcon + '" alt="Check" style="' + checkStyle + '"><p>' + text + '</p></li>';
  }

  function indexFromSlug(slug) {
    if (!slug) {
      return -1;
    }
    var key = String(slug).toLowerCase();
    for (var i = 0; i < products.length; i++) {
      if (products[i].slug === key) {
        return i;
      }
    }
    return -1;
  }

  function indexFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var fromSlug = indexFromSlug(params.get('product'));
    if (fromSlug >= 0) {
      return fromSlug;
    }
    var fromNum = parseInt(params.get('p'), 10);
    if (!isNaN(fromNum) && fromNum >= 0 && fromNum < products.length) {
      return fromNum;
    }
    return 0;
  }

  function updateUrl(slug) {
    var url = new URL(window.location.href);
    url.searchParams.set('product', slug);
    url.searchParams.delete('p');
    history.pushState({ product: slug }, '', url);
  }

  function setHeaderActive(slug) {
    $('#navigation li').removeClass('active');
    var $link = $('#navigation a[href*="medical_product.html?product=' + slug + '"]');
    $link.closest('li').addClass('active');
    $link.closest('.submenu').closest('li').addClass('active');
  }

  function showProduct(i, updateHistory) {
    if (updateHistory === undefined) {
      updateHistory = true;
    }
    index = (i + products.length) % products.length;
    var p = products[index];
    $hero.text(p.title);
    // Update the document title to include the current product name
    try {
      document.title = p.title + ' - Jain Rubbers';
    } catch (e) {
      // ignore if running in a non-browser test environment
    }
    $mainImg.attr({ src: p.image, alt: p.title });
    $mainLink.attr('href', p.image);
    $features.html(p.features.map(featureHtml).join(''));
    $thumbs.removeClass('is-active').eq(index).addClass('is-active');
    if (updateHistory && p.slug) {
      updateUrl(p.slug);
    }
    setHeaderActive(p.slug);
  }

  $('.medical-product-nav--prev').on('click', function () {
    showProduct(index - 1);
  });

  $('.medical-product-nav--next').on('click', function () {
    showProduct(index + 1);
  });

  $thumbs.on('click', function () {
    showProduct(parseInt($(this).data('index'), 10));
  });

  $(document).on('keydown.medicalProduct', function (e) {
    if (e.key === 'ArrowLeft') {
      showProduct(index - 1);
    } else if (e.key === 'ArrowRight') {
      showProduct(index + 1);
    }
  });

  window.addEventListener('popstate', function () {
    showProduct(indexFromUrl(), false);
  });

  showProduct(indexFromUrl(), false);
})();


})(jQuery);
