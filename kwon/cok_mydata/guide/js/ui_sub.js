function inputInit(n) {
    var r = "", t, u, i, f;
    for (n != null && (r = n + " "),
    t = 0; t < $(r + ".formWrap").length; ++t)
        if ($(r + ".formWrap").eq(t).hasClass("uiAct") == !1)
            if ($(r + ".formWrap").eq(t).addClass("uiAct"),
            u = ".formWrap:eq(" + t + ") .txtIptLabel",
            i = ".formWrap:eq(" + t + ") > .formControl",
            $(".formWrap:eq(" + t + ") > input.formControl").attr("readonly") != null && ($(".formWrap:eq(" + t + ")").addClass("hasValue"),
            $(".formWrap:eq(" + t + ") > label.txtIptLabel").addClass("readonly")),
            $(".formWrap:eq(" + t + ") > input.formControl").val() != "" && $(".formWrap:eq(" + t + ")").addClass("hasValue"),
            $(i).is("select") && ($(i).prop("selectedIndex") == 0 && $(i + " option:eq(0)").attr("disabled") == undefined ? $(i).parent().addClass("hasValue") : $(i).prop("selectedIndex") != 0 ? $(i).parent().addClass("hasValue") : $(i).parent().removeClass("hasValue"),
            $(u).find(".essential").length > 0 && $(u).parent().addClass("hasEssent")),
            $(".formWrap:eq(" + t + ") textarea").length == 0) {
                $(i).data("placeholder") != null && $(i).data("placeholder") != "" && (f = $(i).data("placeholder"),
                $(i).parent().append('<span class="placeText" aria-hidden="true" role="presentation">' + f + "<\/span>"));
                $(i).bind({
                    focusin: function() {
                        $(this).parent().addClass("isFocused")
                    },
                    "focusout change": function() {
                        $(this).is("select") && ($(this).prop("selectedIndex") == 0 && $(this).find("option:eq(0)").attr("disabled") == undefined ? $(this).parent().addClass("hasValue") : $(this).prop("selectedIndex") != 0 ? $(this).parent().addClass("hasValue") : $(this).parent().removeClass("hasValue"))
                    },
                    focusout: function() {
                        $(this).is("select") == !1 && ($(this).val() != "" ? $(this).parent().addClass("hasValue") : $(this).parent().removeClass("hasValue"));
                        $(this).parent().removeClass("isFocused")
                    },
                    change: function() {
                        $(this).is("select") == !1 && ($(this).val() != "" ? $(this).parent().addClass("hasValue") : $(this).parent().removeClass("hasValue"))
                    }
                });
                $(i).on("keyup", function() {
                    $(this).val() != "" ? $(this).parent().addClass("hasValue") : $(this).parent().removeClass("hasValue")
                })
            } else
                $(".formWrap:eq(" + t + ")").addClass("hasTextarea")
}
function datepicker() {
    for (var n = 0; n < $(".datepicker").length; ++n)
        $(".datepicker").eq(n).datepicker({
            showOn: "both",
            buttonImage: "/Images/2013/Icon/ico_calendar_blk.png",
            dateFormat: "yy-mm-dd",
            currentText: "오늘",
            prevText: "이전 달",
            nextText: "다음 달",
            minDate: 1,
            monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            dayNames: ["일", "월", "화", "수", "목", "금", "토"],
            dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
            dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
            showMonthAfterYear: !0,
            changeMonth: !1,
            changeYear: !1,
            yearSuffix: "년"
        })
}
function comp_width() {
    if ($(".comp_mypage").length > 0) {
        var n = $(".comp_mypage .section:first-child .compare > ul > li").length;
        $(".comp_mypage .section > .cells2").removeClass("cells2").addClass("cells" + n)
    }
}
function datepicker_view(n, t, r, u, f, e, o, s) {
    function h(u) {
        var f = u.getMonth()
          , e = u.getDate()
          , o = u.getFullYear();
        for (i = 0; i < h.length; i++) {
            if ($.inArray(o + "-" + (f + 1) + "-" + e, n) != -1)
                return [!0, "ok_date"];
            if ($.inArray(o + "-" + (f + 1) + "-" + e, t) != -1)
                return [!1, "not_date"];
            if ($.inArray(o + "-" + (f + 1) + "-" + e, r) != -1)
                return [!1, "ing_date"]
        }
        return [!1]
    }
    u.datepicker({
        currentText: "오늘",
        prevText: "이전 달",
        nextText: "다음 달",
        monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        dayNames: ["일", "월", "화", "수", "목", "금", "토"],
        dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
        dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
        showMonthAfterYear: !0,
        yearSuffix: ".",
        minDate: 1,
        beforeShowDay: h,
        defaultDate: new Date(f,e,1),
        onChangeMonthYear: function(n, t) {
            typeof o != "undefined" && o(n, t, $(this))
        },
        onSelect: function(n) {
            typeof s != "undefined" && s(n, $(this))
        }
    })
}
function tabInit() {
    $(".product_detail+.tab_wrap .tab_menu li a").on("click touch", function() {
        $("html, body").animate({
            scrollTop: tapProTop
        }, 10)
    });
    $(".tab_menu").length > 0 && $("tab_con").not($(this).hasClass("on")) && $(".tab_con").eq($(".tab_menu li.on").index()).addClass("on");
    $(".tab_menu").length > 0 && $("tab_con").length == 0 && $(this).closest($(".tab_con").eq($(".tab_menu li.on").index()).addClass("on"));
    $(".tab_menu li").length > 2 && $(this).find("a").css({
        "font-size": "1.6rem"
    });
    $(".tab_menu a").on("click touch", function() {
        if ($(this).parent().addClass("on").siblings().removeClass("on"),
        $(this).attr("href") == "#" || $(this).attr("href") == "#none") {
            var n = $(this).closest($(".tab_menu li.on")).index();
            return $(this).parents(".tab_wrap").hasClass("type3") ? $(this).closest($(this).parents(".tab_wrap")).children().closest(".tab_wrap").find(".intab_con").eq(n).addClass("on").siblings().removeClass("on") : $(this).closest($(this).parents(".tab_wrap")).children().closest('.tab_wrap:not("type3")').find(".tab_con").eq(n).addClass("on").siblings().removeClass("on"),
            $(".tabInleftAutoSwipe").find("> .swiper-wrapper > .swiper-slide").length > 1 && (swiper = new Swiper(".tabInleftAutoSwipe",{
                effect: "slide",
                pagination: ".tabInleftAutoSwipe .swiper-control .swiper-pagination",
                paginationClickable: !0,
                loop: !1,
                autoplay: !1,
                followFinger: !0,
                slidesPerView: "auto",
                centeredSlides: !1,
                spaceBetween: 0,
                nextButton: ".tabInleftAutoSwipe .swiper-control .btnNext",
                prevButton: ".tabInleftAutoSwipe .swiper-control .btnPrev",
                onSlideChangeStart: function() {},
                paginationBulletRender: function() {
                    return '<a href="#none" class="swiper-pagination-bullet"><\/a>'
                }
            })),
            !1
        }
    })
}
function inputSlider() {
    $(".inputSlider").each(function() {
        var r = $(this).find(".sliderRangeBox")
          , n = $(this).find(".sliderInput")
          , t = n.data("valueOne")
          , i = n.data("valueTwo")
          , o = [t, i]
          , u = n.data("min")
          , f = n.data("max")
          , s = n.data("range")
          , e = n.data("step");
        console.log(t, i);
        r.slider({
            range: !0,
            step: e,
            min: u,
            max: f,
            value: [t, i],
            slide: function(t, i) {
                n.val("$" + i.values[0] + " - $" + i.values[1])
            },
            create: function() {}
        });
        n.keyup(function() {
            r.slider("value", $(this).val())
        })
    })
}
function prodImgSize() {
    $(".prod_img").each(function() {
        if ($(this).parents("div").hasClass("product_list") == !0) {
            var n = $(window).width()
              , i = $(this).find("img").width()
              , t = $(this).find("img").height();
            $(this).css({
                height: n / 1.8
            });
            $(this).find("img").css({
                top: "-" + (t - n / 1.8) / 2 + "px"
            })
        } else
            $(this).addClass("swipeType"),
            setTimeout(function() {
                $(".swiper-slide").each(function() {
                    if (!($(this).parents(".offerSwiper").length > 0) && !($(this).parents(".offerleftAutoSwipe").length > 0)) {
                        var n = $(window).width()
                          , i = $(this).find("img").width()
                          , t = $(this).find("img").height();
                        $(this).css({
                            height: n / 2
                        });
                        $(this).parents(".prod_img.swipeType").css({
                            height: n / 2
                        });
                        $(this).find("img").css({
                            top: "-" + (t - n / 2) / 2 + "px"
                        })
                    }
                })
            }, 10)
    })
}
function swipeInit() {
    var n, r, t, i;
    return $(".swiper-container").find("> .swiper-wrapper > .swiper-slide").length > 1 ? ($(".swiper-container").find(".swper-control > div").hasClass("swiper-pagination") == !1 && $(".swiper-container").find(".swiper-control").append('<a href="#none" class="btnPrev">이전<\/a><a href="#none" class="btnNext">다음<\/a><div class="swiper-pagination"><\/div>'),
    $(".prodDetailSwipe").find("> .swiper-wrapper > .swiper-slide").length > 1 && (n = new Swiper(".prodDetailSwipe",{
        effect: "slide",
        pagination: ".prodDetailSwipe .swiper-control .swiper-pagination",
        paginationClickable: !0,
        loop: !1,
        autoplay: !1,
        followFinger: !0,
        nextButton: ".prodDetailSwipe .swiper-control .btnNext",
        prevButton: ".prodDetailSwipe .swiper-control .btnPrev",
        onSlideChangeStart: function() {},
        paginationBulletRender: function() {
            return '<a href="#none" class="swiper-pagination-bullet"><\/a>'
        }
    })),
    $(".centerAutoSwipe").find("> .swiper-wrapper > .swiper-slide").length > 1 && (n = new Swiper(".centerAutoSwipe",{
        effect: "slide",
        pagination: ".centerAutoSwipe .swiper-control .swiper-pagination",
        paginationClickable: !0,
        loop: !0,
        autoplay: !1,
        followFinger: !0,
        slidesPerView: "auto",
        centeredSlides: !0,
        spaceBetween: 20,
        nextButton: ".centerAutoSwipe .swiper-control .btnNext",
        prevButton: ".centerAutoSwipe .swiper-control .btnPrev",
        onSlideChangeStart: function() {
            if ($(".centerAutoSwipe").find("> .swiper-wrapper").hasClass("webzineType") == !0) {
                var n = $(".centerAutoSwipe .webzineType .swiper-slide.swiper-slide-active .webzine_cont .date").text().substring(0, 7);
                $(".webzine .webzine_tit .date").text(n)
            }
        },
        paginationBulletRender: function() {
            return '<a href="#none" class="swiper-pagination-bullet"><\/a>'
        }
    })),
    $(".event_banner").find("> .swiper-wrapper > .swiper-slide").length > 1 && (n = new Swiper(".event_top_banner",{
        effect: "slide",
        pagination: ".event_banner .swiper-pagination",
        paginationClickable: !0,
        loop: !0,
        autoplay: !1,
        followFinger: !0,
        slidesPerView: "auto",
        paginationBulletRender: function() {
            return '<a href="#none" class="swiper-pagination-bullet"><\/a>'
        }
    })),
    $(".fullPageSwipe").find("> .swiper-wrapper > .swiper-slide").length > 1 && ($(".fullPageSwipe").parent(".submain .largoVisual").length > 0 ? (fullswiper = new Swiper(".fullPageSwipe",{
        nextButton: ".fullPageSwipe .swiper-control .btnNext",
        prevButton: ".fullPageSwipe .swiper-control .btnPrev",
        lazyLoading: !0,
        lazyLoadingInPrevNext: !0,
        onSlideChangeStart: function() {
            if (typeof stopAllVideos != "undefined" && stopAllVideos(),
            $(".fullPageSwipe").find(".swiper-slide-active").hasClass("swiper-youtube")) {
                $(".largoVisual").find(".ev_list").css({
                    display: "none"
                });
                var n = $(".fullPageSwipe").find(".swiper-slide-active iframe");
                typeof setYoutube != "undefined" && setYoutube(n)
            } else
                $(".largoVisual").find(".ev_list").css({
                    display: "block"
                })
        }
    }),
    r = $(".largoVisual").height(),
    $(".swiper-slide").css({
        height: r
    })) : n = new Swiper(".fullPageSwipe",{
        effect: "slide",
        pagination: ".fullPageSwipe .swiper-control .swiper-pagination",
        paginationClickable: !0,
        loop: !1,
        autoplay: !1,
        followFinger: !0,
        spaceBetween: 0,
        lazyLoading: !0,
        lazyLoadingInPrevNext: !0,
        nextButton: ".fullPageSwipe .swiper-control .btnNext",
        prevButton: ".fullPageSwipe .swiper-control .btnPrev",
        onSlideChangeStart: function() {},
        paginationBulletRender: function() {
            return '<a href="#none" class="swiper-pagination-bullet"><\/a>'
        }
    })),
    $(".leftAutoSwipe").find("> .swiper-wrapper > .swiper-slide").length > 1 && (n = new Swiper(".leftAutoSwipe",{
        effect: "slide",
        pagination: ".leftAutoSwipe .swiper-control .swiper-pagination",
        paginationClickable: !0,
        loop: !1,
        autoplay: !1,
        followFinger: !0,
        slidesPerView: "auto",
        centeredSlides: !1,
        spaceBetween: 0,
        nextButton: ".leftAutoSwipe .swiper-control .btnNext",
        prevButton: ".leftAutoSwipe .swiper-control .btnPrev",
        onSlideChangeStart: function() {},
        paginationBulletRender: function() {
            return '<a href="#none" class="swiper-pagination-bullet"><\/a>'
        }
    })),
    $(".journey_visual").find(".swiper-wrapper > .swiper-slide").length > 1 && (t = new Swiper(".gallery-top",{
        slidesPerView: 1,
        spaceBetween: 0
    }),
    i = new Swiper(".gallery-thumbs",{
        spaceBetween: 10,
        centeredSlides: !0,
        slidesPerView: 1.15,
        touchRatio: .2,
        slideToClickedSlide: !0
    }),
    t.params.control = i,
    i.params.control = t),
    $(".offerSwiper").find("> .swiper-wrapper > .swiper-slide").length > 1 && (n = new Swiper(".offerSwiper",{
        effect: "slide",
        pagination: ".offerSwiper .swiper-control .swiper-pagination",
        paginationClickable: !0,
        loop: !0,
        autoplay: !1,
        followFinger: !0,
        slidesPerView: "auto",
        centeredSlides: !0,
        spaceBetween: 10,
        onSlideChangeStart: function() {},
        paginationBulletRender: function() {
            return '<a href="#none" class="swiper-pagination-bullet"><\/a>'
        }
    })),
    $(".offerleftAutoSwipe").find("> .swiper-wrapper > .swiper-slide").length > 1 && (n = new Swiper(".offerleftAutoSwipe",{
        effect: "slide",
        loop: !1,
        autoplay: !1,
        followFinger: !0,
        spaceBetween: 0,
        observer: !0,
        observeParents: !0,
        onSlideChangeStart: function() {},
        paginationBulletRender: function() {
            return '<a href="#none" class="swiper-pagination-bullet"><\/a>'
        }
    })),
    $(".bannerSwipe").find("> .swiper-wrapper > .swiper-slide").length > 1 && (n = new Swiper(".bannerSwipe",{
        effect: "slide",
        pagination: ".bannerSwipe .swiper-control .swiper-pagination",
        paginationClickable: !0,
        loop: !1,
        autoplay: !1,
        followFinger: !0,
        spaceBetween: 20,
        nextButton: ".bannerSwipe .swiper-control .btnNext",
        prevButton: ".bannerSwipe .swiper-control .btnPrev",
        autoHeight: !0,
        onSlideChangeStart: function() {},
        paginationBulletRender: function() {
            return '<a href="#none" class="swiper-pagination-bullet"><\/a>'
        }
    })),
    $(".fullPageHomeSwipe").find("> .swiper-wrapper > .swiper-slide").length > 1 && (n = new Swiper(".fullPageHomeSwipe",{
        effect: "slide",
        pagination: ".fullPageHomeSwipe .swiper-pagination",
        paginationClickable: !0,
        loop: !1,
        autoplay: !1,
        followFinger: !0,
        spaceBetween: 0,
        nextButton: ".fullPageHomeSwipe .swiper-control .btnNext",
        prevButton: ".fullPageHomeSwipe .swiper-control .btnPrev",
        onSlideChangeStart: function() {},
        paginationBulletRender: function() {
            return '<a href="#none" class="swiper-pagination-bullet"><\/a>'
        }
    })),
    $(".verticalSwipe").find("> .swiper-wrapper > .swiper-slide").length > 1 && (n = new Swiper(".home_navi .verticalSwipe",{
        centeredSlides: !1,
        direction: "vertical",
        loop: !0,
        effect: "slide",
        slidesPerView: 5,
        initialSlide: 0,
        slideToClickedSlide: !0,
        pagination: ".fullPageHomeSwipe .swiper-pagination",
        paginationClickable: !0,
        nextButton: ".verticalSwipe .swiper-control .btnNext",
        prevButton: ".verticalSwipe .swiper-control .btnPrev",
        onSlideChangeStart: function() {},
        paginationBulletRender: function() {
            return '<a href="#none" class="swiper-pagination-bullet"><\/a>'
        }
    }),
    n = new Swiper(".home_navi.sub .verticalSwipe",{
        centeredSlides: !1,
        direction: "vertical",
        loop: !0,
        effect: "slide",
        slidesPerView: 5,
        initialSlide: 0,
        pagination: ".fullPageHomeSwipe .swiper-pagination",
        paginationClickable: !0,
        nextButton: ".verticalSwipe .swiper-control .btnNext",
        prevButton: ".verticalSwipe .swiper-control .btnPrev",
        onSlideChangeStart: function() {},
        paginationBulletRender: function() {
            return '<a href="#none" class="swiper-pagination-bullet"><\/a>'
        }
    })),
    $(".travelPhotoSwipe").find(".gallery-top > .swiper-wrapper > .swiper-slide").length > 1 ? (t = new Swiper(".travelPhotoSwipe .gallery-top",{
        nextButton: ".travelPhotoSwipe .gallery-top .swiper-control .btnNext",
        prevButton: ".travelPhotoSwipe .gallery-top .swiper-control .btnPrev",
        slidesPerView: 1,
        spaceBetween: 0
    }),
    i = new Swiper(".travelPhotoSwipe .gallery-thumbs",{
        spaceBetween: 10,
        centeredSlides: !0,
        slidesPerView: "auto",
        touchRatio: .2,
        slideToClickedSlide: !0
    }),
    t.params.control = i,
    i.params.control = t) : $(".travelPhotoSwipe").find(".gallery-top .swiper-control").remove(),
    $(".tabAutoSwipe").find("> .swiper-wrapper > .swiper-slide").length > 1 && (n = new Swiper(".tabAutoSwipe",{
        effect: "slide",
        pagination: ".tabAutoSwipe .swiper-control .swiper-pagination",
        paginationClickable: !0,
        loop: !1,
        autoplay: !1,
        followFinger: !0,
        slidesPerView: "auto",
        centeredSlides: !1,
        spaceBetween: 0,
        nextButton: ".tabAutoSwipe .swiper-control .btnNext",
        prevButton: ".tabAutoSwipe .swiper-control .btnPrev",
        onSlideChangeStart: function() {},
        paginationBulletRender: function() {
            return '<a href="#none" class="swiper-pagination-bullet"><\/a>'
        }
    })),
    $(".related_swiper").find("> .swiper-wrapper > .swiper-slide").length > 1 && (n = new Swiper(".related_swiper",{
        loop: !1,
        autoplay: !1,
        followFinger: !0,
        slidesPerView: 1,
        spaceBetween: 20,
        nextButton: ".related_swiper .swiper-control .btnNext",
        prevButton: ".related_swiper .swiper-control .btnPrev",
        autoHeight: !0,
        pagination: ".related_menu",
        paginationClickable: !0,
        paginationBulletRender: function(n) {
            return '<li class="swiper-pagination-bullet menu' + (n + 1) + '" href="#none"><span>' + ["누구와", "어디로", "며칠동안", "예산"][n] + "<\/span><\/li>"
        }
    })),
    $(".vgmarketSwipe").find("> .swiper-wrapper > .swiper-slide").length > 1 && (n = new Swiper(".vgmarketSwipe",{
        effect: "fade",
        pagination: ".vgmarketSwipe .swiper-pagination",
        paginationClickable: !0,
        loop: !1,
        autoplay: 3e3,
        followFinger: !0,
        spaceBetween: 0,
        nextButton: ".vgmarketSwipe .swiper-control .btnNext",
        prevButton: ".vgmarketSwipe .swiper-control .btnPrev",
        onSlideChangeStart: function() {},
        paginationBulletRender: function() {
            return '<a href="#none" class="swiper-pagination-bullet"><\/a>'
        }
    })),
    $(".summary_swiper").find("> .swiper-wrapper > .swiper-slide").length > 1 && $(".summary_swiper").length >= 1 && $(".summary_swiper").each(function(t) {
        var i = $(this).addClass("s_swiper" + t);
        n = new Swiper(i,{
            effect: "fade",
            spaceBetween: 30,
            autoplay: t == 0 ? 3e3 : !1,
            nextButton: ".summary_swiper .swiper-control .btnNext",
            prevButton: ".summary_swiper .swiper-control .btnPrev"
        })
    }),
    $(".prod_img").find("> .swiper-wrapper > .swiper-slide").length > 1 && (n = new Swiper(".prod_img",{
        nextButton: ".prod_img .swiper-control .btnNext",
        prevButton: ".prod_img .swiper-control .btnPrev",
        pagination: ".swiper-num",
        paginationType: "fraction",
        paginationFractionRender: function(n, t, i) {
            return '<span class="' + t + '"><\/span>/<span class="' + i + '"><\/span>'
        }
    }))) : $(".swiper-container").find(".swiper-control").remove(),
    n
}
function radioReset() {
    $(".related_swiper label").on("click touch", function() {
        var n = $(this).prev(":radio")
          , t = n.attr("name")
          , i = $(":radio[name=" + t + "]");
        if (n.is(":checked"))
            return i.removeAttr("checked"),
            !1
    })
}
function toggleInit() {
    $(".btn_toggle, .toggle_tit_wrap .btn, .toggle_wrap .review_box .review_txt").on("click touch", function(n) {
        n.preventDefault();
        $(this).closest(".toggle_wrap").hasClass("review_wrap") == !0 || $(this).closest(".toggle_wrap").hasClass("type2") ? ($(this).toggleClass("on"),
        $(this).parents($(this).closest(".toggle_wrap").toggleClass("on"))) : $(this).toggleClass("on").parents($(this).closest(".toggle_wrap").children($(this).closest(".toggle_con")).toggleClass("on"));
        $(this).parent().hasClass("toggle_tit_wrap") && $(this).parents(".qna_list").length == 0 && ($(this).hasClass("on") ? $(this).children("span:not(.btn_plus)").html("닫기") : $(this).children("span:not(.btn_plus)").html("자세히 보기"));
        $(this).parents().hasClass("member") && ($(this).hasClass("on") ? $(this).children("span:not(.btn_plus)").html("연결취소") : $(this).children("span:not(.btn_plus)").html("계정연결"));
        $(this).parents().hasClass("toggle_list") || $(this).closest(".toggle_wrap").hasClass("type2") || ($(this).hasClass("on") ? $(this).parents().closest(".toggle_wrap").hasClass("price_info") == !0 ? ($(this).children("span:not(.btn_plus)").html("유/아동 요금 닫기"),
        $(this).parents().closest(".toggle_wrap").find(".info.guide").addClass("on")) : ($(this).children("span:not(.btn_plus)").html("닫기"),
        $(this).parent().find(".btn_toggle").addClass("on").children("span").eq(0).html("닫기")) : $(this).parents().closest(".toggle_wrap").hasClass("price_info") == !0 ? ($(this).children("span:not(.btn_plus)").html("유/아동 요금 열기"),
        $(this).parents().closest(".toggle_wrap").find(".info.guide").removeClass("on")) : $(this).parents().closest(".toggle_wrap").hasClass("review_wrap") == !0 ? ($(this).children("span:not(.btn_plus)").html("더보기"),
        $(this).parent().find(".btn_toggle").removeClass("on").children("span").eq(0).html("더보기")) : $(this).children("span:not(.btn_plus)").html("자세히 보기"));
        $(this).parents(".toggle_list").children().find(".btn_close_all").length > 0 && ($(this).parents(".toggle_list").children().find(".toggle_con").hasClass("on") ? ($(this).parents(".toggle_list").children().find(".btn_close_all").text("전체닫기"),
        $(this).parents(".toggle_list").children().find(".btn_close_all").addClass("on")) : ($(this).parents(".toggle_list").children().find(".btn_close_all").text("전체열기"),
        $(this).parents(".toggle_list").children().find(".btn_close_all").removeClass("on")));
        $(this).children().find(".down").length > 0 ? $(this).children().find(".down").removeClass("down").addClass("up").text("닫기") : $(this).children().find(".up").length > 0 && $(this).children().find(".up").removeClass("up").addClass("down").text("열기")
    });
    $(".btn_close_all").on("click touch", function(n) {
        n.preventDefault();
        $(this).text() == "전체닫기" ? ($(this).text("전체열기"),
        $(this).removeClass("on"),
        $(this).parents(".toggle_list").find(".toggle_wrap").not(".cms_view").children(".toggle_con").removeClass("on"),
        $(this).parents(".toggle_list").find(".toggle_wrap").not(".cms_view").children(".toggle_tit").find(".btn_toggle").removeClass("on")) : ($(this).text("전체닫기"),
        $(this).addClass("on"),
        $(this).parents(".toggle_list").find(".toggle_wrap").not(".cms_view").children(".toggle_con").addClass("on"),
        $(this).parents(".toggle_list").find(".toggle_wrap").not(".cms_view").children(".toggle_tit").find(".btn_toggle").addClass("on"))
    })
}
function acordionInit() {
    $(".btn_acordion").on("click touch", function(n) {
        n.preventDefault();
        $(this).closest($(this).parents("li")).hasClass("on") ? $(this).parents($(this).closest(".acordion_tit").siblings(".acordion_con").stop().clearQueue().slideUp("500").parents($(this).closest("li").removeClass("on"))) : ($(this).parents($(this).closest("ul").children("li").removeClass("on").find(".acordion_con").slideUp("500")),
        $(this).parents($(this).closest(".acordion_tit").siblings(".acordion_con").stop().clearQueue().slideDown("500").parents($(this).closest("li").addClass("on"))),
        $(this).closest($(this).parents("ul")).hasClass("type2") && setTimeout(function() {
            $("html").animate({
                scrollTop: $(".acordion_wrap li.on").offset().top - 60
            }, 500)
        }, 1e3))
    })
}
function tooltipInit() {
    $(".btn_tooltip").on("click touch", function(n) {
        n.preventDefault();
        $(this).toggleClass("on").parents($(this).closest(".tooltip_wrap").children($(this).closest(".tooltip_con")).toggleClass("on"))
    })
}
function snsShare() {
    $(".layer_popup").hasClass("on") && $(".dimmer").addClass("on");
    $(".btn_sns").on("click touch", function(n) {
        n.preventDefault();
        $("#snsShare").addClass("on");
        $(".dimmer").addClass("on")
    });
    $(".btn_seat").on("click touch", function(n) {
        n.preventDefault();
        $("#setPerson").addClass("on");
        $(".dimmer").addClass("on")
    });
    $(".btn_coupon").on("click touch", function(n) {
        n.preventDefault();
        $(this).parent().parent(".section").find(".pop_coupon").addClass("on");
        $(".dimmer").addClass("on")
    });
    $(".btn_popup_close").on("click touch", function(n) {
        n.preventDefault();
        $("#snsShare").removeClass("on");
        $("#setPerson").removeClass("on");
        $(".pop_coupon").removeClass("on");
        $(".layer_popup").removeClass("on");
        $(".dimmer").removeClass("on")
    })
}
function fixedProTapInit() {
    $(".product_detail+.tab_wrap .tab_menu").length > 0 && ($(".product_detail+.tab_wrap .tab_menu").removeClass("fixed"),
    tapProTop = $(".product_detail+.tab_wrap .tab_menu").offset().top - 50)
}
function fixedPosition() {
    var n = $(document).scrollTop(), t;
    $("#wrapper.travel_guide").length > 0 ? $(".header_line3").length > 0 && (n > 125 ? ($("#wrapper.travel_guide").addClass("scroller"),
    $(".header_line3").addClass("fixed")) : ($("#wrapper.travel_guide").removeClass("scroller"),
    $(".header_line3").removeClass("fixed"))) : $(".header_line3").length > 0 && ($(".header_line3").addClass("fixed"),
    $("#content").css("padding-top", "5rem"),
    $(".vgt2024_mt50").css("margin-top", "50px"),
    $(".vgt2024_mt70").css("margin-top", "70px"),
    $(".vgt2024_pt5rem").css("padding-top", "0"));
    $(window).on("scroll", function() {
        var n = $(window).scrollTop()
          , i = $(document).height()
          , r = $(window).height()
          , t = (i - r) / 3;
        $(".top_btn_wrap").length > 0 && (n > t ? $(".top_btn_wrap").addClass("on") : $(".top_btn_wrap").removeClass("on"),
        $(".top_btn_wrap, .research_area, .cuve_wrap").hide(),
        clearTimeout($.data(this, "scrollTimer")),
        $.data(this, "scrollTimer", setTimeout(function() {
            $(".top_btn_wrap, .research_area").show();
            n < t && $(".top_btn_wrap").hide()
        }, 1e3)))
    });
    $(".webzine_view").length > 0 && (t = $(".webzine_view .inner").offset().top - 50,
    n > t ? $(".webzine_view .btn_img_scale").addClass("fixed") : $(".webzine_view .btn_img_scale").removeClass("fixed"));
    $(".fixarea").length > 0 ? ($(".top_btn_wrap").addClass("type2"),
    $("#footer").css("padding-bottom", "130px")) : ($(".top_btn_wrap").removeClass("type2"),
    $("#footer").css("padding-bottom", "65px"));
    $(".product_detail+.tab_wrap .tab_menu").length > 0 && (n > tapProTop ? $(".product_detail+.tab_wrap .tab_menu").addClass("fixed") : $(".product_detail+.tab_wrap .tab_menu").removeClass("fixed"))
}
function btnTop() {
    $(".btn_top").on("click touch", function() {
        $("html,body").animate({
            scrollTop: "0"
        }, 500)
    })
}
function selectTour() {
    $(document).on("click touch", ".calendar .available, .calendar .standby, .calendar .done", function() {
        $(this).hasClass("on") ? $(this).closest("table").children().find(".on").removeClass("on") : ($(this).closest("table").children().find(".on").removeClass("on"),
        $(this).addClass("on").parents("tr").next("tr").addClass("on").siblings("tr").removeClass("on"))
    })
}
function dorpDownSet() {
    $(".header_line3 .tit_menu").click(function() {
        $(this).hasClass("on") == !1 ? ($(this).addClass("on"),
        $(".dimmer").addClass("on"),
        $(".dimmer.on").css("opacity", "0.4"),
        $(".header_line3").css("zIndex", "99"),
        $(".header_layer").show()) : ($(this).removeClass("on"),
        $(".header_layer").hide(),
        $(".dimmer").removeClass("on"),
        $(".header_line3").css("zIndex", ""),
        $(".dimmer.on").css("opacity", ""))
    });
    $(".dimmer").on("click touch", function() {
        $(this).hasClass("on") == !0 && ($(".header_layer").stop().slideUp(300),
        $(".header_line3 .tit_menu").removeClass("on"),
        $(".dimmer").removeClass("on"),
        $(".header_line3").css("zIndex", ""),
        $(".dimmer").css("opacity", ""),
        $(".booking").slideUp(300, function() {
            $(this).removeClass("on").removeAttr("style")
        }),
        $("#snsShare").removeClass("on"),
        $(".layer_popup").removeClass("on"))
    });
    $(".sort_wrap .btn_sort").click(function() {
        $(this).parent().hasClass("on") == !1 ? ($(this).parent().addClass("on"),
        $(this).parent().find(".sort_list").stop().slideDown(300)) : ($(this).parent().find(".sort_list").stop().slideUp(300),
        $(this).parent().removeClass("on"))
    });
    $(".safe_sort ul li a").click(function() {
        $(this).parent().addClass("on").siblings().removeClass("on")
    })
}
function bookingInt() {
    $(".btn_book").on("click touch", function() {
        $("#reservation").addClass("on").stop().clearQueue().slideDown("1000", function() {
            $(".dimmer").addClass("on");
            $("#wrapper").addClass("no_scroll")
        })
    });
    $(".booking .btn_x_book").on("click touch", function() {
        $("#reservation").stop().clearQueue().slideUp("1000", function() {
            $("#reservation").removeClass("on").removeAttr("style");
            $(".dimmer").removeClass("on");
            $("#wrapper").removeClass("no_scroll")
        })
    })
}
function loadingShow() {
    $(".loading").show().loadingView({
        state: !0,
        image: "/Images/2013/Common/loading.gif",
        imageClassName: "loadingImage",
        imageStyle: "position:absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
    })
}
function loadingHide() {
    $(".loading").hide().loadingView({
        state: !1
    })
}
function autoPaging() {
    var n = {
        loadingHtml: '<img src="/Images/2013/Common/loading.gif" alt="Loading" /> Loading...',
        padding: 20,
        nextSelector: "a.jscroll-next:last",
        contentSelector: "li"
    };
    $(".product_list").length > 0;
    $(".review_list").length > 0 && $(".review_list").jscroll(n);
    $(".notice_list").length > 0 && $(".notice_list").jscroll(n);
    $(".qna_list").length > 0 && $(".qna_list").jscroll(n)
}
function onheight() {
    offsetHeight
}
function gnbInit() {
    var n, u = $(".gnb").height(), r = 605, t = 0, f = 0;
    for (i = 0; i < $(".depth2 > ul > li").length; i++)
        t = $(".depth2 > ul > li").eq(i).children(".depth3").length,
        t == 0 && $(".depth2 > ul > li").eq(i).addClass("no_depth");
    for (i = 0; i < $(".depth3 > li").length; i++)
        t = $(".depth3 > li").eq(i).children(".depth4").length,
        t == 0 && $(".depth3 > li").eq(i).addClass("no_depth");
    $(".gnb").css({
        height: r
    });
    $(".gnb .depth2 > ul > li > a").on("click touch", function(t) {
        $(this).closest("li").find(".depth3").length > 0 && (t.preventDefault(),
        $(this).closest("li").hasClass("on") ? $(this).next(".depth3").stop().clearQueue().slideUp(300, function() {
            $(this).parent("li").removeClass("on");
            $(".gnb").css({
                height: r
            });
            $(".gnb .depth1").removeAttr("style")
        }) : (n = $(this).parents(".depth2").height(),
        $(this).next(".depth3").stop().clearQueue().slideDown(300, function() {
            n = $(this).closest(".depth2").height();
            n > u ? ($(".gnb").css({
                height: n + 60 + "px"
            }),
            $(".gnb .depth1").css({
                height: n + 32 + "px"
            })) : ($(".gnb").removeAttr("style"),
            $(".gnb .depth1").removeAttr("style"));
            f = n + 60
        }).parent("li").addClass("on").siblings("li").removeClass("on").children(".depth3").stop().clearQueue().slideUp(300, function() {
            $(this).removeAttr("style")
        })))
    });
    $(".gnb .depth3 li .sub, .gnb .depth3 li .direct").on("click touch", function(t) {
        if ($(this).parents($(this).closest("ul").hasClass("depth3"))) {
            var i = $(this).closest("li").find(".depth4").length;
            i > 0 && (t.preventDefault(),
            $(this).closest("li").hasClass("on") ? $(this).closest("li").find(".depth4").stop().clearQueue().slideUp(300, function() {
                $(this).closest("li").removeClass("on");
                $(".gnb .depth1").removeAttr("style")
            }) : (n = $(this).parents(".depth3").height(),
            $(this).closest("li").find(".depth4").stop().clearQueue().slideDown(300, function() {
                n = $(this).closest(".depth2").height();
                n > u ? ($(".gnb").css({
                    height: n + 60 + "px"
                }),
                $(".gnb .depth1").css({
                    height: n + 32 + "px"
                })) : ($(".gnb").removeAttr("style"),
                $(".gnb .depth1").removeAttr("style"))
            }).closest("li").addClass("on").siblings("li").removeClass("on").children(".depth4").stop().clearQueue().slideUp(300, function() {
                $(this).removeAttr("style")
            })))
        }
    });
    $(".gnb .depth1 > li > a").on("click touch", function(n) {
        if ($(this).parents($(this).closest("ul").hasClass("depth1"))) {
            n.preventDefault();
            var t = $(this).next(".depth2").height()
              , i = $(".gnb").height();
            $(".gnb").removeAttr("style");
            $(".gnb .depth1").removeAttr("style");
            $(".gnb .depth2 li .depth3").removeAttr("style");
            $(".gnb .depth2 li").removeClass("on");
            $(this).parent("li").addClass("on").siblings("li").removeClass("on");
            t > i ? $(".gnb").css({
                height: t
            }) : $(".gnb").css({
                height: r
            })
        }
    })
}
function currentProgress() {
    for (var n, r = "", t = $(".current_progress .progress_bar"), f = $(".current_progress .progress_value"), u = t.data("percent"), e = Math.round(u / 100 * 360), o = function() {
        for (var i = document.body || document.documentElement, r = i.style, t = ["Moz", "Webkit", "ms"], n = 0; n < t.length; ) {
            if (typeof r[t[n] + "Transition"] == "string")
                return t[n];
            n++
        }
        return !1
    }, s = o(), h = s + "Transform", i = 0; i <= e; i++)
        r = '<div class="gage-bar"><\/div>',
        t.append(r),
        $(".gage-bar:last").css(h, "rotate(" + i + "deg)");
    for (t.find("div").each(function(n, t) {
        $(t).stop().delay(n * 5).fadeIn(50)
    }),
    n = 0; n <= u; n++)
        (function(n) {
            var t = 360 / 100 * n * 5;
            setTimeout(function() {
                f.text(n)
            }, t)
        }
        )(n)
}
function etcFunction() {
    if ($(".rating").length > 0) {
        $(".rating").hasClass("rating_view") == !1 ? $(".rating").rating({
            displayOnly: !1,
            defaultCaption: "{rating} hearts",
            starCaptions: function(n) {
                return n == 1 ? "One heart" : n + " hearts"
            }
        }) : $(".rating_view").rating({
            displayOnly: !0
        });
        $(".rating").each(function() {
            var n = $(this).val();
            $(this).parents(".rating_wrap").find(".rating_tit > .rating_value").html(n)
        });
        $(".rating").on("change", function() {
            var n = $(this).val();
            $(this).parents(".rating_wrap").find(".rating_tit > .rating_value").html(n)
        })
    }
    $(".size_control ul li").click(function() {
        $(".size_control ul li").removeClass("active ");
        $(this).addClass("active");
        $(this).hasClass("step1") ? $(this).parents(".fc_size_set").find(".fc_size_view").css("fontSize", "1.5rem") : $(this).hasClass("step2") ? $(this).parents(".fc_size_set").find(".fc_size_view").css("fontSize", "1.6rem") : $(this).hasClass("step3") ? $(this).parents(".fc_size_set").find(".fc_size_view").css("fontSize", "1.7rem") : $(this).parents(".fc_size_set").find(".fc_size_view").css("fontSize", "1.8rem")
    })
}
function homeNavi() {
    $(document).on("click touch", "#homeNavi .swiper-slide > a", function() {
        $(this).hasClass("nodepth") || ($(this).parents(".home_navi").addClass("move"),
        $("#homeNaviSub").addClass("on"))
    });
    $(document).on("click touch", "#homeNaviSub .depth1 a", function() {
        $(".home_navi").removeClass("move");
        $("#homeNaviSub").removeClass("on")
    })
}
function pageTitle() {
    var i = $("title").text(), r = $("h1").text(), u = $("h2").text(), t = $("#wrapper"), n;
    t.hasClass("main") && (t.hasClass("largo") && (n = "라르고 - "),
    t.hasClass("free") && (n = "자유여행 - "),
    t.hasClass("premium") && (n = "프리미엄 - "),
    t.hasClass("package") && (n = "패키지 - "));
    $(".header_line3").length > 0 && (n = $("#header .header_line3 h2").text() + " - ",
    $("#wrapper").hasClass("travel_guide") ? t.hasClass("pg_popup") || $("html,body").stop().animate({
        scrollTop: "125px"
    }) : $("html,body").stop().animate({
        scrollTop: "0px"
    }));
    t.hasClass("pg_popup") && (n = $(".pg_popup #header h1").text() + " - ");
    typeof n == "undefined" && (n = "");
    $("title").text(n + i)
}
function largoSubMainAct() {
    $(".largoVisual").length > 0 && (setTimeout(function() {
        $(".panel.visualswipe").css({
            height: $(".largoVisual").height()
        });
        $("html,body").stop().animate({
            scrollTop: "116px"
        })
    }, 500),
    $.scrollify({
        section: ".panel",
        interstitialSection: "header, footer, .panel.productlist",
        setHeights: !0,
        updateHash: !1,
        before: function() {
            setTimeout(function() {
                $(".panel.visualswipe").css({
                    height: $(".largoVisual").height()
                });
                $(this).scrollTop() > $(".largoVisual").height() ? (console.log("1"),
                $(".panel.productlist").css({
                    "padding-top": "5rem"
                }),
                $.scrollify("move", $(".panel"))) : (console.log("else"),
                $.scrollify("move", $(".panel")),
                $(".panel.productlist").removeAttr("style"))
            }, 500)
        },
        after: function() {
            setTimeout(function() {
                $(this).scrollTop() > $(".largoVisual").height() ? ($.scrollify("move", $(".panel")),
                console.log("2")) : (console.log("else 2"),
                $(".panel.productlist").removeAttr("style"),
                $.scrollify("move", $(".panel")),
                $(".panel.visualswipe").css({
                    height: $(".largoVisual").height()
                }))
            }, 500)
        }
    }))
}
function pieMenu() {
    $.fn.PieMenu = function(n) {
        function o(n) {
            $(t.menu_element).each(function(t, i) {
                $(i).css({
                    left: n == 0 ? 0 : r[t] - 15,
                    top: n == 0 ? 0 : -e[t]
                });
                $(i).hasClass("item1") == !0 && $(this).css({
                    left: n == 0 ? 0 : r[t] - 30
                })
            })
        }
        var f, s, i = [], e = [], r = [], t = $.extend({
            starting_angel: "0",
            angel_difference: "90",
            radius: "200",
            menu_element: this.children(".menu_option").children(),
            menu_button: this.children(".menu_button")
        }, n), u;
        return f = parseInt(t.angel_difference) / (t.menu_element.length - 1),
        s = 1 / (t.menu_element.length - 1),
        $(t.menu_button).unbind("click", u),
        u = function() {
            $(this).parent().hasClass("message") == !1 ? ($(this).parent().hasClass("active") ? (o(0),
            $(this).parent().removeClass("active"),
            $(this).parent().addClass("inactive")) : (o(1),
            $(this).parent().addClass("active"),
            $(this).parent().removeClass("inactive")),
            $(this).toggleClass("btn-rotate")) : $(this).parent().hasClass("message_active") ? $(this).parent().removeClass("message_active") : $(this).parent().addClass("message_active")
        }
        ,
        $(t.menu_button).bind("click", u),
        t.menu_element.each(function(n) {
            i[n] = (parseInt(t.starting_angel) + f * n) * Math.PI / 180;
            e[n] = t.radius * Math.sin(i[n]);
            r[n] = t.radius * Math.cos(i[n])
        })
    }
}
function PieMenuInit() {
    $("#cuve_container").PieMenu({
        starting_angel: 0,
        angel_difference: 100,
        radius: 130
    })
}
function reset() {
    $(".menu_button").hasClass("btn-rotate") && $(".menu_button").trigger("click");
    PieMenuInit()
}
function displayGnb() {
    var n = $("#div_gnb").offset();
    Math.abs(n.left) > 20 ? $("#div_gnb").animate({
        left: 0
    }, 300) : $("#div_gnb").animate({
        left: "-100%"
    }, 300)
}
function imgScale() {
    $(".img_wrap .btn_img_scale").on("click touch", function() {
        return $(this).hasClass("on") ? ($(this).removeClass("on"),
        $(this).parents(".img_wrap").removeClass("on")) : ($(this).addClass("on"),
        $(this).parents(".img_wrap").addClass("on")),
        !1
    })
}
function homeImageSet() {
    var n = $(".home_swiper").width()
      , t = $(".home_swiper").height()
      , i = n / t;
    i <= .55 ? $(".home_swiper").addClass("height") : $(".home_swiper").removeClass("height")
}
function hideInfo() {
    $(".info_scroll").fadeOut(500)
}
function absBr() {
    for (var t = $(".cms_view .toggle_con"), i = [], r = [], n = 0; n < t.length; n++)
        i[n] = t.eq(n).find("img").length,
        i[n] >= 2 ? (r = t.eq(n).find("img").eq(i).next("br").length,
        r == 0 && t.eq(n).find("img").eq(i).after("<br />"),
        t.eq(n).find("img").addClass("double")) : (r[n] = t.eq(n).find("img").next("br").length,
        t.eq(n).find("img").addClass("maxImg"),
        r[n] == 0 && t.eq(n).find("img").after("<br />"))
}
function reserveListEticket(n, t) {
    if (n === "close")
        console.log($(t)),
        $(t).parent().parent().hide().parents("html, body").css("overflow", "auto");
    else if (n === "open")
        $(t).parents(".my_info").find(".eticket-popup").show().parents("html, body").css("overflow", "hidden");
    else
        return !1
}
var st = $(window).scrollTop(), tapProTop;
$(document).on("click touch", ".toggle_wrap.cms_view,.toggle_wrap.cms_view .btn_toggle", function() {
    return $(this).find(".toggle_tit, .btn_toggle,.toggle_con ").toggleClass("on"),
    !1
});
$.fn.htmlNumberSpinner = function() {
    var f;
    $(this).append("<div class='btn decrementer'>-<\/div> <input class='number-input' type='number' readonly /> <div class='btn incrementer'>+<\/div>");
    var n, u = $(this).find(".number-input"), e = $(this).find(".incrementer"), o = $(this).find(".decrementer"), t = $(this).attr("min"), i = $(this).attr("max"), r = $(this).attr("step");
    t && u.attr("min", +t);
    i && u.attr("max", +i);
    r && u.attr("step", +r);
    f = $(this);
    n = t ? t : 0;
    u.val(n);
    e.click(function() {
        var t = $(this).parent(), u;
        if (n = t.find(".number-input").val(),
        !i || i != n) {
            if (r) {
                n = t.find(".number-input").val();
                t.find(".number-input").val(+n + +r);
                u = f.attr("inputchange");
                u != "" && eval(u);
                return
            }
            n = t.find(".number-input").val();
            t.find(".number-input").val(++n)
        }
    });
    o.click(function() {
        var i = $(this).parent(), u;
        if (n = i.find(".number-input").val(),
        !t || t != n) {
            if (r) {
                n = i.find(".number-input").val();
                i.find(".number-input").val(+n - +r);
                u = f.attr("inputchange");
                u != "" && eval(u);
                return
            }
            n = i.find(".number-input").val();
            i.find(".number-input").val(--n)
        }
    });
    u.change(function() {
        if (i && t) {
            var n = $(this).val();
            if (+n > +i) {
                $(this).val(i);
                return
            }
            if (+n < +t) {
                $(this).val(t);
                return
            }
        }
    })
}
;
$.fn.getSpinnerValue = function() {
    return $(this).find(".number-input").val()
}
;
jQuery(function(n) {
    if (pieMenu(),
    inputInit(),
    inputSlider(),
    tabInit(),
    prodImgSize(),
    toggleInit(),
    acordionInit(),
    snsShare(),
    selectTour(),
    dorpDownSet(),
    swipeInit(),
    bookingInt(),
    etcFunction(),
    loadingShow(),
    btnTop(),
    gnbInit(),
    tooltipInit(),
    homeNavi(),
    currentProgress(),
    datepicker(),
    comp_width(),
    imgScale(),
    homeImageSet(),
    fixedProTapInit(),
    setTimeout(fixedProTapInit, 1e3),
    setTimeout(hideInfo, 2e3),
    absBr(),
    n("#wrapper.free .tab_menu").length > 0) {
        if (n(window).height() < n(".free_wrap").height() + 155 + 116) {
            var t = n(".free_wrap").height();
            n("#wrapper.free .home_swiper").removeAttr("style").css("height", t + 155 + "px")
        }
        n("#wrapper.free .tab_menu li a").on("click touch", function() {
            if (n("#wrapper.free .home_swiper").removeAttr("style"),
            n(window).height() < n(".free_wrap").height() + 155 + 116) {
                var t = n(this).parents(".free_wrap").height();
                n("#wrapper.free .home_swiper").removeAttr("style").css("height", t + 155 + "px")
            }
        })
    }
    pageTitle();
    PieMenuInit()
});
$(document).on("click", ".tooltip", function() {
    var n = $(this).next(".tip_box");
    return n.is(":visible") ? n.hide() : n.show(),
    !1
});
$(document).on("click", ".tip_box .tool_close", function() {
    return $(this).parent(".tip_box").hide(),
    !1
});
$(window).load(function() {
    $(".booking").hasClass("on") && $(".dimmer").addClass("on");
    $(".counter").length > 0 && $(".counter").each(function(n) {
        n = n + 1;
        $("#counter" + n).htmlNumberSpinner()
    });
    $("div.fixarea").length < 1 && $(".pg_popup").addClass("scroller");
    $(".submainVisual").length > 0;
    loadingHide()
});
$(window).resize(function() {
    comp_width();
    prodImgSize();
    homeImageSet()
});
$(window).scroll(function() {
    fixedPosition();
    autoPaging()
});
