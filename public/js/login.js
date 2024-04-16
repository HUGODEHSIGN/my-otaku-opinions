const loginForm = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#email-log').value.trim();
  const password = document.querySelector('#password-log').value.trim();

  if (email && password) {
    const response = await fetch('TODO:', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log in.');
  }
};

document.querySelector('.login-form').addEventListener('submit', loginForm);
