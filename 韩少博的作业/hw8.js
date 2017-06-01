var token = "";
$.ajax({
	"url":"http://ruanwenwu.cn/index.php/Demo/Little/getToken",
	type: "post", 
	cache:false, 
	async:false, 
	dataType: "text", 
	success: function(data){ 
		token = data;
	} 
});

function getListData(){
	this.access_token = token;//"EAACEdEose0cBABNWZCWgU75jt8eGjeos6QljQD7wSl6bCF4EdkWaP2wzMZBG4bbqTsWgsXtQyaFaXWBXRyBknhh4tkJDZBaRUWu200JBemgacxZBnw54UpyophrlXOAWo1ZAIAHW9CRsDRGjAyyj2j0ktkYLacMQVGh9pYyOOIPA4aoPLCh7cZCFjXqZB9hoQMZD";
	this.config = {
		"Users":{
			"type":"user",
			"fields":"id,name,picture.width(50).height(50)",
			"next":"",
			"previous":"",
		},
		"Pages":{
			"type":"page",
			"fields":"id,name,picture.width(50).height(50)",
			"next":"",
			"previous":"",
		},
		"Events":{
			"type":"event",
			"fields":"id,name,picture.width(50).height(50)",
			"next":"",
			"previous":"",
		},
		"Places":{
			"type":"place",
			"fields":"id,name,picture.width(50).height(50)",
			"next":"",
			"previous":"",
		},
		"Groups":{
			"type":"group",
			"fields":"id,name,picture.width(50).height(50)",
			"next":"",
			"previous":"",
		},
		"Favorites":{
			"type":"favorite",
			"fields":"id,name,picture.width(50).height(50)",
			"next":"",
			"previous":"",
		}
	},
	this.timeObj;
	this.currentTab = "Users",
	this.apiaddr = "https://graph.facebook.com/v2.8/search";
	this.requestUrl = "";
	this.q = "USC";
	this.localphp = "getData.php";
}

getListData.prototype = {
	init:function(){
		this.showTransit();
		this.getRequestUrl();
		this.requestData();
		//绑定事件
		this.bindSearch();	//绑定搜索
		this.bindNav();
		this.bindClear();
	},
	getRequestUrl:function(){
		var currentConfig = this.config[this.currentTab];
		this.requestUrl = this.apiaddr+"?type="+currentConfig.type+"&fields="+currentConfig.fields+"&q="+this.q+"&access_token="+this.access_token;
		console.log(this.requestUrl);
	},
	bindSearch:function(){
		var self = this;
		$("#searchbtn").click(function(){
			self.q = $("#searcharea").val();
			if (self.q == ""){
				$("#searchtip").slideDown();
				return false;
				//$("#searcharea").attr("data-toggle","tooltip");
				//$("#searcharea").attr("data-placement","bottom");
				//$("#searcharea").attr("title","a keyword is required");
				//$('[data-toggle="tooltip"]').tooltip('show')						
			}else{
				//$("#searcharea").removeAttr("data-toggle");
				//$("#searcharea").removeAttr("data-placement");
				//$("#searcharea").removeAttr("title");
				//$('[data-toggle="tooltip"]').tooltip('hide');		
				//$("#searcharea").tooltip("destory");
				self.showTransit();
			}
			
			self.getRequestUrl();
			self.requestData();
		});
	},
	bindClear:function(){
		var self = this;
		$("#clearbtn").click(function(){
			$("#searcharea").val("");
			self.q = "";
			$(".content > div").html("");
		});
	},
	bindNav:function(){
	
		var self = this;
		$(".renav1 > li").click(function(){
			self.showTransit();
			$(".renav1 > li").removeClass("active");
			$(".renav2 > li").removeClass("active");
			var index = $(this).index();
			$(".renav1 > li:eq("+index+")").addClass("active");
			$(".renav2 > li:eq("+index+")").addClass("active");
			
			//改变当前标签
			self.currentTab = $(this).find("a").html();
			self.q = $("#searcharea").val();
			self.getRequestUrl();
			self.requestData();
		});
		$(".renav2 > li").click(function(){
			self.showTransit();
			$(".renav1 > li").removeClass("active");
			$(".renav2 > li").removeClass("active");
			var index = $(this).index();
			$(".renav1 > li:eq("+index+")").addClass("active");
			$(".renav2 > li:eq("+index+")").addClass("active");
			
			//改变当前标签
			self.currentTab = $(this).find("a").html();
			self.q = $("#searcharea").val();
			self.getRequestUrl();
			self.requestData();
		});
	},
	showTransit:function(){
		var self = this;
		clearInterval(this.timeObj);
		$(".progress-bar").get(0).style.width = "30%"; 
		$(".progress-bar").html("30%");
		$(".progress").show();
		$(".content > div").hide();
		var num = 30;
		this.timeObj = setInterval(function(){
			num+=2;
			$(".progress-bar").get(0).style.width = num+"%"; 
			$(".progress-bar").html(num+"%");
			if (num == 100){
				clearInterval(self.timeObj);
			}
		},100);
	},
	requestData:function(){ 
		var self = this;
		if (self.currentTab == "Favorites"){
		$(".progress").hide();
			var data = JSON.parse(localStorage.favorite);
			var ht = '<table class="table">\
					  <tr>\
						<th>#</th>\
						<th>Profile photo</th>\
						<th>Name</th>\
						<th>Type</th>\
						<th>Favorites</th>\
						<th>Details</th>\
					  </tr>';
			var count = 0;
			for(var x in data){
				if(data[x] != null){
					count++;
					var favData = JSON.parse(localStorage.favorite);
					ht += '<tr>\
						<td>'+count+'</td>\
						<td><img class="img-circle" src="'+data[x]['photo']+'"/></td>\
						<td>'+data[x]['name']+'</td>\
						<td>'+data[x]['type']+'</td>\
						<td><a href="javascript:;" onclick="delFavorite(this,\''+self.currentTab+'\',\''+data[x]['name']+'\',\''+data[x]['photo']+'\',\''+data[x]['id']+'\')" class="glyphicon glyphicon glyphicon-trash btn btn-default"></a></td>\
						<td><a href=""><b>></b></a></td>\
					</tr>';
				}
				
			}
			ht += '</table>';
			$("#"+self.currentTab+"_container").html(ht);
			$(".content>div").hide();
			$("#"+self.currentTab+"_container").show();
			return;
		}
		
		$.post(this.localphp,{url:this.requestUrl},function(response){
		//$.get(this.requestUrl,function(response){
			$(".progress").hide();
			if (!response.data){
				alert("没有数据");
				return;
			}
			
			var ht;
			//if (self.currentTab == "Users" || self.currentTab == "Pages"){
				ht = '<table class="table">\
					  <tr>\
						<th>#</th>\
						<th>Profile photo</th>\
						<th>Name</th>\
						<th>Favorites</th>\
						<th>Details</th>\
					  </tr>';
				var count = 0;
				var favClass;
				for(var x in response.data){
					count++;
					var favData = JSON.parse(localStorage.favorite);
					if(favData[response.data[x]['id']]){
						favClass = "glyphicon-star";
					}else{
						favClass = "glyphicon-star-empty";
					}
					ht += '<tr>\
						<td>'+count+'</td>\
						<td><img class="img-circle" src="'+response.data[x]['picture']['data']['url']+'"/></td>\
						<td>'+response.data[x]['name']+'</td>\
						<td><a href="javascript:;" onclick="markFavorite(this,\''+self.currentTab+'\',\''+response.data[x]['name']+'\',\''+response.data[x]['picture']['data']['url']+'\',\''+response.data[x]['id']+'\')" class="glyphicon '+favClass+' btn btn-default"></a></td>\
						<td><a onclick="getDetail('+response.data[x]['id']+')" href="javascript:;"><b>></b></a></td>\
					</tr>';
					
				}
				ht += '</table>';
				ht += '<nav aria-label="..."><ul class="pager">';
				if (response.paging.previous){
					self.config[self.currentTab]['previous'] = response.paging['previous'];
					ht += "<li><a href='javascript:;' onclick='pageData(this)'>previous</a></li>";
				}
				if (response.paging.next){
					self.config[self.currentTab]['next'] = response.paging['next'];
					ht += "<li><a href='javascript:;' onclick='pageData(this)'>next</a></li>";
				}

				ht += '</ul></nav>';
				$("#"+self.currentTab+"_container").html(ht);
				$(".content>div").hide();
				$("#"+self.currentTab+"_container").show();
			//}
			
		},"json");
	}
	
}

var qlInstance = new getListData();
if (!localStorage.favorite){
	localStorage.favorite = JSON.stringify({});
	console.log(typeof localStorage.favorite);
} else{
	console.log(localStorage.favorite);
}
qlInstance.init();
function pageData(obj){
	qlInstance.requestUrl = qlInstance.config[qlInstance.currentTab][obj.innerHTML];
	qlInstance.requestData();
}
function markFavorite(obj,type,name,url,id){
	$(obj).attr("class","glyphicon glyphicon-star btn btn-default");
	var data={"type":type,name:name,photo:url,id:id};
	var oriData = JSON.parse(localStorage.favorite);
	if(oriData[id]){
		console.log(oriData[id]);
		return;
	}
	oriData[id] = data;
	var nowData = JSON.stringify(oriData);
	localStorage.favorite = nowData;
	console.log(localStorage.favorite);
}

function delFavorite(obj,type,name,photo,id){
	$(obj).parent().parent().remove();
	var favData = JSON.parse(localStorage.favorite);
	if (favData[id] && favData[id] != null){
		favData[id] = null;
	}
	localStorage.favorite = JSON.stringify(favData);
}

function getDetail(id){
	var currentTab = qlInstance.currentTab;
	$("#"+currentTab+"_container").hide();
	$(".detail").show();
	//var access_token = "https://graph.facebook.com/v2.8/id? fields= albums.limit(5){name,photos.limit(2){name,picture}},posts.limit(5){created_time}&access_token=Your_Access_Token";
}

function goback(){
	var currentTab = qlInstance.currentTab;
	$("#"+currentTab+"_container").show();
	$(".detail").hide();
}