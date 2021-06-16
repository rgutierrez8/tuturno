const inputName = document.getElementById("inputName");
const inputEmail = document.getElementById("inputEmail");
const inputText = document.getElementById("inputText");
const inputSubmit = document.getElementById("inputSubmit");
const divContainer = document.getElementById("container");
const message = document.getElementById("message");
const h2 = document.getElementById("h2");


inputName.addEventListener("change", function(){
    console.log("entra");
    if(inputName.value){
        inputName.classList.add("inputValid");
    }
    else{
        inputName.classList.remove("inputValid");
    }
});

inputEmail.addEventListener("change", function(){
    console.log("entra");
    if(inputEmail.value){
        inputEmail.classList.add("inputValid");
    }
    else{
        inputEmail.classList.remove("inputValid");
    }
});

inputText.addEventListener("change", function(){
    console.log("entra");
    if(inputText.value){
        inputText.classList.add("inputValid");
    }
    else{
        inputText.classList.remove("inputValid");
    }
});

inputSubmit.addEventListener("click", function(){
    if(inputName.value && inputEmail.value && inputText.value){
        while(divContainer.firstChild){
            divContainer.removeChild(divContainer.firstChild);
            h2.textContent = "Mensaje enviado con exito, redireccionando...";
        }
        setTimeout(function(){
            window.history.back();
        }, 1000);
        return;
    }
    message.classList.remove("messageHidden");
});

