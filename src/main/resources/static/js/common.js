/**
 * Created by Gatico on 2018/03/12/.
 */
//console.log('------------');
var base = "";

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

/**modal关闭打开调用事件
 *参数
 * */
$(function () {
    $('.modal').on('hide.bs.modal', function () {
        // 执行一些动作...
        $("input,select,textarea").each(function () {
            $(this).popover('hide');
        });
        //$(".modal-content").empty();
    })
    $('.modal').on('shown.bs.modal', function () {
        // 执行一些动作...
        var s = setTimeout(function () {
            required();
            clearTimeout(s);
            temp = true;
        }, 100);
        var i = setTimeout(function () {
            required();
            clearTimeout(i);
            temp = true;
        }, 500);

    })
});

var aaa = true;
var aaa1 = true;
var sss;
var ddd;
var sss1;
var ddd1;
var sss2;
var ddd2;
var sss3;
var ddd3;

/**定时器调用事件
 * */
function myInterval() {
    if (table != null) {
        $(table).parent().css("width", $("." + table.attr("id") + "_1").width());
    }
    ddd = setTimeout(function () {
        clearInterval(sss);
    }, 1000);
}

/**定时器调用事件
 * */
function myInterval1() {
    if (table != null) {
        $(table).parent().css("width", $("." + table.attr("id") + "_1").width());
    }
    ddd1 = setTimeout(function () {
        clearInterval(sss1);
    }, 1000);
}

/**定时器调用事件
 * */
function myInterval2() {
    if (table != null) {
        $(table).parent().css("width", $("." + table.attr("id") + "_1").width());
    }
    ddd2 = setTimeout(function () {
        clearInterval(sss2);
    }, 1000);
}

/**定时器调用事件
 * */
function myInterval3() {
    if (table != null) {
        $(table).parent().css("width", $("." + table.attr("id") + "_1").width());
    }
    ddd3 = setTimeout(function () {
        clearInterval(sss3);
    }, 1000);
}

function alertMsg(text, flag, title) {
    $.toast({
        heading: title || "操作提示",
        text: text,
        position: 'top-center',
        loaderBg: '#fff',
        icon: flag ? "success" : "error",
        hideAfter: 5000,
        stack: 1
    });
}

/**校验
 */
function required() {
    $("input,select,textarea").each(function () {
        if ($(this).attr("required")) {
            var msg = "";
            var type = $(this).attr("datatype");
            switch (type) {
                case 'string':
                    msg = "请输入正确的字符";
                    break;
                case 'number':
                    msg = "请输入正确的数字";
                    break;
                case 'taxrate':
                    msg = "请输入正确的税率";
                    break;
                case 'acip':
                    msg = "请输入正确的IP";
                    break;
                case 'proportion':
                    msg = "请输入正确的比例";
                    break;
                case 'money':
                    msg = "请输入正确的金额";
                    break;
                case 'date':
                    msg = "请输入正确的日期";
                    break;
                case 'time':
                    msg = "请输入正确的时间";
                    break;
                case 'select':
                    msg = "请选择正确的选项";
                    break;
                case 'phone':
                    msg = "请输入正确的号码";
                    break;
                case 'idcode':
                    msg = "请输入正确的证件号";
                    break;
                case 'postcode':
                    msg = "请输入正确的邮编";
                    break;
                case 'string-english':
                    msg = "输入内容只能是字母数字";
                    break;
                case 'string-chinese':
                    msg = "输入内容只能是汉字";
                    break;
                case 'email':
                    msg = "请输入正确的邮箱";
                    break;
                case 'null':
                    msg = "不能为空";
                    break;
                default:
                    msg = "请输入正确的格式";
                    break;
            }
            var alt = "";
            if ($(this).attr("message")) {
                alt = "请输入" + $(this).attr("message");
            } else {
                alt = "请输入正确的数据";
            }
            $(this).attr("placeholder", alt);
//			if('money'==type){
//				$(this).attr("onchange","if($(this).val()!=''){if(/^\d+(\.\d+)$/.test($(this).val())){$(this).val(Number($(this).val()).toFixed(2));}$(this).popover('hide');}else{$(this).popover('show');}");
//			}else{
//				$(this).attr("onchange","if($(this).val()!=''){$(this).popover('hide');}else{$(this).popover('show');}");
//			}
            $(this).attr("data-content", msg);
            $(this).attr("data-toggle", "popover");
            $(this).attr("data-placement", "right");
            $(this).attr("data-container", "body");
            //$(this).attr("title","提示");

        }

    });
    $("[required='true']").change(function () {
        if ('money' == $(this).attr("datatype")) {
            $(this).val((Number($(this).val().replace(/[\,]/g, "")).toFixed(2)));
            //console.log($(this).val())
            if (!vilited($(this).attr("datatype"), $(this))) {
                $(this).css("border-color", "red");
                $(this).popover('show');
            } else {
                $(this).css("border-color", "green");
                $(this).popover('hide');
            }
            if (/^\d+(\.[0-9][0-9])$/.test($(this).val())) {
                var moneynum = Number($(this).val()).toFixed(2);
                var result = moneynum.split(".");
                result[0] = formatNumber(result[0]);
                $(this).val(result[0] + "." + result[1]);
            }
            return;
        }
        if (!vilited($(this).attr("datatype"), $(this))) {
            $(this).css("border-color", "red");
            $(this).popover('show');
        } else {
            $(this).css("border-color", "green");
            $(this).popover('hide');
        }
    });
}


/**校验2
 */
function required1() {
    $("input,select,textarea").each(function () {
        if ($(this).attr("required")) {
            var msg = "";
            var type = $(this).attr("datatype");
            switch (type) {
                case 'string':
                    msg = "请输入正确的字符";
                    break;
                case 'number':
                    msg = "请输入正确的数字";
                    break;
                case 'taxrate':
                    msg = "请输入正确的税率";
                    break;
                case 'acip':
                    msg = "请输入正确的IP";
                    break;
                case 'proportion':
                    msg = "请输入正确的比例";
                    break;
                case 'money':
                    msg = "请输入正确的金额";
                    break;
                case 'date':
                    msg = "请输入正确的日期";
                    break;
                case 'time':
                    msg = "请输入正确的时间";
                    break;
                case 'select':
                    msg = "请选择正确的选项";
                    break;
                case 'phone':
                    msg = "请输入正确的号码";
                    break;
                case 'idcode':
                    msg = "请输入正确的证件号";
                    break;
                case 'postcode':
                    msg = "请输入正确的邮编";
                    break;
                case 'string-english':
                    msg = "输入内容只能是字母数字";
                    break;
                case 'string-chinese':
                    msg = "输入内容只能是汉字";
                    break;
                case 'email':
                    msg = "请输入正确的邮箱";
                    break;
                case 'null':
                    msg = "不能为空";
                    break;
                default:
                    msg = "请输入正确的格式";
                    break;
            }
            var alt = "";
            if ($(this).attr("message")) {
                alt = "请输入" + $(this).attr("message");
            } else {
                alt = "请输入正确的数据";
            }
            $(this).attr("placeholder", alt);
//			if('money'==type){
//				$(this).attr("onchange","if($(this).val()!=''){if(/^\d+(\.\d+)$/.test($(this).val())){$(this).val(Number($(this).val()).toFixed(2));}$(this).popover('hide');}else{$(this).popover('show');}");
//			}else{
//				$(this).attr("onchange","if($(this).val()!=''){$(this).popover('hide');}else{$(this).popover('show');}");
//			}
            $(this).attr("data-content", msg);
            $(this).attr("data-toggle", "popover");
            $(this).attr("data-placement", "left");
            $(this).attr("data-container", "body");
            //$(this).attr("title","提示");
        }

    });
    $("[required='true']").change(function () {
        if ('money' == $(this).attr("datatype")) {
            $(this).val((Number($(this).val().replace(/[\,]/g, "")).toFixed(2)));
            //console.log($(this).val())
            if (!vilited($(this).attr("datatype"), $(this))) {
                $(this).css("border-color", "red");
                $(this).popover('show');
            } else {
                $(this).css("border-color", "green");
                $(this).popover('hide');
            }
            if (/^\d+(\.[0-9][0-9])$/.test($(this).val())) {
                var moneynum = Number($(this).val()).toFixed(2);
                var result = moneynum.split(".");
                result[0] = formatNumber(result[0]);
                $(this).val(result[0] + "." + result[1]);
            }
            return;
        }
        if (!vilited($(this).attr("datatype"), $(this))) {
            $(this).css("border-color", "red");
            $(this).popover('show');
        } else {
            $(this).css("border-color", "green");
            $(this).popover('hide');
        }
    });
}

/**formatNumber 请求
 * 千分位校验
 *
 * */
function formatNumber(num) {
    return ("" + num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
}

/**asyncAjax  异步post请求
 * 参数
 * para     json格式参数
 * callback    回调函数
 * */
function asyncAjax(para, callback, options) {
    var url = base + "/servlet/mainGateServlet";
    $.ajax({
        url: url,
        data: para,
        dataType: "json",
        type: "post",
        success: function (data) {
            callback(data, options);
        }
    });
};

/**commonAjax  同步get请求
 * 参数
 *
 * para     json格式参数
 * callback    回调函数
 * options 失败执行
 * */
function commonAjax(url, para, callback) {
    $.ajax({
        url: base + "/servlet/mainGateServlet?" + url,
        data: para,
        dataType: "json",
        type: "get",
        async: false,
        success: function (data) {
            callback(data);
        }
    });
};

/**提示并提交信息
 * 参数
 * title  显示头部信息
 * content  显示内容
 * func 回调方法
 */
function Dialog_Submit(title, content, func) {
    swal({
        title: title,
        text: content,
        type: "info",
        showCancelButton: true,
        cancelButtonClass: 'btn-secondary  ',
        confirmButtonClass: 'btn-primary  ',
        confirmButtonText: '确定',
        cancelButtonText: "取消",
    }, function (isConfirm) {
        if (isConfirm) {
            func();
        } else {

        }
    });
}

/**主页面加载
 * 参数
 * id   需要加载的ID名称
 * url  需要跳转的路径
 * type 获取当前元素对象
 */
function add1(id, url, type) {
    $("body").find(".popover").popover('hide');
    if (type) {
        $(".nav-second-level").find("a").css("color", "#666");
        $(".nav-second-level").find("a").attr("datatype", "false");
        $(type).css("color", "#23b7e5");
        $(type).attr("datatype", "true");
    }
    $(".nav-second-level").find("a").hover(function () {
        $(this).css("color", "#23b7e5");
    }, function () {
        if ($(this).attr("datatype") == "true") {
            $(this).css("color", "#23b7e5");
        } else {
            $(this).css("color", "#666");
        }
    })
    if (name) {
        $(".nav-second-level").find("a").each(function () {
            if ($(this).html() == name) {
                $(this).css("color", "#23b7e5");
            }
        })
    }
    $(id).empty();
    $(id).load(url);
    required();
}

/**主页面加载
 * 参数
 * id   需要加载的ID名称
 * url  需要跳转的路径
 *
 */
function add(id, url) {
    $(id).empty();
    $(id).load(url);
}

/**文件上传
 * 参数
 * TRANSCODE  权限代码
 * typecode  参数名称
 *
 */
function fileupload(TRANSCODE, typecode) {
    var url = "?TRANSCODE=" + TRANSCODE + "&JSONFLAG=YES&isjson=true";
    var input = document.getElementById(typecode);
    var files = input.files;
    var formFile = new FormData();
    for (var i in files) {
        var file = files[i];
        if (file.type != undefined) {
            formFile.append("file", file); //加入文件对象
        }
    }
    //第一种  XMLHttpRequest 对象
    //var xhr = new XMLHttpRequest();
    //xhr.open("post", "/Admin/Ajax/VMKHandler.ashx", true);
    //xhr.onload = function () {
    //    alert("上传完成!");
    //};
    //xhr.send(formFile);

    //第二种 ajax 提交

    var data = formFile;
    $.ajax({
        url: base + "/servlet/mainGateServlet" + url,
        data: data,
        type: "Post",
        dataType: "json",
        cache: false,//上传文件无需缓存
        processData: false,//用于对data参数进行序列化处理 这里必须false
        contentType: false,//必须false
        success: function (result) {
            if (result.state == 1) {
                /*清空input的值*/
                input.value = "";
                $.toast({
                    heading: '成功提示',
                    text: result.speed == "" ? "" : '速度:' + result.speed + "</br>文件个数:" + result.count + "</br>用时:" + result.time + "s",
                    position: 'top-center',
                    loaderBg: '#fff',
                    icon: 'success',
                    hideAfter: 5000,
                    stack: 1
                });
            } else {
                $.toast({
                    heading: '消息提示',
                    text: '上传失败,请重试',
                    position: 'top-center',
                    loaderBg: '#fff',
                    icon: 'error',
                    hideAfter: 10000,
                    stack: 1
                });
            }

        },
    })
    /*$.ajax({
        url: base+"/servlet/mainGateServlet" + url,
        dataType: "json",
        type: "post",
        async: true,
        success: function(data) {
            if(data[0].responseCode == '' && data[0].responseMessage == '') {
                $.toast({
                    heading: '成功提示',
                    text: '操作成功',
                    position: 'top-center',
                    loaderBg: '#fff',
                    icon: 'success',
                    hideAfter: 2000,
                    stack: 1
                });
            } else {
                //add(".main-content", loadurl);
                $.toast({
                    heading: '消息提示',
                    text: data[0].responseMessage,
                    position: 'top-center',
                    loaderBg: '#fff',
                    icon: 'error',
                    hideAfter: 10000,
                    stack: 1
                });
            }
        }
    });*/
}

/**exc数据导出
 * 参数
 * TRANSCODE  权限代码
 * typecode  参数名称
 *
 */
function excdownload(TRANSCODE, typecode) {
    var url = "?TRANSCODE=" + TRANSCODE + "&JSONFLAG=YES&isjson=true";
    var type = true;
    var result = typecode.split(",");
    var param = {};
    var endurl = "";
    $(table).find("input#ck_id").each(function () {
        if (true == $(this).is(':checked')) {
            $(this).parent().parent().parent().find("td").each(function () {
                for (var i = 0; i < result.length; i++) {
                    if ($(this).attr("name") == result[i]) {
                        if (param[$(this).attr("name")]) {
                            param[$(this).attr("name")] = "" + param[$(this).attr("name")] + "," + $(this).html() + "";
                        } else {
                            param[$(this).attr("name")] = $(this).html();
                        }
                    }
                }
            })
        }
        type = false;
    })
    if (type) {
        Dialog_Error('请选择数据');
    } else {
        for (var i = 0; i < result.length; i++) {
            endurl += '&' + result[i] + '=' + param[result[i]];

        }
        url += endurl;
        $.ajax({
            url: base + "/servlet/mainGateServlet" + url,
            dataType: "json",
            type: "get",
            async: true,
            success: function (data) {
                if (data[0].responseCode == '' && data[0].responseMessage == '') {
                    $.toast({
                        heading: '成功提示',
                        text: '操作成功',
                        position: 'top-center',
                        loaderBg: '#fff',
                        icon: 'success',
                        hideAfter: 2000,
                        stack: 1
                    });
                    window.location.href = base + data[0].file;
                } else {
                    //add(".main-content", loadurl);
                    $.toast({
                        heading: '消息提示',
                        text: data[0].responseMessage,
                        position: 'top-center',
                        loaderBg: '#fff',
                        icon: 'error',
                        hideAfter: 10000,
                        stack: 1
                    });
                }
            }
        });
    }
}

/** 保存
 * 参数
 * TRANSCODE  权限代码
 * tree 树形class
 * cino 参数
 *
 *
 */
function tempsave(TRANSCODE, tree, cino, tbid) {
    var url = "?TRANSCODE=" + TRANSCODE + "&JSONFLAG=YES&isjson=true";
    var type = true;
    var conurl = "";
    var tempurl = "";
    var temp = false;
    $("." + tree + "").find(".jstree-clicked").each(function () {
        if ($(this).attr("value") != undefined) {
            if (tempurl == "") {
                tempurl = $(this).attr("name");
            }
            if (conurl == "") {
                conurl += $(this).attr("value");
            } else {
                conurl += "," + $(this).attr("value");
            }
            temp = true;
        }
    })
    if (temp) {
        $("." + tree + "").find(".jstree-undetermined").parent().each(function () {
            if ($(this).attr("value") != undefined) {
                conurl += "," + $(this).attr("value");
            }
        })
    }
    url += '&' + tempurl + '=' + conurl;
    if (cino) {
        url += '&' + cino;
    }
    //console.log(url);
    /*if(treedata){
        url += '&data='+treedata.substring(0, treedata.length-1);
    }*/
    //console.log("----url----"+url)
    $.ajax({
        url: base + "/servlet/mainGateServlet" + url,
        dataType: "json",
        type: "post",
        data: {"data": treedata.substring(0, treedata.length - 1)},
        async: true,
        success: function (data) {
            if (data[0].responseCode == "" || data[0].responseCode == "0000") {
                if (tbid == false) {
                } else if (tbid) {
                    $(TABLE[tbid].table).relfush();
                    $("#modal").modal("hide");
                    $(".modal-content").empty();
                } else {
                    $(table).relfush();
                    $("#modal").modal("hide");
                    $(".modal-content").empty();
                }

                $.toast({
                    heading: '成功提示',
                    text: '操作成功',
                    position: 'top-center',
                    loaderBg: '#fff',
                    icon: 'success',
                    hideAfter: 2000,
                    stack: 1
                });
            } else {
                $.toast({
                    heading: '消息提示',
                    text: data[0].responseMessage,
                    position: 'top-center',
                    loaderBg: '#fff',
                    icon: 'error',
                    hideAfter: 10000,
                    stack: 1
                });
            }
        }
    });
}

/**选择带回
 * 参数
 * TRANSCODE  权限代码
 * menuid 菜单ID
 * typecode  参数名称
 * tbid  table的ID
 *
 */
function save(TRANSCODE, menuid, typecode, tbid) {
    var url = "?TRANSCODE=" + TRANSCODE + "&JSONFLAG=YES&isjson=true";
    var type = true;
    var result = typecode.split(",");
    var param = {};
    var endurl = "";
    $(table).find("input#ck_id").each(function () {
        if (true == $(this).is(':checked')) {
            $(this).parent().parent().parent().find("td").each(function () {
                for (var i = 0; i < result.length; i++) {
                    if ($(this).attr("name") == result[i]) {
                        if (param[$(this).attr("name")]) {
                            param[$(this).attr("name")] = "" + param[$(this).attr("name")] + "," + $(this).html() + "";
                        } else {
                            param[$(this).attr("name")] = $(this).html();
                        }
                    }
                }
            })
            type = false;
        }

    })
    if (type) {
        Dialog_Error('请选择数据');
    } else {
        if (menuid) {
            url += '&' + 'menuid' + '=' + menuid;
        }
        for (var i = 0; i < result.length; i++) {
            endurl += '&' + result[i] + '=' + param[result[i]];

        }
        url += endurl;
        $.ajax({
            url: base + "/servlet/mainGateServlet" + url,
            dataType: "json",
            type: "get",
            async: true,
            success: function (data) {
                if (data[0].responseCode == '' && data[0].responseMessage == '') {
                    if (tbid == false) {
                    } else if (tbid) {
                        $(TABLE[tbid].table).relfush();
                    } else {
                        $(table).relfush();
                    }
                    $("#modal").modal("hide");
                    $(".modal-content").empty();
                    $.toast({
                        heading: '成功提示',
                        text: '操作成功',
                        position: 'top-center',
                        loaderBg: '#fff',
                        icon: 'success',
                        hideAfter: 2000,
                        stack: 1
                    });
                } else {
                    //add(".main-content", loadurl);
                    $.toast({
                        heading: '消息提示',
                        text: data[0].responseMessage,
                        position: 'top-center',
                        loaderBg: '#fff',
                        icon: 'error',
                        hideAfter: 10000,
                        stack: 1
                    });
                }
            }
        });
    }
}

/**选择带回
 * 参数
 * TRANSCODE  权限代码
 * menuid 菜单ID
 * typecode  参数名称
 * tbid  table的ID
 *
 */
function ajaxsave(TRANSCODE, menuid, typecode, tbid) {
    var url = "?TRANSCODE=" + TRANSCODE + "&JSONFLAG=YES&isjson=true";
    var type = true;
    var result = typecode.split(",");
    var param = {};
    var endurl = "";
    $(table).find("input#ck_id").each(function () {
        if (true == $(this).is(':checked')) {
            $(this).parent().parent().parent().find("td").each(function () {
                for (var i = 0; i < result.length; i++) {
                    if ($(this).attr("name") == result[i]) {
                        if (param[$(this).attr("name")]) {
                            param[$(this).attr("name")] = "" + param[$(this).attr("name")] + "," + $(this).html() + "";
                        } else {
                            param[$(this).attr("name")] = $(this).html();
                        }
                    }
                }
            })
            type = false;
        }

    })
    if (type) {
        Dialog_Error('请选择数据');
    } else {
        if (menuid) {
            url += '&' + 'menuid' + '=' + menuid;
        }
        for (var i = 0; i < result.length; i++) {
            endurl += '&' + result[i] + '=' + param[result[i]];

        }
        url += endurl;
        $.ajax({
            url: base + "/servlet/mainGateServlet" + url,
            dataType: "json",
            type: "get",
            async: false,
            success: function (data) {
                if (data[0].responseCode == '' && data[0].responseMessage == '') {
                    if (tbid == false) {
                    } else if (tbid) {
                        $(TABLE[tbid].table).relfush();
                    } else {
                        $(table).relfush();
                    }
                    $("#modal").modal("hide");
                    $(".modal-content").empty();
                    $.toast({
                        heading: '成功提示',
                        text: '操作成功',
                        position: 'top-center',
                        loaderBg: '#fff',
                        icon: 'success',
                        hideAfter: 2000,
                        stack: 1
                    });
                } else {
                    //add(".main-content", loadurl);
                    $.toast({
                        heading: '消息提示',
                        text: data[0].responseMessage,
                        position: 'top-center',
                        loaderBg: '#fff',
                        icon: 'error',
                        hideAfter: 10000,
                        stack: 1
                    });
                }
            }
        });
    }
}

/**获取当前时间日期
 * 参数
 * 0  yy-mm-dd
 * 1  yy-mm-dd  hh:mm:ss
 */
function getdate(num) {
    var dayObj = new Date();
    switch (num) {
        case 0:
            monthStr = dayObj.getMonth() >= 9 ? dayObj.getMonth() + 1 : "0" + (dayObj.getMonth() + 1);
            dateStr = dayObj.getDate() >= 9 ? dayObj.getDate() : "0" + (dayObj.getDate() + 1);
            year2000 = dayObj.getYear() + 1900;
            if (year2000 > 3899) year2000 = year2000 - 1900;
            return (year2000 + "-" + monthStr + "-" + dateStr);
        case 1:
            monthStr = dayObj.getMonth() + 1;
            year2000 = dayObj.getYear() + 1900;
            if (year2000 > 3899) year2000 = year2000 - 1900;
            return (year2000 + "-" + monthStr + "-" + dayObj.getDate() + dayObj.getHours() + dayObj.getMinutes() + dayObj.getSeconds());
    }
}

/**成功提示信息
 * 参数
 * content  提示内容
 */
function Dialog_Success(content) {
    swal("", content, "success");
}

/**失败提示信息
 * 参数
 * content  提示内容
 */
function Dialog_Error(content) {
    swal("", content, "error");
}

/**窗口关闭
 */
function Modal_Close() {
    $(".modal").modal("close");

}

/**弹出窗口
 * 参数
 * url  需要跳转的路径
 * height 自定义高度(可使用默认高度)
 * width  自定义宽度(可使用默认宽度)
 */
function Modal_Dialog(url, height, width) {
    $(".modal").modal("show");
    $(".modal-tree").hide();
    if (height) {
        $(".modal-content").css("height", height);
    } else {
        $(".modal-content").css("height", "0");
    }
    if (width) {
        $(".modal-dialog").css("width", width);
    } else {
        $(".modal-dialog").css("width", "600px");
    }
    add1(".modal-content", url);
}

/**表格弹出层
 * 参数
 * url  需要跳转的路径
 * height 自定义高度(可使用默认高度)
 * width  自定义宽度(可使用默认宽度)
 * type  需要传递的参数名称
 */
function Modal_Dialog1(url, height, width, type) {
    $(".modal-tree").hide();
    if (height) {
        $(".modal-content").css("height", height);
    } else {
        $(".modal-content").css("height", "0");
    }
    if (width) {
        $(".modal-dialog").css("width", width);
    } else {
        $(".modal-dialog").css("width", "600px");
    }
    if (type) {
        url += "?" + type + "=" + $("#" + type).val();
    }
    add1(".modal-content", url);
    $(".modal").modal("show");
}

/**打开第二层表格
 * 参数
 * url  需要跳转的路径
 * val  需要传参的内容
 * menuid  刷新页面需要的菜单条件(特殊使用)
 *
 */
function Modal_Tb(url, val, menuid) {
    if (menuid) {
        cinourl = $("#rolename").val();
        url += "?" + val + "=" + cinourl;
        url += "&menuid" + "=" + menuid;
        alert(url)
        add1(".modal-tree", url);
    } else {
        if ($(".modal-tree").is(":hidden")) {
            add1(".modal-tree", url);
            $(".modal-tree").fadeIn(300);
        } else {
            $(".modal-tree").width($(".modal-content").width());
            $(".modal-tree").fadeOut(300);
        }
    }
}

/**菜单tree选择
 * 参数
 * url  需要跳转的路径
 *
 */
function Modal_Tree(url) {
    if ($(".modal-tree").is(":hidden")) {
        add1(".modal-tree", url);
        $(".modal-tree").fadeIn(300);
    } else {

        $(".modal-tree").fadeOut(300);
    }
    //$(".modal-tree"). slideDown();
}

/**菜单tree关闭
 *
 */
function tree_close() {
    $(".modal-tree").fadeToggle();
}

/**菜单选择带回
 * 参数
 * name  需要传参的名字
 * type  需要传参的内容
 * url  需要跳转的路径
 *
 */
function tree_true(name, type, url, area) {
    $("body").find(".popover").popover('hide');
    if (url) {
        //console.log(url);
        tree_content("menuid", type, url)
    } else {
        if (area == "area") {
            var para = {
                TRANSCODE: "SYS_SelectSQL",
                USERCODE: "super",
                JSONFLAG: "YES",
                MOBILE: "YES",
                isjson: "true",
                sql: "select * from pubareatb where areacode=" + type,
            }
            var callback = function (data) {
                if (data[0]["areadiv"] == "2") {
                    var para = {
                        TRANSCODE: "SYS_SelectSQL",
                        USERCODE: "super",
                        JSONFLAG: "YES",
                        MOBILE: "YES",
                        isjson: "true",
                        sql: "select concat(a.areaname,'/',b.areaname,'/',c.areaname) areaname from pubareatb a "
                            + " left JOIN pubareatb b on a.advareacode=b.areacode"
                            + " left join pubareatb c on b.advareacode = c.areacode"
                            + " where a.areacode='" + data[0]["areacode"] + "'",
                    }
                    asyncAjax(para, callback1);
                } else {
                    $(".menuname").val(data[0]["areaname"]);
                }
            }
            var callback1 = function (data) {
                $(".menuname").val(data[0]["areaname"]);
            }
            asyncAjax(para, callback);
            $(".menuid").val(type);
            $(".modal-tree").fadeToggle();
        } else {
            $(".menuname").val(name);
            $(".menuid").val(type);
            $(".modal-tree").fadeToggle();
        }
    }
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
}


function SYS_SelectSQL(sql, selid, datacode1, DATALABLE1) {
    var b = sql;
    var para = {
        TRANSCODE: "SYS_SelectSQL",
        USERCODE: "super",
        JSONFLAG: "YES",
        MOBILE: "YES",
        isjson: "true",
        sql: encodeURI(b),
    }
    var selinner = ""
    var callback = function (data) {
        var opts = "";
        $.each(data, function (n, value) {
            var opt = "";
            opt += "<option value=\"" + value[datacode1] + "\">" + value[DATALABLE1] + "</option> ";
            opts += opt;
            return opts;
        });
        selinner = opts
        selid.html(selinner)
        return selinner;
    }
    asyncAjax(para, callback);
}


/**菜单跳转链接
 * 参数
 * typename  需要传参的名字
 * type  需要传参的内容
 *
 */
function tree_content(typename, type, url) {
    if (url.indexOf("?") > 0) {
        url += "&" + typename + "=" + type;
    } else {
        url += "?" + typename + "=" + type;
    }
    $(".tree_content").empty();
    $(".tree_content").load(url);
}

/**页面数据修改方法
 * 参数
 * url  需要跳转的路径
 * param  需要传递的参数(用逗号隔开)
 * height 自定义高度，可以使用默认高度
 * width  自定义宽度，可以使用默认宽度
 *
 */
function edit(url, param, height, width) {
    var count = 0;
    $("input#ck_id").each(function () {
        if (true == $(this).is(':checked')) {
            count++;
        }
    });
    if (count != 1) {
        Dialog_Error('请选择一条数据');
    } else {
        if (height) {
            $(".modal-content").css("height", height);
        } else {
            $(".modal-content").css("height", "0");
        }
        if (width) {
            $(".modal-dialog").css("width", width);
        } else {
            $(".modal-dialog").css("width", "600px");
        }
        $('#modal').modal('show');
        var cinourl = "";
        var endurl = "";
        var result = param.split(",");
        $(".checked").parent().parent().find("td").each(function () {
            for (var i = 0; i < result.length; i++) {
                if ($(this).attr("name") == result[i]) {
                    cinourl = $(this).html();
                    endurl += '&' + result[i] + '=' + cinourl;
                }
            }
        })
        url += "?" + endurl.substring(1, endurl.length);
        add1(".modal-content", url);
    }
}

/**第二层表格的打开方法
 * 参数
 * url  需要跳转的url
 *
 */
function tablesecond(url) {
    add1(".modal-tree", url);
    $(".modal-tree").fadeIn(300);
}

/**获取form表单数据调用方法
 * 参数
 * title  弹出框标题
 * content  弹出框内容
 * formId  form的id属性
 * url  需要跳转返回的url
 *
 */
function serializeForm(formId) {
    var param = {};
    $("#" + formId).find("input,select,textarea").each(function () {
        if ($(this).attr("datatype") == "money") {
            var str = $(this).val();
            var n = str.indexOf(',');
            while (n > 0) {
                str = str.substring(0, n) + str.substring(n + 1);
                n = str.indexOf(',');
            }
            param[$(this).attr("name")] = str;
        } else if ($(this).prop("type") == "radio") {
            if ($(this).is(":checked")) {
                param[$(this).attr("name")] = $(this).val();
            }
        } else if ($(this).prop("type") == "checkbox") {
            if ($(this).is(":checked")) {
                if (param[$(this).attr("name")]) {
                    param[$(this).attr("name")] = param[$(this).attr("name")] + "," + $(this).val();
                } else {
                    param[$(this).attr("name")] = $(this).val();
                }
            }
        } else {
            param[$(this).attr("name")] = $(this).val();
        }
    });
    return param;
}


/**提交
 * 参数
 * title  弹出框标题
 * content  弹出框内容
 * formId  form的id属性
 * url  需要跳转返回的url
 *
 */
function submit_data(title, content, formId, tbid, url, relfushid) {
    var para = serializeForm(formId);
    console.log(para)
    console.log(para)
    //console.log(para)
    var checked = $("#" + formId).required();
    /*$("#"+formId).find("input,select,textarea").each(function(){
        if($(this).attr("required")){
                var type=$(this).attr("datatype");
                var result=vilited(type,$(this));
                if(!result){
                    $(this).css("border-color","red");
                    $(this).popover('show');
                    count++;
                }else{
                    $(this).css("border-color","green");
                    $(this).popover('hide');
                }
            }
    })*/
    /*if(checked==false) {
        return false;
    }*/
    var callback = function (data, options) {
        //console.log("----"+JSON.stringify(data))
        if (data[0].responseCode == "" || data[0].responseCode == "0000") {
            $('#modal').modal('hide');
            if (url) {

                add1(".tree_content", url);
            } else {
                var i = setTimeout(function () {
                    if (tbid == "false") {
                    } else if (tbid) {
                        $(TABLE[tbid].table).relfush();
                    } else {
                        $(table).relfush();
                    }
                    clearTimeout(i);
                }, 200);
            }
            $.toast({
                heading: '成功提示',
                text: '操作成功',
                position: 'top-center',
                loaderBg: '#fff',
                icon: 'success',
                hideAfter: 2000,
                stack: 1
            });
        } else {
            $.toast({
                heading: '消息提示',
                text: data[0].responseMessage,
                position: 'top-center',
                loaderBg: '#fff',
                icon: 'error',
                hideAfter: 10000,
                stack: 1
            });
        }
        ;
    }
    Dialog_Submit(title, content, function () {
        asyncAjax(para, callback);
    })

}

/**提交
 * 参数
 * title  弹出框标题
 * content  弹出框内容
 * formId  form的id属性
 * url  需要跳转返回的url
 *
 */
function submit_data1(title, content, formId, tbid, url, relfushid) {
    var para = serializeForm(formId);
    //console.log(para)
    var checked = $("#" + formId).required();
    /*$("#"+formId).find("input,select,textarea").each(function(){
        if($(this).attr("required")){
                var type=$(this).attr("datatype");
                var result=vilited(type,$(this));
                if(!result){
                    $(this).css("border-color","red");
                    $(this).popover('show');
                    count++;
                }else{
                    $(this).css("border-color","green");
                    $(this).popover('hide');
                }
            }
    })*/
    /*if(checked==false) {
        return false;
    }*/
    var callback = function (data, options) {
        //console.log("----"+JSON.stringify(data))
        if (data[0].responseCode == "" || data[0].responseCode == "0000") {
            $('#modal').modal('hide');
            if (url) {
                add1(".main-content", url);
            } else {
                var i = setTimeout(function () {
                    if (tbid == "false") {
                    } else if (tbid) {
                        $(TABLE[tbid].table).relfush();
                    } else {
                        $(table).relfush();
                    }
                    clearTimeout(i);
                }, 200);
            }
            $.toast({
                heading: '成功提示',
                text: '操作成功',
                position: 'top-center',
                loaderBg: '#fff',
                icon: 'success',
                hideAfter: 2000,
                stack: 1
            });
        } else {
            $.toast({
                heading: '消息提示',
                text: data[0].responseMessage,
                position: 'top-center',
                loaderBg: '#fff',
                icon: 'error',
                hideAfter: 10000,
                stack: 1
            });
        }
        ;
    }
    Dialog_Submit(title, content, function () {
        asyncAjax(para, callback);
    })

}

function submit_data2(title, content, formId, tbid, url, relfushid) {
    var para = serializeForm(formId);
    console.log(para)
    console.log(para)
    var adjrem = document.getElementById('adjrem').value;
    console.log(adjrem);
    if (adjrem == '') {
        alert("调整说明不能为空");
        return;
    }
    //console.log(para)
    var checked = $("#" + formId).required();
    /*$("#"+formId).find("input,select,textarea").each(function(){
        if($(this).attr("required")){
                var type=$(this).attr("datatype");
                var result=vilited(type,$(this));
                if(!result){
                    $(this).css("border-color","red");
                    $(this).popover('show');
                    count++;
                }else{
                    $(this).css("border-color","green");
                    $(this).popover('hide');
                }
            }
    })*/
    /*if(checked==false) {
        return false;
    }*/
    var callback = function (data, options) {
        //console.log("----"+JSON.stringify(data))
        if (data[0].responseCode == "" || data[0].responseCode == "0000") {
            $('#modal').modal('hide');
            if (url) {

                add1(".tree_content", url);
            } else {
                var i = setTimeout(function () {
                    if (tbid == "false") {
                    } else if (tbid) {
                        $(TABLE[tbid].table).relfush();
                    } else {
                        $(table).relfush();
                    }
                    clearTimeout(i);
                }, 200);
            }
            $.toast({
                heading: '成功提示',
                text: '操作成功',
                position: 'top-center',
                loaderBg: '#fff',
                icon: 'success',
                hideAfter: 2000,
                stack: 1
            });
        } else {
            $.toast({
                heading: '消息提示',
                text: data[0].responseMessage,
                position: 'top-center',
                loaderBg: '#fff',
                icon: 'error',
                hideAfter: 10000,
                stack: 1
            });
        }
        ;
    }
    Dialog_Submit(title, content, function () {
        asyncAjax(para, callback);
    })

}

//分页配置项，与后端接收参数，返回的数据一致
var config = {
    pageSize: "pageSize",
    pageIndex: "pageIndex",
    pageAllCount: "total",
};

/**分页
 * 参数
 * id  table的ID
 * pageIndex  当前页数
 * pageAllCount  所有个数
 * pageIndex 每页显示
 *
 */
function pagecount(id, pageIndex, pageAllCount, pageSize) {
    var dd = TABLE[id];
    var table = dd.table;
    var para = dd.para;
    para[config.pageIndex] = pageIndex;
    para[config.pageSize] = pageSize;
    var currentPageIndex = parseInt(pageIndex);
    var allPageSize = parseInt(pageAllCount % pageSize == 0 ? pageAllCount / pageSize : pageAllCount / pageSize + 1);
    var numno = true;
    var select = '<label style="color:#777;font-weight:normal;" >'
        + '显示 '
        + '<select name="datatable_length" aria-controls="datatable" class="pageNoselect">'
        + '<option value="10">10</option>'
        + '<option value="30">30</option>'
        + '<option value="50">50</option></select> '
        + '条'
        + '</label>';
    $(".dataTables_info").html("第" + currentPageIndex + "页&nbsp;&nbsp;&nbsp;" + select + "&nbsp;&nbsp;&nbsp;共" + pageAllCount + "条");
    var content = "";
    if (currentPageIndex != 1) {
        content += "<a class=\"paginate_button previous\" aria-controls=\"datatable\" data-dt-idx=\"0\" tabindex=\"0\" id=\"datatable_previous\">首页</a><span class=\"pagespan\">";
    }

    if (currentPageIndex > 1) {
        content += "<a class=\"paginate_button up\" aria-controls=\"datatable\" data-dt-idx=\"0\" tabindex=\"0\" id=\"datatable_up\">上一页</a>";
    }

    var pagecount = allPageSize;
    var pageindex = currentPageIndex;
    if (pagecount > 0) {
        var count = 2;
        var beginPage = 1;
        var endPage = pagecount;
        /*if(pageindex<=2||pagecount-pageindex<2){
            count=1;
        }
        */
        if (count * 2 < pagecount) {
            //当前页大于  左边显示的条数 ，说明左边还有还有页码
            if (pageindex - count > 0) {
                beginPage = pageindex - count;
            }
            //如果开始页>（总页数-显示条数）   开始页  就改成  总页数减去 显示条数
            if (beginPage > pagecount - count * 2) {
                beginPage = pagecount - count * 2;
            }
            //结束页-当前页 > 右边显示条数  说明后面还有页码
            if (endPage - pageindex > count) {
                endPage = pageindex + count;
            }
            //如果结束页<小于显示条数，就等于显示条数
            if (endPage < count * 2 + 1) {
                endPage = count * 2 + 1;
            }
        }
        //从开始页开始， 一直到结束页，要大于0页，要小于总页数
        for (var i = beginPage; i <= endPage & i > 0 & i <= pagecount; i++) {
            if (i == pageindex) {
                content += "<a class=\"paginate_button current\" aria-controls=\"datatable\" data-dt-idx='" + i + "' onclick=compage('" + (i) + "',this," + id + ") tabindex=\"0\">" + (i) + "</a>";
            } else {
                content += "<a class=\"paginate_button\" aria-controls=\"datatable\" data-dt-idx='" + i + "' onclick=compage('" + (i) + "',this,'" + id + "') tabindex=\"0\">" + (i) + "</a>";
            }
        }
    }
    if (allPageSize > (currentPageIndex + 2)) {
        content += "<span class=\"ellipsis\">…</span>"
            + "<a class=\"paginate_button\" aria-controls=\"datatable\" data-dt-idx=\"6\" tabindex=\"0\" id=\"datatable_end\">" + allPageSize + "</a>";

    }

    content += "</span>";
    if (allPageSize > currentPageIndex) {
        content += "<a class=\"paginate_button next\" aria-controls=\"datatable\" data-dt-idx=\"7\" tabindex=\"0\" id=\"datatable_next\">下一页</a>";
    }
    content += "<input class=\"pageno_search\" type=\"text\" value=\"" + currentPageIndex + "\" style=\"width:35px;display:inline-block;height:26px;padding:0;text-align:center\" >";

    $("#datatable_paginate").html(content);
    $(".pageNoselect").val(pageSize);
    $(".pagespan").find("a").each(function () {
        if ($(this).html() == currentPageIndex) {
            $(this).attr("class", "paginate_button current");
        }
    })
    //键盘监听事件获取输入值进行页数查询
    $(".pageno_search").keydown(function (event) {
        if (event.keyCode === 13) {
            if (parseInt($(this).val()) < 1) {
                $(this).val(1)
            } else if (parseInt($(this).val()) > allPageSize) {
                $(this).val(allPageSize);
            }
            para[config.pageIndex] = $(this).val();
            $(table).relfush();
        }

    });
    //页数查询
    $(".icon-control-play").click(function () {
        para[config.pageSize] = $(".pageno_search").val();
        $(table).relfush();
    })
    //下一页
    $("#datatable_next").click(function () {
        currentPageIndex += 1;
        para[config.pageIndex] = currentPageIndex;
        $(".ptrbody").html("");
        $(table).relfush();
    })
    //首页
    $("#datatable_previous").click(function () {
        currentPageIndex = 1;
        para[config.pageIndex] = currentPageIndex;
        $(".ptrbody").html("");
        $(table).relfush();
    })
    //上一页
    $("#datatable_up").click(function () {
        currentPageIndex -= 1;
        para[config.pageIndex] = currentPageIndex;
        $(".ptrbody").html("");
        $(table).relfush();
    })
    //最后一页
    $("#datatable_end").click(function () {
        currentPageIndex = allPageSize;
        para[config.pageIndex] = currentPageIndex;
        $(".ptrbody").html("");
        $(table).relfush();
    })
    //每页显示条数
    $(".pageNoselect").change(function () {
        para[config.pageSize] = $(this).val();
        para[config.pageIndex] = "1";
        $(".ptrbody").html("");
        $(table).relfush();
    })

}

/**选择页数
 * 参数
 * num  需要查询的页数
 * type  当前对象
 * id  table的ID
 *
 */
function compage(num, type, id) {
    var dd = TABLE[id];
    var para = dd.para;
    var table = dd.table;
    para[config.pageIndex] = num;
    //console.log(para.cur_pageno)
    $(".ptrbody").html("");
    $(table).relfush();
    $(type).attr("class", "paginate_button current");
}

/**排序
 * 参数
 * type  当前对象
 * id  table的ID
 *
 */
function order(type, id) {
    var ids = $(id).attr("id");
    var dd = TABLE[ids];
    var para = dd.para;
    var table = dd.table;
    para["order"] = $(type).attr("name");
    var ordertype = $(type).attr("class");
    if (ordertype == "sorting_asc") {
        para["sort_" + $(type).attr("name") + ""] = "0";
    } else {
        para["sort_" + $(type).attr("name") + ""] = "1";
    }
    para["ordertype"] = ordertype;
    $(".ptrbody").html("");
    $(table).relfush();
    var sortht = TABLE[ids]["para"];
    //console.log("------sortht---");
    //console.log(sortht);
    $(".rows").find("th").each(function () {
        if ($(this).attr("name") == undefined) {

        } else {
            if (sortht["sort_" + $(this).attr("name") + ""] == "1") {
                $(this).attr("class", "sorting_asc");
            } else {
                $(this).attr("class", "sorting");
            }
        }
    })
}

/**模糊查询
 * 参数
 * type  当前对象
 * id  table的ID
 *
 */
function search(type, id) {
    var ids = $(id).attr("id");
    var dd = TABLE[ids];
    var para = dd.para;
    var table = dd.table;
    para[config.pageIndex] = 1;
    var name = $(type).attr("id");
    var value = $(type).val();
    para[name] = value;
    $(table).relfush();
}

/**整理
 * 参数
 *
 */
function finish(TRANSCODE, tbid, ts1, ts2) {
    var url = "?TRANSCODE=" + TRANSCODE + "&JSONFLAG=YES&isjson=true";
    Dialog_Submit(ts1, ts2, function () {
        $.ajax({
            url: base + "/servlet/mainGateServlet" + url,
            dataType: "json",
            type: "get",
            async: true,
            success: function (data) {
                if (data[0].responseCode == "" || data[0].responseCode == "0000") {
                    if (tbid) {
                        $(TABLE[tbid].table).relfush();
                    } else {
                        $(table).relfush();
                    }
                    $.toast({
                        heading: '成功提示',
                        text: '操作成功',
                        position: 'top-center',
                        loaderBg: '#fff',
                        icon: 'success',
                        hideAfter: 2000,
                        stack: 1
                    });
                } else {
                    $.toast({
                        heading: '消息提示',
                        text: data[0].responseMessage,
                        position: 'top-center',
                        loaderBg: '#fff',
                        icon: 'error',
                        hideAfter: 10000,
                        stack: 1
                    });
                }
            }
        });
    });
}

/**移除功能
 * 参数
 * TRANSCODE  权限代码
 * param  需要传递的参数(可以使用逗号隔开传多个参数)
 * ts1 提示信息1
 * ts2 提示信息2
 * tbid 需要刷新的table的ID
 *
 */
function remove(TRANSCODE, param, ts1, ts2, tbid) {
    var type = true;
    var url = "?TRANSCODE=" + TRANSCODE + "&JSONFLAG=YES&isjson=true";
    var endurl = "";
    var result = param.split(",");
    var param = {};
    var delids = [];
    $("input#ck_id").each(function () {
        if (true == $(this).is(':checked')) {
            $(this).parent().parent().parent().find("td").each(function () {
                for (var i = 0; i < result.length; i++) {
                    if ($(this).attr("name") == result[i]) {
                        if (param[$(this).attr("name")]) {
                            param[$(this).attr("name")] += ",'" + $(this).html() + "'";
                        } else {
                            param[$(this).attr("name")] = "'" + $(this).html() + "'";
                        }
                    }
                }
            })
            type = false;
        }
    });
    if (type) {
        Dialog_Error('请选择数据');
    } else {
        for (var i = 0; i < result.length; i++) {
            endurl += '&' + result[i] + '=' + param[result[i]];
        }
        url += endurl;
        Dialog_Submit(ts1, ts2, function () {
            $.ajax({
                url: base + "/servlet/mainGateServlet" + url,
                dataType: "json",
                type: "get",
                async: true,
                success: function (data) {
                    if (data[0].responseCode == "" || data[0].responseCode == "0000") {
                        if (tbid) {
                            $(TABLE[tbid].table).relfush();
                        } else {
                            $(table).relfush();
                        }
                        $.toast({
                            heading: '成功提示',
                            text: '操作成功',
                            position: 'top-center',
                            loaderBg: '#fff',
                            icon: 'success',
                            hideAfter: 2000,
                            stack: 1
                        });
                        $("#modal").modal("hide");
                        $(".modal-content").empty();
                    } else {
                        $.toast({
                            heading: '消息提示',
                            text: data[0].responseMessage,
                            position: 'top-center',
                            loaderBg: '#fff',
                            icon: 'error',
                            hideAfter: 10000,
                            stack: 1
                        });
                    }
                }
            });
        });


    }
}

/**删除功能
 * 参数
 * TRANSCODE  权限代码
 * param  需要传递的参数(可以使用逗号隔开传多个参数)
 * menuid 需要传递的菜单名称
 * tbid 需要刷新的table的ID
 *
 */
function del(TRANSCODE, param, menuid, tbid) {
    var type = true;
    var url = "?TRANSCODE=" + TRANSCODE + "&JSONFLAG=YES&isjson=true";
    var endurl = "";
    var result = param.split(",");
    var param = {};
    var delids = [];
    $("input#ck_id").each(function () {
        if (true == $(this).is(':checked')) {
            $(this).parent().parent().parent().find("td").each(function () {
                for (var i = 0; i < result.length; i++) {
                    if ($(this).attr("name") == result[i]) {
                        if (param[$(this).attr("name")]) {
                            param[$(this).attr("name")] += ",'" + $(this).html() + "'";
                        } else {
                            param[$(this).attr("name")] = "'" + $(this).html() + "'";
                        }
                    }
                }
            })
            type = false;
        }
    });
    if (type) {
        Dialog_Error('请选择数据');
    } else {
        if (menuid) {
            url += '&' + "menuid" + '=' + "'" + menuid + "'";
        }
        for (var i = 0; i < result.length; i++) {
            endurl += '&' + result[i] + '=' + param[result[i]];
        }
        url += endurl;
        Dialog_Submit('确认删除吗？', '即将删除', function () {
            $.ajax({
                url: base + "/servlet/mainGateServlet" + url,
                dataType: "json",
                type: "get",
                async: true,
                success: function (data) {
                    if (data[0].responseCode == "" || data[0].responseCode == "0000") {
                        if (tbid) {
                            $(TABLE[tbid].table).relfush();
                        } else {
                            $(table).relfush();
                        }
                        $.toast({
                            heading: '成功提示',
                            text: '操作成功',
                            position: 'top-center',
                            loaderBg: '#fff',
                            icon: 'success',
                            hideAfter: 2000,
                            stack: 1
                        });
                    } else {
                        $.toast({
                            heading: '消息提示',
                            text: data[0].responseMessage,
                            position: 'top-center',
                            loaderBg: '#fff',
                            icon: 'error',
                            hideAfter: 10000,
                            stack: 1
                        });
                    }
                }
            });
        });


    }
}

/**屏幕自适应
 *
 */
$(window).resize(function () {
    /*if (aaa1) {
        clearInterval(sss3)
        $(table).parent().css("width", $("." + table.attr("id") + "_1").width());
        $(table).parents().find(".panel-body").css("height", config.mainContentHeight);
        if ($("." + table.attr("id") + "_1")) {
        } else {
            $(".table-default").parent().css("height", "100%");
        }
        sss2 = setInterval("myInterval2()", 1);
        aaa1 = false;
    } else {
        clearInterval(sss2)
        $(table).parent().css("width", $("." + table.attr("id") + "_1").width());
        $(table).parents().find(".panel-body").css("height",config.mainContentHeight);
        if ($("." + table.attr("id") + "_1")) {
        } else {
            $(".table-default").parent().css("height", "100%");
        }
        sss3 = setInterval("myInterval3()", 1);
        aaa1 = true;
    }
    $(table).parent().css("height", ($(window).height() - 365));
    $(table).parent().width($("." + table.attr("id") + "_1").width());*/
});
var TABLE = {};
/**表格刷新
 * 参数
 * id  需要刷新的table的ID
 *
 */
var treedata = "";

/*过滤的标签*/
function getFilter(column, text) {
    var fhb = "", fhe = "";
    if ("" + column.filter != 'undefined') {
        var filter = column.filter;
        fhb = "<span style='width:100%;height:100%'></span>";
        var sp = $(fhb);
        for (var p in filter) {
            if (text == p) {
                var csss = filter[p].split(";");
                for (var css in csss) {
                    $(sp).css(csss[css].split(":")[0], csss[css].split(":")[1]);
                }
            }
        }
        fhb = sp[0].outerHTML.replace("</span>", "");
        text = fhb + text + fhe;
    }
    return text;
}

var table;
/**生成数据表
 *
 */
$.fn.extend({
    Table: function (json) {
        var order = "";
        table = $(this);
        var tabData = json;
        var para = tabData.data;
        var map = {};
        map["para"] = para;
        map["table"] = table;
        map["tabData"] = tabData;
        TABLE["" + table.attr("id")] = map;
        $(table).attr("class", " table dt-responsive nowrap dataTable no-footer dtr-inline table-hover");
        var columns = tabData.columns;//展示的列
        var tbhead = '<div class="tbhead" >'
            + ' <table id=' + table.attr("id") + "_1" + ' class="' + table.attr("id") + "_1" + ' table dt-responsive nowrap dataTable no-footer dtr-inline table-hover" >'
            + '</table>'
            + '</div>';
        $(table).parent().before(tbhead);
        /*添加tfoot*/
        var tbfoot = '<div class="tbfoot" >'
        if (tabData.foot) {
            tbfoot += ' <table id=' + table.attr("id") + "_foot" + ' class="' + table.attr("id") + "_foot" + ' table dt-responsive nowrap dataTable no-footer dtr-inline table-hover" ></table>'
        }
        var pagehtml = "";
        if (para.page == true) {//分页
            pagehtml = '<div class="dataTables_info" id="datatable_info" role="status"'
                + 'aria-live="polite"></div>'
                + '<div class="dataTables_paginate paging_simple_numbers"'
                + 'id="datatable_paginate"></div>';
        }
        tbfoot += pagehtml;
        tbfoot += '</div>';
        $(table).parent().parent().append(tbfoot);
        if ($(table).find("thead").length <= 0) {
            var tfoothtml = "<thead>";
            var theadhtml = '<thead><tr role="row">';
            if (tabData.search == false) {
                var dis = "display:none";
                $(table).css('cssText', 'margin-top:-39px !important');
            }
            var searchhtml = '<tr role="row" class="searchrows" style="' + dis + '">';
            var selval = "";
            if (tabData.multipleSelect == true) {//多选
                tfoothtml += '<th style="width:48px;height:5px;padding-right:0px"></th>';
                selval = '<th style="width:5px;height:5px;padding-right:0px"><input class="i-checks" id="chkall" style="position: absolute; opacity: 0;" type="checkbox"></th>'
                theadhtml += selval;
                searchhtml += "<td></td>";
            } else if (tabData.onecheck == true) {
                selval = '<th style="width:5px;height:5px;padding-right:0px;white-space: pre;">         </th>'
                theadhtml += selval;
                searchhtml += "<td></td>";
            } else if (tabData.onlycheck == true) {
                selval = '<th style="width:5px;height:5px;padding-right:0px;white-space: pre;">         </th>'
                theadhtml += selval;
                searchhtml += "<td></td>";
            }
            if (tabData.multipleSelect == "one") {
                selval = '<th style="width:48px;height:5px;padding-right:0px"></th>'
                theadhtml += selval;
                searchhtml += "<td></td>";
            }
            for (var i = 0; i < columns.length; i++) {
                /*生成tfoot的样式*/
                if (columns[i].type != "hidden") {
                    tfoothtml += '<th style="padding-top:0px;padding-bottom:0px; min-width: ' + columns[i].width + 'px;"></th>';
                }
                if (columns[i].sort != "false") {
                    order = "sorting";
                }
                if (columns[i].type == 'link') {
                    theadhtml += '<th  class="" tabindex="' + i + '" aria-controls="datatable" rowspan="1" colspan="1" aria-sort="ascending" aria-label="' + columns[i].name + ': activate to sort column descending" style="min-width: ' + columns[i].width + 'px;width:' + columns[i].width + 'px">' + columns[i].label + '</th>';
                } else if (columns[i].type == 'hidden') {

                } else {
                    if (columns[i].sort != "false") {
                        theadhtml += '<th  class="' + order + '" tabindex="' + i + '" aria-controls="datatable" rowspan="1" colspan="1" aria-sort="ascending" aria-label="' + columns[i].name + ': activate to sort column descending" style="min-width: ' + columns[i].width + 'px;" name=' + columns[i].name + ' onclick="order(this,' + table.attr("id") + ')">' + columns[i].label + '</th>';
                    } else {
                        theadhtml += '<th  class="' + order + '" tabindex="' + i + '" aria-controls="datatable" rowspan="1" colspan="1" aria-sort="ascending" aria-label="' + columns[i].name + ': activate to sort column descending" style="min-width: ' + columns[i].width + 'px;" name=' + columns[i].name + '>' + columns[i].label + '</th>';
                    }
                }
                var value = columns[i].label;
                switch (columns[i].type) {
                    case 'text':
                        value = '<td ><input type="text" style="min-width:' + columns[i].width + 'px;max-width:' + columns[i].width + 'px;" id=' + columns[i].name + ' placeholder="' + columns[i].label + '"  onchange="search(this,' + table.attr("id") + ')" class="form-control"></td>';
                        break;
                    case 'link':
                        if (columns[i].url != "" && columns[i].name != "") {
                            value = '<td ><input type="text" style="min-width:' + columns[i].width + 'px;" id=' + columns[i].name + ' placeholder="' + columns[i].label + '"  onchange="search(this,' + table.attr("id") + ')" class="form-control"></td>';
                        } else {
                            value = '<td ></td >';
                        }
                        break;
                    case 'select':
                        var option = "";
                        var displayName = "name";
                        var valueName = "value";
                        if (columns[i].option.displayName) {
                            displayName = columns[i].option.displayName;
                        }
                        if (columns[i].option.valueName) {
                            valueName = columns[i].option.valueName;
                        }
                        for (var j = 0; j < columns[i].option.data.length; j++) {
                            option += '<option value="' + columns[i].option.data[j][valueName] + '">' + columns[i].option.data[j][displayName]  + '</option>';
                        }
                        value = '<td ><select name="simple"  style="min-width:' + columns[i].width + 'px;height:34px;font-size:14px"  onchange="search(this,' + table.attr("id") + ')" id="' + columns[i].name + '">'
                            + '<option value="">请选择</option>' + option + '</select></td>';
                        break;
                    case 'date':
                        value = '<td ><div class="input-group date" id="datetimepicker' + i + '" name="datetimepicker"><input  style="min-width:' + columns[i].width + 'px;"  id="' + columns[i].name + '" type="text" class="form-control" onchange="search(this,' + table.attr("id") + ')"><span class="input-group-addon" style="width: 40px;height: 34px;"><span class="glyphicon glyphicon-calendar"></span></span></div></td>';
                        break;
                    case 'hidden':
                        tdval = '';
                        break;
                    case 'money':
                        value = '<td ><input type="text" style="min-width:' + columns[i].width + 'px;" id=' + columns[i].name + ' placeholder="' + columns[i].label + '"  onchange="search(this,' + table.attr("id") + ')" class="form-control"></td>';
                        break;
                    default:
                        value = "<td>" + columns[i].label + "</td>";
                }
                searchhtml += value;
            }
            searchhtml += '</tr>';
            theadhtml += '</tr>' + searchhtml + "</thead>";
            $(table).append(theadhtml);
            $("." + table.attr("id") + "_1").append(theadhtml);
        }
        theadhtml += '<tbody class="ptr ptrbody">';
        var trhtml = "";
        var stat = true;
        var url = para.url;
        if (para.page == true) {
            if (url.indexOf("?") != -1) {
                url += "&" + config.pageIndex + "=" + (para.pageIndex ? para.pageIndex : 1) + "&" + config.pageSize + "=" + (para.pageSize ? para.pageSize : 10);
            } else {
                url += "?" + config.pageIndex + "=" + (para.pageIndex ? para.pageIndex : 1) + "&" + config.pageSize + "=" + (para.pageSize ? para.pageSize : 10);
            }
        }
        $.get(url, function (res) {
            if (res.code == 0 && res.msg == '') {
                for (var i = 0; i < res.data.length; i++) {
                    var obj = res.data[i];
                    var trval = "";
                    //if(i%2==0){
                    //偶数行
                    trhtml += '<tr>';
                    if (tabData.onecheck == true && tabData.select && obj["onecheck"] == '1') {
                        trhtml += '<td><input class="i-checks " name="onecheck" id="ck_id" style="position: absolute; opacity: 0;" type="radio" checked></td>';
                    } else if (tabData.onecheck == true) {
                        trhtml += '<td><input class="i-checks " name="onecheck" id="ck_id" style="position: absolute; opacity: 0;" type="radio"></td>';
                    }
                    if (tabData.onlycheck == true && obj["realretdate"] != '') {
                        trhtml += '<td></td>';
                    } else if (tabData.onlycheck == true) {
                        trhtml += '<td><input class="i-checks " name="onecheck" id="ck_id" style="position: absolute; opacity: 0;" type="radio"></td>';

                    }

                    //默认选中
                    if (tabData.multipleSelect == true && tabData.select && obj["sel"] == '1') {

                        trhtml += '<td><input class="i-checks " id="ck_id" style="position: absolute; opacity: 0;" type="checkbox" checked></td>';
                    }
                    //多选
                    else if (tabData.multipleSelect == true) {
                        trhtml += '<td><input class="i-checks" id="ck_id" style="position: absolute; opacity: 0;" type="checkbox"></td>';
                    }

                    for (var j = 0; j < columns.length; j++) {
                        switch (columns[j].type) {
                            case 'text':
                                var str = obj[columns[j].name];
                                if (columns[j].template && typeof columns[j].template == "function") {
                                    str = columns[j].template(obj);
                                } else {
                                    str = getFilter(columns[j], str);
                                }
                                if (str.width > parseInt(columns[j].width) + 16) {
                                    var tip = "data-toggle='tooltip' data-placement='right' data-container='body' title='' data-original-title='" + str + "'";
                                    tdval = '<td style="overflow:hidden;text-overflow:ellipsis;min-width:' + columns[j].width + 'px;max-width:' + columns[j].width + 'px;" ' + tip + '>' + str + '</td>';
                                } else {
                                    tdval = '<td style="overflow:hidden;text-overflow:ellipsis;min-width:' + columns[j].width + 'px;max-width:' + columns[j].width + 'px;" title="' + str + '">' + str + '</td>';
                                }
                                break;
                            case 'link':
                                var getling = function (link) {
                                    var reg = "{(.*?)}";
                                    var newlink = "";
                                    var tmp = link.match(reg);
                                    if (tmp != null) {
                                        for (var k = 0; k < tmp.length; k++) {
                                            newlink = link.replace("{" + tmp[k] + "}", obj[tmp[k]]);
                                            newlink = newlink.replace("{" + tmp[k] + "}", obj[tmp[k]]);
                                        }
                                    } else {
                                        newlink = link;
                                    }
                                    var index = newlink.indexOf("{");//获取下标
                                    if (index > 0) {
                                        return getling(newlink);
                                    } else {
                                        return newlink;
                                    }
                                }
                                var newlink = getling(columns[j].url);
                                /*过滤*/
                                var nnl = "";
                                var lks = $(newlink);
                                for (var li = 0; li < lks.length; li++) {
                                    var rel = $(lks[li]).attr("rel");
                                    if (rel != undefined) {
                                        var reg = rel.split(";");
                                        for (var ri = 0; ri < reg.length; ri++) {
                                            var reg1 = reg[ri].split("=");
                                            var k = reg1[0];
                                            var v = reg1[1];
                                            if (k != v) {
                                                $(lks[li]).css("display", "none");
                                            }
                                        }
                                    }
                                    nnl = nnl + $(lks[li])[0].outerHTML;
                                }
                                tdval = '<td  style="min-width:' + columns[j].width + 'px;">' + getFilter(columns[j], nnl) + '</td>';
                                break;
                            case 'select':
                                var selectval = '';
                                if (obj[columns[j].name]) {
                                    $(table).find(".searchrows select").each(function () {
                                        if ($(this).attr("id") == columns[j].name) {
                                            selectval = $(this).find("option[value=" + obj[columns[j].name] + "]").text();
                                        }
                                    })
                                }
                                tdval = '<td  style="min-width:' + columns[j].width + 'px;">' + getFilter(columns[j], selectval) + '</td>';
                                break;
                            case 'date':
                                tdval = '<td  style="min-width:' + columns[j].width + 'px;">' + getFilter(columns[j], obj[columns[j].name]) + '</td>';
                                break;
                            case 'hidden':
                                tdval = '<td  hidden="hidden" name=' + columns[j].name + '>' + getFilter(columns[j], obj[columns[j].name]) + '</td>';
                                break;
                            case 'money':
                                tdval = '<td  style="text-overflow:ellipsis;min-width:' + columns[j].width + 'px;" >' + getFilter(columns[j], formatNumber(obj[columns[j].name])) + '</td>';
                                break;
                            default:
                                tdval = '<td  style="min-width:' + columns[j].width + 'px;"></td>';

                        }
                        trhtml += tdval;
                    }
                    trhtml += "</tr>";

                }
                if (tabData.tr) {
                    var getling = function (link) {
                        //console.log("--link--"+link)
                        var reg = "{(.*?)}";
                        var newlink = "";
                        var tmp = link.match(reg);
                        if (tmp != null) {
                            for (var k = 0; k < tmp.length; k++) {
                                newlink = link.replace("{" + tmp[k] + "}", obj[tmp[k]]);
                                newlink = newlink.replace("{" + tmp[k] + "}", obj[tmp[k]]);
                            }
                        } else {
                            newlink = link;
                        }
                        var index = newlink.indexOf("{");//获取下标
                        if (index > 0) {
                            return getling(newlink);
                        } else {
                            return newlink;
                        }
                    }
                    var newlink = getling(tabData.tr);
                    trhtml += newlink;
                }
                /*添加tfoot*/
                tfoothtml += "</tr></thead>";
                if (tabData.foot) {
                    tfoothtml += "<tbody>";
                    if (typeof tabData.foot == "object") {
                        for (var i in tabData.foot) {
                            tfoothtml += tabData.foot[i];
                        }
                    } else if (typeof tabData.foot == "string") {
                        tfoothtml += tabData.foot;
                    }
                    $("." + table.attr("id") + "_foot").append(tfoothtml + "</tbody>");
                    $("." + table.attr("id") + "_foot").css("width", $("#" + table.attr("id")).css("width"));
                }
            } else {
                $.toast({
                    heading: '消息提示',
                    text: res.msg,
                    position: 'top-center',
                    loaderBg: '#fff',
                    icon: 'error',
                    hideAfter: 2000,
                    stack: 1
                })
                stat = false;
            }
            $(table).find("tbody").remove();
            $(table).append(trhtml + "</tbody>");
            $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_square-blue'
            });
            if (para.page == true && stat == true) {//分页
                pagecount(table.attr("id"), para[config.pageIndex], res[config.pageAllCount], para[config.pageSize]);
            }
            $("div[name='datetimepicker']").each(function () {
                $("#" + $(this).attr("id")).datetimepicker({
                    minView: "month",//设置只显示到月份
                    language: "zh-CN",
                    format: "yyyy-mm-dd",//日期格式
                    autoclose: true,//选中关闭
                    todayBtn: true,//今日按钮
                });
            })
            //键盘监听事件获取输入值进行模糊查询
            $("." + table.attr("id") + "_1").find("input").keydown(function (event) {
                if (event.keyCode === 13) {
                    para.cur_pageno = 1;
                    var name = $(this).attr("id");
                    var value = $(this).val();
                    para[name] = value;
                    $(table).relfush();
                }
            });
            //行点击事件
            if (tabData.multipleSelect == true) {
                $(table).find("tr").click(function () {
                    if ($(this).find("#ck_id").is(":checked")) {
                        $(this).find("#ck_id").iCheck('uncheck');
                        $(this).css("background-color", "#ffffff");
                    } else {
                        $(this).find("#ck_id").iCheck('check');
                        $(this).css("background-color", "#f5f5f5");
                    }
                })
            }
            if (tabData.onecheck == true || tabData.onlycheck == true) {
                $(table).find("tr").click(function () {
                    $(this).find("#ck_id").iCheck('check');
                    $(this).css("background-color", "#f5f5f5");

                })
            }
            ;
            //hover事件
            $(table).find("tr").hover(function () {
                $(this).css("background-color", "#f5f5f5");
            }, function () {
                if ($(this).find("#ck_id").is(":checked")) {
                    $(this).css("background-color", "#f5f5f5");
                } else {
                    $(this).css("background-color", "#ffffff");
                }
            });
            if (tabData.multipleSelect == true) {
                //多选框点击事件  全选事件
                $(".iCheck-helper").click(function () {
                    if ($(this).parent().find("input:first").attr('id') == "ck_id") {
                        if ($(this).parent().find("#ck_id").is(":checked")) {
                            $(this).parent().parent().parent().css("background-color", "#f5f5f5");
                        } else {
                            $(this).parent().parent().parent().css("background-color", "#ffffff");
                        }
                    }
                    if ($(this).parent().find("input:first").attr('id') == "chkall") {
                        if ($(this).parent().find("#chkall").is(":checked")) {
                            $(this).parent().parent().parent().parent().parent().parent().parent().find('input:checkbox').iCheck('check');
                            $(this).parent().parent().parent().parent().parent().parent().parent().find("tr").css("background-color", "#f5f5f5");
                            $(this).parent().parent().parent().parent().find("tr").css("background-color", "#ffffff")
                        } else {
                            $(this).parent().parent().parent().parent().parent().parent().parent().find('input:checkbox').iCheck('uncheck');
                            $(this).parent().parent().parent().parent().parent().parent().parent().find("tr").css("background-color", "#ffffff");
                        }
                    }
                })
            } else if (tabData.multipleSelect == "one") {
                $(".table").find(".checkbox").each(function () {
                    $(this).click(function () {
                        var test = $(this).attr("checked");
                        if (this.checked) {
                            GetData(this.value);
                            $(this).parent("div").siblings().children(".checkbox").each(function () {
                                if (test == this.checked) {
                                    this.checked = false;
                                }
                            });
                        }
                    });
                });
            }
            /*if (tabData.page == true) {
                $(table).parents().find(".panel-body").css("height", config.mainContentHeight);
                $(table).parent().css("height", config.mainContentHeight - 172);
            } else {
                $(table).parents().find(".panel-body").css("height", config.mainContentHeight);
                $(table).parent().css("height", config.mainContentHeight - 107);
            }
            //tb赋值
            $(table).parent().width($("." + table.attr("id") + "_1").width());
            $(table).parent().width($("." + table.attr("id") + "_1").width());*/
        });
        if (tabData.onload && typeof tabData.onload == "function") {
            tabData.onload();
        }
    },
    relfush: function () {
        var id = $(this).attr("id");
        var onload;
        var dd = TABLE[id];
        var para = dd.para;
        var table = dd.table;
        var tabData = dd.tabData;
        var columns = tabData.columns;
        var theadhtml = '<tbody class="ptr ptrbody">';
        var trhtml = "";
        $(table).find("tbody").empty();
        var url = para.url;
        if (para.page == true) {
            if (url.indexOf("?") != -1) {
                url += "&" + config.pageIndex + "=" + (para.pageIndex ? para.pageIndex : 1) + "&" + config.pageSize + "=" + (para.pageSize ? para.pageSize : 10);
            } else {
                url += "?" + config.pageIndex + "=" + (para.pageIndex ? para.pageIndex : 1) + "&" + config.pageSize + "=" + (para.pageSize ? para.pageSize : 10);
            }
        }
        $.get(url, function (res) {
            if (res.code == 0 && res.msg == '') {
                for (var i = 0; i < res.data.length; i++) {
                    var visiable = "";
                    var obj = res.data[i];
                    var trval = "";
                    //if(i%2==0){
                    //偶数行
                    trhtml += '<tr>';
                    //多选
                    if (tabData.onecheck == true && tabData.select && obj["onecheck"] == '1') {
                        trhtml += '<td><input class="i-checks " name="onecheck" id="ck_id" style="position: absolute; opacity: 0;" type="radio" checked></td>';
                    } else if (tabData.onecheck == true) {
                        trhtml += '<td><input class="i-checks " name="onecheck" id="ck_id" style="position: absolute; opacity: 0;" type="radio"></td>';
                    }
                    if (tabData.onlycheck == true && obj["realretdate"] != '') {
                        trhtml += '<td></td>';
                    } else if (tabData.onlycheck == true) {
                        trhtml += '<td><input class="i-checks " name="onecheck" id="ck_id" style="position: absolute; opacity: 0;" type="radio"></td>';

                    }

                    //默认选中
                    if (tabData.multipleSelect == true && tabData.select && obj["sel"] == '1') {

                        trhtml += '<td><input class="i-checks " id="ck_id" style="position: absolute; opacity: 0;" type="checkbox" checked></td>';
                    }
                    //多选
                    else if (tabData.multipleSelect == true) {
                        trhtml += '<td><input class="i-checks" id="ck_id" style="position: absolute; opacity: 0;" type="checkbox"></td>';
                    }

                    for (var j = 0; j < columns.length; j++) {
                        switch (columns[j].type) {
                            case 'text':
                                var tmp = obj[columns[j].name];
                                if (columns[j].template && typeof columns[j].template == "function") {
                                    tmp = columns[j].template(obj);
                                }
                                var str = getFilter(columns[j], tmp);
                                if (str.width > parseInt(columns[j].width) + 16) {
                                    var tip = "data-toggle='tooltip' data-placement='right' title='' data-container='body'  data-original-title='" + str + "'";
                                    tdval = '<td style="overflow:hidden;text-overflow:ellipsis;min-width:' + columns[j].width + 'px;max-width:' + columns[j].width + 'px;" ' + tip + '>' + str + '</td>';
                                } else {
                                    tdval = '<td style="overflow:hidden;text-overflow:ellipsis;min-width:' + columns[j].width + 'px;max-width:' + columns[j].width + 'px;" title="' + str + '">' + str + '</td>';
                                }
                                break;
                            case 'link':
                                var getling = function (link) {
                                    var reg = "{(.*?)}";
                                    var newlink = "";
                                    var tmp = link.match(reg);
                                    if (tmp != null) {
                                        for (var k = 0; k < tmp.length; k++) {
                                            newlink = link.replace("{" + tmp[k] + "}", obj[tmp[k]]);
                                            newlink = newlink.replace("{" + tmp[k] + "}", obj[tmp[k]]);
                                        }
                                    } else {
                                        newlink = link;
                                    }
                                    var index = newlink.indexOf("{");//获取下标
                                    if (index > 0) {
                                        return getling(newlink);
                                    } else {
                                        return newlink;
                                    }

                                }
                                var newlink = getling(columns[j].url);
                                /*过滤*/
                                var nnl = "";
                                var lks = $(newlink);
                                for (var li = 0; li < lks.length; li++) {
                                    var rel = $(lks[li]).attr("rel");
                                    if (rel != undefined) {
                                        var reg = rel.split(";");
                                        for (var ri = 0; ri < reg.length; ri++) {
                                            var reg1 = reg[ri].split("=");
                                            var k = reg1[0];
                                            var v = reg1[1];
                                            if (k != v) {
                                                $(lks[li]).css("display", "none");
                                            }
                                        }
                                    }
                                    nnl = nnl + $(lks[li])[0].outerHTML;
                                }
                                tdval = '<td style="min-width:' + columns[j].width + 'px;max-width:' + columns[j].width + 'px;">' + getFilter(columns[j], nnl) + '</td>';
                                break;
                            case 'select':
                                var selectval = '';
                                if (obj[columns[j].name]) {
                                    $(table).find(".searchrows select").each(function () {
                                        if ($(this).attr("id") == columns[j].name) {
                                            selectval = $(this).find("option[value=" + obj[columns[j].name] + "]").text();
                                        }
                                    })
                                }
                                tdval = '<td  style="min-width:' + columns[j].width + 'px;">' + getFilter(columns[j], selectval) + '</td>';
                                break;
                            case 'date':
                                tdval = '<td  style="min-width:' + columns[j].width + 'px;">' + getFilter(columns[j], obj[columns[j].name]) + '</td>';
                                break;
                            case 'hidden':
                                tdval = '<td  hidden="hidden" name=' + columns[j].name + '>' + getFilter(columns[j], obj[columns[j].name]) + '</td>';
                                break;
                            case 'money':
                                tdval = '<td  style="text-overflow:ellipsis;min-width:' + columns[j].width + 'px;" >' + getFilter(columns[j], formatNumber(obj[columns[j].name])) + '</td>';
                                break;
                            default:
                                tdval = '<td></td>';
                        }
                        trhtml += tdval;
                    }
                    trhtml += "</tr>";

                    //}else{//基数行

                    //}

                }
            } else {
                $.toast({
                    heading: '消息提示',
                    text: res.msg,
                    position: 'top-center',
                    loaderBg: '#fff',
                    icon: 'error',
                    hideAfter: 2000,
                    stack: 1
                })
                return false;
            }
            $(table).find("tbody").remove();
            $(table).append(theadhtml + trhtml + "</tbody>");
            $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_square-blue'
            });
            //行点击事件
            if (tabData.multipleSelect == true) {
                $(table).find("tr").click(function () {
                    if ($(this).find("#ck_id").is(":checked")) {
                        $(this).find("#ck_id").iCheck('uncheck');
                        $(this).css("background-color", "#ffffff");
                        $(this).hover(function () {
                            $(this).css("background-color", "#f5f5f5");
                        }, function () {
                            $(this).css("background-color", "#ffffff");
                        });
                    } else {
                        $(this).find("#ck_id").iCheck('check');
                        $(this).css("background-color", "#f5f5f5");
                    }
                })
            }

            //hover事件
            $(dd.table).find("tr").hover(function () {
                $(this).css("background-color", "#f5f5f5");
            }, function () {
                if ($(this).find("#ck_id").is(":checked")) {
                    $(this).css("background-color", "#f5f5f5");
                    //console.log( $(this).css("background-color"))
                } else {
                    $(this).css("background-color", "#ffffff");
                    //console.log( $(this).css("background-color"))
                }
            });
            //多选框点击事件  全选事件
            $(".iCheck-helper").click(function () {
                if ($(this).parent().find("input:first").attr('id') == "ck_id") {
                    if ($(this).parent().find("#ck_id").is(":checked")) {
                        $(this).parent().parent().parent().css("background-color", "#f5f5f5");
                    } else {
                        $(this).parent().parent().parent().css("background-color", "#ffffff");
                    }
                }
                if ($(this).parent().find("input:first").attr('id') == "chkall") {
                    if ($(this).parent().find("#chkall").is(":checked")) {
                        $(this).parent().parent().parent().parent().parent().parent().parent().find('input:checkbox').iCheck('check');
                        $(this).parent().parent().parent().parent().parent().parent().parent().find("tr").css("background-color", "#f5f5f5");
                        $(this).parent().parent().parent().parent().find("tr").css("background-color", "#ffffff")
                    } else {
                        $(this).parent().parent().parent().parent().parent().parent().parent().find('input:checkbox').iCheck('uncheck');
                        $(this).parent().parent().parent().parent().parent().parent().parent().find("tr").css("background-color", "#ffffff");
                    }
                }
            })
            // //tb赋值
            // $(table).parent().width($("." + table.attr("id") + "_1").width());
            // $(table).parents().find(".panel-body").css("height", config.mainContentHeight);
            // $(table).parent().css("height", config.mainContentHeight - 172);
            if (para.page == true) {//分页
                pagecount(table.attr("id"), para[config.pageIndex], res[config.pageAllCount], para[config.pageSize]);
            }
        }, function () {

        });
        if (tabData.onload && typeof tabData.onload == "function") {
            tabData.onload();
        }
    },
    /**tree树形菜单
     * 参数
     * para 生成需要的参数
     * jstree插件
     */
    Tree: function (para) {
        var tree = $(this);
        var temp = true;
        var checkbox = para.checkbox != null ? 'checkbox' : '';
        asyncAjax(para, function (data) {
            ////console.log(JSON.stringify(data)+"----")
            var json = getTree(data[0].datas);
            ////console.log(data[0].data+"----")
            json = "{\"core\": {\"themes\": {\"responsive\": false },\"data\" : [{" + json + "}]},\"types\": {\"default\":{\"icon\":\"fa fa-folder\"},\"file\": {\"icon\": \"fa fa-file\"}},\"plugins\":[\"types\", \"" + checkbox + "\"]}";
            $(tree).jstree(JSON.parse(json));
        })
        $(tree).on('changed.jstree', function (e, data) {   //选中节点改变事件
            //获取所有选中项目及子项目
            var sel = data.selected;
            // //console.log("data="+JSON.stringify(data))
            var node = $('#jstree_div').jstree("get_node", data.selected[0]);
            ////console.log("result="+data.selected)
            ////console.log("node="+JSON.stringify(data.instance.get_node(data.selected[0]).text))
            treedata = "";
            for (var i = 0; i < data.selected.length; i++) {
                var temp = (data.instance.get_node(data.selected[i]).a_attr.value) + ',';
                treedata += temp;
            }
        });
        var getTree = function (data, param) {
            //console.log(data)
            var open = para.open != null ? 'false' : '';
            if (open == "false" && temp == false) {
                var json = "\"text\":\"" + data.text + "\",\"state\":{\"opened\":false}";
            } else {
                var json = "\"text\":\"" + data.text + "\",\"state\":{\"opened\":true}";
                temp = false;
            }
            var area = para.area != null ? 'area' : '';
            var url = para.url != null ? para.url : '';
            if (area == "area") {
                json += ",\"a_attr\":{\"onclick\":\"tree_true('" + data.text + "','" + data.value + "','false')\"}";
            } else {
                if (url != "" && url != "hidden") {
                    json += ",\"a_attr\":{\"onclick\":\"tree_true('" + data.text + "','" + data.value + "','" + para.url + "')\"}";
                } else if (url == "hidden") {
                    json += ",\"a_attr\":{\"name\":\"menuid\",\"value\":\"" + data.value + "\"}";
                } else {
                    json += ",\"a_attr\":{\"onclick\":\"tree_true('" + data.text + "','" + data.value + "','" + data.url + "')\"}";
                }
            }
            if (data.children != '') {//有下级
                json += ",\"children\":[";
                for (var i = 0; i < data.children.length; i++) {
                    if (i == data.children.length - 1) {
                        json += "{" + getTree(data.children[i]) + "}";
                    } else {
                        json += "{" + getTree(data.children[i]) + "},";
                    }
                }
                json += "]";
            } else {
                //判断是否多选
                if (checkbox == "checkbox") {
                    json += ",\"a_attr\":{}";
                }
                //是否有路径
                if (url != "" && url != "hidden") {
                    json += ",\"a_attr\":{\"onclick\":\"tree_true('" + data.text + "','" + data.value + "','" + para.url + "','" + area + "')\"}";
                } else if (url == "hidden") {
                    json += ",\"a_attr\":{\"name\":\"menuid\",\"value\":\"" + data.value + "\"}";
                } else {
                    var area = para.area != null ? 'area' : '';
                    if (area == 'area') {
                        json += ",\"a_attr\":{\"onclick\":\"tree_true('" + data.text + "','" + data.value + "','" + para.url + "','" + area + "')\"}";
                    } else {
                        json += ",\"a_attr\":{\"onclick\":\"tree_true('" + data.text + "','" + data.value + "','" + data.url + "','" + area + "')\"}";
                    }
                }
                var param = data.param != null ? data.param : '';
                if (param == '1') {
                    json += ",\"state\":{\"selected\":true}";
                }
            }
            return json;
        }
    },
    /**校验
     *
     */
    required: function () {
        var obj = $(this);
        var count = 0;
        //console.log($(obj).val())
        //console.log((obj).attr("te"))
        if ($(obj).val() == "" && $(obj).attr("te")) {
            count = 0;
        } else {
            $(obj).find("input,select,textarea").each(function () {
                if ($(this).attr("required")) {
                    var type = $(this).attr("datatype");
                    var result = vilited(type, $(this));
                    if (!result) {
                        $(this).css("border-color", "red");
                        $(this).popover('show');
                        count++;
                    } else {
                        $(this).css("border-color", "green");
                        $(this).popover('hide');
                    }
                }
            });
        }
        if (count > 0) {
            return false;
        } else {
            return true;
        }
    }
});

/**校验
 * 参数
 * type 获取当前元素值
 * obj 获取当前元素对象
 */
function vilited(type, obj) {
    var result;
    switch (type) {
        case 'string'://\u4e00-\u9fa5  中文+字母
            result = /^[\u4e00-\u9fa5A-Za-z0-9_.#]+$/.test($(obj).val());
            break;
        case 'number':
            result = /^\d+$/.test($(obj).val());
            break;
        case 'taxrate':
            result = /^(\d{1,2}(\.\d{1,8})?|99)$/.test($(obj).val());
            break;
        case 'acip':
            result = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test($(obj).val());
            break;
        /*case 'proportion':
            if (/^(\d{1,2}(\.\d{1,8})?|99)$/.test($(obj).val())){
                var temp = $(obj).val();
                $(obj).val(temp+"%");
            }
            result=/^-?(100|(([1-9]\d|\d)(\.\d{1,8})?))%$/.test($(obj).val());

            if ($(obj).val()==100) {
                break;
            }
            result=/^(\d{1,2}(\.\d{1,8})?|99)$/.test($(obj).val());
            break;*/

        case 'money':
            //^[-+]?\d{1,3}(,\d{3})*(\.(\d*))?$
            //^\d+(.[0-9][0-9])
            if (/^\d+(.[0-9][0-9])/.test($(obj).val()) == false && /^[-+]?\d{1,3}(,\d{3})*(\.(\d*))?$/.test($(obj).val()) == false
                && /^\d+$/.test($(obj).val())) {
                result = false;
            } else {
                result = true;
            }
            result = /^\d+(.[0-9][0-9])/.test($(obj).val());
            break;
        case 'proportion':
            result = /^(\d{1,2}(\.\d{1,8})?|100(\.0{1,8})?)$/.test($(obj).val());
            break;
        case 'date':
            result = /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/.test($(obj).val());
            break;
        case 'time':
            result = /^[0-23]:[0-5][0-59]:[0-5][0-59]$/.test($(obj).val());
            break;
        case 'select':
            result = $(obj).val() != "";
            break;
        case 'phone':
            result = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\d3)|(\d{3}\-))?(1[3-9]\d{9})$)/.test($(obj).val());
            break;
        case 'idcode':
            result = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test($(obj).val())
            break;
        case 'string-english':
            result = /^[ A-Za-z0-9_.:-]+$/.test($(obj).val());
            break;
        case 'string-chinese':
            result = /^[\u4E00-\u9fA5,]+$/.test($(obj).val());
            break;
        case 'postcode':
            result = /^[1-9]\d{5}(?!\d)$/.test($(obj).val());
            break;
        case 'email':
            result = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test($(obj).val());
            break;
        case 'null':
            result = /\S/.test($(obj).val());
            break;
        default:
            result = $(obj).val() != "";
            break;
    }
    return result;
}

/**SQL两级联动
 * 参数
 * h 获取当前元素对象
 *
 */
function getSubTyp2(h) {
    var sql = "select INSTCODE,INSTNAME from sysinsttb where abvinst = '" + h.value + "'";
    var selid = $("select[name='deptcode']")
    SYS_SelectSQL(sql, selid, "INSTCODE", "INSTNAME")
}

/**SQL两级联动
 * 参数
 * h 获取当前元素对象
 *
 */
function getSubTyp3(h) {
    var sql = "select USERCODE,USERNAME from sysusertb where rolecode = '" + h.value + "'";
    var selid = $("select[name='chkusercode']")
    SYS_SelectSQL(sql, selid, "USERCODE", "USERNAME")
}

/**后台开放接口查询
 * 参数
 * sql 需要传递的sql
 * selid 需要赋值的selectID
 * datacode1 生成的option value
 * DATALABLE1 生成的option text
 *
 */
function SYS_SelectSQL(sql, selid, datacode1, DATALABLE1) {
    var b = sql;
    var para = {
        TRANSCODE: "SYS_SelectSQL",
        USERCODE: "super",
        JSONFLAG: "YES",
        MOBILE: "YES",
        isjson: "true",
        sql: encodeURI(b),
    }
    var selinner = ""
    var callback = function (data) {
        var opts = "";
        $.each(data, function (n, value) {
            var opt = "";
            opt += "<option value=\"" + value[datacode1] + "\">" + value[DATALABLE1] + "</option> ";
            opts += opt;
            return opts;
        });
        selinner = opts
        selid.html(selinner)
        return selinner;
    }
    asyncAjax(para, callback);
}

function paneltabs() {
    $(window).resize(function () {
        $(".row-default").css("max-height", ($(window).height()) - 27);
        $(".panel-default").css("max-height", ($(window).height()) - 137);
        $(".panel-default").css("margin-top", "15px");
    });
    $(".row-default").css("max-height", ($(window).height()) - 27);
    $(".panel-default").css("height", ($(window).height()) - 137);
    $(".panel-default").css("margin-top", "15px");
}

//检查一个输入field是否为空
function IsEmptyValue(value) {
    var num = 0;
    var i = 0;
    if (value == null)
        return true;
    if (value.length == 0) {
        return true;
    }

    for (i = 0; i < value.length; i++) {
        num = value.charCodeAt(i)
        if ((num != 32) && (num != 13) && (num != 10))
            return false;
    }//end for
    return true
}//end IsEmptyValue
//将locs中的选择项copy到到mylocs中
function copyOption(locs, mylocs) {
    var flag;
    for (var x = 0; x < locs.length; x++) {
        var opt = locs.options[x];
        flag = true;
        for (var y = 0; y < mylocs.length; y++) {
            var myopt = mylocs.options[y];
            if (myopt.value == opt.value) {
                flag = false;
            }
        }
        if (flag) {
            mylocs.options[mylocs.options.length] = new Option(opt.text, opt.value, 0, 0);
        }
    }
    for (var x = 0; x < mylocs.length; x++) {
        if (IsEmptyValue(mylocs.options[x].value))
            mylocs.options[x] = null;
    }
}//end addOption
//---------------------------------------------------------------------------------------
//将locs中的选择项选择到mylocs中
function addOption(locs, mylocs) {
    var flag;
    for (var x = 0; x < locs.length; x++) {
        var opt = locs.options[x];
        if (opt.selected) {
            flag = true;
            for (var y = 0; y < mylocs.length; y++) {
                var myopt = mylocs.options[y];
                if (myopt.value == opt.value) {
                    flag = false;
                }
            }
            if (flag) {
                mylocs.options[mylocs.options.length] = new Option(opt.text, opt.value, 0, 0);
            }
        }
    }
    for (var x = 0; x < mylocs.length; x++) {
        if (IsEmptyValue(mylocs.options[x].value))
            mylocs.options[x] = null;
    }
}//end addOption
//--------------------------------------------------------------------------------------
//将mylocs中不要的选择项移走
function delOption(mylocs) {
    for (var x = mylocs.length - 1; x >= 0; x--) {
        var opt = mylocs.options[x];
        if (opt.selected) {
            mylocs.options[x] = null;
        }
        if (IsEmptyValue(opt.value)) {
            mylocs.options[x] = null;
        }
    }
}//end delOption

//删除所有内容
function delAllOption(mylocs) {

    for (var x = mylocs.length - 1; x >= 0; x--) {
        mylocs.options[x] = null;
    }
}

//-------------------------------------------------------------------------------------
//将opti1中选择的内容move到opti2中
function moveOption(opti1, opti2) {
    addOption(opti1, opti2);
    delOption(opti1);
}

function moveAllOption(locs, mylocs) {
    copyOption(locs, mylocs);
    delAllOption(locs);
}

//-------------------------------------------------------------------------------------
//将option中选项形成String串
function formOptionStr(opt) {
    var x = 0;
    var str = "";
    if (opt.length == 0)
        return str;
    for (x = 0; x < opt.length - 1; x++) {
        str = str + opt[x].value + ",";
    }
    return str + opt[x].value;
}

function Modal_Chk(url) {
    cinourl = $("#rolename").val();
    url += "&rolename" + "=" + cinourl;
    $(".modal-tree").fadeToggle(0, '', function () {
        Modal_Tb(url);
    });

}

