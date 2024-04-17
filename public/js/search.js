function handleSearch(e) {
  e.preventDefault();

  const searchValue = document.querySelector('#search-input').value.trim();
  window.location.href = `/search?q=${searchValue}`;
}

document.querySelector('#search-form').addEventListener('submit', handleSearch);
