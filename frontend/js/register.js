document.getElementById('registerForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const age = parseInt(document.getElementById('age').value);

      if (!name || !email || !password || isNaN(age)) {
        alertCustom('Preencha todos os campos corretamente!');
        return;
      };

      try {
        const response = await fetch('http://localhost:3000/users', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, age })
        });

        if (response.ok) {
          alertCustom('Registro realizado com sucesso!');
           setTimeout(() => {
              window.location.href = "/frontend/html/index.html";
            }, 3000)
        } else {
          const err = await response.json();
          alertCustom('Erro: ' + (err.message || 'Falha no registro'));
        }
      } catch (error) {
        alertCustom('Erro de conexão: ' + error.message);
      }
    });