/**
 * Created by 国外噩梦 on 2016/10/12.
 */
$(function(){
    var add=$('.add .icon-tianjia');
    var del=$('.icon-del');
    var del1=$('.icon-del1');
    var fuxuan=$('.icon-fuxuankuang');
    add.on('click',function(e,v){
        $('<li><i class="icon-font icon-fuxuankuang"></i><p>'+Math.random()+'</p><i class="del icon-del"></i><img src="./imgs/renwu.jpg" alt="加载失败"></li>').appendTo('.list1');
    })

    //点击复选框选中相应元素
    fuxuan.on('click',function(){
        $(this).toggleClass('icon-fuxuankuang1');
        var index=$(this).closest("li").index();
        $(this).closest("li").find('.del')
            .toggleClass('icon-del1')
            .on('click',function(){
                $(this).closest('li')
                    .css('transform','scale(0,0)')
                    .delay(500)
                    .queue(function(){
                        $(this).remove()
                            .dequeue();
                    });

            });
    })
    var left=null;
    //当触摸事件开始的时候记录left的值
    $('.list').on('touchstart','li',function(e){
        left=e.originalEvent.changedTouches[0].pageX;
    })

    //当触屏事件完成之后记录手指移动的终点值
    $('.list').on('touchend','li',function(e){
        var move_left=e.originalEvent.changedTouches[0].pageX;
        var x=move_left-left;
        //当触摸结束位置-初始位置大于某一个值的时候,li移动到对应的那个值延迟800ms之后又返回
        if(x>40&&move_left>0){
            $(this).css('transform','translate3d('+x+'px,0,0)')
            .delay(800)
            .queue(function(){
                $(this).css('transform','translate3d(0,0,0)')
                    .dequeue();
            });
        }
    })


})