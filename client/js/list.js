const inputTime = document.getElementById("inputTime");
const inputStadium = document.getElementById("inputStadium");
const pAlert = document.getElementById("pAlert");
const inputSubmit = document.getElementById("inputSubmit");
const helpButton = document.getElementById("helpButton");
const helpContainer = document.getElementById("helpContainer");
let url = "";

inputSubmit.addEventListener("click", function(){
    if(inputStadium.value){
        url = `${url}stadium=${inputStadium.value}`;
    }
    if(inputTime.value){
        const hour = inputTime.value.split(":")[0]; 
        if(hour < 14){
            pAlert.textContent = "Horarios habiles a partir de hs: 14:00";
            pAlert.classList.remove("alertHidden");
            return;
        }
        else{
            url = `${url}&hour=${hour}`;
            pAlert.classList.add("alertHidden");
        }
    }
    window.location.href = `/searchTurn?${url}`;
});

helpButton.addEventListener("click", function(){
    helpContainer.classList.toggle("helpHidden");
});