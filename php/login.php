<?php
	header("content-type:text/html;charset=utf-8");
	$db=mysqli_connect("localhost","root","","yihaodian");
	mysqli_query($db,"set names utf8");
	$user=$_POST['user'];
	$password=$_POST['password'];
	$sql="select * from  userinfo where uname='$user'";
	$result=mysqli_query($db,$sql);
	$row=mysqli_fetch_array($result);
	if($row){
		if($row['upassword']==$password){
			echo "<script>alert('登录成功,跳往首页');location.href='../index.html?username=$user'</script>";
		}
		else{
			echo "<script>alert('密码错误，请重新登录');location.href='../html/login.html'</script>";
		}
	}
	else{
		echo "<script>alert('用户名不存在');location.href='../html/login.html'</script>";
	}
?>