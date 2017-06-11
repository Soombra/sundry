window.onload=function(){
	waterfall("main","box");
	var dataInt={"data":[{"src":"22.jpg"},{"src":"23.jpg"},{"src":"24.jpg"},{"src":"25.jpg"},{"src":"26.jpg"},{"src":"27.jpg"},{"src":"28.jpg"},{"src":"29.jpg"},{"src":"30.jpg"},{"src":"31.jpg"},{"src":"32.jpg"},{"src":"33.jpg"},{"src":"34.jpg"},{"src":"35.jpg"},]}
	window.onscroll=function(){
		if(checkScrollSlide){
			var oParent=document.getElementById("main");
			for(var i=0;i<dataInt.data.length;i++){
				var oBox=document.createElement("div");
				oBox.className="box";
				oParent.appendChild(oBox);

				// var oPic=document.createElement("div");
				// oPic.className="pic";
				// oBox.appendChild(oPic);

				// var oImg=document.createElement("img");
				// oImg.src="images/"+dataInt.data[i].src;
				// oPic.appendChild(oImg);
				oBox.innerHTML="<div class='pic'><img src='images/"+dataInt.data[i].src+"'/></div>";
			}
		}
		waterfall("main","box");
	}
}

function waterfall(parent,box){
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);

	var oBoxW=oBoxs[0].offsetWidth;
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
	
	oParent.style.cssText="width:"+oBoxW*cols+"px;margin:0 auto";
	var hArr=[];
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH=Math.min.apply(null,hArr);
			var index=getIndex(hArr,minH);
			oBoxs[i].style.position="absolute";
			oBoxs[i].style.top=minH+"px";
			// offsetTop只读，获取高度为数字；style.top可读写，为字符串，必须加“px”。
			//oBoxs[i].offsetTop=minH;
		  	oBoxs[i].style.left=oBoxW*index+"px";
		 	hArr[index]=minH+oBoxs[i].offsetHeight;
		  	//hArr[index]+=oBoxs[i].offsetHeight;
		  }
	}
}

function getByClass(parent,clsName){
	var elements=parent.getElementsByTagName("*");
	var result=[];
	for(var i=0;i<elements.length;i++){
		if(elements[i].className==clsName){
			result.push(elements[i]);
		}
	}
	return result;
}

function getIndex(array,x){
	for(var i in array){
		if(array[i]==x){
			return i;
		}
	}
}

function checkScrollSlide(){
	var oParent=document.getElementById("main");
	var oBoxs=getByClass(oParent,"box");
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var height=document.documentElement.clientHeight||document.body.clientHeight;
	return (lastBoxH<scrollTop+height)?true:false;
}