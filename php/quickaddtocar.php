<?php
	header("content-type:text/html;charset=utf-8");
	$db = mysqli_connect("localhost","root","","yihaodian");
	mysqli_query($db,"set names utf8");
	$user = $_POST['username'];
	$gid = $_POST['gid'];
	$number = 1;
	$sql = "select * from goods where gid=$gid";
	$result = mysqli_query($db,$sql);
	$row = mysqli_fetch_array($result);
	$gname = $row['gname'];
	$gprice = $row['gprice'];
	$picture = $row['gpicturesmall'];
	$isuser = "select * from usershopcar where uname='$user'";
	$isgoods = "select * from usershopcar where gid=$gid and uname = '$user'";
	$result1 = mysqli_query($db,$isuser);
	$result2 = mysqli_query($db,$isgoods);
	$checkuser = mysqli_fetch_array($result1);
	$checkgoods = mysqli_fetch_array($result2);
	if($checkuser){ //验证用户名在购物车中是否存在
		if($checkgoods){	//验证该用户名是否购买了该商品
			$value = $checkgoods['gnumber'];
			$ns = $value + $number;
			$update = "update usershopcar set gnumber=$ns where uname='$user' and gid=$gid";
			$update_result = mysqli_query($db,$update);
			if($update_result){
				echo "加入成功";
			}
			else{
				echo "加入!失败";
			}
		}
		else{
			$insert = "insert into usershopcar (uname,gid,gname,gprice,gnumber,gpicture) values ('$user','$gid','$gname','$gprice',$number,'$picture')";
			$isok = mysqli_query($db,$insert);
			if($isok){
				echo "加入成功";
			}
			else{
				echo "加入失败";
			}
		}
	}
	else{
		$insert = "insert into usershopcar (uname,gid,gname,gprice,gnumber,gpicture) values ('$user','$gid','$gname','$gprice',$number,'$picture')";
		$isok = mysqli_query($db,$insert);
		echo "$isok";
		if($isok){
			echo "加入成功";
		}
		else{
			echo "加入失败";
		}
	}
?>