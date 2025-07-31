async function signup() {
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;

  const res = await fetch('/signup', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  alert('Signup: ' + JSON.stringify(data));
}

async function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const res = await fetch('/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  alert('Login: ' + (data.success ? 'Success' : 'Failed'));
}