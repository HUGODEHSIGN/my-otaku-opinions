const signupFormHandler = async (event) => {
  event.preventDefault();
  const username = document
    .querySelector('#signup-username')
    .value.toLowerCase()
    .trim();
  const password = document.querySelector('#signup-password').value.trim();
  const isValidUsername = await validateUsername(username);
  const isValidPassword = validatePassword(password);

  // check valid username and password
  if (isValidUsername && password && validatePassword(password)) {
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
  const usernameField = document.getElementById('signup-username');
  const usernameHelpBlock = document.getElementById('usernameHelpBlock');
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

// Function to validate password
function validatePassword(password) {
  const passwordField = document.getElementById('signup-password');
  const passwordHelpBlock = document.getElementById('passwordHelpBlock');

  if (password.length >= 8) {
    passwordField.classList.remove('is-invalid');
    passwordField.classList.add('is-valid');
    passwordHelpBlock.style.display = 'none';
    return true;
  } else {
    passwordField.classList.remove('is-valid');
    passwordField.classList.add('is-invalid');
    passwordHelpBlock.style.display = 'block';
    return false;
  }
}

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
