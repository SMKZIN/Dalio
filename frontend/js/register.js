document.getElementById('registerForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const age = parseInt(document.getElementById('age').value);

      if (!name || !email || !password || isNaN(age)) {
        alert('Preencha todos os campos corretamente!');
        return;
      };

      try {
        const response = await fetch('http://localhost:3000/users', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, age })
        });

        if (response.ok) {
          alert('Registro realizado com sucesso!');
          window.location.href = '/dalio/frontend/html/login.html';
        } else {
          const err = await response.json();
          alert('Erro: ' + (err.message || 'Falha no registro'));
        }
      } catch (error) {
        alert('Erro de conexão: ' + error.message);
      }
    });