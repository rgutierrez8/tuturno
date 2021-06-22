const btnSearch = document.getElementById("btnSearch");
const userBar = document.getElementById("userBar");
const userSection = document.getElementById("usrBtn");
const btnBack = document.getElementById("btnBack");


btnBack.addEventListener("click", function(){
    window.history.back();
});

btnSearch.addEventListener("click", function(){
    window.location.href = `/turn/searchTurn`;
});

if(userSection){
    userSection.addEventListener("click", function(){
        userBar.classList.toggle("userBar");
        console.log("si");
    });
}
