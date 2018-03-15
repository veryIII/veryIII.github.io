
 
//大图轮播
var nowPic=1;
			var maxPic=4;
			
			function roll()
			{
				for(var i=1;i<=maxPic;i++)
				{
					if(i==nowPic)
					{
						document.getElementById("adv"+nowPic).style.display="block";
						document.getElementById("btn"+nowPic).style.backgroundColor="coral";
					}
					else
					{
						document.getElementById("adv"+i).style.display="none";
						document.getElementById("btn"+i).style.backgroundColor="white";
					}
				}
				//对nowPic判断
				if(nowPic==maxPic)
				{
					nowPic=1;
				}
				else
				{
				nowPic++;	
				}
			}
			function showclick(s)
			{
				nowPic=s;
				roll();
			}
			//定时器,setInterval("函数名"，"间隔时间")周期性定时器
			setInterval(roll,1000)