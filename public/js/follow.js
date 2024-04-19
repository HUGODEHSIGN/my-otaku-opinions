const followButtons = document.querySelectorAll('.follow-btn');

async function handleFollowAnime(e) {
  //   console.log(e.target.dataset.malId);
  try {
    const malId = e.target.dataset.malId;
    const res = await fetch('/api/follow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ malId }),
    });
    if (res.ok) {
      e.target.classList.add('btn-disabled');
      e.target.innerText = 'Followed';
    }
  } catch (err) {
    console.error(err);
  }
}

followButtons.forEach((button) =>
  button.addEventListener('click', handleFollowAnime)
);
