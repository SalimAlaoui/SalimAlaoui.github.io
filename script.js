var mytitle = document.querySelector("title");

const myspace = document.getElementById("myspace");
//myspace.height = document.body.clientHeight;
myspace.height = window.innerHeight;
myspace.width = window.innerWidth;
myspace.style.height= myspace.height.toString()+"px";
console.log(myspace.width,myspace.height)
const spacectx = myspace.getContext("2d");
//const data = spacectx.getImage(0,0,myspace.width,myspace.height);

const max_opacity = 70;
const min_opacity = 20;

const max_size = 4;
const min_size = 0;

const total_nodes = 600;
const node_base_color = "000000";


const cursflw = document.getElementById("cursorfollower")

class node {
  constructor(x, y,size,x_dir,y_dir,opacity) {

    this.x = x;
    this.y = y;
    this.x_dir = x_dir;
    this.y_dir = y_dir;
    this.size = size;
    this.opacity = opacity; 
  }

  draw()
  {
        // draw(this.x,this.y,this.size,this.color);  
        
        //spacectx.beginPath();
        spacectx.fillStyle = "#"+node_base_color+this.opacity;
        spacectx.arc(this.x,this.y, this.size, 0, Math.PI * 2,true); 
        spacectx.arc(this.x,this.y, this.size-1, 0, Math.PI * 2,true); 
        //spacectx.arc(this.x,this.y,)
        spacectx.fillRect(this.x-(this.size/2),this.y-(this.size/2),this.size,this.size);
        
        // spacectx.closePath();
        // spacectx.fill();
        //spacectx.stroke();
        //spacectx.moveTo(75, 25);
        //spacectx.quadraticCurveTo(25, 25, 25, 62.5);
  }

  update()
  {
    this.x += this.x_dir;
    this.y += this.y_dir;
    // if(this.x<0)
    // {
    //   this.x_dir += 1;
    //   this.x = 1;
    //   console.log(this.x_dir);
    // }
    // else if(this.x>myspace.width)
    // {
    //   this.x_dir -= 1;
    //   this.x = myspace.width-1;
    //   console.log(this.x_dir);
    // }
    // if(this.y<0)
    // {
    //   this.y_dir += 1;
    //   this.y = 1;
    //   console.log(this.y_dir);
    // }
    // else if(this.y>myspace.height)
    // {
    //   this.y_dir -= 1;
    //   this.y = myspace.height-1;
    //   console.log(this.y_dir);
    // }
  }

  change(x, y,size,x_dir,y_dir,opacity)
  {
    //console.log("change "+this.x.toString(),this.y.toString(),x.toString(),y.toString());
    this.x = x;
    this.y = y;
    this.x_dir = x_dir;
    this.y_dir = y_dir;
    this.size = size;
    this.opacity = opacity; 
  }

  distance(x,y)
  {
    let a = Math.abs(this.x-x);
    let b = Math.abs(this.y-y);
    let dis = Math.sqrt(a*a + b*b);
    return dis;
  }

  current_pos()
  {
    return [this.x,this.y];
  }

}



document.getElementById("myphoto").onmouseover = () => {
  console.log(document.getElementById("myphoto").childElementCount())
}


spacectx.beginPath();
var nodes = new Array()

for (let i=1;i<=total_nodes;i++)
{
  nodes.push(new node(Math.random() * myspace.width | 0,Math.random() * myspace.height | 0,( Math.random()*(max_size-min_size) + min_size | 0 ) + 1,Math.random() * 2 - 1 ,Math.random() * 2 - 1 ,(Math.random() * (max_opacity-min_opacity) + min_opacity | 0).toString()));
}

setInterval(() => {
  spacectx.clearRect(0,0,myspace.width,myspace.height);
  var last_node = [-100,-100];
  spacectx.beginPath();
  nodes.forEach((n)=>{
    
    if(n.x < 0 || n.x > myspace.width || n.y < 0 || n.y > myspace.height)
      n.change(Math.random() * myspace.width | 0,Math.random() * myspace.height | 0,( Math.random()*(max_size-min_size) + min_size | 0 ) + 1,Math.random() * 2 - 1 ,Math.random() * 2 - 1 ,(Math.random() *  (max_opacity-min_opacity) + min_opacity | 0).toString());
      //console.log(last_node,n.distance(last_node[0],last_node[1]));
      // if (n.distance(last_node[0],last_node[1] > 200 )){
        spacectx.closePath();
        spacectx.fill();
        spacectx.beginPath();
      // }
      n.draw();
      n.update();
      last_node = n.current_pos();
    
  });
},100);

/*
setTimeout(function(){
    mytitle.innerHTML = "0"
    setInterval(function(){
        mytitle.innerHTML = (((Math.random()*20 | 0)%2).toString()+mytitle.innerHTML).substring(0,15)
        console.log(mytitle)
    },1000);
}, 8000);*/

var text1 = "Hi , I'm Salim Alaoui";
var text2 = "I'm a Programmer.";
var text1label = document.getElementById("text1");
var text2label = document.getElementById("text2");
var x=0;
var speedwrite = 200;

setTimeout(function(){
  let typingsound = new Audio("mymedia/typing.mp3");
  typingsound.play();
  for(i=0;i<text1.length;i++)
  {
      setTimeout(function(){
          if(text1.substring(x,x+1) == "S" && window.innerWidth < 768)
            text1label.innerHTML += '<br style="display:block;">';
          text1label.innerHTML += text1.substring(x,++x);
      }, speedwrite*(i+1));   
  }
  setTimeout(function(){
        text1label.style.display="block";  
        //text1label.innerHTML += "<br>";
  }, speedwrite*text1.length);  
  
  var y=0;
  for(i=0;i<text2.length;i++)
  {
      setTimeout(function(){
          //console.log(i)
          if(text1.substring(y,y+1) == "P" && window.innerWidth < 768)
            text1label.innerHTML += '<br style="display:block;">'
          text2label.innerHTML += text2.substring(y,++y);
      },(speedwrite*text1.length)+speedwrite*(i+1));
  }
},2000);

var topwin = window.scrollY;
var header = document.getElementsByTagName("header")[0];
var info = document.getElementById("info");

addEventListener('scroll', (event) => {
    var newtop=window.scrollY;
    //console.log(newtop,topwin);
    if(newtop > 40 && newtop>topwin  && header.style.position == "sticky") 
    {
        header.style.position = "relative";
        header.style.top = newtop.toString()+"px";
        
    }
    else if(newtop < topwin-5)
    {
        header.style.position = "sticky";
        header.style.top = "0";
    }
    if(newtop > window.innerHeight - 200)
    {
        info.style.visibility="visible";
        info.style.animation="inforead 1s";
        document.getElementsByClassName("more")[0].style.display = "none";
    }
    if(cursflw.style.top)
    {
      let canvas_y = cursflw.style.top
      canvas_y = canvas_y.substring(0,canvas_y.length-2);
      cursflw.style.top = (parseInt(canvas_y)+(newtop-topwin)).toString()+"px";
    }
  topwin = newtop;
    
});



if(window.innerWidth < 768 )
{
  console.log("mobile viewer");
  document.getElementById("curs").style.fontSize = "23vw";
  document.getElementById("curs").style.marginLeft = "-8vw";
  document.getElementById("schooldiv").getElementsByTagName("img")[0].style.height = "6vw";
  //document.getElementById("replicon").style.width ="13vw";
}


var myphoto = document.getElementById("myphoto");
var PCoords = myphoto.getBoundingClientRect();



document.onmousemove = (event) => {
  //if(event.pageY % 2==0 && event.clientX % 2==0)
  //{
    //console.log(event.clientX,event.pageY,PCoords.top,PCoords.right,PCoords.bottom,PCoords.left);
/////////////////////////////
  
    cursflw.style.display = "block";
    cursflw.style.top = (event.pageY-15).toString()+"px";
    cursflw.style.left = (event.clientX-15).toString()+"px";
    // setInterval(()=>{
    //   console.log(cursflw.getBoundingClientRect().top);
    //   cursflw.style.top = (cursflw.getBoundingClientRect().top+((event.pageY-cursflw.getBoundingClientRect().top)/50 | 0)).toString()+"px";
    //   cursflw.style.left = (cursflw.getBoundingClientRect().left+((event.clientX-cursflw.getBoundingClientRect().left)/50 | 0 )).toString()+"px";
    // },1000);


  //////////////////////////
  //}
    
  if( ( ( event.clientX <= PCoords.right + 50 ) && ( event.clientX >= PCoords.left - 50 ) )   &&  ( ( event.pageY <= PCoords.bottom + 50 ) && ( event.pageY >= PCoords.top - 50 ) ) ) 
  {
    console.log("hover");
  }
};



//document.getElementById("myphoto").onmousemove = (event) => {};