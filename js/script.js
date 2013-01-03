APP.init_events = function(){
	if($$('#nav.pillMenu ul li.selected')){
		var ep = false;
	    $$('#nav.pillMenu ul li').addEvent('click', function(e){
			new Event(e).stop();
			var i = this.get('class');
			if(i != 'selected'){
				$('main_content').empty();
				var selected_nav = $$('#nav.pillMenu ul li.selected').getLast();
				selected_nav.removeProperty('class');
				this.set('class', 'selected');
				if(this.get('text').trim() === 'Contact' && ep === false){
					APP.init_e_post();
					ep = true;
				}
				var bg_left = this.get('text').trim();
				var left_image = $$('#left_place img').getLast();
	            $('left_place').fade('out');
	            $('main_content').fade('out');
	            var new_src = left_image.get('src').replace(selected_nav.get('text').trim(),bg_left);
	            (function(){
	            	if(bg_left === "Reference"){
	            		$('main_content').set('load', {onSuccess: function(){
	            			APP.init_wall();
	            		}});	            		
	            		$('main_content').load('reference.html');

	            	}else{
	            		$('main_content').set('html', $(bg_left).get('html'));
	            	}

	            	var new_img = Asset.image(new_src,{
	            		onLoad: function(){
	            			$('left_place').fade('in');
	            			$('main_content').fade('in');
	            		}
	            	})
	            	new_img.replaces(left_image);
	            	
				}).delay(500);
	        }
		});
		  
	}
	
}
APP.init_e_post = function(){
	var prefix = 'm&#97;&#105;lt&#111;:';
    var suffix = '';
    var attribs = '';
    var path = 'hr' + 'ef' + '=';
    var ad1 = '&#115;n&#101j' + '&#64;';
    ad1 = ad1 + 'g&#109;x' + '&#46;' + 'd&#101;';
    var p =  ('<a ' + path + '\'' + prefix + ad1 + suffix + '\'' + attribs + '>' );
    p = p + ad1 +'<\/a>'; 
    var sp = $$('span#e_post');
    sp.set('html',p);
    sp.setStyle('display','inline');
    
}
APP.init_html5_header = function(){
	// Find the appropriate prefix icon
	var cssPrefix = false;
	switch(Browser.name) {
	  case "safari":
	    cssPrefix = "webkit";
	    break;
	  case "chrome":
	    cssPrefix = "webkit";
	    break;
	  case "firefox":
	    cssPrefix = "moz";
	    break;
	  case "opera":
	    cssPrefix = "o";
	    break;
	  case "ie":
	    cssPrefix = "ms";
	    break;
	}
	$('headline').setStyle('background-image','url("img/trans.gif")');
	var header1 = new Element('div#header1.header5');

	header1.inject($('headline'));
	var header2 = new Element('div#header2.header5');

	header2.inject($('headline'));
	var header3 = new Element('div#header3.header5');

	header3.inject($('headline'));

	$('headline').addEvents({
		'mouseenter':function(e){
        	header1.fade(1).setStyle("-" + cssPrefix + "-transform","rotate(360deg)");;
       		(function(){header2.fade(1).setStyle("-" + cssPrefix + "-transform","rotate(360deg)"); }).delay('300');
        	(function(){header3.fade(1).setStyle("-" + cssPrefix + "-transform","rotate(360deg)");}).delay('600');
    		
  		},
  		'mouseleave': function(e){
  		    header1.fade(1).setStyle("-" + cssPrefix + "-transform","rotate(350deg)");;
       		(function(){header2.fade(1).setStyle("-" + cssPrefix + "-transform","rotate(350deg)"); }).delay('500');
        	(function(){header3.fade(1).setStyle("-" + cssPrefix + "-transform","rotate(350deg)");}).delay('1000');
  		}
	})	
	
}

APP.initialize_page = function(){
    
    // 	Divs unsichtbar machen
	
	$('container').fade('hide');
	var centerPlace = new Element('div#center_place.grid_9.grey_80_50.h_400',{
		html:'<div id="main_content"> &nbsp; </div>'
	}).inject($('hidden_content'),'before');
	            

	$('main_content').set('html', $('Home').get('html'))
	$$('div#hidden_content').setStyle('display','none');

//  Backround Höhe setzen
	var tmp = document.getCoordinates().height;
	$$('.stripes').map(function(){
		this.setStyle('height',tmp);
	});
	var myClouds = new APP.mooClouds({
			maxDynClouds:4,
			maxStatClouds:6,
			cloudsClassesNum:4,
			cloudsClasses:"stripes",
			containerID:"container",
			contX:null,
			contY:null
        });

    myClouds.generateClouds() ;	
    
window.addEvent('resize', function(e) {
	$('container').fade('out');
	myClouds.destroyClouds();
	var size = document.getSize();
	$('container').setStyles({
		'height' 	: size.y,
		'width'		: size.x
	});
	$$('.stripes').map(function(){
		this.setStyle('height',size.y);
	});
	 myClouds.generateClouds() ;	
	 $('container').fade('in');
});
    
     if (Browser.name == 'ie' && Browser.version.toInt() < 8) {
// grrr
	}else{
		var myMenu1 = new APP.PillMenu('nav',{
			vertical:   0,
			duration: 500,
			transition: Fx.Transitions.Back.easeOut
		});
	}
	$('wrapper').setStyle('visibility', 'visible');
// 	Backround nach 1 sec einfaden
	(function() {			
			$('container').fade('in');
	}).delay(1000);
}

APP.init_wall = function(){
	var t = $$('#coda-list a.wall-item-coda')
        // List
    if(t.length === 0){
	    var wall = new Wall("wall", 
	                        {
	                            "draggable":true,
	                            "autoposition":true,
	                            "slideshow":true,
	                            "speed":1600,
	                            "showDuration":5600,
	                            "inertia":true,
	                            "preload":true,
	                            //"transition":Fx.Transitions.Expo.easeInOut,
	                            "width":540,
	                            "height":350,
	                            "rangex":[0,1],
	                            "rangey":[0,5]
	                        });
	
	                        // CallBack
	        callBack = function(items){
	            items.each(function(e, i){
	            	e.node.set('html', $('ref_'+((e.x)+1)).get('html'));
	            })
	        }
	
	        // Definisce CallBack
	        wall.setCallOnUpdate(callBack)
	
	        // Inizializza il Wall
	        wall.initWall();
	
	        wall.getListLinksPoints("coda-list");	
	        
	        	        	$('wall').addEvents({
		'mousedown' : function(e) {
			this.setStyle("cursor", " url(img/closed_grab.png), move");
		},
		'mouseup' : function(e) {
			this.setStyle("cursor", " url(img/open_grab.png), move");
		}})
        }
        
}

/**************************** DOM Ready ******************************************/
window.addEvent('domready', function() {
	$('wrapper').setStyle('visibility', 'hidden');
/*	if (Browser.name == 'ie' && Browser.version.toInt() < 8) {
		Asset.javascript('http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js', {
		    onLoad: function(){
		        APP.initialize_page();
				APP.init_events();
			}
		});
	}else{ */
		APP.initialize_page();
		APP.init_events();
		APP.init_html5_header();
	/*	if (Browser.name != 'ie'){
			APP.init_html5_header();
		}
	}*/
	
});