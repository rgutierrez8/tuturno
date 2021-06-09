const btnLogin = document.getElementById("logIn");
const formContainer = document.createElement("div");
const formLog = document.createElement("form");
const divUser = document.createElement("div");
const inputUser = document.createElement("input");
const labelUser = document.createElement("label");
const divPass = document.createElement("div");
const inputPass = document.createElement("input");
const labelPass = document.createElement("label");
const btnSubmit = document.createElement("input");
const btnCancel = document.createElement("input");
const pAlertLog = document.createElement("p");


btnLogin.addEventListener("click", function(){

    if(nav){
        nav.style.filter = "blur(4px)";
    }
    if(section){
        section.style.filter = "blur(4px)";
    }
    if(header){
        header.style.filter = "blur(4px)";
    }

    formLog.classList.add("formLog");
    formLog.setAttribute("method", "post");
    formLog.setAttribute("action", "/logIn");
    
    inputUser.type = "text";
    inputUser.setAttribute("id", "inputUser");
    inputUser.setAttribute("autocomplete", "off");

    labelUser.textContent = "Usuario";

    inputPass.type = "password";
    inputPass.setAttribute("id", "inputPass");
    
    labelPass.textContent = "Contraseña";

    btnSubmit.type = "submit";
    btnSubmit.value = "Ingresar";
    btnSubmit.setAttribute("id", "btnSubmit");
    btnSubmit.classList.add("btnLog");

    btnCancel.type = "submit";
    btnCancel.setAttribute("value", "Cancelar");
    btnCancel.classList.add("btnLog");

    pAlertLog.textContent = "Mensaje de error";
    pAlertLog.setAttribute = ("id", "pAlert");
    pAlertLog.classList.add("alertHidden");

    divUser.appendChild(inputUser);
    divUser.appendChild(labelUser);
    divUser.classList.add("inputData");

    divPass.appendChild(inputPass);
    divPass.appendChild(labelPass);
    divPass.classList.add("inputData");

    formLog.appendChild(divUser);
    formLog.appendChild(divPass);
    formLog.appendChild(btnSubmit);
    formLog.appendChild(btnCancel);
    formLog.appendChild(pAlertLog);

    formContainer.appendChild(formLog);
    formContainer.classList.add("formContainer");


    document.body.appendChild(formContainer);
});

btnCancel.addEventListener("click", function(){
    document.body.removeChild(formContainer);
    if(nav){
        nav.style.filter = "blur(0px)";
    }
    if(section){
        section.style.filter = "blur(0px)";
    }
    if(header){
        header.style.filter = "blur(0px)";
    }
});

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