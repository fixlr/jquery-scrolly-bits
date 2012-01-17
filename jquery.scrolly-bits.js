(function( $ ) {
  $.fn.scrollyBits = function() {
    var target, target_top, hash;

    return $(this).click(function(event) {
      hash = getLinkTarget(this);
      target = $('#' + hash);

      if (target.exists()) {
        target_top = target.offset().top;

        $('html, body').animate({ scrollTop: target_top }, 500, function() {
          document.location.hash = hash;
        });
        event.preventDefault();
      }
    });
  }

  $.fn.copyNav = function(options) {
    var didScroll, settings, flatMenu;

    settings = $.extend({
      'navClass': 'flat'
    }, options);

    flatMenu = this.first()
      .clone()
      .appendTo('body')
      .addClass(settings['navClass'])
      .hide();

    $(window).scroll(function() {
      didScroll = true;
    });

    setInterval(function() {
      if ( didScroll ) {
        didScroll = false;
        windowPosition = $(window).scrollTop();
        menuVisible = flatMenu.is(':visible');

        if (windowPosition > 500 && !menuVisible) {
          flatMenu.fadeIn();
        }
        else if (windowPosition < 500 && menuVisible) {
          flatMenu.fadeOut();
        }
        flatMenu.setCurrentSection();
      }
    }, 250);
  }

  $.fn.setCurrentSection = function() {
    var target;

    if (this.is(':visible')) {
      this.find('a').each(function() {
        target = $('#' + getLinkTarget(this));

        if ((target.offset().top + target.height()) > ($(window).scrollTop() + 50)) {
          $('.nav.flat a').removeClass('current');
          $(this).addClass('current');
          return false;
        }
      });
    }
  }

  $.fn.exists = function() {
    return (this.length > 0);
  }

  var getLinkTarget = function(link) {
    return link.href.split('#')[1];
  }
})( jQuery );
