/**
 * Created by 18069 on 2018/11/5.
 */
$(function(){

   $("#topad>a").hover(function(){
        $(this).find("img").attr("src","images/topadbig.jpg");
   },function(){
       $(this).find("img").attr("src","images/topadmin.jpg");
   });

    //处理用户登录的信息显示
    function userInformation(){
        if(location.search){
            var arr=location.href.split("?")[1].split("=");
            if(arr[0]=="username"){
                var user=arr[1];
               return user;
            }
        }
    }
    var bill = $("#bill");
    function setUserInfo(){
        var user=userInformation();
        console.log(user);
       if(user){
           var person_info=$("#person_info");
           person_info.find("span").text("欢迎");
           person_info.find("#login").text(user);
           person_info.find("#regesit").text("退出登录").attr("href","index.html");
           bill.attr("href","../html/bill.html?username="+user);
           console.log(bill.attr("href"));
       }
    }
    setUserInfo();
    //搜索框获得焦点
    $("#search").focus(function(){
        if($(this).attr("placeholder")=="1号店超级品牌日"){
            $(this).attr("placeholder","").css("color","#000");
        }
        return false;
    }).blur(function(){
        if($(this).val()==""){
            $(this).attr("placeholder","1号店超级品牌日");
            $(this).css("color","#ccc");
        }
        return false;
    });

    //吸顶效果
    var $top_search=$("#top_search");
    var $header=$("#header");
    var $banner=$("#banner");
    var $logo=$top_search.find(".logo");
    window.onscroll=function(){
        if($("html,body").scrollTop()>=$banner.height()+$header.height()){
            $top_search.slideDown(1000);
        }
        else{
            $top_search.slideUp(1000);
        }
    }
    $logo.click(function(){
       $("html,body").animate({"scrollTop":0},1000);
    });
    //logo部分的购物车
    var shopchar=$("#shopchar");
    shopchar.click(function(){
       var user=userInformation();
        if(user){
            location.href = "html/shopCar.html?username="+user;
        }
        else{
            location.href = "html/shopCar.html";
        }
    });
    shopchar.hover(function(){
        $(this).find("button").stop().animate({"backgroundColor": "#ff695b","color": "white"},500);
      },function(){
        $(this).find("button").stop().animate({"backgroundColor": "#fff","color": "#333"},500);
    });
    //nav
    var $li=$("#nav>ul>li").eq(0);
    var $lis=$li.siblings("li");
    $lis.mouseenter(function(){
        $(this).find("a").css({"color":"red"});
    }).mouseleave(function(){
        $(this).find("a").css({"color":"#000"});
    });
    $li.mouseenter(function(){
        $(this).find("#allgoods").stop().fadeIn(200);
    }).mouseleave(function(){
        $(this).find("#allgoods").stop().fadeOut(200);
    });

   //banner nav
    var bannerNav=["chaoji","3C","shipin","qingjie","liangyou","muying","meizhuang"];
    var bannerIndex=0;
    //bannerÂÖ²¥Í¼
    function autoplay(){
        $(".banner_nav b").eq(bannerIndex).addClass("current").siblings().removeClass("current");
        $("#banner a").css("backgroundImage","url(images/"+bannerNav[bannerIndex]+".jpg)");
        if(bannerIndex==bannerNav.length-1){
            bannerIndex=0;
        }
        else{
            bannerIndex++;
        }

    }
    autoplay();
    var time=setInterval(autoplay,2000);
    $(".banner_nav>b").mouseenter(function(){
        bannerIndex=$(this).index();
        $(this).addClass("current").siblings().removeClass("current");
        $("#banner>a").css("backgroundImage","url(images/"+bannerNav[$(this).index()]+".jpg)");
    });
    $("#banner").mouseenter(function(){
        clearInterval(time);
    });
    $("#banner").mouseleave(function(){
        time=setInterval(autoplay,2000);
    });
    //main
    //µ¥Æ·Ààµ¹¼ÆÊ±
    function getHour(time,now){
        var seconds=time.getTime();
        var timenow=now.getTime();
        var cha=(seconds-timenow)/1000;
        var hour=parseInt(cha/60/60);
        var minute=parseInt((cha/60/60-hour)*60);
        var second=parseInt(((cha/60/60-hour)*60-minute)*60);
        return {
            hour:hour>=10?hour:"0"+hour,
            minute:minute>=10?minute:"0"+minute,
            second:second>=10?second:"0"+second
        }

    }
    (function(){
        var danpin_time="2018-11-18 12:00:00";
        var datatime=new Date(danpin_time);
        var now=null;
        var time=setInterval(function(){
            now=new Date();
            var time1=getHour(datatime,now);
            $("#danpin_time>b").eq(0).text(time1.hour);
            $("#danpin_time>b").eq(1).text(time1.minute);
            $("#danpin_time>b").eq(2).text(time1.second);
        },1000);
    })();
    //µ¥Æ·ÀàÊó±êÒÆÈë
    (function(){
        var $lis=$("#danpin>ul>li").eq(0).siblings("li");
        $lis.hover(function(){
            $(this).find(".danpin_goods").css("color","red");
            $(this).css({"position":"relative","zIndex":11,"transform":"translateY(-10px)","webkitTransform":"scare(1.3,1.3)","boxShadow":"5px 5px 20px 0 #000"});
        },function(){
            $(this).find(".danpin_goods").css("color","#333333;");
            $(this).css({"position":"static","zIndex":0,"transform":"translateY(0)","webkitTransform": "scare(1,1)","boxShadow":"0 0 0 0 #000"});
        });
    })();
    //单品侧边栏定位效果
    (function(){
        var danpinaside=$("#danpinaside");
        var header=$("#header");
        var banner=$("#banner");
        var main_ad=$("#main_ad");
        var danpin=$("#danpin");
        window.onscroll=function(){
            if($("html,body").scrollTop()>=header.height()+banner.height()+main_ad.height()){
                danpinaside.css({"position":"fixed","top": ($(window).height())/2-danpinaside.height()/2,"left": danpin.offset().left+danpin.width()+10});
            }else{
                danpinaside.css({"position" : "","top" : "","left" : ""});
            }
         }
    })();
    //³¬¼¶Æ·ÅÆÀà
    //½øÈë°´Å¥Êó±êÒÆÈë
    var $spans=$("#chaoji .mask .chaoji_mask_pinpai").find("span");
    $spans.hover(function(){
        $(this).css({"backgroundColor":$(".main_title").find("h4").css("color"),"border":0,"cursor":"pointer"});
    },function(){
        $(this).css({"backgroundColor":"rgba(0,0,0,0)","border":"1px solid #fff"});
    });

    //排行榜单切换
    (function(){
        //×óÓÒ°´Å¥µã»÷ÇÐ»»
        var $left=$("#paihang .paihang_left");
        var $right=$("#paihang .paihang_right");
        var $ul=$(".main_paihang>ul");
        var index=0;
        $left.on("click",function(){
            if(index<=0){
                index=0;
            }
            else{
                index--;
                $ul.animate({"left":-index*152});
            }
            return false;
        });
        $right.on("click",function(){
            if(index>=2){
                index=2;
            }
            else{
                index++;
                $ul.animate({"left":-index*152});
            }
            return false;
        });
    })();

    //ÉÌÆ·Êý¾ÝµÄ¶¯Ì¬¼ÓÔØ
    (function(){
        function getAjax(){
            return window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
        }
        function parameter(obj){
            var arr=[];
            for(var key in obj){
                arr.push(key+"="+obj[key]);
            }
            return arr.join("&");
        }
        function ajax(obj){
            var xhr=getAjax();
            obj.url+="?rand="+new Date().getTime();
            if(obj.method.toLowerCase()=="get"){
                if(obj.data){
                    obj.url+="&"+parameter(obj.data);
                }
            }
            xhr.open(obj.method,obj.url);
            if(obj.method.toLowerCase()=="post"){
                xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                if(obj.data){
                    xhr.send(parameter(obj.data));
                }
                xhr.send(null);
            }
            xhr.send(null);
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4){
                    if(xhr.status==200){
                        obj.success(xhr.responseText);
                    }
                    else{
                        obj.error(xhr.status,xhr.statusText);
                    }
                }
            }
        }
        var ul=document.getElementById("goods_buy").getElementsByTagName("ul")[0];
        var obj={
            method:"get",
            url:"php/goods.php",
            success:function(res){
                var json=JSON.parse(res);
                var str="";
                for(var i=0;i<json.length;i++){
                    str+=`<li class="goods_list">
                            <dl>
                                <dt><img src="${json[i].gpicture}" alt=""/></dt>
                                <dd class="detail"><span class="ziying">自营</span>${json[i].gname}</dd>
                                 <dd class="price">￥${json[i].gprice}</dd>
                                 <dd class="gid">${json[i].gid}</dd>
                            </dl>
                            <div class="goods_mask">
                                <div class="addGoodsCar">
                                    <a href="javascript:;">加入购物车</a>
                                </div>
                                <div class="goods_similar">
                                     <a href="javascript:void(0);">找相似</a>
                                </div>
                            </div>
                         </li>`;
                } 
                ul.innerHTML=str; 
                  var $lis=$("#goods_buy ul").find("li");
                $lis.hover(function(){
                    $(this).css({"border":"1px solid red"});
                    $(this).find(".goods_mask").show();
                },function(){
                    $(this).css({"border":"1px solid #fff"});
                    $(this).find(".goods_mask").hide();
                });
                $lis.css("cursor","pointer");
                //所有的li点击之后将进入商品详情页
                var gid=$lis.find(".gid");
                gid.css("display" , "none");
                    $lis.click(function(){
                        var gid=$(this).find(".gid").text();
                        var isuser=userInformation();
                        if(isuser){
                            location.href="html/shopCar.html?username="+isuser+"&gid="+gid;
                        }
                        else{
                            alert("请先登录");
                            location.href="../html/login.html";
                        }
                    });
                    var addGoodsCar = $(".addGoodsCar>a");
                    addGoodsCar.click(function(e){
                        var gid=$(this).parent().parent().parent().find(".gid").text();
                        console.log($(this).parent());
                        var isuser=userInformation();
                        if(isuser){
                            $.post("../php/quickaddtocar.php",{username: isuser,gid: gid},function(res){
                                alert(res);
                            })
                        }
                        else{
                            alert("请先登录");
                            location.href="../html/login.html";
                        }
                        e.stopPropagation ? e.stopPropagation() : window.cancelBubble = true;
                    });
                },
                error:function(){
                        alert("´íÎó")
              }
        }
        ajax(obj);
      
    })();
});