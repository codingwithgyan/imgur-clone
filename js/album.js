const CLIENT_ID="0c0c98dd83c6dc7";
window.addEventListener("load",()=>{
    getData();
});

async function getData()
{   
    let id = localStorage.getItem("videoid");
    let res = await fetch(`https://api.imgur.com/3/gallery/album/${id}`,{
        method:"GET",
        headers:{'Authorization':`Client-ID ${CLIENT_ID}`}
    });

    let {data} = await res.json();
   
    displayData(data);
}

function displayData(item)
{
    console.log(item);
    let middle = document.getElementsByClassName("middle_container")[0];
    if(item.images!=undefined && item.images.length>0)
            {
                if(item.images[0].type!='video/mp4')
                {
                    let image = document.createElement("img");
                    image.style.height="100%";
                    image.setAttribute("src",item.images[0].link)
                    middle.append(image);
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
                    middle.append(video);
                }

            }
           
}