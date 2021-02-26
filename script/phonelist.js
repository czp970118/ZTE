$(function () {
    $.ajax({
        url: "../data/listphone1.json",
        type: "get",
        dataType: "json",
        cache: false,
        success: function (json) {
            var domStr = ""
            $.each(json, function (index, item) {
                var news
                if (item.flag === "yes") {
                    news = `<i class="news">新品</i>`
                } else {
                    news = ``
                }
                domStr += `
               <li data-id=${item.id}>
               <a href="./detail.html">
                   <img src="${item.image_src}" alt="">
                   <p class="text">${item.text}</p>
                   <span class="subsc">${item.desc}</span>
                   <em class="price">${item.price}</em>
                    ${news}
               </a>
            </li>
             `
            })
            $(".phone_list .right_list").html(domStr)
        }

    })
    $.ajax({
        url: "../data/listelse.json",
        type: "get",
        dataType: "json",
        cache: false,
        success: function (json) {
            var domStr = ""
            $.each(json, function (index, item) {
                var news
                if (item.flag === "yes") {
                    news = `<i class="news">新品</i>`
                } else {
                    news = ``
                }
                domStr += `
               <li data-id=${item.id}>
               <a href="#">
                   <img src="${item.image_src}" alt="">
                   <p class="text">${item.text}</p>
                   <span class="subsc">${item.desc}</span>
                   <em class="price">${item.price}</em>
                    ${news}
               </a>
            </li>
             `
            })
            $(".else_list .right_list").html(domStr)
        }

    })

})