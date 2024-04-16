const logoutHandler = async () => {
  const response = await fetch('/api/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert('Loging Failed');
  }
};

document.querySelector('#logout').addEventListener('click', logoutHandler);
