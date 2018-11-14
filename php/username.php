<?php
	header('content-type:text/html;charset=utf-8');
	$db=mysqli_connect("localhost","root","","yihaodian");
	mysqli_query($db,"set names utf8");
	$username=$_GET['user'];
	$sql="select * from userinfo where uname='$username'";
	$result=mysqli_query($db,$sql);
	$row = mysqli_fetch_array($result);
	if($row){
		echo "用户名已存在，请更换用户名注册";
	}
?>