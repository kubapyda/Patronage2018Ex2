import { MoviesStorage } from './movies-storage.js'
import { setCounterOfTo } from './movies-counter.js'

class MoviesList {

    constructor() {
        const moviesList = document.getElementById('moviesList')
        const moviesCounterAll = document.getElementById('moviesCounterAll')
        const moviesCounterSeen = document.getElementById('moviesCounterSeen')
        this.moviesStorage = new MoviesStorage()
        this.countAllMovies()
        this.countSeenMovies()
        this.createMovie()
        this.isFilmWasSeen()
    }

    countAllMovies() {
        setCounterOfTo(moviesCounterAll, this.moviesStorage.get().length);
    }

    countSeenMovies() {
        let seenMovies = 0
        this.moviesStorage.get().forEach(movie => {
            if (movie.seen === 'T') {
                seenMovies++
            }
        })
        setCounterOfTo(moviesCounterSeen, seenMovies);
    }

    createMovie() {
        this.moviesStorage.get().forEach(movie => {
            moviesList.innerHTML += `
                <li>
                    <span class="movieTitle">${movie.title}</span>
                    <span class="movieYear">${movie.year},</span>
                    <span class="movieGenre">${movie.genre}</span>
                    <span class="movieSummary">${movie.summary}</span>
                    <button class="seenMovieButton" id="movie-${movie.id}">
                        <span class="movieSeen ${movie.seen === 'T' ? 'true' : 'false'}"></span>
                    </button>
                </li>`
        })
    }

    isFilmWasSeen() {
        const moviesSeenButton = document.querySelectorAll('.seenMovieButton')
        moviesSeenButton.forEach(movie => {
            movie.addEventListener('click', (event) => {
                const id = +event.path[1].getAttribute('id').substr(6, 2)
                const seenMarker = event.path[0]
                const movie = this.moviesStorage.get().filter((value) => {
                    return value.id === id
                })[0]
                if (movie.seen === 'T') {
                    movie.seen = 'F'
                    seenMarker.classList.remove('true')
                    seenMarker.className += ' false'
                } else {
                    movie.seen = 'T'
                    seenMarker.classList.remove('false')
                    seenMarker.className += ' true'
                }
                localStorage.setItem('movies', JSON.stringify(this.moviesStorage.get()))
                this.countSeenMovies()
            })
        })
    }
}

new MoviesList()