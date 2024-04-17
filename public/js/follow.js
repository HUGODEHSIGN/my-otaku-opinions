const followButtons = document.querySelectorAll('.follow-btn');

async function handleFollowAnime(e) {
  console.log(e.target.dataset.animeId);
}

followButtons.forEach((button) =>
  button.addEventListener('click', handleFollowAnime)
);
