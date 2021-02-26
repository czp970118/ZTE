$(function () {
    $.ajax({
        url: "../data/goodslist.json",
        type: "get",
        dataType: "json",
        cache: false,
        success: function (json) {
            var domStr = ""
            $.each(json[1], function (index, item) {
                // console.log(item.image_src)
                domStr+=`
                <li data-id=${item.id}>
                <div class="item">
                    <div class="pic"><a href="#"><img src="${item.image_src}" alt=""></a>
                    <div class="get_cart">加入购物车</div>
                    </div>
                    <div class="caption">
                        <a href="#">${item.text}</a>
                        <span class="Axprice">
                            ${item.price}          
                            </span>
                    </div>
                </div>
            </li>
                `
            })
            $(".itemlist").html(domStr)
            $(".pic").hover(function(){
                $(this).find(".get_cart").animate({"bottom":0},150)
            },function(){
                $(this).find(".get_cart").animate({"bottom":-40},150)
            })
           
        }

    })
})