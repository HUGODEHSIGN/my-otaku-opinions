const loginFormHandler = async (event) => {
  event.preventDefault();
  const username = document
    .querySelector('#login-username')
    .value.toLowerCase()
    .trim();
  const password = document.querySelector('#login-password').trim();

  let response;
  if (username && password) {
    response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log in.');
  }
};

document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);
