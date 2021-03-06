const CLIENT_ID="0c0c98dd83c6dc7";
const CLIENT_SECRET="40a709e436678f1993eaef0fc3e878fa63d81f88";
window.addEventListener("load",()=>{
    getData();
})

window.addEventListener("scroll",()=>{
    let content_box = document.getElementsByClassName("navbar_content")[0];
    let bg_image = document.getElementsByClassName("bg_image")[0];
    let navbar_title = document.getElementsByClassName("navbar_title")[0];
    let gallery_main = document.getElementsByClassName("gallery_main")[0];
    let navbar = document.getElementsByClassName("navbar")[0];
    navbar.style.zIndex="12";
    gallery_main.style.margin="135px auto";
    navbar_title.style.display="none";
    content_box.style.display="none";
    bg_image.style.height="92px";
})
async function getData()
{
    let res = await fetch(`https://api.imgur.com/3/gallery/hot/viral/all/1?album_previews=true`,{
        method:"GET",
        headers:{'Authorization':`Client-ID ${CLIENT_ID}`}
    })
    let {data} = await res.json();
    console.log(data);
    displayData(data);
}

function displayData(data)
{
    if(data!=undefined)
    {
        let column = document.getElementsByClassName("col");
        column[0].innerHTML="";
        column[1].innerHTML="";
        column[2].innerHTML="";
        column[3].innerHTML="";
        let index=0;
        data.forEach((item)=>{
            if(!(item.cover==undefined || item.cover.length==0))
            {
           
            let gallery_box = document.createElement("div");
            gallery_box.setAttribute("class","gallery_box");
    
            let image_container = document.createElement("div");
            
            if(item.images!=undefined && item.images.length>0)
            {
                if(item.images[0].type!='video/mp4')
                {
                    let image = document.createElement("img");
                    image.setAttribute("src","https://i.imgur.com/"+item.cover+".webp?maxwidth=520&shape=thumb&fidelity=high")
                    image_container.append(image);
                }
                else if(item.images[0].type=='video/mp4' && item.images[0].mp4!=undefined && item.images[0].mp4.length>0)
                {
                    let video = document.createElement("video");
                    video.autoplay=true;
                    video.muted=true;
                    video.loop=true;
                    video.style.height="100%";
                    video.style.width="100%";
                    let option = document.createElement("source");
                    option.setAttribute("src",item.images[0].mp4);
                    video.append(option);
                    image_container.append(video);
                }

            }
           
            image_container.addEventListener("click",()=>{
                    localStorage.setItem("videoid",item.id);
                    window.location.href="./pages/album.html";
            });
            let box_content = document.createElement("div");
            let title = document.createElement("h4");
            title.innerHTML = item.title;
            let button_container = document.createElement("div");
            let upvote = document.createElement("div");
            upvote.innerHTML = `<span>&#129093;&nbsp;</span>${item.ups}`;
            let comment = document.createElement("div");
            comment.innerHTML= `<span>&#128489;&nbsp;</span>${item.comment_count}`;
            let views = document.createElement("div");
            views.innerHTML = `<span>&#128065;</span>&nbsp;${item.views}`;
            button_container.append(upvote,comment,views);
            box_content.append(title,button_container);
            
            gallery_box.append(image_container,box_content);
            column[index++].append(gallery_box);
            if(index==4)
            {
                index=0;
            }
        }
        })

    }
}