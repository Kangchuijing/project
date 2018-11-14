<?php 
	header("content-type:text/html;charset=utf-8");
	$db = mysqli_connect("localhost","root","","yihaodian");
	mysqli_query($db,"set names utf8");
	$gid = $_POST['gid'];
	$user = $_POST['user'];
	$sql = "delete from usershopcar where uname = '$user' and gid = $gid";
	$result = mysqli_query($db,$sql);
	if($result){
		echo "删除成功";
	}
	else{
		echo "删除失败";
	}
 ?>