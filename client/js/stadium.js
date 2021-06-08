const imgView = document.getElementById("imgView");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const hourContainer = document.getElementById("hourContainer");
const url = window.location.href.split("&")[1].split("=")[1];

const turns = document.getElementById("hourContainer");
const divTurns = turns.children;

/*============ Carga de horarios disponibles =============*/
window.onload = load;
function load(){
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("load", function(){
        const response = JSON.parse(xhr.responseText);
        const available = response[0].available;
        let count = 14;

        for(const element in available){
            const divHour = document.createElement("div");
            divHour.textContent = count;
            if(available[element] === "taken"){
                divHour.classList.add("taken");
                divHour.classList.add("hourList");
            }
            else{
                divHour.classList.add("hourList");
            }
            
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
            });
            count += 1;
            hourContainer.appendChild(divHour);
        }
        
    });

    xhr.open("GET", `/validateHour?id=${url}`);
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