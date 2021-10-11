"use strict";

$(function () {
  var win = $(window);
  var vh = 0;
  $(window).load(function () {
    $('#header').addClass('load');
    $('#wrap.sub').find('#header').addClass('bgbg');
  });
  $('.winH').height(win.height());
  $(window).on('load resize', function () {
    $('.winH').height($(this).height());
    vh = $(window).height();

    if ($(this).width() < 1200) {
      $('#left_menuWrap').removeClass('load');
      $('.mobileTab').removeClass('active');
    } else {
      $('#left_menuWrap').addClass('load');
    }
  });
  $('.btn_all_menu').click(function (e) {
    e.preventDefault();

    if ($(this).hasClass('active')) {
      $('.allMenuWrap ').fadeOut(300); //	$('.allMenuWrap ').removeClass('show');

      $('#header').removeClass('active');
      $('.btn_all_menu').removeClass('active');
      $('.allMenu .hasDep2 .dep2').slideUp(250);
    } else {
      $('.allMenuWrap').fadeIn(300); //	$('.allMenuWrap ').addClass('show');

      $('#header').addClass('active');
      $('.btn_all_menu').addClass('active');
    }
  });
  $('.allMenu > li > span').click(function () {
    if ($(this).parent().hasClass('on')) {
      $(this).parent().removeClass('on').find('ul').slideUp(200);
    } else {
      $(this).parent().siblings().removeClass('on').find('ul').slideUp(200);
      $(this).parent().addClass('on').find('ul').slideDown(200);
    }
  });
  $(window).on('load resize', function () {
    var windowWidth = window.width();

    if (windowWidth > 1100) {
      $('#header .allMenuWrap .allMenu ul').show();
    } else {
      $('#header .allMenuWrap .allMenu ul').hide();
    }
  });
  $(window).on('load resize', function () {
    // Hide Header on on scroll down
    var didScroll = false;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('#header').outerHeight();
    $(window).scroll(function (event) {
      //$('#header').addClass('scrolled');
      didScroll = true;
    });
    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 0);

    function hasScrolled() {
      var st = $(this).scrollTop(); // Make sure they scroll more than delta

      if (Math.abs(lastScrollTop - st) <= delta) return; // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      //console.log(st-lastScrollTop);

      if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        if ($('#header').hasClass('active')) {} else {
          $('#header').removeClass('nav-up').addClass('nav-down');
        }
      } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
          $('#header').removeClass('nav-down').addClass('nav-up');
        }
      }

      lastScrollTop = st;
    }

    if (window.innerWidth > 1400) {
      $('#header .gnbWrap #gnb > li > .dep2').removeAttr('style');
    }
  });
  $(window).on('load scroll', function () {
    $('#header').addClass('load'); //$('#wrap.sub').find('#header').addClass('bgbg');

    if ($('.subVisual ').length > 0) {
      if ($(window).scrollTop() >= $('.subVisual ').outerHeight() - $('#header').outerHeight()) {
        $('#header').addClass('bgbg');
      } else {
        $('#header').removeClass('bgbg');
      }
    } else {
      if ($(window).scrollTop() >= $(window).height() - $('#header').outerHeight()) {
        $('#header').addClass('bgbg');
      } else {
        $('#header').removeClass('bgbg');
      }
    }
  });
  $('#scrTop').click(function (e) {
    //e.preventDefault();
    $('html, body').animate({
      scrollTop: '0'
    }, 650, 'easeInCubic');
  });
  $(window).on('load resize', function () {});
  /* gogo js */

  $.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop + vh / 18 && elementTop < viewportBottom - vh / 18;
  };

  $.fn.isInViewport2 = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  $(window).on('load resize scroll', function () {
    $('.subVisual, .subTit, .subContTit, .solutionSecTit, .solutionSecTit + p, .mc3_slide_sec1 ').each(function () {
      if ($(this).isInViewport()) {
        $(this).addClass('on');
      }
    });
    $('.aniBox').each(function () {
      if ($(this).isInViewport()) {
        $(this).addClass('gogo');
      }
    });
    $('.aniBox2').each(function () {
      if ($(this).isInViewport2()) {
        $(this).addClass('gogo');
      }
    });
  });
  /* elements height 동일하게 */

  $(function () {
    function height_set() {
      var heights = $(".sameHeight").map(function () {
        return $(this).height();
      }).get();
      maxHeight = Math.max.apply(null, heights);
      $(".sameHeight").each(function () {
        $(this).height(maxHeight);
      });
    }

    height_set();
    $(window).on('load resize', function () {
      $(".sameHeight").removeAttr('style');
      height_set();
    });
  });
  /* 특정부분 프린트 printthis.js */

  $('.btn_print').on('click', function (e) {
    e.preventDefault();
    $('.printArea').printThis({
      debug: false,
      importCSS: true,
      printContainer: true,
      loadCSS: "/common/css/common.css"
    });
  });
  /* file select */

  $('.selectFile').on('click', function (e) {
    e.preventDefault();
    $(this).parent().find('input[type=file]').trigger('click');
  });
  $('.delFile').on('click', function (e) {
    e.preventDefault();
    $(this).parent().find('.input_ty1').val('선택한 파일 없음');
    $(this).parent().find('input[type=file]').val('');
    $(this).parent().find('.delFile').hide();
  });
  $('.uploadFile input[type=file]').on('change', function () {
    var $value = $(this).val();

    if (!$value == '') {
      $(this).next('.input_ty1').val($value);
      $(this).parent().find('.delFile').show();
    } else {
      $(this).next('.input_ty1').val('선택한 파일 없음');
      $(this).parent().find('.delFile').hide();
    }
  });
});