const inputUser = document.getElementById("inputUser");
const inputPass = document.getElementById("inputPassword");
const btnCancel = document.getElementById("inputCancelar");
const btnSubmit = document.getElementById("inputSubmit");
const form = document.getElementById("formLog");

inputUser.addEventListener("change", function(){
    if(inputUser.value){
        inputUser.classList.add("inputValid");
    }
});

inputPass.addEventListener("change", function(){
    if(inputPass.value){
        inputPass.classList.add("inputValid");
    }
});



btnCancel.addEventListener("click", function(){
    inputUser.textContent = "";
    inputPass.textContent = "";
}); 
