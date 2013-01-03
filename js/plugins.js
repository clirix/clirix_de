var APP = {};

/*
---
description: mooClouds - A simple mootools class that injects dynamic elements on the page, like clouds

authors:
  - Ennio Pirolo (http://eqepa.com)

license: MIT-style

requires:
  - core/1.2.4.2: 'Fx.morph'

provides: [mooClouds]

...
*/

APP.mooClouds=new Class({
	
	Implements:Options,
	
	dynCloudsNum:0,
	statCloudsNum:0,
	options:{
		maxDynClouds:0,
		maxStatClouds:0,
		cloudsClassesNum:1,
		cloudsClasses:"clouds",
		containerID:null,
		contX:null,
		contY:null
	},
	cContSizeX:0,
	cContSizeY:0,
	cCont:null,
	
	initialize:function(options){
		this.setOptions(options)
		if(this.options.containerID!=null){
			this.cCont=$(this.options.containerID);
			if(this.cCont!=null){
				this.setContainer();
			}
			else alert("Oops! There was an error with the containers IDs!")
		}
		else alert("Oops! There was an error with the containers IDs!")
	},
	
	addDynamicCloud:function(){
		
		if(this.dynCloudsNum>=this.options.maxDynClouds){
			return false;	
		}
		else{
			var ran = $random(1, this.options.cloudsClassesNum);
			var c=this.getCloud(ran);
			
			var randomDur=$random(200,300);
			randomDur=randomDur*100;
			
			var x=this.cContSizeX;
			var y=this.cContSizeY;
			 move = new Fx.Morph(c, {
				duration:randomDur,
				onComplete:function(){
					var randomDur=$random(200,300);
					randomDur=randomDur*100;
					var randomX=$random(0,x);
					var randomY=$random(0,y);
					randomY=0;
					//alert(randomX+" "+randomY+" "+randomDur+" "+this.cContSizeX+" "+this.cContSizeY);
					this.start({'left': randomX, 'top': randomY});
// 					if($$('.stop_clouds')){
// 					    $$('.stop_clouds').setStyle('backround', '#000');
//                         $$('.stop_clouds').addEvent('click', function(e){
// 							new Event(e).stop();
//
// 							this.pause();
// 						});
// 					}
				}
			});
			
			this.cCont.adopt(c);
			
			var randomX=$random(0,this.cContSizeX);
			var randomY=$random(0,this.cContSizeY);
			 randomY= 0;
			move.start({'left': randomX, 'top': randomY});
			this.dynCloudsNum++;
			return true;
			
		}
	},
	
	addStaticCloud:function(){
		
		if(this.statCloudsNum>=this.options.maxStatClouds){
			return false;	
		}
		else{
			
			var ran = $random(1, this.options.cloudsClassesNum);
			var c=this.getCloud(ran);
			this.cCont.adopt(c);
			this.statCloudsNum++;
			return true;
			
		}
	},
	
	getCloud:function(ran){
		
		var c=new Element('div');
		c.addClass(this.options.cloudsClasses);
		c.addClass(this.options.cloudsClasses+""+ran);
		
		var randomX=$random(0,this.cContSizeX);
		var randomY=$random(100,this.cContSizeY);
		
		c.setStyle('left',randomX);
		c.setStyle('top',randomY);
		
		return c;
		
	},
	setContainer:function(){
		
		this.cCont.setStyle("position","absolute");
		this.cCont.setStyle("z-index",0);
		this.cCont.setStyle("overflow","hidden");
		
		var x=0;
		if(this.options.contX==null){ x=this.cCont.getParent().getSize().x;}
		else {x=this.options.contX;}
		
		this.cCont.setStyle("width",x);
		
		var y=0;
		if(this.options.contY==null){ y=this.cCont.getParent().getSize().y;}
		else {y=this.options.contY;}
		
		this.cCont.setStyle("height",y);
		
		this.cContSizeX=this.cCont.getSize().x;
		this.cContSizeY=this.cCont.getSize().y;
	},
	generateClouds:function(){
		
		while(this.addDynamicCloud()){
			this.addDynamicCloud();	
		}
		while(this.addStaticCloud()){
			this.addStaticCloud();	
		}
	},
	destroyClouds:function(){
	
		$$("."+this.options.cloudsClasses).destroy();
		this.dynCloudsNum=0;
		this.statCloudsNum=0;
	},
	pauseClouds:function(){
// 		this.pause();
// 		move.cancel();
		var tmp = $$("."+this.options.cloudsClasses);
// 		tmp = tmp.map(function(item, index){
//
// 		});
		tmp = tmp;

	}
							
});
/*
---
description: PillMenu
 
authors:
- Luca Scarpa aka luscarpa (http://www.luscarpa.com)
 
license:
- MIT-style license
 
requires:
core/1.2.4: '*'
 
provides:
- PillMenu
...
*/
APP.PillMenu = new Class({

	//implements
	Implements: [Options,Events],

	//options
	options: {
		vertical: 0,
		pillClass: 'pill',
		selectedClass: 'selected',
		duration: 'short',
		transition: Fx.Transitions.Linear
	},
	
	//initialization
	initialize: function(element,options) {
		//set options
		this.setOptions(options);
		//set element
		this.element = document.id(element);
		//set pill element
		this.pill = this.element.getElement('.pill');
		
		if(!this.pill){
		    //build pill element
		    this.pill = new Element('div',{
		    	'class': this.options.pillClass,
		    	'style': 'position:absolute; z-index:1;'
		    });
		    //inject pill into element
		    this.pill.inject(this.element,'top');
		}
		//make effect
		this.pillFx = new Fx.Morph(this.pill, {'duration': this.options.duration, 'link': 'cancel', 'transition': this.options.transition});
		
		this.start();
	},

	start: function() {
		//fire event start
		this.fireEvent('start');
		
        this.element.getElements('li').each(function(el,i){
			//detect selected menu
			if(el.hasClass(this.options.selectedClass)){
				//save selected menu
				this.selected = el;
				//set pill dimensions 

				this.pill.setStyles({
            		'opacity': 0,
				    width: el.getStyle('width') ,
				    height: el.getStyle('height'),
				    left: el.getPosition().x - this.element.getPosition().x,
				    top: el.getPosition().y - this.element.getPosition().y
				});
				
			}						
			
			//add event to element
			el.addEvent('mouseenter', function(){
				//fire event start
				this.fireEvent('change');
				//set effect for horizontal and vertical style
				if(!this.options.vertical){
					this.pillFx.start({
					    'opacity': 1,
					    'left': [this.pill.getStyle('left'), el.getPosition().x - this.element.getPosition().x],
					    'width': [this.pill.getStyle('width'), el.getStyle('width')] 
					});
				} else {
					this.pillFx.start({
					 	'opacity': 1,
					    'top': [this.pill.getStyle('top'), el.getPosition().y - this.element.getPosition().y],
					    'height': [this.pill.getStyle('height'), el.getStyle('height')]
					});
				}
			
			}.bind(this));
			
		}.bind(this));
        
        //add event to reset all
        this.element.addEvent('mouseleave', function(){
        	//set effect for horizontal and vertical style
        	if(!this.options.vertical){
        		this.pillFx.start({
     				'opacity': 0,
				    'left': [this.pill.getStyle('left'), this.selected.getPosition().x - this.element.getPosition().x],
				    'width': [this.pill.getStyle('width'), this.selected.getStyle('width')]
				});	
			} else {
				this.pillFx.start({
     				'opacity': 0,
				    'top': [this.pill.getStyle('top'), this.selected.getPosition().y - this.element.getPosition().y],
				    'height': [this.pill.getStyle('height'), this.selected.getStyle('height')]
				});	
			}			
			
		}.bind(this));

	}

});