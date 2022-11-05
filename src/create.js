// import navbar
import { navbar } from "../component/navbar.js";
document.getElementById("navbar").innerHTML=navbar();

//upload data to imgbb sever

let file=document.getElementById("file");

file.onchange= ()=>{
            handleimage();     
};

let actual_data;
const handleimage= async()=>{
    let file_path=document.getElementById("file") ;
    let actual_file=file_path.files[0]; 
    let form=new FormData();
    form.append("image",actual_file);
    
    let responce=await fetch(`https://api.imgbb.com/1/upload?key=9de4cf16906f57e8a5f318f09dc165b4`,{
            method:"POST",
            body:form,
      });

    let data=await responce.json();
    document.getElementById("upload").style.display="block"
    console.log(data);
     actual_data=data.data.display_url;
     console.log(actual_data)
}


//upload data to heroku server;

let upload_btn=document.getElementById("upload");
upload_btn.onclick= ()=>{
        heroku();
}

const heroku= async()=>{
      try{

       let id=document.getElementById("id").value;
       let caption=document.getElementById("caption").value;
       
       let obj={
        id,
        caption,
        actual_data
       }
     
       let responce=await fetch(`https://safe-stream-11652.herokuapp.com/posts`,{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
       })

       let data=await responce.json();
       document.getElementById("upload").style.display=null;
       document.getElementById("show_message").innerText="Post suceessfully"
       console.log(data);
       alert("Post suceessfully")
    }catch(e){
        console.log(e);
        //document.getElementById("show_message").innerText="Opps something problem try again"
        alert("Opps something problem try again")
    }
}

// delete data from heroku server

let remove_btn=document.getElementById("remove_btn");
remove_btn.onclick= ()=>{
          remove_image();
}

const  remove_image= async()=>{
          let id=document.getElementById("remove_id").value ;
          let responce=await fetch(`https://safe-stream-11652.herokuapp.com/posts/${id}`,{
              method:"DELETE",
              headers:{
                "Content-Type":"application/json"
              }
          })

          let data=await responce.json();
          console.log(data);
}


// update caption
let update=document.getElementById("update");
update.onclick= () =>{
      update_caption()
}

const update_caption= async()=>{
    let cap=document.getElementById("update_caption").value;
    let id=document.getElementById("update_id").value;

    let obj={
        caption:cap,
       }
     
       let responce=await fetch(`https://safe-stream-11652.herokuapp.com/posts/${id}`,{
        method:"PATCH",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
       })

       let data=await responce.json();
       console.log(data);
}

//create post btn remove
document.getElementById("submit_btn").style.display=null