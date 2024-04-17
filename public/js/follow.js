const followButtons = document.querySelectorAll('.follow-btn');

async function handleFollowAnime(e) {
  //   console.log(e.target.dataset.malId);
  const malId = e.target.dataset.malId;
  const res = await fetch('/api/follow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ malId }),
  });
}

followButtons.forEach((button) =>
  button.addEventListener('click', handleFollowAnime)
);
