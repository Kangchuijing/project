<?php
	header("content-type:text/html;charset=utf-8");
	$db = mysqli_connect("localhost","root","","yihaodian");
	mysqli_query($db,"set names utf8");
	$user = $_POST['user'];
	$sql = "select * from usershopcar where uname = '$user'";
	$result = mysqli_query($db,$sql);
	while($row=mysqli_fetch_array($result)){
		$arr[]=$row;
	}
	if($arr){
		$json = json_encode($arr);
		echo $json;
	}else{
		echo "无数据";
	}
?>