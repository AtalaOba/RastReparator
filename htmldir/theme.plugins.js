;(function(){
	"use strict";

	$(document).ready(function(){

		window.ISRTL = getComputedStyle(document.body).direction === 'rtl';
		
		$('.accordion').accordion(false);
		$('.toggle').accordion(true);

		if($.fancybox){
			$.fancybox.defaults.direction = {
				next: 'left',
				prev: 'right'
			}
		}

		
		/* ------------------------------------------------
				Range slider
		------------------------------------------------ */
		if($('#slider').length){

			//window.startRangeValues = [0, FILTROS_PRECIO_MAX];
			 
			$('#slider').slider({
				range : true,
				min : 0,
				max : FILTROS_PRECIO_MAX,
				values : window.startRangeValues,
				step : 1,
				slide : function(event, ui){
					var min = ui.values[0].toFixed(0),
						max = ui.values[1].toFixed(0),
						range = $(this).siblings('.range');
						
					var texto_maxval = max + ' €';
					if( max == FILTROS_PRECIO_MAX ) texto_maxval = '<span style="font-size:2em; line-height:0.8">&#8734;</span>';

					range.children('.min_value').val(min).next().val(max);
					range.children('.min_val').text(min + ' €').next().html(texto_maxval);

				},

				create : function(event, ui){
					var $this = $(this),
						min = $this.slider("values", 0).toFixed(0),
						max = $this.slider("values", 1).toFixed(0),
						range = $this.siblings('.range');
					
					var texto_maxval = max + ' €';
					if( max == FILTROS_PRECIO_MAX ) texto_maxval = '<span style="font-size:2em; line-height:0.8">&#8734;</span>';

					range.children('.min_value').val(min).next().val(max);
					range.children('.min_val').text(min + ' €').next().html(texto_maxval);
				}
			});
		}

		/* ------------------------------------------------
				End range slider
		------------------------------------------------ */

	});

	$(function(){

		/* ------------------------------------------------
				Owl-carousel
		------------------------------------------------ */

			// required
			$('.owl_carousel:not(.widgets_carousel)').on('initialized.owl.carousel resized.owl.carousel', Core.helpers.sameheight)
			.on('initialized.owl.carousel translated.owl.carousel', Core.helpers.owlGetVisibleElements);

			$('.carousel_in_tabs:not([class*="type"])').owlCarousel({
				responsive : {
					0 : {
						items : 1
					},
					480 : {
						items : 2
					},
					992 : {
						items : 3
					}
				},
				nav : true,
				navText : [],
				rtl: window.ISRTL ? true : false
			});

			$('.brands').owlCarousel({
				responsive : {
					0 : {
						items : 2
					},
					480 : {
						items : 3
					},
					992 : {
						items : 4
					}
				},
				margin : 30,
				loop: true,
				nav : true,
				navText : [],
				themeClass : 'brands_carousel',
				rtl: window.ISRTL ? true : false
			});

			$('.brands_full_width').owlCarousel({
				responsive : {
					0 : {
						items : 2
					},
					480 : {
						items: 3
					},
					768 : {
						items : 4
					},
					992 : {
						items : 5
					},
					1199 : {
						items : 6
					}
				},
				margin : 30,
				loop: true,
				nav : true,
				navText : [],
				themeClass : 'brands_carousel',
				rtl: window.ISRTL ? true : false
			});

			$('.sellers_carousel, .other_products').owlCarousel({
				responsive : {
					0 : {
						items : 1
					},
					487 : {
						items : 2
					},
					992 : {
						items : 3
					}
				},
				nav : true,
				navText : [],
				rtl: window.ISRTL ? true : false
			});

			$('.carousel_of_entries').owlCarousel({
				responsive : {
					0 : {
						items : 1
					},
					485 : {
						items : 2
					},
					992 : {
						items : 3
					}
				},
				nav : true,
				navText : [],
				rtl: window.ISRTL ? true : false
			});

			$('.carousel_in_tabs.type_2, .owl_carousel.four_items').owlCarousel({
				responsive : {
					0 : {
						items : 1
					},
					490 : {
						items : 2
					},
					684 : {
						items : 3
					},
					992 : {
						items : 4
					}
				},
				nav : true,
				navText : [],
				rtl: window.ISRTL ? true : false
			});

			$('.carousel_in_tabs.type_3').owlCarousel({
				responsive : {
					0 : {
						items : 1
					},
					490 : {
						items : 2
					},
					992 : {
						items : 3
					},
					1199 : {
						items : 4
					}
				},
				nav : true,
				navText : [],
				rtl: window.ISRTL ? true : false
			});

			$('.widgets_carousel').owlCarousel({
				items : 1,
				autoHeight : true,
				loop : true,
				nav : true,
				navText : [],
				themeClass : 'single_visible_element',
				onResized : function(){
					$('.widgets_carousel').trigger('next.owl.carousel');
				},
				rtl: window.ISRTL ? true : false
			});

			$('.owl_carousel.six_items').owlCarousel({
				responsive : {
					0 : {
						items : 1
					},
					420 : {
						items : 2
					},
					580 : {
						items : 3
					},
					992 : {
						items : 5
					},
					1199 : {
						items : 6
					}
				},
				nav : true,
				navText : [],
				themeClass : 'carousel_with_six_items',
				rtl: window.ISRTL ? true : false
			});

			$('.owl_carousel.five_items').owlCarousel({
				responsive : {
					0 : {
						items : 1
					},
					465 : {
						items : 2
					},
					580 : {
						items : 3
					},
					991 : {
						items : 4
					},
					1199 : {
						items : 5
					}
				},
				nav : true,
				navText : [],
				rtl: window.ISRTL ? true : false
			});

		/* ------------------------------------------------
				End owl-carousel
		------------------------------------------------ */		

	});

}());

function callbackCarousel(e) {
						
				}