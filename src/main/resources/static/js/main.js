/**
 * Created by 48909 on 2019/9/8.
 */
function logout(){
    var data = {
        uuid: $.cookie("uuid")
    };
    $.post("/user/logout", data, function (res) {
        if(res.code==0){
            $.removeCookie("uuid", {path: '/'});
            //window.location.href = "../index.html";
        }
    });
}