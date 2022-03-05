const CLIENT_ID="0c0c98dd83c6dc7";
const CLIENT_SECRET="40a709e436678f1993eaef0fc3e878fa63d81f88";
window.addEventListener("load",()=>{
    getToken();
})


async function getToken()
{
    let res = await fetch(`https://api.imgur.com/3/gallery/top/viral/all/1`,{
        method:"GET",
        headers:{'Authorization':`Client-ID ${CLIENT_ID}`}
    })
    let data = await res.json();
    console.log(data);
}