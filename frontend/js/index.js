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

document.querySelectorAll(".ver-comentarios").forEach(btn => {
  btn.addEventListener("click", () => {
    const container = btn.closest(".comentarios--cliente");
    container.classList.add("active");
    btn.style.display = "none"; // esconde o "Ver todos os comentários"
    container.querySelector(".comentario-preview").style.display = "none"; // esconde o preview apagado
  });
});

