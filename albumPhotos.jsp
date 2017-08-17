<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page language="java" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta name="format detection" content="telephone=no,email=no"/>
	<meta name="keywords" content="生命佛缘,线上纪念馆,祭祀，福位">
	<meta name="renderer" content="webkit">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
	<meta http-equiv="Cache-Control" content="no-siteapp" />
	<meta name="HandheldFriendly" content="true">
	<meta name="screen-orientation" content="portrait">
	<meta name="x5-orientation" content="portrait">
	<link rel="stylesheet" href="../wapcss/reset.css">
	<link rel="stylesheet" href="../wapcss/album.css">
	<script src="../js/jquery.js"></script>
	<title>生命佛缘</title>
	<style>
		
	</style>
</head>
<body>
	<!-- 最外层父容器 -->
	<div class="main">
		<!-- 没有照片时 -->
		<div class="no_photos" style="display: none;">
			<!-- 顶部导航 -->
			<div class="fixed_top">
				<div class="go_back"><a href="/mfs-tp/index/photoVideo.action"><img src="../wapimg/back.png" alt=""></a></div>
				<div class="title">哈哈的相册</div>
				<div class="menu">上传照片/视频</div>
			</div>
			 <!-- 中间内容 -->
			 <div class="no_record">
			 	<img src="../wapimg/no_photo.png" alt="">
			 	<p>暂无照片视频</p>
			 </div>
		</div>

		<!--相册主页，有相片时 -->
		<div class="album_main">
			<!-- 顶部导航 -->
			<div class="fixed_top">
				<div class="go_back"><a href="/mfs-tp/index/photoVideo.action"><img src="../wapimg/back.png" alt=""></a></div>
				<div class="title">哈哈的相册</div>
				<div class="menu"><span></span><span></span><span></span></div>
			</div>
			<!-- 主体内容 -->
			<div class="album_content">
				<!-- 相册描述 -->
				<div id="describe">
					<div class="des_left"><img src="../wapimg/test_11.png" alt=""></div>
					<div class="des_right">
						<p>相册的描述</p>
						<p>2016-09-16</p>
						<p>仅自己可见</p>
					</div>
				</div>
				
				<div id="photos">
					<!-- 每一天的照片 -->
					<div class="photo_group">
						<span class="circle"></span>
						<div class="time">08-16	</div>
						<div class="photo_wrapper">
							<!-- 单张照片循环在这里 -->
							<div class="photo"><img src="../wapimg/test_12.png" alt=""></div>
							<div class="photo"><img src="../wapimg/test_12.png" alt=""></div>
							<div class="photo"><img src="../wapimg/test_12.png" alt=""></div>
							<div class="photo"><img src="../wapimg/test_12.png" alt=""></div>
						</div>
					</div>
					<div class="photo_group">
						<span class="circle"></span>
						<div class="time">08-16	</div>
						<div class="photo_wrapper">
							<!-- 单张照片循环在这里 -->
							<div class="photo"><img src="../wapimg/test_12.png" alt=""></div>
							<div class="photo"><img src="../wapimg/test_12.png" alt=""></div>
							<div class="photo"><img src="../wapimg/test_12.png" alt=""></div>
							<div class="photo"><img src="../wapimg/test_12.png" alt=""></div>
						</div>
					</div>
					<div class="photo_group">
						<span class="circle"></span>
						<div class="time">08-16	</div>
						<div class="photo_wrapper">
							<!-- 单张照片循环在这里 -->
							<div class="photo"><img src="../wapimg/test_12.png" alt=""></div>
							<div class="photo"><img src="../wapimg/test_12.png" alt=""></div>
							<div class="photo"><img src="../wapimg/test_12.png" alt=""></div>
							<div class="photo"><img src="../wapimg/test_12.png" alt=""></div>
						</div>
					</div>
				</div>
			</div>
			<div class="to_upload">上传照片/视频</div>
		</div>
		
		<!-- 图片选择处理页面 -->
		<div class="select_photos">
			<!-- 顶部导航 -->
			<div class="fixed_top">
				<div class="go_back"><img src="../wapimg/back.png" alt=""></div>
				<div class="title">照片视频</div>
			</div>
			<!-- 主体内容 -->
			<div class="photos_picked">
				<div class="camera"><img src="../wapimg/camera.png" alt=""></div>
				<!-- 选择的照片放在这个盒子中 -->
				<div class="photo_picked"><img src="../wapimg/test_13.png" alt=""></div>
				<div class="photo_picked"><img src="../wapimg/test_13.png" alt=""></div>
				<div class="photo_picked"><img src="../wapimg/test_13.png" alt=""></div>
				<div class="photo_picked"><img src="../wapimg/test_13.png" alt=""></div>
				<div class="photo_picked"><img src="../wapimg/test_13.png" alt=""></div>
				<div class="photo_picked"><img src="../wapimg/test_13.png" alt=""></div>
				<div class="photo_picked"><img src="../wapimg/test_13.png" alt=""></div>
				<div class="photo_picked"><img src="../wapimg/test_13.png" alt=""></div>
				<div class="photo_picked"><img src="../wapimg/test_13.png" alt=""></div>
				<div class="photo_picked"><img src="../wapimg/test_13.png" alt=""></div>
			</div>

			<!-- 底部图片选择条 -->
			<dic class="bot_select">
				<div class="bot_wrapper">
					<div class="photo_bar">
						<!-- 等待上传的图片缩略图 -->
						<div class="photo_selected"><img src="../wapimg/test_14.png" alt=""></div>
						<div class="photo_selected"><img src="../wapimg/test_14.png" alt=""></div>
						<div class="photo_selected"><img src="../wapimg/test_14.png" alt=""></div>
						<div class="photo_selected"><img src="../wapimg/test_14.png" alt=""></div>
						<div class="photo_selected"><img src="../wapimg/test_14.png" alt=""></div>
						<div class="photo_selected"><img src="../wapimg/test_14.png" alt=""></div>
						<div class="photo_selected"><img src="../wapimg/test_14.png" alt=""></div>
						<div class="photo_selected"><img src="../wapimg/test_14.png" alt=""></div>
					</div>
				</div>
				<div class="bot_btn">
					<p>确定</p>
					<p><span id="num_small">2</span>/<span id="num_large">20</span></p>
				</div>
			</dic>
		</div>

		<!-- 提示文字 默认隐藏-->
		<div class="upload_success">上传成功</div>
		<!-- 底部菜单 -->
		<div class="cover"></div>
		<div class="menu_panel">
			<div class="menu1"><a href="/mfs-tp/index/albumEdit.action">编辑相册信息</a></div>
			<div class="menu2"><a href="/mfs-tp/index/photosManage.action">管理照片</a></div>
			<div class="menu3">取消</div>
		</div>
	</div>
	<script src="../js/responsive.js"></script>	
	<script>
		$(function(){
			$(".menu").on("click",function(){
				$(".cover").fadeIn(200);
				$(".menu_panel").slideDown(300);
			});
			$(".cover,.menu3").on("click",function(){
				$(".cover").fadeOut(200);
				$(".menu_panel").slideUp(200);
			});

			$(".to_upload").on("click",function(){
				$(".album_main").fadeOut(200);
				$(".select_photos").fadeIn(200);
			});

			$(".select_photos .go_back").on("click",function(){
				$(".select_photos").fadeOut(200);
				$(".album_main").fadeIn(200);
			});

			$(".photo_bar").css("width",$(".photo_selected").length*1.22+"rem");
		});
	</script>
</body>
</html>