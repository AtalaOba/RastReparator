var Core = (function(Core){
	"use strict";

	Core = {

		/**
		** static constants
		**/
		ANIMATIONEND : "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
		TRANSITIONEND : "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
		ISTOUCH : $('html').hasClass('md_touch'),
		TRANSITIONSUPPORTED : $('html').hasClass('md_csstransitions'),
		XHRLEVEL2 : !!window.FormData,

		/**
		** initialize after DOM has been loaded
		**/
		afterDOMReady : function(){
						
			this.fancyboxValidationFix();
			//this.generateBackToTopButton();
			//this.events.backToTop(500);			
		},

		/**
		** initialize after all images, scripts, etc. have been loaded
		**/
		afterWindowLoaded: function(){
			
			this.mainAnimation.init();			
		},

		/**
		** extends jQuery by own mini plugins
		**/
		extend : function(){

			$.fn.extend({

				/**
				**	Call function after window resize and delay
				**	@param fn - function that will be called
				**	@param delay - Delay, after which function will be called
				**	@param namepsace - namespace for event
				**/
				afterResize : function(fn, delay, namespace){
					var ns = namespace || "";            
		            return this.each(function(){		            
		                $(this).on('resize' + ns, function(){
		                    setTimeout(function(){
		                        fn();
		                    }, delay);		                    
		                });		                
		            });		            
		        },

		        /**
		        **	Accordion plugin
		        **	@param toggle - set to true, if need to be toggle
		        **	@return jQuery
		        **/
		        accordion : function(toggle){

		        	return this.each(function(){

		        		var $this = $(this);							
						if( $this.children('dt').length > 1 )
							var active = $this.children('dt.active').length ? $this.children('dt.active') : $this.children('dt:first').addClass('active');
						else
							var active = $this.children('dt.active');
						
		        		$this.children('dt').not(active).next().hide();
		        		
		        		$this.on('click', 'dt', function(){
		        			
		        			if(!toggle){
		        				$(this).addClass('active')
		        						.siblings('dt')
		        						.removeClass('active')
		        						.end()
		        						.next('dd')
		        						.stop()
		        						.slideDown(300)
		        						.siblings('dd')
		        						.stop()
		        						.slideUp(300);
		        			}
		        			else{
		        				$(this).toggleClass('active').next().stop().slideToggle();
		        			}

		        		});

		        	});

		        }

			});

		},

		generateBackToTopButton : function(){

			$('<button></button>', {

				id : "back_to_top",
				class : "def_icon_btn middle_btn theme_button animated transparent"
				
			}).appendTo($('body'));

		},

		/**
		**	Generate stylized button instead default browser's button with type="file"
		**/
		attachButton: function(){

			$('input[type="file"]').each(function(){

				var wrap = $('<div></div>'),
					btn = $('<button></button>', {
						class: 'button_dark_grey middle_btn attach_file_btn',
						type: 'button',
						text: 'Browse'
					});

				wrap.append(btn);

				$(this).before(wrap).hide();

			});

			$('.attach_file_btn').on('click', function(){
				$(this).parent().next().trigger('click');
			});

		},

		/**
		**	Generate rel attribute from valid data-rel attribute
		**/
		fancyboxValidationFix : function(){

			var fb = $('[class*="fancybox_item"]');

			if(!fb.length) return;

			fb.each(function(){

				$(this).attr('rel', $(this).data('rel'));

			});

		},

		
		/**
		** handling main animation of theme
		**/
		mainAnimation : {

			container : $('.dropdown'),

			init : function(){

				this.prepareEachDropdown();
				this.bindEvents();

			},

			prepareDropdown : function(){

				var self = Core.mainAnimation;

				var $this = $(this),
					hasDropdown = $this.find('.dropdown').length ? 'children' : 'find';

				$this.data("fn", hasDropdown);

				var items = $this[$this.data('fn')]('.animated_item'),
					len = items.length;

				$this.data("len", len);

				self.defaultState($this);

				if(Core.TRANSITIONSUPPORTED){

					items.children('a').on(Core.TRANSITIONEND, function(event){

						event.stopPropagation();

					});

					items.eq(0).on(Core.TRANSITIONEND, function(event){



						if($this.hasClass("active") || event.originalEvent.propertyName !== "transform" || !event.target.classList.contains("animated_item")) return false;
						self.defineNewState($this);
						$this.removeClass("visible");

					});

					items.eq($this.data("len") - 1).on(Core.TRANSITIONEND, function(){

						if(!$this.hasClass("active")) return false;
						self.defineNewState($this,true);

					});

				}

			},

			prepareEachDropdown : function(){

				var self = this;
				self.container.each(self.prepareDropdown);

			},

			bindEvents : function(){

				$('body').on('click.dropdown','[class*="open_"]',function(event){

					$(this).add($(this).next()).toggleClass('active');

					/*
					if(Core.TRANSITIONSUPPORTED){
						$(this).next().addClass("visible");
					}
					else{
						$(this).next().toggleClass('visible');
					}
					*/
					$(this).next().toggleClass('visible');

				});

			},

			defineNewState : function(container, reverse){

				container.addClass(container.data('fn'));

				if(reverse){

					var len = container.data("len"),
						items = container[container.data('fn')]('.animated_item');

					for(var i = len,j = 0; i >= 0, j < len; i--, j++){
						//items.eq(j).attr('style','transition-delay:' + i / 10 + 's');
					}

				}
				else{

					this.defaultState(container);

				}

			},

			defaultState : function(container){
				
				var	items = container[container.data('fn')]('.animated_item');

				items.each(function(i){

					$(this).attr('style', 'transition-delay:' +  (i+1) / 30 + 's');

				});

			}

		},

		/**
		** store small events
		**/
		events: {			
			backToTop : function(offset){	

				var w = $(window),
					b = $('#back_to_top');

				w.on("scroll", function(){

					if(w.scrollTop() > offset && !b.hasClass('visible')){
						b.removeClass('transparent').addClass('bounceInRight visible');
					}
					else if(w.scrollTop() <= offset && b.hasClass('visible')){
						b.removeClass('bounceInRight').addClass('bounceOutRight');
					}

				});

				b.on('click', function(){

					$('html,body').animate({
						scrollTop : 0
					},400,'swing');

				}).on(Core.ANIMATIONEND, function(){

					if(b.hasClass('bounceOutRight')){
						b.removeClass('visible bounceOutRight').addClass('transparent');
					}

				});

			}
		},

		helpers : {

			/**
			**	find the maximum height
			**/
			sameheight : function(){

				var $this = $(this), max = 0;

				$this.find('.owl-item').children().css('height','auto').each(function(){

					max = Math.max( max, $(this).outerHeight() );

				}).promise().done(function(){

					$this.find('.owl-item').children().css('height', max);

				});

			},

			/**
			**	Get first and last visible elements in carousel
			**/
			owlGetVisibleElements : function(){

				var $this = $(this);

				$this.find('.owl-item').removeClass('first last');
				$this.find('.owl-item.active').first().addClass('first');
				$this.find('.owl-item.active').last().addClass('last');

			}

		},

		
		

		stickyMenu : {

			/**
			**	Initialize variables
			**/
			initVars: function(){

				this.NAVIGATION = $('#main_navigation_wrap, .sticky_part');

				if(!this.NAVIGATION.length) return false; // temp

				this.HEADER = $('#header');
				this.updatesInfo();

				this.needToBeSticky();
				$(window).afterResize(this.needToBeSticky.bind(this), 300);

			},

			/**
			**	Initialize sticky menu
			**/
			initializeSticky: function(){

				this.NAVIGATION.addClass('sticky_initialized');

				this.activateSticky();
				$(window).on('scroll.sticky', this.activateSticky.bind(this));

			},

			/**
			**	Checks if sticky menu need to initialize
			**/
			needToBeSticky: function(){

				if($(window).width() > 991 && this.NAVIGATION.hasClass('sticky_initialized')){

					this.updatesInfo();
					this.activateSticky();

				}
				else if($(window).width() > 991 && !this.NAVIGATION.hasClass('sticky_initialized')){

					this.initializeSticky();

				}
				else if($(window).width() <= 991){

					this.destroy();

				}

			},

			/**
			**	Method that checks scrollbar position and adds/removes 
			**	fixed class on main navigation wrapper element
			**/
			activateSticky: function(){

				if($(window).scrollTop() >= this.navTopOffset && !this.NAVIGATION.hasClass('sticky')){

					this.NAVIGATION.addClass('sticky');
					this.headerSizeCompensation(true);

				}
				else if($(window).scrollTop() < this.navTopOffset && this.NAVIGATION.hasClass('sticky')){

					this.NAVIGATION.removeClass('sticky');
					this.headerSizeCompensation(false);

				}				

			},

			/**
			**	Returns main navigation wrapper element to default position
			**/
			resetStickyPosition: function(){

				this.NAVIGATION.removeClass('sticky');
				this.headerSizeCompensation(false);

			},

			/**
			**	Updates information about main navigation wrapper element (height, offset)
			**/
			updatesInfo: function(){

				this.resetStickyPosition();

				this.navTopOffset = this.NAVIGATION.offset().top;
				this.navHeight = this.NAVIGATION.outerHeight();

			},

			/**
			**	Add padding-bottom to header for compensation sticky menu size
			**/
			headerSizeCompensation: function(on){

				if(on){
					this.HEADER.css('padding-bottom', this.navHeight);
				}
				else{
					this.HEADER.css('padding-bottom', 0);
				}

			},

			/**
			**	Destroy sticky menu
			**/
			destroy : function(){

				this.NAVIGATION.removeClass('sticky_initialized');
				this.resetStickyPosition();
				$(window).off('scroll.sticky');
				this.headerSizeCompensation(false);

			}

		}

	};

	Core.extend();

	$(document).ready(function(){
		Core.afterDOMReady();
	});

	$(window).load(function(){
		Core.afterWindowLoaded();
	});

	return Core;

}(Core || {}));