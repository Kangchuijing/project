<?php 
	header("content-type:text/html;charset=utf-8");
	$db = mysqli_connect("localhost","root","","yihaodian");
	mysqli_query($db,"set names utf8");
	$gid = $_POST['gid'];
	$user = $_POST['user'];
	$number = $_POST['number'];
	$sql = "update usershopcar set gnumber = $number where gid = $gid and uname = '$user'";
	$result = mysqli_query($db,$sql);
	if($result){
		echo "添加购物车成功";
	}
	else{
		echo "添加购物车失败";
	}
 ?>