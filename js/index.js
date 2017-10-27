/**
 * Created by 国外噩梦 on 2016/10/12.
 */
$(function(){
    var add=$('.add');
    var del=$('.icon-del');
    var del1=$('.icon-del1');
    var todos=[];
    var fuxuan=$('.icon-fuxuankuang');

    if(localStorage.table){
        todos=JSON.parse(localStorage.table);
    }else{
        localStorage.table=JSON.stringify(todos);
    }

    /*------------------------遍历数据(20171027)--------------------------*/
    var data = [{"val":"todo1","imgSrc":"renwu.jpg"},{"val":"todo2","imgSrc":"renwu.jpg"},{"val":"todo3","imgSrc":"renwu.jpg"},{"val":"todo4","imgSrc":"renwu.jpg"},{"val":"todo5","imgSrc":"renwu.jpg"}];

    function render(i,data){
        $('<li><i class="icon-font icon-fuxuankuang"></i><input type="text" value="'+data[i].val+'"><i class="del icon-del"></i><img src="imgs/'+data[i].imgSrc+'" alt="加载失败"></li>').appendTo('.list');
    }
    for(var i=0;i<data.length;i++){
        render(i,data);
    }
    /*--------------------------------------------------------------------*/
    //修改任务
    function upload(){
        var val = $(this).val();
        console.log(val);
    }
    //添加任务
    add.on('click',function(e,v){
        /*todos.push({state:1,isDel:0});
        localStorage.table=JSON.stringify(todos);
        console.log(todos);
        console.log(localStorage.table);*/
        $('<li><i class="icon-font icon-fuxuankuang"></i><input type="text" onblur="upload()" autofocus ></textarea><i class="del icon-del"></i><img src="./imgs/renwu.jpg" alt="加载失败"></li>').appendTo('.list1');
    })



    //选中相应任务
    $('.list').on('click','.icon-fuxuankuang',function(){
        $(this).toggleClass('icon-fuxuankuang1')
            .closest('li').find('.del')
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
    //删除任务
    $('.list').on('click','.icon-del1',function(){
        $(this).closest('li')
            .css('transform','scale(0,0)')
            .delay(500)
            .queue(function(){
                $(this).remove()
                    .dequeue();
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
            $(this).find('.icon-fuxuankuang').addClass('icon-fuxuankuang1');
            $(this).find('.icon-del').addClass('icon-del1');
            $(this).css('transform','translate3d('+x+'px,0,0)')
            .delay(800)
            .queue(function(){
                $(this).css('transform','translate3d(0,0,0)')
                    .dequeue();
            });
        }
    })
    //点击编辑选项删除所选中的任务栏
    var edit=$('.edit');
    edit.on('click',function(){
        $('.list').find('.icon-fuxuankuang').toggleClass('icon-fuxuankuang1');
        $('.list').find('.icon-del').toggleClass('icon-del1');
    })

    //点击添加任务,显示文本编辑框,文本输入完成后,点击确定(对勾)生成li插入到ul后


})