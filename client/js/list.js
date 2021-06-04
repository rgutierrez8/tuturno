const inputTime = document.getElementById("inputTime");
const pAlert = document.getElementById("pAlert");

inputTime.addEventListener("change", function(){
    const hour = inputTime.value.split(":")[0]; 
    if(hour < 14){
        pAlert.textContent = "Horarios habiles a partir de hs: 14:00";
        pAlert.classList.remove("alertHidden");
    }
    else{
        pAlert.classList.add("alertHidden");
    }
});
