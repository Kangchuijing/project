$(function(){
	//如果url栏中有传递过来的数据
	if(location.search){
		var username=location.search.split("=")[1];
		if(username){
			$("#user").val(username);
			$("#password")[0].focus();
		}
	}
	else{
		$("#user")[0].focus();
	}
});