$(function(){
	swapDesktopMobile();	
	
	$("body").on('click', ".mobile-menu-search-open", function(){	
		$("#mobile-search-wrapper").toggle(150);
	});	
		
	buscaRapida();	
	
	if( MOBILE )
	{
		$(".remove-mobile").remove();		
	}
	else
	{
		$(".remove-desktop").remove();
	}	
	
	$('[data-toggle="tooltip"]').tooltip();
	

	//DESHABILITAMOS EL ZOOM DE LAS FOTOS DE LOS LISTADOS EN MOUSEOVER
	/*
	var imgzoom_offset_x = -(250);
	var imgzoom_offset_y = -(420);
	var imgzoom_height = 400;
	var imgzoom;	
	
	$(".product_item .image_wrap img").hover(function(e){			
		imgzoom = $(this).attr('src').replace('-thumb', '-grande');
		if( imgzoom.indexOf("no_image") >= 0 ) return;
		
			$("body").append('<p id="img_preview"><img src="'+ imgzoom +'" style="height:'+imgzoom_height+'px" onError="$(\'#img_preview\').remove()"></p>');
			$("#img_preview")
				.css("top",(e.pageY + imgzoom_offset_y) + "px")
				.css("left",(e.pageX + imgzoom_offset_x) + "px")
				.fadeIn(300);	
		
	},
	function(){	
		imgzoom='';				
		$("#img_preview").remove();
	});
		
	$(".product_item .image_wrap img").mousemove(function(e){
		$("#img_preview")
			.css("top",(e.pageY + imgzoom_offset_y) + "px")
			.css("left",(e.pageX + imgzoom_offset_x) + "px")
	});	
	*/		

	
	$(".link_privacidad").fancybox({
		type: 'ajax',
		href: BASE_URL+'__load_ajax.php?sec=sec-privacidad',
		autoSize: false,
		width: 700,
		height: 500
	});
	
	$("#modulo-buscamos").fancybox({
		type: 'ajax',
		href: BASE_URL+'__load_ajax.php?sec=_modulo-buscamos.form',
		helpers : { 
 			 overlay : {closeClick: false}
		}
	});
	
	$("#modulo-seguimiento").fancybox({
		type: 'ajax',
		href: BASE_URL+'__load_ajax.php?sec=_modulo-seguimiento.form'

	});
	
	$("#link-monedero").fancybox({
		type: 'ajax',
		href: BASE_URL+'__load_ajax.php?sec=micuenta.monedero',
		autoSize: false,
		autoHeight: true
	});
	
	$("#fNewsletter").enviaForm({
		url: BASE_URL + '__load_ajax.php?sec=_modulo-newsletter.save',
		style: 'position: absolute; top: 38px;',
		onSuccess: function(data){
			$("#sc_email").val('');
			$.fancybox({
				type: 'inline',
				content: data.msg,
				modal: true				
			});
		},
		onError: function(data){
			$.fancybox({
				type: 'inline',
				content: data.msg,
				modal: true
			});
		}
	});
	
	$("#modulo-mediopollo").fancybox({		
		'href'				: 'http://www.nadiemellamagallina.com/mediopollo/',
		'type'				: 'iframe',
		'autoSize'			: false,
		'transitionIn'		: 'elastic',
		'speedIn'			: 100,
		'transitionOut'		: 'elastic',
		'speedOut'			: 100,
		'width'				: 635,
		'height'			: 255			
	});	
	
	if($('.royalSlider').length)
	{
		//jQuery.rsCSS3Easing.easeOutBack = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)'; // add easeOutBack easing support
		$(".royalSlider").royalSlider({
			autoScaleSlider : true,
			autoScaleSliderWidth : 848,
			autoScaleSliderHeight : 280,
			imageScaleMode : "fit-if-smaller",
			imageScalePadding : 0,
			slidesSpacing : 0,
			controlNavigation : 'none',
			loop : true,
			block : {
				speed : 700,
				easing : 'easeOutBack'
			},
			keyboardNavEnabled: true,
			controlsInside: true,
			autoPlay: {    		
				enabled: true,
				pauseOnHover: true,
				delay: 3000
			}
		});  
	}
	
	$.cookieCuttr({		
		cookieAnalytics: false,
		cookieAcceptButtonText: 'OK',
		cookiePolicyLink: BASE_URL+LANG+'/politica-de-cookies',
		cookieMessage: COOKIE_MSG
	});
	
	/*$(".product_item img").error(function(){
		var $img = $(this);
		if( $img.attr('src').indexOf('-thumb.jpg') >= 0 )		
			$img.attr('src', $img.attr('src').replace('-thumb.jpg', '.jpg'))
		else			
			$img.attr('src', '/@DESARROLLO/ImpextromDemo/img/layout/__no_image.png');
	}); */
});

$(window).on("load", function() {
	if( __SECCION.alias != 'inicio' )
		sameHeight('.productos-list .product_item');
	
	sameHeight('.menucuenta .item');
	//sameHeight('.owl_item.product_item');
});

window.onresize = function() {
	var mobile_init = MOBILE;
	swapDesktopMobile();	
};

function buscaRapida()
{
	$('#buscarapida').liveSearch({
		url: BASE_URL+'__load_ajax.php?unload=categorias&sec=buscar.live&q='
	}); 
}

function swapDesktopMobile()
{
	if( $("#checkMobile").css('display') != 'none' )
	{	
		if( $("#header").length )
		{
			if( __SECCION.alias == 'buscar' || __SECCION.id_tienda || __SECCION.id_categoria ) 
			{
				var detener = true;
				//window.location.href = window.location.href;								
			}
			
			var detener = true;
			
			if( detener )
			{			
				$("#header").remove();
				$("#header-wrapper").load(BASE_URL+'__load_ajax.php?file=_header.mobile', function(){
					loadMenuMobile();
				});
				$("#footer").remove();
				$("#footer-wrapper").load(BASE_URL+'__load_ajax.php?file=_footer.mobile');
			}
		}
		MOBILE = true;
	}
	else
	{			
		if( $("#mobile-header").length )
		{
			if( __SECCION.alias == 'buscar' || __SECCION.id_tienda || __SECCION.id_categoria ) 
			{
				var detener = true;
				//window.location.href = window.location.href;				
				//exit();
			}
			
			var detener = true;
						
			if( detener )
			{
				$("#mobile-header").remove();
				$("#header-wrapper").load(BASE_URL+'__load_ajax.php?file=_header.desktop');	
				$("#footer").remove();
				$("#footer-wrapper").load(BASE_URL+'__load_ajax.php?file=_footer.mobile');		
			}
			
		}
		MOBILE = false;
	}
	
	if( MOBILE )
	{	
		var previousScroll = 0;
		loadMenuMobile();
	}
}

function loadMenuMobile()
{
	$('nav#mobile-menu').mmenu({
		"offCanvas": {
			position: "left"
		},
		"navbar": {
			add: true,
			title: "Impextrom.com",
			titleLink: "none" //parent, anchor, none
		},
		 extensions: ["effect-slide-menu", "effect-slide-listitems"],
		 extensions: ["multiline"],
		 extensions: ["pageshadow"]
	});
	
	$("#mobile-menu").show();		
	
	var previousScroll = $(this).scrollTop();
	$(window).scroll(function () {
		var currentScroll = $(this).scrollTop();
		if( currentScroll > 150 )
		{
			if( currentScroll > previousScroll )
				$('#mobile-header').removeClass('fixedheader');  				
			else
				$('#mobile-header').addClass('fixedheader');				
		}
		else
		{
			$('#mobile-header').addClass('fixedheader');   
		}
		previousScroll = currentScroll;
	});
}

function sameHeight(elems)
{	
	var masalto = 0;
	$(elems).each(function(){
		if( $(this).height() > masalto ) 
               masalto = $(this).height(); 
	})
	$(elems).height(masalto);
}

function sameHeight_old(elems)
{	
	var max = 0;
	$(elems).each(function(){
		max = Math.max( max, $(this).outerHeight() );
	})
	.promise().done(function(){
		$(elems).css('height', max+'px');		
	});
}

function owlCarouselExtended(options)
{	
	var $carrusel;
	var cols_lg = 4;
	var cols_sm = 3;
	var cols_xs = 2;
	var loop = false;
	var dots = false;
	var autoplay_speed = 0;

	if( !options.element )
	{
		$carrusel = options;		
	}
	else
	{		
		$carrusel = options.element;
		if( options.cols_lg ) cols_lg = options.cols_lg;
		if( options.cols_sm ) cols_sm = options.cols_sm;
		if( options.cols_xs ) cols_xs = options.cols_xs;		
		if( options.loop ) loop = options.loop;
		if( options.dots ) dots = options.dots;
		if( options.autoplay_speed ) autoplay_speed= options.autoplay_speed;		
	}
	
	if( cols_lg < 1 ) cols_lg = 1;
	if( cols_sm < 1 ) cols_sm = 1;
	if( cols_xs < 1 ) cols_xs = 1;
	if( !autoplay_speed ) autoplay_speed = 0;
	
	if( $carrusel.length )
	{
		$carrusel.on('initialized.owl.carousel resized.owl.carousel', Core.helpers.sameheight);
		$carrusel.on('initialized.owl.carousel translated.owl.carousel', Core.helpers.owlGetVisibleElements);
				
		$carrusel.owlCarousel({
			responsive : {
				1 : {
					items : cols_xs,
					slideBy: cols_xs,
					autoplayTimeout: cols_xs * autoplay_speed,
					nav : false					
				},
				465 : {
					items : cols_sm,
					slideBy: cols_sm,
					autoplayTimeout: cols_sm * autoplay_speed,
					nav : false					
				},
				991 : {
					items : cols_lg,
					slideBy: cols_lg,
					nav : true,
					navText : [],
					autoplayTimeout: cols_lg * autoplay_speed,
					dots: (dots ? true : false)
				}
			},
			loop : (loop ? true : false),	
			autoplay: (autoplay_speed ? true : false),
			smartSpeed: 100,
			rtl: window.ISRTL ? true : false,
			onInitialized : function(){
				$carrusel.find('.owl_item').removeClass('oculto');
				var viewport = $(window).width();
				var itemCount = $carrusel.find('.owl_item').length;					
				if( 
					(viewport >= 991 && itemCount <= cols_lg) //desktop
					|| ((viewport >= 465 && viewport < 991) && itemCount <= cols_sm) //desktopsmall
					|| (viewport < 465 && itemCount <= cols_xs) //mobile
				)
				{
					 $carrusel.find('.owl-controls').hide();						
				} 	
				
				if (viewport >= 991 && itemCount >= cols_lg && cols_lg > 1) 
				{
					//$carrusel.find('.owl-stage-outer').addClass('borde');
				}
			}
		});
	}
}

function actualizaCarroDatos(subtotal, iva, total, unidades)
{
	$(".subtotal-carro").html(subtotal);
	$(".unidades-carro").html(unidades);
	$(".total-carro").html(total);
	$(".iva-carro").html(iva);
	$("#open_shopping_cart").attr('data-amount', unidades);
	
	if( unidades > 0 )	
		$("#open_shopping_cart, .mobile-menu-cart-open .unidades-carro").removeClass('cestavacia');
	else
		$("#open_shopping_cart, .mobile-menu-cart-open .unidades-carro").addClass('cestavacia');
		
	$("#cestaheader").load(BASE_URL+'__load_ajax.php?sec=_header.desktop.cesta');
}


$.fn.enviaForm = function( )
{	
	var $this = this;
	var formid = this.attr('id');
	
	var options = $.extend({		
		url : false,
		style: false,
		loading_id: false,
		onSuccess: false,
		onError: false,
		onValidateError: false
	}, arguments[0] || {} );	
	
	if( options.url === false ) return false;	

	$this.on('submit', function(e) {
		e.preventDefault();
		
    	$('#'+formid+' :input, .g-recaptcha').removeClass('error'); //return;
		$('div.errorform').remove();
		
		if( options.loading_id )
		{
			var html_ini_loading = $('#'+options.loading_id).html();
			$('#'+options.loading_id).html('<span style="color: #018BC8; font-size:50px" class="fa fa-spinner fa-pulse"></span>');
		}
		
		$.ajax({
			dataType: 'json',
			type: 'POST',
			url: options.url,
			data: $this.serialize()
		})
		.done(function(resp) {
			if( resp.success && typeof options.onSuccess == 'function' )
			{				
				options.onSuccess.call($this, resp);
			}
			else
			{
				if( resp.errors )
				{
					$.each(resp.errors, function(i, v) {
						console.log(i + " => " + v); // view in console for error messages
						var msg = '<div class="errorform" '+(options.style ? ' style="'+options.style+'" ' : '')+'>'+v+'</label>';
						$('#' + i).addClass('error');
						
						if( $("#select2-"+i+"-container").length )
							$("#select2-"+i+"-container").parent().parent().after(msg);
						else						
							$('#' + i).after(msg);
					});
					var keys = Object.keys(resp.errors);
					$('#'+keys[0]).focus();
					
					if( typeof options.onValidateError == 'function' )
					{
						options.onValidateError.call($this, resp);
					}
				}
								
				if( resp.error && typeof options.onError == 'function' )
				{
					options.onError.call($this, resp);
				}
			}
		})
		.fail(function( data, jqXHR, textStatus ) {				
			$.fancybox({
				type: 'inline',
				content: '<div class="alert alert-danger"><b>SYSTEM ERROR:</b>'+textStatus+'.</div><div class="text-center"><button type="button" class="btn btn-default btn-sm" onclick="$.fancybox.close()">Cerrar</button></div>',
				modal: true
			});		
		})
		.always(function(){
			if( options.loading_id )
			{
				$('#'+options.loading_id).html(html_ini_loading);
			}
		});
		
		return false;
  	});	
}


function exit( status ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // +      input by: Paul
    // +   bugfixed by: Hyam Singer (http://www.impact-computing.com/)
    // +   improved by: Philip Peterson
    // +   bugfixed by: Brett Zamir (http://brettz9.blogspot.com)
    // %        note 1: Should be considered expirimental. Please comment on this function.
    // *     example 1: exit();
    // *     returns 1: null

    var i;

    if (typeof status === 'string') {
        alert(status);
    }

    window.addEventListener('error', function (e) {e.preventDefault();e.stopPropagation();}, false);

    var handlers = [
        'copy', 'cut', 'paste',
        'beforeunload', 'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'keydown', 'keypress', 'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll',
        'DOMNodeInserted', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMNodeInsertedIntoDocument', 'DOMAttrModified', 'DOMCharacterDataModified', 'DOMElementNameChanged', 'DOMAttributeNameChanged', 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'online', 'offline', 'textInput',
        'abort', 'close', 'dragdrop', 'load', 'paint', 'reset', 'select', 'submit', 'unload'
    ];

    function stopPropagation (e) {
        e.stopPropagation();
        // e.preventDefault(); // Stop for the form controls, etc., too?
    }
    for (i=0; i < handlers.length; i++) {
        window.addEventListener(handlers[i], function (e) {stopPropagation(e);}, true);
    }

    if (window.stop) {
        window.stop();
    }

    throw '';
}

/*var canvascursor = document.createElement("canvas");
    canvascursor.width = 24;
    canvascursor.height = 24;    
    var ctx = canvascursor.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.font = "24px FontAwesome";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("\uf00e", 12, 12);
    var dataURL = canvascursor.toDataURL('image/png')
    $('.producto .image_preview_container a').css('cursor', 'url('+dataURL+'), auto');*/