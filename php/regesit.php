<?php
	header("content-type:text/html;charset=utf-8");
	$db=mysqli_connect("localhost","root","","yihaodian");
	mysqli_query($db,"set names utf8");
	$user=$_POST['user'];
	$phone=$_POST['phone'];
	$password=$_POST['password'];
	$sql="insert into userinfo (uname,upassword,uphone) values ('$user','$password','$phone')";
	$result=mysqli_query($db,$sql);
	if($result){
		echo "<script>alert('注册成功,跳往登录页');location.href='../html/login.html?username=$user'</script>";
	}
	else{
		echo "<script>alert('注册失败，请重新注册')location.reload();</script>";
	}
?>