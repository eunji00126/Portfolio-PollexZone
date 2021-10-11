"use strict";

(function () {
  $(function () {
    //a태그 새로고침 방지 초기화
    $(document).on('click', 'a[href="#"]', function (e) {
      e.preventDefault();
    }); // 모달 메뉴 클릭

    $('.modal_list>span').click(function () {
      $(this).next().slideToggle(300);
      $('.modal_list>span').not(this).next().slideUp(300);
      return false;
    });
    $('.modal_list>span').eq(0).trigger('click'); // 메인페이지 반응형 슬라이드 

    $('.slider-div').slick({
      slide: 'li',
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 100,
      arrows: false,
      dots: false,
      autoplay: false,
      autoplaySpeed: 10000,
      pauseOnHover: false,
      vertical: false,
      draggable: true,
      mobileFirst: false,
      responsive: [// 반응형 옵션
      {
        breakpoint: 767,
        //화면 사이즈 768px
        settings: {
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true //settings: 'unslick'

        }
      }]
    }); //센터현황 각 div 호버시 해당 이미지로 바뀌기

    var i = $(".office_item").index();
    $(".office_item").hover(function () {
      i = $(this).index(); // 각 item 요소에 해당

      showSlide();
    }); // 위 인덱스 요소에 적용

    function showSlide() {
      $('.office_item').removeClass("on");
      $(".office_item").eq(i).addClass("on");
      $(".office_list_img").stop(true, true).fadeOut();
      $(".office_list_img").eq(i).stop(true, true).fadeIn();
    }
  }); // 스크롤시 메인 페이지 애니메이션 시작

  $.fn.isInViewport = function () {
    var vh = 0;
    var elementTop = $(this).offset().top; //각 엘리먼트 요소의 상위

    var elementBottom = elementTop + $(this).outerHeight(); // 각 엘리먼트 요소의 하위(높이)

    var viewportTop = $(window).scrollTop(); //윈도우의 상위

    var viewportBottom = viewportTop + $(window).height(); //윈도우 상위값 + 윈도우 높이

    return elementBottom > viewportTop + vh / 18 && elementTop < viewportBottom - vh / 18;
  };

  $.fn.isInViewport2 = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  }; // 위 스크롤 함수들을 각 클래스 추가로 적용


  $(window).on('load resize scroll', function () {
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
  }); // 스크롤시 메인 페이지 애니메이션 끝
  // about 페이지 스크롤 시 애니메이션 시작
  // about 엘리먼트 스크롤시 나타나기

  $(window).scroll(function () {
    $('.intrd').each(function (i) {
      var bottom_of_element = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      if (bottom_of_window > bottom_of_element) {
        $(this).animate({
          'opacity': '1',
          'margin-left': '0px'
        }, 1500);
      }
    });
  }); //스크롤 할때 화면  전체 애니메이션

  function isElementUnderBottom(elem, triggerDiff) {
    var _elem$getBoundingClie = elem.getBoundingClientRect(),
        top = _elem$getBoundingClie.top;

    var _window = window,
        innerHeight = _window.innerHeight;
    return top > innerHeight + (triggerDiff || 0);
  }

  function handleScroll() {
    var elems = document.querySelectorAll(".intro_sub1,icon_box,.ci_div,.intro_txt2");
    elems.forEach(function (elem) {
      if (isElementUnderBottom(elem, -20)) {
        elem.style.opacity = "0";
        elem.style.transform = 'translateY(70px)';
      } else {
        elem.style.opacity = "1";
        elem.style.transform = 'translateY(0px)';
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
})();