//实现字体倒置
function draw(id)
{
var ctx=document.getElementById(id).getContext('2d');
ctx.fillStyle="black";
ctx.font="20pt georgia" ;
ctx.fillText("Development of science and technology",0,100);
ctx.setTransform(1,0,0,-1,0,4);
//对角线上渐变
var Colordiagonal=ctx.createLinearGradient(0,-10,0,-200);
Colordiagonal.addColorStop(0,"black");
Colordiagonal.addColorStop(1,"white");
ctx.fillStyle=Colordiagonal;
ctx.fillText("Development of science and technology",0,-100);
}
