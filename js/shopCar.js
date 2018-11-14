/**
 * Created by 18069 on 2018/11/10.
 */
window.onload=function(){
    //处理用户登录的信息显示
    var user = "";
    if(location.search){
        var arr=location.href.split("?")[1].split("&")[0].split("=");
        if(arr[0]=="username"){
            user=arr[1];
            var person_info=$("#person_info");
            person_info.find("span").text("欢迎");
            person_info.find("#login").text(user);
            person_info.find("#regesit").text("退出登录").attr("href","../index.html");
        }
    }

    var shouye=$("#shouye").find("a");
    var bill = $("#bill");
    if(user){
        shouye.attr("href","../index.html?username=" + user);
        bill.attr("href", "../html/bill.html?username=" + user);
    }

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
    //logo部分的购物车
    var shopchar=$("#shopchar");
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
    //商品详情
    (function(){
        var gid = null;
        if(location.search){
            if(user){
                var gidarr = location.search.split("&")[1];
                if(gidarr){
                    var gidarr1 = gidarr.split("=")[1];
                    gid = gidarr1;
                }
            }
        }
        var obj = {
            smallImg : $(".detail_left .smallImg").find("img"),
            bigimg : $(".detail_left .bigimg").find("img"),
            smallimg_select : $(".smallimg_select").find("ul"),
            goods_info : $(".detail_right>.goods_info"),
            goods_introduct : $(".goods_introduct"),
            price : $(".active div.price"),
            gid : gid
        };
        class Goods{
            constructor(obj){
                this.smallImg = obj.smallImg;
                this.smallimg_select = obj.smallimg_select;
                this.bigimg = obj.bigimg;
                this.goods_info = obj.goods_info;
                this.goods_introduct = obj.goods_introduct;
                this.price = obj.price;
                this.gid = obj.gid;
                this.loadinfo();
            }
            loadinfo(){
                var _this = this;
               if(gid){
                   $.get("./../php/shopcar.php",{gid : gid},function(res){
                       var str = null;
                       var str1 = null;
                       var arr = JSON.parse(res);
                       str = `<span class="ziying">自营</span>${arr.gname}`;
                       str1 = `<p>价格 <span class="price">￥${arr.gprice}</span>&nbsp;[<b class="discount">9</b>折] &nbsp;定价：[<s class="dingjia">￥${arr.gpricebefore}</s>]</p>`;
                       //设置商品的展示图片，默认使用中等大小的图片作为展示
                       _this.smallImg.attr("src",arr.gpicturemiddle);
                       _this.bigimg.attr("src",arr.gpicturebig);
                       // 接下来便是繁琐的设置数十张图片啦，因为没有使用图片上传，使得数据库数据繁琐
                       var lis = _this.smallimg_select.find("li");
                       lis.eq(0).find("img").attr("src",arr.gpicturesmall);
                       lis.eq(1).find("img").attr("src",arr.gpicturesmall1);
                       lis.eq(2).find("img").attr("src",arr.gpicturesmall2);
                       lis.eq(3).find("img").attr("src",arr.gpicturesmall3);
                       lis.eq(4).find("img").attr("src",arr.gpicturesmall4);
                        _this.goods_introduct.html(str);
                        _this.price.html(str1);
                   });
               }
            }
        }
        new Goods(obj);
    })();
    //放大镜效果
    (function(){
        var obj={
            smallImg : $("#detail>.detail_left>.smallImg"),
            mask : $("#detail>.detail_left>.smallImg").find(".img_mask"),
            bigImgBox  : $("#detail>.detail_left>.bigimg"),
            bigImg  : $("#detail>.detail_left>.bigimg").find("img"),
            smallimg_select : $("#detail>.detail_left").find(".smallimg_select")
        };
        //放大镜构造函数
        class FangDaJing{
            constructor(obj){
                this.smallImg=obj.smallImg;
                this.mask=obj.mask;
                this.bigImgBox=obj.bigImgBox;
                this.bigImg=obj.bigImg;
                this.smallimg_select=obj.smallimg_select;
                this.maskmove();
                this.imgselect(); //选择图片

            }
            //图片选择切换，值得学习，非常经典，当鼠标移入小图时改变中等图片和大图的文件名及可，这三种不同尺寸的图片放在不同文件夹下面，因为他们的文件名都是相同的
            imgselect(){
                var $li=this.smallimg_select.find("li");
                var small=this.smallImg.find("img");
                var big=this.bigImg;
                $li.on("mouseenter",function(){
                    var src=$(this).find("img").attr("src").split("goods_small/")[1];
                    small.attr("src","../images/goods_middle/"+src);
                    big.attr("src","../images/goods_big/"+src);
                });
            }
            //遮罩层的移动
            maskmove(){
                var _this=this;
                this.smallImg.mouseenter(function(){
                    _this.mask.css("display","block");
                    _this.bigImgBox.css("display","block");
                    $(document).mousemove(function(e){
                         var l = e.pageX - _this.smallImg.offset().left - _this.mask.width()/2;
                         var t = e.pageY - _this.smallImg.offset().top - _this.mask.height()/2;
                         var maxL = _this.smallImg.width() - _this.mask.width();
                         var maxT = _this.smallImg.height() - _this.mask.height();
                         l = l < 0 ? 0 : (l > maxL ? maxL : l);
                         t = t < 0 ? 0 : (t > maxT ? maxT : t);
                        _this.mask.css({"left" : l , "top" : t});
                        _this.bigImgmove({l,t,maxL,maxT});
                    });
                    _this.smallImg.mouseleave(function(){
                        _this.mask.css("display" , "none");
                        _this.bigImgBox.css("display" , "none");
                        $(document).mousemove = null;
                    });
                });
            }
            //大图的移动
            bigImgmove(obj){
                //比例关系
                //大图left/遮罩层left=大图可移动范围/遮罩层大小
                var l=obj.l*(this.bigImg.width()-this.bigImgBox.width())/this.mask.width();
                var t=obj.t*(this.bigImg.height()-this.bigImgBox.height())/this.mask.height();
                this.bigImg.css({"marginLeft" : -l , "marginTop" : -t});
            }
        }
        new FangDaJing(obj);

        //添加购物车操作
        (function(){
            var gid = null;
             if(location.search){
            if(user){
                var gidarr = location.search.split("&")[1];
                if(gidarr){
                    var gidarr1 = gidarr.split("=")[1];
                    gid = gidarr1;
                 }
              }
             }
              var obj={
                up_down: $(".addToCar>.amount>.up_down"),
                amount: $(".addToCar>.amount>input"),
                button: $(".addToCar>.button"),
                gid : gid
            };
            class AddToCar{
                constructor(obj){
                    this.up_down=obj.up_down;
                    this.amount=obj.amount;
                    this.button=obj.button;
                    this.gid = obj.gid;
                    this.amountAdd();
                }
                //购物车数量增加
                amountAdd(){
                    var _this = this;
                    var up = this.up_down.find(".up");
                    var down = this.up_down.find(".down");
                    up.click(function (e) {
                        var value = _this.amount.val();
                          _this.amount.val(++value);
                         
                        window.getSelection().removeAllRanges?window.getSelection().removeAllRanges():document.selection.empty();
                        e.preventDefault();
                    });
                    down.click(function (e) {
                        var value = _this.amount.val();
                        if(value<=0){
                            return;
                        }
                          _this.amount.val(--value);
                        window.getSelection().removeAllRanges?window.getSelection().removeAllRanges():document.selection.empty();
                        e.preventDefault();
                    });
                    this.button.click(function(){
                         _this.addToCar();
                    });
                }
                addToCar(){
                  if(user){
                    $.post("../php/addtocar.php",{user: user,gid: gid,number: this.amount.val()},function(res){
                       alert(res);
                    })
                  }
                }
            }
            new AddToCar(obj);
        })();
    })();
}