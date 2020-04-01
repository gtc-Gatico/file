window.onload=function(){
    console.log("I am Hacker. https://gatico.com.cn")
    document.body.style.backgroundColor="black";
    var canvas =document.createElement("canvas");
    canvas.id="c";
    canvas.style.position="fixed";
    canvas.style.top=0;
    canvas.style.left=0;
    canvas.style.zIndex=-999;
    document.body.appendChild(canvas);
    var c = document.getElementById("c");
    var ctx = c.getContext("2d");
    c.width = window.innerWidth-20;
    c.height = window.innerHeight+16;
    var string1 = "01";
    string1.split("");
    var fontsize = 20;
    columns = c.width / fontsize;
    var drop = [];
    for ( var x = 0; x < columns; x++) {
        drop[x] = 0;
    }
    function drap() {
        ctx.fillStyle = "rgba(0,0,0,0.07)";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = "#0F0";
        ctx.font = fontsize + "px arial";
        for ( var i = 0; i < drop.length; i++) {
            var text1 = string1[Math.floor(Math.random() *string1.length)];
            ctx.fillText(text1, i * fontsize, drop[i] * fontsize);
            drop[i]++;
            if (drop[i] * fontsize > c.height && Math.random() > 0.9) {
                drop[i] = 0;
            }
        }
        requestAnimationFrame(drap);
    }
    drap();
    //setInterval(drap, 20);
};
window.onresize=function(){
    var c = document.getElementById("c");
    c.width = window.innerWidth-20;
    c.height = window.innerHeight;
};