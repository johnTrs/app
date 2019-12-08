var btn=document.querySelector('.btn')
btn=document.addEventListener('click',()=>{
 async function get(){   
await fetch('/addUser/name/last')}
get()
})