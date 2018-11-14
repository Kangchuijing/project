<?php
	header("content-type:text/html;charset=utf-8");
	$db = mysqli_connect("localhost","root","","yihaodian");
	mysqli_query($db,"set names utf8");
	$gid = $_GET['gid'];
	$sql = "select * from goods where gid=$gid";
	$result = mysqli_query($db,$sql);
	$row = mysqli_fetch_array($result);
	if($row){
		$json = json_encode($row);
		echo $json;
	}
	else{
		echo "数据错误，请刷新浏览器试试";
	}
?>