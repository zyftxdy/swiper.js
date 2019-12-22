(function(){
	
	var _global;
	
	//默认参数
	var defaults = {
		width:800,
		height:350,
		time:1000
	}
	
	function Swiper(opations){
		//参数
		this.objs = extend(defaults,opations);
		//swiper容器
		this.swiper = document.getElementById('swiper');
		//ul外层div
		this.swiperList = document.getElementsByClassName('swiper_list')[0];
		//ul
		this.dom = document.getElementsByClassName('swiper_list')[0].children[0];
		//li
		this.list = this.dom.querySelectorAll('li');
		//下一个
		this.nextBtn = document.getElementsByClassName('swiper_next')[0];
		//上一个
		this.prevBtn = document.getElementsByClassName('swiper_pre')[0];
		//span
		this.swiperSpan = document.getElementsByClassName('swiper_indicators')[0].children;
		//当前是第几个轮播图
		this.i = 0;
		//控制一次动画是否完成，flag给当前动画'上锁',动画完成才'解锁'
		this.flag = true;
		
		this.timer = null;
	}

	Swiper.prototype = {
		constructor:Swiper,
		//执行初始化函数
		init:function(){
			//设置轮播框
			this.setSwiper();
			//自动轮播
			this.automatic();
			//下一张
			this.nextBtnClick();
			//上一张
			this.prevBtnClick();
			//鼠标上移
			this.coverage();
			//底部swiper_indicators的点击事件
			this.SpanClick();
		},
		
		//设置轮播框
		setSwiper:function(){
			var _this = this;
			//设置swiper宽高
			_this.swiper.style.width = _this.objs.width+'px';
			_this.swiper.style.height = _this.objs.height +'px';
			//设置ul外层div宽高
			_this.swiperList.style.width = _this.objs.width+'px';
			_this.swiperList.style.height = _this.objs.height +'px';
			//设置ul宽高
			_this.dom.style.width = _this.objs.width*5+'px';
			_this.dom.style.height = _this.objs.height +'px';
			//设置li宽高
			for(var i=0;i<_this.list.length;i++){
				//不这么设置i始终是5
				(function(i){
					_this.list[i].style.width = _this.objs.width+'px';
					_this.list[i].style.height = _this.objs.height+'px';
				})(i)
			}
			//设置span的宽高
			/*for(var i=0;i<_this.swiperSpan.length;i++){
				(function(i){
					_this.swiperSpan[i].style.width = Math.floor(_this.objs.width/80)+'px';
					_this.swiperSpan[i].style.height = Math.floor(_this.objs.height/35)+'px';
				})(i)
			}*/
		},
		
		//自动轮播
		automatic:function(){
			var _this = this;
			if(_this.timer){
				clearInterval(_this.timer);
				_this.timer = null;
			}
			_this.timer=setInterval(function(){
				if(_this.flag){
					_this.flag = false;
					_this.i++;
						if(_this.i>_this.list.length-1){
							_this.i = 0;
					}
					//控制底部swiper_indicators的循环变动
					_this.swiperSpan[_this.i].parentNode.getElementsByClassName('active')[0].classList.remove('active');
					_this.swiperSpan[_this.i].classList.add('active');
					//控制轮播图的循环变化
					_this.animate(_this.dom,{'left':_this.i*-_this.objs.width},_this.objs.time,function(){
							_this.flag = true;
					});
				}
			},3000);
		},
		
		//下一张
		nextBtnClick:function(){
			var _this = this;
			this.nextBtn.addEventListener('click',function(){
				if(_this.flag){
					_this.flag = false;
					_this.i++;
					if(_this.i>_this.list.length-1){
						_this.i = 0;
					}
					//控制底部swiper_indicators的循环变动
					_this.swiperSpan[_this.i].parentNode.getElementsByClassName('active')[0].classList.remove('active');
					_this.swiperSpan[_this.i].classList.add('active');
					//控制轮播图的循环变化
					_this.animate(_this.dom,{'left':_this.i*-_this.objs.width},_this.objs.time,function(){
						_this.flag = true;
					});
				}	
			})
		},
		
		//上一张
		prevBtnClick:function(){
			var _this = this;
			this.prevBtn.addEventListener('click',function(){
				if(_this.flag){
					_this.flag = false;
					_this.i--;
					if(_this.i<0){
						_this.i = 4;
					}
					//控制底部swiper_indicators的循环变动
					_this.swiperSpan[_this.i].parentNode.getElementsByClassName('active')[0].classList.remove('active');
					_this.swiperSpan[_this.i].classList.add('active');
					//控制轮播图的循环变化
					_this.animate(_this.dom,{'left':_this.i*-_this.objs.width},_this.objs.time,function(){
						_this.flag = true;
					});
				}	
			})
		},
		
		//鼠标事件
		coverage:function(){
			var _this = this;
			//覆盖
			_this.swiperList.addEventListener('mouseover',function(){
				clearInterval(_this.timer);
				_this.timer = null;
			})
			//离开
			_this.swiperList.addEventListener('mouseout',function(){
				_this.automatic();
			})
		},
		
		//底部swiper_indicators的点击事件
		SpanClick:function(){
			var _this = this;
			for(var i = 0;i<_this.swiperSpan.length;i++){
				//不这么设置i始终是5
				(function(i){
					_this.swiperSpan[i].addEventListener('click',function(){
						this.parentNode.getElementsByClassName('active')[0].classList.remove('active');
						this.classList.add('active');
						if(_this.flag){
							_this.flag= false;
							_this.i = i;
							_this.animate(_this.dom,{'left':i*-_this.objs.width},_this.objs.time,function(){
							   _this.flag = true;
						    });
						}
					})	
				})(i)
			}
		},
		
		//封装动画函数
		animate:function(obj,opations,speed,fn){
			var timer = null;
			if(timer){
				clearInterval(timer);
				timer = null;
			}
			if( typeof opations == 'object'){
				timer = setInterval(function(){
					var flag = true;
					for(var attr in opations){
						var current = parseFloat(getStyle(obj,attr))?parseFloat(getStyle(obj,attr)):0;
						var step;									
						step = (opations[attr] - current)/(speed/10);	
						if(attr == "opacity"){
					        obj.style.opacity= Math.floor((current+step)*100)/100;
					    }else{
					        step = step > 0 ? Math.ceil(step):Math.floor(step);
					        obj.style[attr]=current+step+'px';
					    }
					    if(parseInt(obj.style[attr])!= opations[attr]){
					        flag=false;
					    }
					}
					if(flag){
					    clearInterval(timer);
					    if(fn){
			                fn();
			            }
					}		
				},1)
			}else{
				console.log("opactions应为对象{}");
			}
		}
	}
	
	//判断是否采用默认值
	function extend(defaults,opations){
		var target = {};
		if (opations instanceof Object){
			for(var k in defaults){
				target[k] = opations.hasOwnProperty(k)?opations[k]:defaults[k];
			}
			return target;	
		}else{
			return defaults;
		}	
	}
	
	//判断style样式
	function getStyle(Ele,attr){  
		if (Ele.currentStyle) {
		    return Ele.currentStyle[attr];
		}else{
			return window.getComputedStyle(Ele,null)[attr];  
		}    
	}
	
	_global = (function(){ return this || (0, eval)('this'); }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Swiper;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return Swiper;});
    } else {
        !('Swiper' in _global) && (_global.Swiper = Swiper);
    }
})()
