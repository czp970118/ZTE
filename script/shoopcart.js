$(function () {
    if (localStorage.getItem("goods")) {
        var goodsArr = JSON.parse(localStorage.getItem("goods"))
        $.ajax({
            type: "get",
            url: "../data/goodslist.json",
            dataType: "json",

            success: function (json) {
                var liStr = ""
                $.each(json[0], function (ind, sel) {
                    $.each(goodsArr, function (index, item) {
                        if (item.id == sel.id) {

                            liStr += `
                  
                            <li data-id=${sel.id}>
                            <div class="listop">
                                <input type="checkbox" name="" id="">
                                <div class="subsrc">
                                    <img src="${sel.image_src}" alt="">
                                    <div class="subtext">
                                        <p class="sp1">${sel.text} </p>
                                        <p class="sp2">${sel.ms}</p>
                                    </div>
        
                                </div>
                                <span class="unit">${(sel.price)}</span>
                                <p class="amount">
                                    <em class="plu">-</em>
                                    <em class="how">${item.num}</em>
                                    <em class="miu">+</em>
                                </p>
                                <p class="money">¥${(sel.how)*(item.num)}.00</p>
                                <p class="del">删除</p>
                                <p class="p1">【赠品】Nubia红魔战鼓蓝牙音箱*1</p>
                                <p class="p2">【赠品】免费换屏服务 （半年期）*1</p>
                            </div>             
                        </li>
                            `
                        }
                    })

                })
                $(".shoop_list").html(liStr)
                // 给删除按钮添加事件
                $(".del").on("click", function () {
                    console.log(111)
                    var id = $(this).closest("li").attr("data-id")
                    $.each(goodsArr, function (index, item) {
                        if (item.id == id) {
                            goodsArr.splice(index, 1)
                            return false
                        }
                    })
                    // 删除dom结构
                    $(this).closest("li").remove()

                    $('.shoop_list li input').each(function (index, ele) {
                        if (!$(ele).prop('checked')) { //未选中
                            $("#allselecct").prop('checked', false)
                            return false //结束each循环
                        }
                        $("#allselecct").prop('checked', true)
                    })

                    // 更新本地数据
                    localStorage.setItem("goods", JSON.stringify(goodsArr))
                    if (goodsArr.length <= 0) {
                        localStorage.removeItem("goods");
                        var newLi = $("<li>购物车暂无数据</li>")
                        $(".shoop_list").html(newLi)
                    }
                })
                //  给增加按钮添加点击事件
                $(".miu").on("click", function () {
                    var $this = $(this)
                    var a
                    $.each(goodsArr, function (index, item) {
                        if (item.id == ($this).closest("li").attr("data-id")) {
                            a = item.num++
                        }
                        $this.prev().html(a + 1)
                    })
                    if (a > 1) {
                        $this.prev().prev().attr("disabled", false)
                    }
                    // 更新本地存储
                    localStorage.setItem("goods", JSON.stringify(goodsArr))

                })
                // 给减少按钮添加事件
                $(".plu").on("click", function () {
                    var $this = $(this)
                    var b
                    var id = ($this).closest("li").attr("data-id")
                    for (var i = 0; i < goodsArr.length; i++) {
                        if (goodsArr[i].id == ($this).closest("li").attr("data-id")) {
                            b = goodsArr[i].num--
                            if (b <= 2) {
                                b = 2
                                goodsArr[i].num = 1

                            }
                            $this.next().html(--b)
                        }
                    }

                    // 更新数据
                    localStorage.setItem("goods", JSON.stringify(goodsArr))
                })


                // 给全选按钮添加事件
                $(".listop").on("click", "input", function () {
                    // 判断是否需要全选
                    $(".listop input").each(function (ind, sel) {
                        if (!$(sel).prop("checked")) {
                            $(".all").prop("checked", false)
                            return false
                        }
                        $(".all").prop("checked", true)
                    })
                })
                //给全选添加点击
                $(".all").click(function () {
                    if ($(this).prop("checked")) {
                        $(".all").prop("checked", true)
                        $(".listop input").prop("checked", true)
                    } else {
                        $(".listop input").prop("checked", false)
                        $(".all").prop("checked", false)
                    }
                })
     




            }
        })
    } else {
        var newLi = $("<li>购物车暂无数据</li>")
        $(".shoop_list").html(newLi)
    }

})