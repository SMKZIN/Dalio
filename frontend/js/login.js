document.getElementById("formLogin").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password"). value.trim();

    if(!email || !password){
        alert('Preencha todos os campos corretamente!');
        return;
    };

    try {
        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password})
        });

        if(response.ok){
            alert('Login realizado com sucesso!');
            return;
        }else {
          const err = await response.json();
          alert('Erro: ' + (err.message || 'Falha no registro'));
        }
      } catch (error) {
        alert('Erro de conexão: ' + error.message);
      }
});