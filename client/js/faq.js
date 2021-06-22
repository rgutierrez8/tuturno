const questContainer = document.getElementById("cuestion-container").children;

window.onload = loadFQ;
function loadFQ(){
    for(let i=0; i<questContainer.length; i+=2){                        //Recorre todos los hijos
        questContainer[i].addEventListener("click", function(){         //funcion click al hijo de la posición i
            questContainer[i].classList.toggle("questionSelected");     //Agrega clase al hijo seleccionado(la pregunta)
            questContainer[i+1].classList.toggle("answerShow");         //Agrega clase al hijo siguiente(div de la respuesta)
            questContainer[i+1].children[0].classList.toggle("pShow");  //Agrega clase al p dentro del div respuesta
        })
    }
}