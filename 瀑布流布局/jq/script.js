$(window).on("load",function(){
	waterfall();
	var dataInt={"data":[{"src":"22.jpg"},{"src":"23.jpg"},{"src":"24.jpg"},{"src":"25.jpg"},{"src":"26.jpg"},{"src":"27.jpg"},{"src":"28.jpg"},{"src":"29.jpg"},{"src":"30.jpg"},{"src":"31.jpg"},{"src":"32.jpg"},{"src":"33.jpg"},{"src":"34.jpg"},{"src":"35.jpg"},]}
	$(window).on("scroll",function(){
		if(checkScrollSlide()){
			$.each(dataInt.data,function(index,value){
				var oBox=$("<div>").addClass("box").appendTo($("#main"));
				var oPic=$("<div>").addClass("pic").appendTo(oBox);
				$("<img>").attr("src","images/"+value.src).appendTo(oPic);
			})
			waterfall();
		}
	})
})

function waterfall(){
	var $boxs=$("#main>div");
	var w=$boxs.eq(0).outerWidth();
	var cols=Math.floor($(window).width()/w);
	$("#main").width(w*cols).css("margin","0 auto");

	var hArr=[];
	$boxs.each(function(index,value){
		var h=$(value).outerHeight();//用$boxs.eq(index)取出的是$对象，但是value是普通dom对象！
		if(index<cols){
			hArr.push(h);
			//hArr[index]=h;
		}else{
			var minH=Math.min.apply(null,hArr);
			var minHIndex=$.inArray(minH,hArr);
			$(value).css({
				"position":"absolute",
				"top":minH+"px",
				"left":minHIndex*w+"px"
			})
			hArr[minHIndex]+=$boxs.eq(index).outerHeight();
		}
	})
}

function checkScrollSlide(){
	var $lastBox=$("#main>div").last();
	var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
	var scrollTop=$(window).scrollTop();
	var documentH=$(window).height();
	return (lastBoxDis<scrollTop+documentH)?true:false;
}