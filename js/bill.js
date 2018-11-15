/**
 * Created by 18069 on 2018/11/10.
 */
window.onload=function(){
    //´¦ÀíÓÃ»§µÇÂ¼µÄÐÅÏ¢ÏÔÊ¾
    function userInformation(){
        if(location.search){
            var arr=location.href.split("?")[1].split("=");
            if(arr[0]=="username"){
                var user=arr[1];
                return user;
            }
        }
    }
    function setUserInfo(){
        var user=userInformation();
        var info=$("#info");
        var shouye = $("#shouye").find("a");
        if(user){
           var a=info.find("a");
           a.text(user);
           shouye.attr("href","../index.html?username="+user);
        }
    }
    
    var bill_obj = {
        tbody_all : $(".tbody_all"),
        user : userInformation(),
        has_choose : $(".has_choose"),
        payfor : $(".payfor")
    };
    class Bill{
        constructor(obj){
            this.tbody_all = obj.tbody_all;
            this.user = obj.user;
            this.has_choose = obj.has_choose;
            this.payfor = obj.payfor;
            this.get_goods();
        }
        get_goods(){
            var _this=this;
            var sumgoods = 0;
            var sumprice = 0;
            $.post("../php/bill.php",{user: this.user},function(res){
                var json = JSON.parse(res);
                var str = "";
                var gidArr=[];
                for(var i = 0 ; i < json.length ; i ++ ){
                    gidArr.push(json[i].gid);
                    sumgoods += json[i].gnumber;
                    sumprice += json[i].gprice*json[i].gnumber;
                    console.log(json);
                    str+=`
                        <div class="an_info" id="${json[i].gid}">
                            <div class="ziyi line">
                                <a href="javascript:;" class="ziyin table_select"><span class="choose"></span>&nbsp;&nbsp;自营</a>
                            </div>
                            <div class="goods_detail line">
                                <p class="extro">
                                    <a href="javascript:;" class="huangou table_select">
                                        <span class="choose"></span>&nbsp;&nbsp;<span class="huangou">换购</span></a>
                                    指定商品购买一件可优惠换购热销商品
                                </p>

                                <div class="goods_info clearfix">
                                    <div class="left fl">
                                        <a href="javascript:;" class="ziyin_goods table_select"><span
                                                class="choose goods_selected"></span>&nbsp;&nbsp;</a>
                                        <img src="${json[i].gpicture}" alt=""
                                             class="detail_img"/>
                                    </div>
                                    <div class="center detail fl">
                                        <p class="detail">${json[i].gname}</p>
                                        <span>经典36果</span>
                                    </div>
                                    <div class="price fl">
                                        ${json[i].gprice}
                                    </div>
                                    <div class="number fl">
                                        <b class="down">-</b><input type="text" value="${json[i].gnumber}" class="number"/><b class="up">+</b>
                                    </div>
                                    <div class="xiaoji fl">
                                        ￥${json[i].gprice*json[i].gnumber}
                                    </div>
                                    <div class="option fl icon-shanchu">

                                    </div>
                                </div>
                            </div>
                            <div class="pay line">
                                <div class="allpay fr"> 商品总价:&nbsp;<span class="single_all">￥${json[i].gprice*json[i].gnumber}</span></div>
                            </div>
                        </div>
            
                    `;
                }
                _this.tbody_all.html(str);
                setUserInfo(); 
                     //选择
                     var table_select = $(".table_select");
                     table_select.click(function(){
                         var choose = $(this).find(".choose");
                         if(choose.hasClass("icon-xuanzeyixuan")){
                             choose.removeClass("icon-xuanzeyixuan");
                         }else{
                             choose.addClass("icon-xuanzeyixuan");
                         }
                          _this.cacurlate()
                     });
                     //全选
                     var select_all = $(".select_all");
                     var choose=$(".choose");
                     select_all.click(function(){
                         if(choose.hasClass("icon-xuanzeyixuan")){
                             choose.removeClass("icon-xuanzeyixuan");
                         }else{
                             choose.addClass("icon-xuanzeyixuan");
                         }
                          _this.cacurlate()
                     });

                     //增加数量
                     // var down = $(".down");
                     // var up = $(".up");
                     // var number=$(".number");
                     // var price=$(".an_info .price").text();
                     // var xiaoji=$(".an_info .xiaoji");  
                     // var single_all=$(".an_info .single_all");  
                     // down.click(function(e){
                     //     var value = number.val();
                     //     if(value == 0){
                     //         return;
                     //     }
                     //     number.val(--value);
                     //     xiaoji.text("￥"+parseFloat(price)*parseFloat(number.val()));
                     //     single_all.text("￥"+parseFloat(price)*parseFloat(number.val()));
                     //     e.preventDefault ? e.preventDefault() : document.cancelBubble = true;
                     // });
                     // up.click(function(e){
                     //     var value = number.val();
                     //     number.val(++value);
                     //     single_all.text("￥"+parseFloat(price)*parseFloat(number.val()));
                     //       xiaoji.text("￥"+parseFloat(price)*parseFloat(number.val()));
                     //     e.preventDefault ? e.preventDefault() : document.cancelBubble = true;
                     // });
                     //使用使用事件委托处理这些事件
                     for(var i = 0 ; i < gidArr.length ; i++){
                        $("#"+gidArr[i]).on("click",".down",function(e){
                            var parent = $(this).parent().parent().parent().parent();
                            var price=parent.find(".price").text();
                            var single_all=parent.find(".single_all"); 
                            var number = parent.find("input.number");
                            var xiaoji = parent.find(".xiaoji");
                            var value = number.val();
                            console.log(parent);
                            if(value == 0){
                                //当我们的商品数量为零的时候就将该商品从数据库和页面中删除
                                 //删除商品
                                // $("#"+gidArr[i]).on("click",".option",function(e){
                                //     var parent = $(this).parent().parent().parent();
                                //     parent.remove();
                                //     $.post("../php/deletegoods.php",{gid: parent.attr("id"),user: _this.user},function(res){
                                //         alert(res);
                                //     })
                                // });
                                $("#"+gidArr[i]).trigger("click");
                                xiaoji.text("￥"+parseFloat(price)*parseFloat(number.val()));
                                 single_all.text("￥"+parseFloat(price)*parseFloat(number.val()));
                                return;
                            }
                            number.val(--value);
                            xiaoji.text("￥"+parseFloat(price)*parseFloat(number.val()));
                            single_all.text("￥"+parseFloat(price)*parseFloat(number.val()));

                            //将用户操作的数据存储进后台数据库
                            $.post("../php/shopcaroperation.php",{gid: parent.attr("id"),user: _this.user,number: number.val()},function(res){
                                //打印后台输出信息
                                console.log(res);
                            });
                            if(number.val()==0){
                                 parent.remove();
                                 $.post("../php/deletegoods.php",{gid: parent.attr("id"),user: _this.user},function(res){
                                alert(res);
                            })
                            }
                            _this.cacurlate();
                            e.preventDefault ? e.preventDefault() : document.cancelBubble = true;
                        });
           

                        $("#"+gidArr[i]).on("click",".up",function(e){
                            var parent = $(this).parent().parent().parent().parent();
                            var price=parent.find(".price").text();
                            var single_all=parent.find(".single_all"); 
                            var number = parent.find("input.number");
                            var xiaoji = parent.find(".xiaoji");
                            var value = number.val();
                            number.val(++value);
                            single_all.text("￥"+parseFloat(price)*parseFloat(number.val()));
                            xiaoji.text("￥"+parseFloat(price)*parseFloat(number.val()));
                            //将用户操作的数据存储进后台数据库
                            $.post("../php/shopcaroperation.php",{gid: parent.attr("id"),user: _this.user,number: number.val()},function(res){
                                //打印后台输出信息
                                console.log(res);
                            });
                            _this.cacurlate();
                            e.preventDefault ? e.preventDefault() : document.cancelBubble = true;
                         });
                        //删除商品
                        $("#"+gidArr[i]).on("click",".option",function(e){
                            var parent = $(this).parent().parent().parent();
                            parent.find(".choose").removeClass(".icon-xuanzeyixuan");
                            parent.remove();
                            _this.cacurlate()
                            $.post("../php/deletegoods.php",{gid: parent.attr("id"),user: _this.user},function(res){
                                alert(res);
                            })
                        });
                     
                     }

             }); //end ajax
        }//end get_goods()
        //计算选择商品的数量和价格
        cacurlate(){
            //目前只能勾选商品详情图片前的框才能够计算价格
            var selected = $(".goods_selected.icon-xuanzeyixuan");
            //勾选之后获取该商品的价格和数量
            var parent = selected.parent().parent().parent().parent().parent();
            var sum = 0;
            var total_count = 0;
            for(var i = 0 ; i < parent . size() ; i++){
                var id=parent[i].getAttribute("id");
                total_count += parseInt($("#"+id).find("input.number").val());
                sum += parseFloat($("#"+id).find(".single_all").html().split("￥")[1]);
            }
            //将所有勾选的商品的价格和数量计算之后放在已选商品和商品总价中
            this.payfor.html("￥"+sum);
            this.has_choose.html(total_count);
        }
    }
    new Bill(bill_obj);
}