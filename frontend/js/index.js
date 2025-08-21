const enjoy = document.getElementById("enjoy");

let liked = false;

enjoy.addEventListener("click", () => {
    liked = !liked;

    if(liked){
        enjoy.src = "/frontend/img/liked.png";
    } else {
        enjoy.src = "/frontend/img/heart.png"
    }
});