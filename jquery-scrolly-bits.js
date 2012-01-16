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
        })
        event.preventDefault();
      }
    });
  }

  $.fn.copyNav = function(options) {
    var settings = $.extend({
      'navClass': 'flat'
    }, options);

    return this.first()
      .clone()
      .appendTo('body')
      .addClass(settings['navClass'])
      .hide();
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

  $(window).scroll(function() {
    var menu = $('.nav.flat'),
        windowPosition = $(window).scrollTop(),
        menuVisible = menu.is(':visible');

    if (windowPosition > 500 && !menuVisible) {
      menu.fadeIn();
    }
    else if (windowPosition < 500 && menuVisible) {
      menu.fadeOut();
    }
    menu.setCurrentSection();
  });

  $.fn.exists = function() {
    return (this.length > 0);
  }

  var getLinkTarget = function(link) {
    return link.href.split('#')[1];
  }
})( jQuery );
