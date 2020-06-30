/**
 * Created by Administrator on 2017/12/9/009.
 */
if (typeof jQuery != 'undefined') {
    //已经加载 jQuery


    +function ($) {
        var backClose = true;
        $(function () {
            $("body").append("" +
                "<div class='dialog-background' ></div>" +
                "<div id='Dialog' hidden >" +
                "   <p class='dialog-meng'>" +
                "       <div class='dialog-title'>" +
                "           <span ></span>" +
                "       </div>" +
                "       <div class='dialog-content'></div>" +
                "   </p>" +
                "   <div class='dialog-foot'>" +
                "       <button class='dialog-ok'>确认</button>" +
                "       <button class='dialog-close'>取消</button>" +
                "   </div>" +
                "</div>" +
                "");
            Dialog = {
                element: {
                    "Dialog": $('#Dialog'),
                    "background": $('#Dialog').parent(),
                    "title": $('#Dialog').find(".dialog-title"),
                    "content": $('#Dialog').find(".dialog-content"),
                    "bottom": $('#Dialog').find(".dialog-foot"),
                    "confirm": $('#Dialog').find(".dialog-ok"),
                    "cancel": $('#Dialog').find(".dialog-close"),
                },
                styles: {
                    "toast": {
                        "Dialog": {
                            "css": [
                                {"top": "45%"},
                            ]
                        },
                        "background": {
                            "css": [
                                {"background": "black"},
                            ]
                        },
                        "title": {
                            "css": [
                                {"display": "none"},
                            ]
                        },
                        "content": {
                            "css": [
                                {"color": "#FFF"},
                                {"background": "rgba(0,0,0,.7)"},
                            ]
                        },
                        "bottom": {
                            "css": [
                                {"display": "none"},
                            ]
                        },
                        "cancel": {
                            "js": [
                                function () {
                                    setTimeout(function () {
                                        Dialog.close()
                                    }, 3000);
                                },
                                function () {
                                    console.log("第二个事件");
                                },
                            ]
                        }
                    }
                },
                titleColor: function (color) {
                    $('#Dialog').find(".dialog-title").css("color", color);
                },
                tableColor: function (color) {
                    $('#Dialog').find(".dialog-table").css("color", color);
                },
                table: function (json) {
                    backClose = json.backClose == null ? backClose : json.backClose;
                    var title = json.title;
                    var data = json.data;
                    var oddColor = json.oddColor;
                    var headColor = json.headColor;
                    var titleColor = json.titleColor == null ? 'dodgerblue' : json.titleColor;
                    var h = "<table class='dialog-table'><tr>";
                    for (var i = 0; i < data.title.length; i++) {
                        h += "<th>" + data.title[i] + "</th>";
                    }
                    h += "</tr>";
                    for (var i = 0; i < data.content.length; i++) {
                        h += "<tr>";
                        for (var j = 0; j < data.content[i].length; j++) {
                            h += "<td>" + data.content[i][j] + "</td>";
                        }
                        h += "</tr>";
                    }
                    h += "</table>";
                    var func = json.func;
                    Dialog.show(title, h, func);

                    $(".dialog-table").css("border-collapse", "collapse").css("border", "2px solid #0094ff").css("margin", "10px auto").css("text-align", "center");
                    $(".dialog-table").find("th").css("padding", "10px").css("border", "1px solid #0094ff");
                    $(".dialog-table").find("tr").css("padding", "10px").css("border", "1px solid #0094ff");
                    $(".dialog-table").find("td").css("padding", "10px").css("border", "1px solid #0094ff");
                    $(".dialog-title span").css("color", titleColor);
                    $(".dialog-table").find("th").css("background-color", headColor);
                    $(".dialog-table").find('tr:nth-child(odd)').css("background-color", oddColor);
                    $("#Dialog").css("left", (window.innerWidth - $("#Dialog").width()) / 2);
                },
                show: function (title, content, func) {
                    $("#Dialog").find(".dialog-title span").html(title);
                    $("#Dialog").find(".dialog-content").html(content);
                    if (typeof (func) == "function") {
                        $("#Dialog").find(".dialog-ok").unbind('click').bind('click', func);
                    }
                    $("#Dialog").css("left", (window.innerWidth - $("#Dialog").width()) / 2);
                    $(".dialog-background").show();
                    $("#Dialog").show();
                },
                backClose: function (obj) {
                    backClose = obj == null ? backClose : obj;
                },
                close: function () {
                    $('.dialog-background').hide();
                    $('#Dialog').hide();
                },
                style: function (type) {
                    var styles = Dialog.styles[type];
                    if (styles) {
                        for (var s in styles) {
                            if (styles[s].css) {
                                for (var i = 0; i < styles[s].css.length; i++) {
                                    Dialog.element[s].css(styles[s].css[i]);
                                }
                            }
                            if (styles[s].js) {
                                for (var i = 0; i < styles[s].js.length; i++) {
                                    if (typeof (styles[s].js[i]) == "function") {
                                        styles[s].js[i].call();
                                    }
                                    if (typeof (styles[s].js[i]) == "string") {
                                        eval(styles[s].js[i]);
                                    }
                                }
                            }
                        }
                    } else {
                        $("#Dialog").css("border-radius", "5px")
                            .css("box-shadow", "5px 5px 20px 0px  #909090")
                            .css("z-index", 1000)
                            .css("background-color", "#FFFFFF")
                            .css("top", "20px")
                            .css("margin", "0px auto")
                            .css("padding", " 0px auto")
                            .css("position", "absolute");/*.css("min-width","500px").css("min-height","150px");*/
                        $(".dialog-title").css("font-size", "large")
                            .css("color", "dodgerblue")
                            .css("border-bottom", "1px solid cornflowerblue")
                            .css("text-align", "center")
                            .css("padding", "5px");
                        $(".dialog-content").css("text-align", "left")
                            .css("padding", "10px")
                            .css("min-width", "300px")
                            .css("min-height", "50px");
                        $(".dialog-foot")
                            .css("border-top", "1px solid cornflowerblue")
                            .css("text-align", " right")
                            .css("padding", "5px");/*.css("bottom","0px").css("margin-bottom","0px");*/
                        $(".dialog-background").css("display", "none")
                            .css("position", "absolute")
                            .css("width", "100%")
                            .css("height", "100%")
                            .css("z-index", 900)
                            .css("background-color", "#222222")
                            .css("opacity", 0.3)
                            .css("margin", "0px")
                            .css("left", "0px")
                            .css("top", "0px");
                        $(".dialog-meng").css("border-radius", "5px")
                            .css("z-index", 990)
                            .css("opacity", 0.1);
                    }
                }
            };
            Dialog.style();
            $(Dialog.element.cancel).click(function () {
                Dialog.close()
            });
            $(window).resize(function () {
                if (!$(Dialog.element.Dialog).hidden) {
                    $(Dialog.element.Dialog).css("left", (window.innerWidth - $(Dialog.element.Dialog).width()) / 2);
                }
                var btnLocal = $(Dialog.element.cancel).left;
                if ($(window).innerWidth() < btnLocal) {
                    $(Dialog.element.bottom).css("text-align", "center");
                } else {
                    $(Dialog.element.bottom).css("text-align", "right");
                }

            });
            $(Dialog.element.background).click(function () {
                if (backClose) {
                    Dialog.close();
                }

            });
        })
    }(jQuery);

} else {
    console.error("Dialog.js:请先引入jQuery");
}


/*Dialog.table({
    backClose: false,
    oddColor: 'orange',
    headColor: 'springgreen',
    titleColor: 'red',
    title: '哈哈哈哈',
    data: {
        title: [
            '标题1', '标题2', '标题3', '标题4', '标题5', '标题6', '标题7', '标题8'
        ],
        content: [
            ['1', '2', '3', '4', '5', '6', '7', '8'],
            ['2', '2', '3', '4', '5', '6', '7', '8'],
            ['3', '2', '3', '4', '5', '6', '7', '8'],
            ['4', '2', '3', '4', '5', '6', '7', '8'],
            ['5', '2', '3', '4', '5', '6', '7', '8'],
            ['6', '2', '3', '4', '5', '6', '7', '8'],
            ['7', '2', '3', '4', '5', '6', '7', '8'],
            ['8', '2', '3', '4', '5', '6', '7', '8'],
            ['9', '2', '3', '4', '5', '6', '7', '8'],
            ['10', '2', '3', '4', '5', '6', '7', '8']
        ]
    },
    func: function () {
        Dialog.close();
    }
});*/
