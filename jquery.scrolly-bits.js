(function( $ ) {

  $.fn.scrollyBits = function() {
    var target, target_top, hash, scrolling_offset, bottom_padding;

    bottom_padding = $(window).height() - $('.section').filter(':last').height();
    if (bottom_padding > 0) {
      $('body').css('padding-bottom', bottom_padding); // need to add bottom-padding so you can actually scroll all the way to the last .section
    }

    return $(this).click(function(event) {
      hash = getLinkTarget(this);
      target = $('#' + hash);
      scrolling_offset = $('#siteheader').height() + $('.nav.flat').height(); // if you have these, their heights are subtracted from the scrolling distance.  If you don't have these, scrolling_offset = 0.

      if (target.exists()) {
        target_top = target.offset().top - scrolling_offset;

        $('html, body').animate({ scrollTop: target_top }, 500, function() {
          document.location.hash = '_' + hash; // prefixing the hash prevents Firefox and IE from scrolling to the actual hash, thereby obeying the calculated target_top
        });
        event.preventDefault();
      }
    });
  }

  $.fn.copyNav = function(options) {
    var didScroll, settings, flatMenu, intro_height;
    intro_height = $('.intro').height();

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

        if (windowPosition > intro_height && !menuVisible) {
          flatMenu.fadeIn();
        }
        else if (windowPosition < intro_height && menuVisible) {
          flatMenu.fadeOut();
        }
        flatMenu.setCurrentSection();
      }
    }, 250);
  }

  $.fn.setCurrentSection = function() {
    var target, scrolling_offset;
    scrolling_offset = $('#siteheader').height() + $('.nav.flat').height();

    if (this.is(':visible')) {
      this.find('a').each(function() {
        target = $('#' + getLinkTarget(this));

        if ((target.offset().top + target.height()) > ($(window).scrollTop() + scrolling_offset)) {
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