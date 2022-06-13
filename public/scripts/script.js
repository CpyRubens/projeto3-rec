const btn = document.querySelectorAll(".see")
const modal = document.querySelector("#details")
const closeModal = document.querySelector(".close");

if (btn != null){
closeModal.addEventListener("click", ()=>{
    modal.style.display= "none"
})


for(let i = 0; i <= btn.length; i++)
btn[i].addEventListener("click", ()=>{
    modal.style.display = "flex";

})
}



