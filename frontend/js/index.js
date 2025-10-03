const enjoy = document.getElementById("enjoy");

let liked = false;

enjoy.addEventListener("click", () => {
    liked = !liked;

    if(liked){
        enjoy.src = "/frontend/img/coracaoPreenc.png";
    } else {
        enjoy.src = "/frontend/img/heart_10969405.png"
    }
});

document.querySelectorAll(".enjoy").forEach(enjoy => {
  let liked = false;

  enjoy.addEventListener("click", () => {
    liked = !liked;

    if (liked) {
      enjoy.src = "/frontend/img/coracaoPreenc.png";
    } else {
      enjoy.src = "/frontend/img/heart_10969405.png";
    }
  });
});

document.querySelectorAll(".ver-comentarios").forEach(btn => {
  btn.addEventListener("click", () => {
    const container = btn.closest(".comentarios--cliente");
    container.classList.add("active");
    btn.style.display = "none";
    container.querySelector(".comentario-preview").style.display = "none"; 
  });
});

const comentarios = document.querySelectorAll(".comentarios-content .titulo");
let indice = 0;

function mostrarComentario() {
  comentarios.forEach(c => c.classList.remove("ativo"));
  comentarios[indice].classList.add("ativo");
  indice = (indice + 1) % comentarios.length;
}

if (comentarios.length > 0) {
  mostrarComentario();
  setInterval(mostrarComentario, 3000); 
}


