import { MoviesStorage } from './movies-storage.js'
import { setCounterOfTo } from './movies-counter.js'

class Add {

    constructor() {
        this.moviesCounterAll = document.getElementById('anotherMoviesCounterAll')
        this.moviesCounterSeen = document.getElementById('anotherMoviesCounterSeen')
        this.alertContainer = document.getElementById('alertContainer')
        this.form = document.querySelector('form')
        this.form.addEventListener('submit', this.addMovieToList.bind(this));
        this.moviesStorage = new MoviesStorage()
        this.countAllMovies()
        this.countSeenMovies()
    }
    
    countAllMovies() {
        setCounterOfTo(this.moviesCounterAll, this.moviesStorage.get().length);
    }

    countSeenMovies() {
        let seenMovies = 0
        this.moviesStorage.get().forEach(movie => {
            if (movie.seen === 'T') {
                seenMovies++
            }
        })
        setCounterOfTo(this.moviesCounterSeen, seenMovies);
    }
    
    checkMovie(movie) {
        this.alertContainer.innerHTML = ''
        const isAdded = this.moviesStorage.get().filter(value => {
            return value.title === movie.title
        })

        if (!movie.title) {
            this.alertContainer.innerHTML = '<div class="alertMessage">Enter the title of the movie</div>'
            return false
        } else if (isAdded.length) {
            this.alertContainer.innerHTML = '<div class="alertMessage">The movie with this title alredy exist</div>'
            return false
        } else if (!movie.year) {
            this.alertContainer.innerHTML = '<div class="alertMessage">Enter the year of the movie</div>'
            return false
        } else if (movie.year.length !== 4) {
            this.alertContainer.innerHTML = '<div class="alertMessage">The movie should have 4 digitse</div>'
            return false
        } else if (!movie.genre) {
            this.alertContainer.innerHTML = '<div class="alertMessage">Enter the genre of the movie</div>'
            return false
        }
        return true
    }

    addMovieToList(e) {
        const fields = this.form.querySelectorAll('input')
        const summary = this.form.querySelector('textarea')
        let last = this.moviesStorage.get()[this.moviesStorage.get().length - 1].id
        const movie = {
            id: ++last,
            title: fields[0].value,
            year: fields[1].value,
            genre: fields[2].value,
            summary: summary.value,
            seen: fields[3].checked ? 'T' : 'F'
        }
        if (this.checkMovie(movie)) {
            this.moviesStorage.set(movie);
            this.countAllMovies()
            this.countSeenMovies()
        } else {
            e.preventDefault();
        }
    }

}

new Add()