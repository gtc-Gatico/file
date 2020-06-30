/**
 * Created by 48909 on 2019/9/8.
 */

jQuery.extend({
    get: function (url, callback, errorCallback) {
        $.ajax({
            url: url,
            type: "get",
            contentType: "application/json",
            async: false,
            dataType: "json",
            success: function (msg) {
                callback(msg);
            },
            error: function (xhr, textstatus, thrown) {
                errorCallback(xhr);
            }
        });
    },
    put: function (url, data, callback, errorCallback) {
        $.ajax({
            url: url,
            type: "put",
            contentType: "application/json",
            dataType: "json",
            async: false,
            data: data,
            success: function (msg) {
                callback(msg);
            },
            error: function (xhr, textstatus, thrown) {
                errorCallback(xhr);
            }
        });
    },
    post: function (url, data, callback, errorCallback) {
        $.ajax({
            url: url,
            type: "post",
            contentType: "application/json",
            dataType: "json",
            async: false,
            data: data,
            success: function (msg) {
                callback(msg);
            },
            error: function (xhr, textstatus, thrown) {
                errorCallback(xhr);
            }
        });
    },
    delete: function (url, data, callback, errorCallback) {
        $.ajax({
            url: url,
            type: "delete",
            contentType: "application/json",
            dataType: "json",
            async: false,
            data: data,
            success: function (msg) {
                callback(msg);
            },
            error: function (xhr, textstatus, thrown) {
                errorCallback(xhr);
            }
        });
    },
    patch: function (url, data, callback, errorCallback) {
        $.ajax({
            url: url,
            type: "patch",
            contentType: "application/json",
            dataType: "json",
            async: false,
            data: data,
            success: function (msg) {
                callback(msg);
            },
            error: function (xhr, textstatus, thrown) {
                errorCallback(xhr);
            }
        });
    },

});

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
var table;


function login() {
    var name = $("input[name='name']").val();
    var password = $("input[name='password']").val();
    var data = {
        name: name,
        password: $.md5($.md5(password))
    };
    $.post("/user/login", JSON.stringify(data), function (res) {
        layer.msg(res.msg)
        if (res.code == 0) {
            $.cookie("username", res.data.nickName, {expires: 30});
            $.cookie("uuid", res.data.uuid, {expires: 30});
            $.cookie("role", res.data.role, {expires: 30});
            if (res.data.role == "admin") {
                window.location.href = "../admin/admin.html";
            } else {
                window.location.href = "html/index.html";
            }
        }
    });
}

function logout() {
    $.post("/user/logout", $.cookie("uuid"), function (res) {
        if (res.code == 0) {
            $.removeCookie("username", {path: '/'});
            $.removeCookie("uuid", {path: '/'});
            $.removeCookie("role", {path: '/'});
            window.location.href = "../index.html";
        }
    });
}

function progress(f, v) {
    $(".layui-progress").find("[lay-filter='" + f + "']").css("width", v + '%');
    if (v >= 100) {
        $(".layui-progress").slideUp(2000);
    } else {
        $(".layui-progress").show();
    }
}

var throughputDisplay = function (data) {
    if (data < 1200) {
        return data + " B";
    } else if (data < 1200 * 1024) {
        return (data / 1024).toFixed(2) + " KB";
    } else if (data < 1200 * 1024 * 1024) {
        return (data / 1024 / 1024).toFixed(2) + " MB";
    } else if (data < 1200 * 1024 * 1024 * 1024) {
        return (data / 1024 / 1024 / 1024).toFixed(2) + " GB";
    } else {
        return (data / 1024 / 1024 / 1024 / 1024).toFixed(2) + " TB";
    }
};

/*获取字符串的宽度*/
String.prototype.width = function(font) {
    var f = font || '12px arial',
        o = $('<div>' + this + '</div>')
            .css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': f})
            .appendTo($('body')),
        w = o.width();

    o.remove();
    return w;
}