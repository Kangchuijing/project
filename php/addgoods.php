<?php
	
	function addinfoto(){
		header("content-type:text/html;charset=utf-8");
		$db=mysqli_connect("localhost","root","");
		mysqli_select_db($db,"yihaodian");
		mysqli_query($db,"set names utf8");
		var_dump($_POST);
		$gname=$_POST['gname'];
		$gpicture=$_POST['gpicture'];
		$gprice=$_POST['gprice'];
		$gpricebefore=$_POST['gpricebefore'];
		$gpicturedetail=$_POST['gpicturedetail'];
		$gpicturedetail1=$_POST['gpicturedetail1'];
		$gpicturedetail2=$_POST['gpicturedetail2'];
		$gpicturedetail3=$_POST['gpicturedetail3'];
		$gpicturedetail4=$_POST['gpicturedetail4'];
		$sql="insert into goods (gname,gpicture,gprice,gpricebefore,gpicturesmall,gpicturemiddle,gpicturebig,gpicturesmall1,gpicturemiddle1,gpicturebig1,gpicturesmall2,gpicturemiddle2,gpicturebig2,gpicturesmall3,gpicturemiddle3,gpicturebig3,gpicturesmall4,gpicturemiddle4,gpicturebig4) values ('$gname','../images/$gpicture',$gprice,$gpricebefore,'../images/goods_small/$gpicturedetail','../images/goods_middle/$gpicturedetail','../images/goods_big/$gpicturedetail','../images/goods_small/$gpicturedetail1','../images/goods_middle/$gpicturedetail1','../images/goods_big/$gpicturedetail1','../images/goods_small/$gpicturedetail2','../images/goods_middle/$gpicturedetail2','../images/goods_big/$gpicturedetail2','../images/goods_small/$gpicturedetail3','../images/goods_middle/$gpicturedetail3','../images/goods_big/$gpicturedetail3','../images/goods_small/$gpicturedetail4','../images/goods_middle/$gpicturedetail4','../images/goods_big/$gpicturedetail4')";
		echo "$sql";
		$result=mysqli_query($db,$sql);
		if($result){
			echo "添加数据成功";
		}else{
			echo "添加数据失败";
		}
	}
	if($_SERVER['REQUEST_METHOD']==='POST'){
		addinfoto();

	}

?>