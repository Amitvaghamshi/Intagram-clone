// import navbar
import { navbar } from "../component/navbar.js";
document.getElementById("navbar").innerHTML=navbar();



// get data from heroku and show in page according to pagination;

const get_data =async(page,image_perpage)=>{
    // change color of button
     let allbtn=document.querySelectorAll("#page_btn button");
      allbtn.forEach((el)=>{
               el.style.backgroundColor=null
           console.log("amit")
      })
      if(page==1){
       // document.getElementById("1").style.backgroundColor="green"
      }else{
        document.getElementById(page).style.backgroundColor="green"
      }
    

    
             let responce=await fetch(`https://safe-stream-11652.herokuapp.com/posts?_page=${page}&_limit=${image_perpage}`)
             let data= await responce.json();
             console.log(data);

             let place=document.getElementById("append_image");
             append(data,place);
}

// calling for by default show first page data  hear we pas to to show 2 images par page
get_data(1,2);


//  appending data
let append =(data,place)=>{
        place.innerHTML=null;
        data.forEach((el)=>{
                 let div=document.createElement("div");
                 div.setAttribute("class","image_box")
                 let img=document.createElement("img");
                 img.src=el.actual_data;

                 let caption=document.createElement("p");
                 caption.innerText=el.caption;

                div.append(img,caption);
                place.append(div);
        })
}


// creating button for pagination

const btn_data =async()=>{
    let responce=await fetch(`https://safe-stream-11652.herokuapp.com/posts`)
    let data= await responce.json();
    create_btn(data,2)
}

btn_data();
let create_btn=(images,image_perpage)=>{
             let no_ofbtn=Math.ceil(images.length/image_perpage);

             for(let i=1;i<=no_ofbtn;i++){
                  let btn=document.createElement("button");
                  btn.innerText=i;
                  btn.id=i;
                  btn.onclick=()=>{
                    get_data(i,2);
                  }
                  document.getElementById("page_btn").append(btn);
             }
}






 // change color of button
   //  let allbtn=document.querySelectorAll("page_btn >button");
    //  allbtn.forEach((el)=>{
    //           el.style.backgroundColor=null
    //           console.log("amit")
    //  })