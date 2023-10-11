const searchBarIcon = document.querySelector('.search-bar-icon');
const searchBar = document.getElementById('search-form');

searchBarIcon.addEventListener("click", () => {
    if(searchBar.classList.contains('show-bar')) {
        searchBar.classList.remove('show-bar');
        searchBar.classList.add('hide-bar');
    } else {
        searchBar.classList.remove('hide-bar');
        searchBar.classList.add('show-bar');
    }
})