<?php
	
	function addinfoto(){
		header("content-type:text/html;charset=utf-8");
		$db=mysqli_connect("localhost","root","");
		mysqli_select_db($db,"yihaodian");
		mysqli_query($db,"set names utf8");
		$gname=$_POST['gname'];
		$gpicture=$_POST['gpicture'];
		$gprice=$_POST['gprice'];
		$gpricebefore=$_POST['gpricebefore'];
		$gpicturedetail=$_POST['gpicturedetail'];
		$gpicturedetail1=$_POST['gpicturedetail1'];
		$gpicturedetail2=$_POST['gpicturedetail2'];
		$gpicturedetail3=$_POST['gpicturedetail3'];
		$gpicturedetail4=$_POST['gpicturedetail4'];
		$sql="insert into goods (gname,gpicture,gprice,gpricebefore,gpicturesmall,gpicturemiddle,gpicturebig) values ('$gname','$gpicture',$gprice,$gpricebefore,'../images/goods_small/$gpicturedetail','../images/goods_middle/$gpicturedetail','../images/goods_big/$gpicturedetail','../images/goods_small/$gpicturedetail1','../images/goods_middle/$gpicturedetail1','../images/goods_big/$gpicturedetail1','../images/goods_small/$gpicturedetai2','../images/goods_middle/$gpicturedetail2','../images/goods_big/$gpicturedetail2','../images/goods_small/$gpicturedetail3','../images/goods_middle/$gpicturedetail3','../images/goods_big/$gpicturedetail3','../images/goods_small/$gpicturedetail4','../images/goods_middle/$gpicturedetail4','../images/goods_big/$gpicturedetail4')";
		$GLOBALS['result']=mysqli_query($db,$sql);
	}
	if($_SERVER['REQUEST_METHOD']==='POST'){
		addinfoto();

	}

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		h3{
			text-align: center;
			font-size: 36px;
		}
		form{
			width: 500px;
			height: 250px;
			margin: 100px auto;
			border: 1px solid #ccc;
			background-color: orange;
			text-align: center;
			padding-top: 55px;
			padding-bottom: 25px;
		}
		label{
			width: 150px;
			display: inline-block;
			font-weight: 700;
		
		}
		input{
			width: 200px;
			height: 28px;
		}
		button[type=submit]{
			width: 80px;
			height: 30px;
			margin-top: 10px;
		}
	</style>
</head>
<body>
    <h3>一号店商品信息录入系统</h3>
	<form action="<?php echo $_SERVER['PHP_SELF']?>" method="post">
		<label for="gname">商品名称</label><input type="text" id="gname" name="gname"><br>
		<label for="gpicture">图片路径</label><input type="text" id="gpicture" name="gpicture"><br>
		<label for="gpirce">商品价格</label><input type="text" id="gpirce" name="gprice"><br>
		<label for="gpricebefore">商品原价</label><input type="text" id="gpricebefore" name="gpricebefore"><br>
		<label for="gpicturedetail">商品详情图</label><input type="text" id="gpicturedetail" name="gpicturedetail"><br>
		<button type="submit">提交数据</button>
	</form>
	<?php if (isset($result)): ?>
			<p><?php echo $result ?></p>
	<?php endif ?>
</body>
</html>