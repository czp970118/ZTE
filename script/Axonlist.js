$(function () {
    $.ajax({
        url: "../data/goodslist.json",
        type: "get",
        dataType: "json",
        cache: false,
        success: function (json) {
            var domStr = ""
            $.each(json[0], function (index, item) {
                // console.log(item.image_src)
                domStr += `
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
            $(".pic").hover(function () {
                $(this).find(".get_cart").animate({
                    "bottom": 0
                }, 150)
            }, function () {
                $(this).find(".get_cart").animate({
                    "bottom": -40
                }, 150)
            })
            $(".get_cart").on("click", function () {
                // 首先明白要存的数据是怎样的 点击购物车后存一个数组 [{"id":data-id,num}]
                var id = $(this).closest("li").attr("data-id")
                var goodsArr = []
                // 判断本地有没有缓存,如果有则让其等于商品数组
                if (localStorage.getItem("goods")) {
                    goodsArr = JSON.parse(localStorage.getItem("goods"))
                }
                // 判断购物车是否有这条数据
                var flag = false;
                $.each(goodsArr, function (index, item) {
                    if (item.id === id) {
                        item.num++
                        flag = true
                    }
                })
                if (!flag) {
                    goodsArr.push({
                        "id": id,
                        "num": 1
                    })
                }
                // s数据更新到本地缓存
                localStorage.setItem("goods", JSON.stringify(goodsArr))
                alert("已添加到购物车")
            })





        }

    })

})