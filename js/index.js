const CLIENT_ID="0c0c98dd83c6dc7";
const CLIENT_SECRET="40a709e436678f1993eaef0fc3e878fa63d81f88";
window.addEventListener("load",()=>{
    getData();
})


async function getData()
{
    let res = await fetch(`https://api.imgur.com/3/gallery/top/viral/all/1?album_previews=true`,{
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
        data.forEach((item)=>{
            let gallery_box = document.createElement("div");
            gallery_box.setAttribute("class","gallery_box");
    
            let image_container = document.createElement("div");
            let image1 = document.createElement("img");
            image1.height="100%";
            image1.width="100%";
            if(item.images!=undefined && item.images.length>0)
            {
                image1.setAttribute("src",item.images[0].gifv)

            }
            image_container.append(image1);
    
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
            column[Math.floor(Math.random()*4)].append(gallery_box);
        })

    }
}