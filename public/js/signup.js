// original code
const signupFormHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector('#signup-username').value.trim();
  const password = document.querySelector('#signup-password').value.trim();

  if (username && password) {
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

// Function to validate username
async function validateUsername(username) {
  // const lowercaseUsername = username.toLowerCase();
  const usernameField = document.getElementById('signup-username');
  const usernameHelpBlock = document.getElementById('usernameHelpBlock');
  // usernameField.value = lowercaseUsername;

  const response = await fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify({ username }),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();

  if (username.length > 0 && !data.usernameExists) {
    usernameField.classList.remove('is-invalid');
    usernameField.classList.add('is-valid');
    usernameHelpBlock.style.display = 'none';
    return true;
  } else if (username.length > 0 && data.usernameExists) {
    usernameField.classList.remove('is-valid');
    usernameField.classList.add('is-invalid');
    usernameHelpBlock.style.display = 'block';
    usernameHelpBlock.textContent =
      'Username is unavailable. Try adding numbers, letters, underscores _ , or periods.';
    return true;
  } else {
    usernameField.classList.remove('is-valid');
    usernameField.classList.add('is-invalid');
    usernameHelpBlock.style.display = 'block';
    usernameHelpBlock.textContent = 'Please enter a valid username.';
    return false;
  }
}

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
