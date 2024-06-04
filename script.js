document.body.onload = () => {


    var mytitle = document.querySelector("title");

    const myspace = document.getElementById("myspace");
    myspace.height = window.innerHeight;
    myspace.width = window.innerWidth;
    myspace.style.height= myspace.height.toString()+"px";
    const spacectx = myspace.getContext("2d");

    const max_opacity = 70;
    const min_opacity = 20;

    const max_size = 4;
    const min_size = 0;

    const total_nodes = 800;
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
            spacectx.fillStyle = "#"+node_base_color+this.opacity;
            spacectx.arc(this.x,this.y, this.size, 0, Math.PI * 2,true); 
            spacectx.arc(this.x,this.y, this.size-1, 0, Math.PI * 2,true); 
            spacectx.fillRect(this.x-(this.size/2),this.y-(this.size/2),this.size,this.size);
      }

      update()
      {
        this.x += this.x_dir;
        this.y += this.y_dir;
      }

      change(x, y,size,x_dir,y_dir,opacity)
      {
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
      revertX()
      {
        this.x_dir *= -1;
      }
      revertY()
      {
        this.y_dir *= -1;
      }
    }


    spacectx.beginPath();
    var nodes = new Array()

    for (let i=1;i<=total_nodes;i++)
    {
      nodes.push(new node(Math.random() * myspace.width | 0,Math.random() * myspace.height | 0,( Math.random()*(max_size-min_size) + min_size | 0 ) + 1,Math.random() * 2 - 1 ,Math.random() * 2 - 1 ,(Math.random() * (max_opacity-min_opacity) + min_opacity | 0).toString()));
    }

    setInterval(() => {
      spacectx.clearRect(0,0,myspace.width,myspace.height);
      // var last_node = [-100,-100];
      spacectx.beginPath();
      nodes.forEach((n)=>{
        
        // if(n.x < 0 || n.x > myspace.width || n.y < 0 || n.y > myspace.height)
          // n.change(Math.random() * myspace.width | 0,Math.random() * myspace.height | 0,( Math.random()*(max_size-min_size) + min_size | 0 ) + 1,Math.random() * 2 - 1 ,Math.random() * 2 - 1 ,(Math.random() *  (max_opacity-min_opacity) + min_opacity | 0).toString());
        if(n.x < 0 || n.x > myspace.width)
          n.revertX();
        else if(n.y < 0 || n.y > myspace.height)
          n.revertY();
          //console.log(last_node,n.distance(last_node[0],last_node[1]));
          // if (n.distance(last_node[0],last_node[1] > 200 )){
            spacectx.closePath();
            spacectx.fill();
            spacectx.beginPath();
          // }
          n.draw();
          n.update();
          // last_node = n.current_pos();
        
      });
    },100);



    var text1 = "Hi , I'm Salim Alaoui";
    var text2 = "I'm a Software Engineer.";
    var text1label = document.getElementById("text1");
    var text2label = document.getElementById("text2");
    var x=0;
    var speedwrite = 200;

    setTimeout(()=>{
      for(i=0;i<text1.length;i++)
      {
          setTimeout(()=>{
              if(text1.substring(x,x+1) == "S" && window.innerWidth < 768)
                text1label.innerHTML += '<br style="display:block;">';
              text1label.innerHTML += text1.substring(x,++x);
          }, speedwrite*(i+1));   
      }
      setTimeout(()=>{
            text1label.style.display="block";  
      }, speedwrite*text1.length);  
      
      var y=0;
      for(i=0;i<text2.length;i++)
      {
          setTimeout(()=>{
              if(text1.substring(y,y+1) == "P" && window.innerWidth < 768)
                text1label.innerHTML += '<br style="display:block;">'
              text2label.innerHTML += text2.substring(y,++y);
          },(speedwrite*text1.length)+speedwrite*(i+1));
      }
    },2000);

    var topwin = window.scrollY;
    var header = document.getElementsByTagName("header")[0];
    var last_move;
    addEventListener('scroll', (event) => {
        var newtop=window.scrollY;
        if(last_move)
          last_move = [last_move[0],last_move[1]+(newtop-topwin)];
        if(newtop > 150 && newtop>topwin  && header.style.position == "sticky") 
        {
          
          header.style.position = "relative";
          header.style.top = newtop.toString()+"px";

        }
        // else if(newtop < 80 || newtop < topwin-10)
        else if(newtop <= 150 )
        {
            header.style.position = "sticky";
            header.style.top = "0";
        }
        if( newtop > 200 && document.getElementsByClassName("more")[0].style.display!=="none")
        {
            document.getElementsByClassName("more")[0].style.display="none";
            var s = setInterval(()=>
            {
              if (document.getElementById("about").getBoundingClientRect().top>0)
                window.scrollBy(0,10);
              else
                clearInterval(s);
            },10)
        }
      topwin = newtop;
        
    });



    if(window.innerWidth < 768 )
    {
      document.getElementById("curs").style.fontSize = "23vw";
      document.getElementById("curs").style.marginLeft = "-8vw";
    }


        for(let a of document.getElementsByTagName("nav")[0].getElementsByTagName("a"))
        {
          a.addEventListener('click',(event)=>{
              document.querySelector(event.currentTarget.getAttribute("scroll")).scrollIntoView();
          })
        }


    var myphoto = document.getElementById("myphoto");
    var PCoords = myphoto.getBoundingClientRect();
    
    var Pheader = header.getBoundingClientRect();
   
    var fllwint;


    
    document.onmousemove = (event) => {
      
        cursflw.style.display = "block";
         last_move = [event.clientX-15,event.pageY-15];
         console.log(last_move)
        clearInterval(fllwint);
        fllwint = setInterval(()=>{
          let canvas_y = cursflw.getBoundingClientRect().top+window.scrollY;
          let canvas_x = cursflw.getBoundingClientRect().left;
          console.log(canvas_x,canvas_y)
          if(canvas_y==last_move[1] && last_move[0]==canvas_x)
          {
            clearInterval(fllwint);
            return;
          }
          cursflw.style.top = (canvas_y+((last_move[1]-canvas_y)/100)).toString()+"px";
          cursflw.style.left = (canvas_x+((last_move[0]-canvas_x)/100)).toString()+"px";
        },3);
        
        
      // if( ( ( event.clientX <= PCoords.right + 50 ) && ( event.clientX >= PCoords.left - 50 ) )   &&  ( ( event.pageY <= PCoords.bottom + 50 ) && ( event.pageY >= PCoords.top - 50 ) ) ) 
      // {
        // console.log(Pheader.height,event.clientY);
      // }
      if( ( ( event.clientX <= Pheader.right ) && ( event.clientX >= Pheader.left ) )   &&  ( ( event.clientY <= Pheader.height ) && ( event.clientY >= 0 ) ) ) 
        {
          header.style.position = "sticky";
            header.style.top = "0";
        }
      
    };
}
console.log("Hey friend , You have nothing to do right here!!! ( Salim Alaoui )")

// if(cursflw.style.top.endsWith('px'))
//   {
//     let canvas_y = cursflw.style.top
//     canvas_y = parseInt(canvas_y.substring(0,canvas_y.length-2));
//     let canvas_x = cursflw.style.left
//     canvas_x = parseInt(canvas_y.substring(0,canvas_y.length-2));
//   }
//   else
//   {
//     canvas_y = 0;
//     canvas_x = 0;
//   }
//   if(canvas_y==last_move[1] && last_move[0]==canvas_x)
//   {
//     clearInterval(fllwint);
//     return;
//   }
//   cursflw.style.top = (canvas_y+((last_move[1]-canvas_y)/100)).toString()+"px";
//   cursflw.style.left = (canvas_x+((last_move[0]-canvas_x)/100)).toString()+"px";