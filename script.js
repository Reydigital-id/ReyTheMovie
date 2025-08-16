const API_KEY = "9d8226fbb45f9cd9a73bb4f8b9b03899";
let page = 1;
const API_URL = () =>
  `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`;
const API_IMAGE_URL = "https://image.tmdb.org/t/p/w1280";
const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

function updatePage() {
  getMovies(API_URL());
  currentPage.innerHTML = page;
}

function nextPage() {
  if (page >= 1) {
    page += 1;
    updatePage();
  }
}

function prevPage() {
  if (page > 1) {
    page -= 1;
    updatePage();
  }
}

next.addEventListener("click", () => {
  nextPage();
});

prev.addEventListener("click", () => {
  prevPage();
});

function showMovies(movies) {
  moviesElement.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, overview, popularity, vote_average } = movie;
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie");
    movieCard.innerHTML = `
        <img src="${API_IMAGE_URL + poster_path}" alt="ReyTheMovie image">
        <div class="detail">
        <h3 style="margin-bottom: 6px;">${title}</h3>
        <p>${overview.substring(0, 100)}...</p>
        <div class="info">
        <p class="popularity">Popularity: ${popularity}</p>
        <p class="rating">Rating: <span>⭐</span>${vote_average}</p>
        </div>
        </div>
        `;
    moviesElement.appendChild(movieCard);
  });
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchQuery = search.value;
  if (searchQuery) {
    getMovies(API_SEARCH_URL + searchQuery)
    search.value = "";
  }
});

home.addEventListener('click', () => {
    location.reload();
})

updatePage()
