window.onload=function(){
    //表单验证
    var allFlag=false;
    //用户名验证
    var userReg=/^[\w\u4e00-\u9fa5]{4,20}$/;
    var user=$("#user");
    function userCheck(value){
        if(userReg.test(value)){
            $(".name").fadeIn(500).css("backgroundColor","green").html("ok");
            allFlag=true;
            return;
        }
        allFlag=false;
        $(".name").css({"backgroundColor": "#FFF4D7"}).html("请输入正确的用户名");
    }
    $("#user").focus(function(){
        $(".name").fadeIn(500).css({"backgroundColor": "#E4E4E4"}).html("请输入4-20位的数字，字母和\"_\"组成的用户名");
    }).blur(function(){
        userCheck(user.val());
        $.get("../php/username.php",{"user": user.val()},function(res){
            if(res){
                $(".name").fadeIn(500).css("backgroundColor","red").html(res);
                allFlag=true;
                 return;
            }
        });
    });
    $("#user").on("keyup",function(){
        userCheck(user.val());
         //用户名唯一验证
         $.get("../php/username.php",{"user": user.val()},function(res){
            if(res){
                $(".name").fadeIn(500).css("backgroundColor","red").html(res);
                allFlag=true;
                return;
            }
         });
    });
   

    //手机号验证
    var telReg=/^[1][\d]{10}$/;
    var phone=$("#phone");
    function telCheck(value){
        if(telReg.test(value)){
            $(".phone").fadeIn(500).css("backgroundColor","green").html("ok");
            allFlag=true;
            return;
        }
        allFlag=false;
        $(".phone").fadeIn(500).css("backgroundColor", "#FFF4D7").html("请输入正确的手机号");
    }
    phone.focus(function(){
        $(".phone").fadeIn(500).css({"backgroundColor": "#E4E4E4"}).html("请输入1开头的十一位手机号");
    }).blur(function(){
        telCheck($(this).val());
    });
    phone.on("keyup",function(){
        telCheck(phone.val());
    })
    //密码验证
    var passwodReg=/^[\S]{6,20}$/;
    var password=$("#password");
    function passwordCheck(value){
        if(passwodReg.test(value)){
            $(".password").fadeIn(500).css("backgroundColor","green").html("ok");
            allFlag=true;
            return;
        }
        allFlag=false;
        $(".password").fadeIn(500).css("backgroundColor","#FFF4D7").html("请输入6-20位的密码，请勿使用空格");
        if(password.val().length>20){
            $(".password").fadeIn(500).css("backgroundColor","red").html("超出长度");
            allFlag=false;
        }
    }
    password.focus(function(){
        $(".password").fadeIn(500).css("backgroundColor","#E4E4E4").html("请输入6-20位的密码，请勿使用空格");
    }).blur(function(){
        passwordCheck(password.val());
    });
    password.on("keyup",function(){
        passwordCheck(password.val());
    });
    //重复密码
    var repeatpassword=$("#repeatpassword");
    function repeatpasswordCheck(){
        if(password.val().indexOf(repeatpassword.val())==0){
            if(password.val()===repeatpassword.val()){
                $(".repeatpassword").fadeIn(500).css("backgroundColor","green").html("ok");
                allFlag=true;
                return;
            }
            allFlag=false;
            return;
        }
        allFlag=false;
        $(".repeatpassword").fadeIn(500).css("backgroundColor","#FFF4D7").html("重复密码错误");
    }
    repeatpassword.focus(function(){
        $(".repeatpassword").fadeIn(500).css("backgroundColor","#E4E4E4").html("请重复输入密码");
    }).blur(function(){
        repeatpasswordCheck();
    });
    repeatpassword.on("keyup",function(){
        repeatpasswordCheck();
    });
    var regesit=$("#regesit");
    regesit.submit(function(){
        if(allFlag){
            return true;
        }
        return false;
    });
}