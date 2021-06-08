const nav = document.getElementById("nav-container");
const header = document.querySelector("header");
const section = document.querySelector("section");
const signUp = document.getElementById("signUp");
let error;

const div = document.createElement("div");
const form = document.createElement("form");
const div1 = document.createElement("div");
const inputN = document.createElement("input")
const labelN = document.createElement("label");
const div2 = document.createElement("div");
const inputLN = document.createElement("input")
const labelLN = document.createElement("label");
const div3 = document.createElement("div");
const inputE = document.createElement("input")
const labelE = document.createElement("label");
const div4 = document.createElement("div");
const inputU = document.createElement("input")
const labelU = document.createElement("label");
const div5 = document.createElement("div");
const inputP = document.createElement("input")
const labelP = document.createElement("label");
const div6 = document.createElement("div");
const inputRP = document.createElement("input")
const labelRP = document.createElement("label");
const inputS = document.createElement("input")
const inputC = document.createElement("input");
const p = document.createElement("p");


signUp.addEventListener("click", function(){
    if(nav){
        nav.style.filter = "blur(4px)";
    }
    if(section){
        section.style.filter = "blur(4px)";
    }
    if(header){
        header.style.filter = "blur(4px)";
    }
    

    div.classList.add("formContainer");
    div1.classList.add("inputData");
    div2.classList.add("inputData");
    div3.classList.add("inputData");
    div4.classList.add("inputData");
    div5.classList.add("inputData");
    div6.classList.add("inputData");

    form.setAttribute("method", "POST");
    form.setAttribute("action", "/signUp");

    inputN.type = "text";
    inputN.setAttribute("id", "inputName");
    inputN.setAttribute("autocomplete", "off");
    labelN.textContent = "Nombre";

    inputLN.type = "text";
    inputLN.setAttribute("id", "inputLastName");
    inputLN.setAttribute("autocomplete", "off");
    labelLN.textContent = "Apellido";

    inputE.type = "text";
    inputE.setAttribute("id", "email");
    inputE.setAttribute("autocomplete", "off");
    labelE.textContent = "Email";

    inputU.type = "text";
    inputU.setAttribute("id", "user");
    inputU.setAttribute("autocomplete", "off");
    labelU.textContent = "Usuario";

    inputP.type = "password";
    inputP.setAttribute("id", "inputPass");
    inputP.setAttribute("autocomplete", "off");
    labelP.textContent = "Contraseña";

    inputRP.type = "password";
    inputRP.setAttribute("id", "inputRepeatPass");
    inputRP.setAttribute("autocomplete", "off");
    labelRP.textContent = "Repetir Contraseña";

    inputS.type = "submit";
    inputS.setAttribute("id", "inputRegister");
    inputS.setAttribute("value", "Registrarse");

    inputC.type = "submit";
    inputC.setAttribute("value", "Cancelar");

    p.textContent = "Aquí va un mensaje de error";
    p.classList.add("alertHidden");
    p.setAttribute("id", "alert");

    div1.appendChild(inputN);
    div1.appendChild(labelN);
    div2.appendChild(inputLN);
    div2.appendChild(labelLN);
    div3.appendChild(inputE);
    div3.appendChild(labelE);
    div4.appendChild(inputU);
    div4.appendChild(labelU);
    div5.appendChild(inputP);
    div5.appendChild(labelP);
    div6.appendChild(inputRP);
    div6.appendChild(labelRP);

    form.appendChild(div1);
    form.appendChild(div2);
    form.appendChild(div3);
    form.appendChild(div4);
    form.appendChild(div5);
    form.appendChild(div6);
    form.appendChild(inputS);
    form.appendChild(inputC);
    form.appendChild(p);

    div.appendChild(form);

    document.body.appendChild(div);
});

inputC.addEventListener("click", function(){
    document.body.removeChild(div);
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



function validar(text, error, numError){
    const xhr = new XMLHttpRequest();
    let idResponse = "";

    
    xhr.addEventListener("load", function(){
        const response = JSON.parse(xhr.responseText);
        
        
        for(let i=0; i<response.length; i++){
            if(numError===1){
                idResponse = response[i].user;
            }
            else{
                idResponse = response[i].email;
            }
            if(text === idResponse){
                p.textContent = error;
                p.classList.remove("alertHidden");
            }
            else{
                p.textContent = "";
                p.classList.add("alertHidden");
            }
        }
    });

    xhr.open("GET", `/validate?name=${inputName.value}`);
    xhr.send();
}

inputN.addEventListener("change", function(){
    if(inputN.value){
        inputN.classList.add("inputValid");
    }
    else{
        inputN.classList.remove("inputValid");
    }
});

inputLN.addEventListener("change", function(){
    if(inputLN.value){
        inputLN.classList.add("inputValid");
    }
    else{
        inputLN.classList.remove("inputValid");
    }
});

inputU.addEventListener("change", function(){
    if(inputU.value){
        inputU.classList.add("inputValid");
    }
    else{
        inputU.classList.remove("inputValid");
    }
    error = "Usuario existente";
    numError = 1;
    validar(user.value, error, numError);
});

inputE.addEventListener("change", function(){
    if(inputE.value){
        inputE.classList.add("inputValid");
    }
    else{
        inputE.classList.remove("inputValid");
    }
    error = "Email existente";
    numError = 2;
    validar(email.value, error, numError);
});

inputP.addEventListener("change", function(){
    if(inputP.value){
        inputP.classList.add("inputValid");
    }
    else{
        inputP.classList.remove("inputValid");
    }
});

inputRP.addEventListener("change", function(){
    if(inputRP.value){
        inputRP.classList.add("inputValid");
    }
    else{
        inputRP.classList.remove("inputValid");
    }
});