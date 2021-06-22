const imgView = document.getElementById("imgView");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const hourContainer = document.getElementById("hourContainer");
const url = window.location.href.split("&")[1].split("=")[1];
const btnSelectTurn = document.getElementById("btnSelectTurn");
const rentTurn = document.getElementById("rentTurn");
const questionConfirm = document.getElementById("questionConfirm");
const confirmation = document.getElementById("confirmation");
const confirmed = document.getElementById("confirmed");
const inputConfirm = document.getElementById("inputConfirm");
const inputCancel = document.getElementById("inputCancel");

const turns = document.getElementById("hourContainer");
const divTurns = turns.children;
let hour;
let id;

/*============ Carga de horarios disponibles =============*/
window.onload = load;
function load(){
    const xhr = new XMLHttpRequest();
    
    xhr.addEventListener("load", function(){
        const response = JSON.parse(xhr.responseText);
        const available = response[0].available;
        id = response[0]._id;
        
        for(let i=0; i<available.length; i++){
            const divHour = document.createElement("div");
            divHour.textContent = available[i];
            divHour.classList.add("hourList");
            
            //CONTROL PARA QUE SOLO UN HORARIO PUEDA SER SELECCIONADO (EXCLUYE TURNO OCUPADO)
            divHour.addEventListener("click", function(){
                for(let j=0; j<divTurns.length; j++){
                    if(divTurns[j].classList.contains("selectedTurn")){
                        divTurns[j].classList.remove("selectedTurn");
                        divHour.classList.add("selectedTurn");
                    }
                    else{
                        divHour.classList.add("selectedTurn");
                    }
                }
                
                hour = divHour.textContent;
                
                if(divHour.classList.contains("selectedTurn")){
                    btnSelectTurn.disabled = false;
                }
            });
            hourContainer.appendChild(divHour);
        }
        
    });

    xhr.open("GET", `/validation/validateHour?id=${url}`);
    xhr.send();
};

/*======================= Cambiar de imágenes de muestra =================*/
img1.addEventListener("click", function(){
    imgView.src = img1.src;
    img1.classList.add("selected");
    img2.classList.remove("selected");
    img3.classList.remove("selected");
});

img2.addEventListener("click", function(){
    imgView.src = img2.src;
    img2.classList.add("selected");
    img1.classList.remove("selected");
    img3.classList.remove("selected");
});

img3.addEventListener("click", function(){
    imgView.src = img3.src;
    img3.classList.add("selected");
    img1.classList.remove("selected");
    img2.classList.remove("selected");
});

//============================ CONFIRMAR TURNO ========================
btnSelectTurn.addEventListener("click", function(){
    questionConfirm.textContent = `¿Estas seguro de reservar el turno de las ${hour}hs?`
    rentTurn.classList.add("showConfirm");
});

inputConfirm.addEventListener("click", function(){

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("load", function(){
        if(xhr.status === 200){console.log("entra al status");
            confirmation.classList.add("hidden");
            confirmed.classList.add("showConfirm");
            console.log(window.location.href);
            setTimeout(function(){
                location.reload();
            },1000);
        }
    });

    xhr.open("GET", `/stadium/rentHour?hour=${hour}&id=${id}`);
    xhr.send();
});

inputCancel.addEventListener("click", function(){
    rentTurn.classList.remove("showConfirm");
});