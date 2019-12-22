# -js-
一个基于js的简易轮播图插件
# 使用方法
1.引入normalize.css重置样式;iconfont.css使用到的字体图标;swiper.css为页面结构所用样式<br>
2.页面结构如下:
```html
<div id="swiper">
      <div class="swiper_control swiper_pre">
	 <i class="iconfont icon-left_x"></i>
      </div>
      <div class="swiper_list">
	 <ul>
	    <li>
		<a href="#"><img src="img/01.jpg"/></a>
	    </li>
	    <li>
		<a href="#"><img src="img/02.jpg"/></a>
	    </li>
	    <li>
		<a href="#"><img src="img/03.jpg"/></a>
	    </li>
	    <li>
		<a href="#"><img src="img/04.jpg"/></a>
	    </li>
	    <li>
		<a href="#"><img src="img/05.jpg"/></a>
	    </li>
	 </ul>
     </div>
     <div class="swiper_indicators">
         <span class="active"></span>
	 <span></span>
	 <span></span>
	 <span></span>
	 <span></span>
     </div>
     <div class="swiper_control swiper_next">
	 <i class="iconfont icon-right_x"></i>
     </div>
</div>
```
3.引入swperDemo.js:<br>
  * 传入的参数应为object对象(也可不传参数，容器默认宽为800px，高为350px，动画时间为1000ms)
  * width 为swiper容器的宽度
  * height 为swiper容器的高度
  * time  为每一个轮播图动画完成所需的时间
  * 调用方法:
  ```javascript
  <script src="js/SwiperDemo.js" type="text/javascript"></script>
  <script type="text/javascript">
    window.onload = function(){
	var swiperDemo = new Swiper();
	swiperDemo.init();		
    }
  </script>
  ```
 # 
 后续不断优化
