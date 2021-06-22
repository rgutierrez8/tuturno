const inputOwnerName = document.getElementById("inputOwnerName");
const inputLocalName = document.getElementById("inputLocalName");
const inputPhone = document.getElementById("inputPhone");
const inputAddress = document.getElementById("inputAddress");
const price = document.getElementById("price");
const nightPrice = document.getElementById("nightPrice");
const floor = document.getElementById("floor");
const pAlert = document.getElementById("alert");
const inputRegister = document.getElementById("inputRegister");
const inputCancel = document.getElementById("inputCancel");
const check = document.getElementById("check");

let valid = 0;

check.addEventListener("click", function(){
    if(!inputOwnerName.value || !inputLocalName.value || !inputPhone.value || !inputAddress.value){
        pAlert.classList.remove("alertHidden");
        inputRegister.disabled = true;
        check.checked = false;
        return;
    }
    pAlert.classList.add("alertHidden");
    validateName(inputLocalName.value);
    setTimeout(function(){
        if(valid === 1){
            pAlert.textContent = `Ya existe ${inputLocalName.value} en nuestra base de datos`;
            pAlert.classList.remove("alertHidden");
            inputRegister.disabled = true;
            check.checked = false;
            return;
        }
    }, 100);

    if(check.checked){
        inputRegister.disabled = false;
    }
});

inputCancel.addEventListener("click", function(){
    inputOwnerName.value = "";
    inputLocalName.value = "";
    inputPhone.value = "";
    inputAddress.value = "";
});

function validateName(name){
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("load", function(){
        const response = JSON.parse(xhr.responseText);

        if(response.length != 0){
            if(response[0].name === name){
                valid = 1;
                console.log(`aaa: ${valid}`);
                return valid;
            }
            valid = 0;
            return valid;
        }
        valid = 0;
    });

    xhr.open("GET", `/validation/validateRegister?name=${name}`);
    xhr.send();
}

inputOwnerName.addEventListener("change", function(){
    if(inputOwnerName.value){
        inputOwnerName.classList.add("inputValid");
    }
    else{
        inputOwnerName.classList.remove("inputValid");
    }
});

inputLocalName.addEventListener("change", function(){
    if(inputLocalName.value){
        inputLocalName.classList.add("inputValid");
    }
    else{
        inputLocalName.classList.remove("inputValid");
    }
});

inputPhone.addEventListener("change", function(){
    if(inputPhone.value){
        inputPhone.classList.add("inputValid");
    }
    else{
        inputPhone.classList.remove("inputValid");
    }
});

inputAddress.addEventListener("change", function(){
    if(inputAddress.value){
        inputAddress.classList.add("inputValid");
    }
    else{
        inputAddress.classList.remove("inputValid");
    }
});

price.addEventListener("change", function(){
    if(price.value){
        price.classList.add("inputValid");
    }
    else{
        price.classList.remove("inputValid");
    }
});

nightPrice.addEventListener("change", function(){
    if(nightPrice.value){
        nightPrice.classList.add("inputValid");
    }
    else{
        nightPrice.classList.remove("inputValid");
    }
});

floor.addEventListener("change", function(){
    if(floor.value){
        floor.classList.add("inputValid");
    }
    else{
        floor.classList.remove("inputValid");
    }
});