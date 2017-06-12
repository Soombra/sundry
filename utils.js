// 1.将一个字符串重复n次拼接
function repeatString(str,n){
	return new Array(n+1).join(str);
}

//2.array中sort方法的使用
array.sort(function(a,b){
	return a-b;
})

//3.可以获取任何css属性的getstyle方法，兼容ie
function getStyle(element,attr){
	if(element.currentStyle){
		return element.currentStyle[attr];
	}else{
		return getComputedStyle(element,false)[attr];
	}
	// 或者如下
	// if("getComputedStyle" in window){
	// }else{}
}

//去单位并兼容透明度属性的完善版本
function getCss(element,attr){
	var val=null, reg=null;
	if(window.getComputedStyle){
		val=window.getComputedStyle(element,null)[attr];
	}else{
		if(attr==="opacity"){
			val=element.currentStyle["filter"];
			reg=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
			val=reg.test(val)?reg.exrc(val)[1]/100:1;
		}else{
			val=element.currentStyle[attr];
		}
	}
	reg=/^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i;
	return reg.test(val)? parseFloat(val):val;
}

//4.将一组字符串中的数字各自加1
function strAdd(str){
	var newStr=""
	for(var i=0;i<str.length;i++){
		if(str[i].search(/\d/)!=-1){
			newStr+=+str[i]+1;
		}else{
			newStr+=str[i];
		}
	}
	return newStr;
}

//5.数组求和最高效方法，利用reduce()
function arraySum(array){
	return array.reduce(function(preValue ,currentValue){
		return preValue+currentValue;
	})
}

//6.将url问号后面的参数解析为json对象
function urlParse(){
	var str=window.location.search;
	var json={};
	var array1=str.split("&");
	for(var i=0;i<str.length;i++){
		var array2=array1[i].split("=");
		json[array2[0]]=array2[1];
	}
	return json;
}

//7.REM响应式布局
~function(){
	var desW=640,//设计稿尺寸
		winW=document.documentElement.clientWidth,
		ratio=winW/desW,
		oMain=document.querySelectory(".mian");//最外层div
	if(winW>desW){
		oMin.style.margin="0 auto";
		oMain.style.width=desW+"px";
		return;
	}
	document.documentElement.style.fontSize=ratio*100+"px";
}();

//8.跨浏览器添加事件方法
function addEvent(element,event,fn){
	var ele=element||document;
	if(ele.addEventListener){
		ele.addEventListener(event,fn,false);
	}else if(ele.attachEvent){
		ele.attachEvent("on"+event,fn);
	}else{
		ele["on"+event]=fn;
	}
}

//9.REM响应式布局中计算fontsize
~function(){
	var desW=640,
		winW=document.documentElement.clientWidth,
		ratio=winW/desW;
	var oMain=document.getElementById("main");
	if(winW>desW){
		oMain.style.width=desW+"px";
		oMain.style.margin="0 auto";
		return;
	}
	document.documentElement.style.fontSize=ratio*100+"px";
}();

//10.清除浮动通用方法
.clearfix{
	*zoom:1;
}
.clearfix:after{
	content:"";
	display:table;
	clear:both;
}