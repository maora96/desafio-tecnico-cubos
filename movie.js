// filme 
let movie_data = JSON.parse(localStorage.getItem("movie"));

// elementos html

const title = document.querySelector("h2");
const release = document.querySelector(".release-date");
const summary = document.querySelector(".summary");

const status = document.querySelector(".status");
const idioma = document.querySelector(".idioma");
const duracao = document.querySelector(".duracao");
const orcamento = document.querySelector(".orcamento");
const receita = document.querySelector(".receita");
const lucro = document.querySelector(".lucro");

const tags = document.querySelector(".tags");
const nota = document.querySelector(".nota");

const image = document.querySelector(".single-movie img");
const trailer = document.querySelector(".movie-trailer iframe");

// fetch mais info sober o filme
let movieID = movie_data.id;
let movie;
fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=ad3fa5abde2b19507e9081fa56da993b&language=pt-BR`)
    .then(data => data.json())
    .then(dataJson => {
        movie = dataJson;
        console.log(movie)

        title.innerText = movie.title;
        release.innerText = movie.release_date;
        summary.innerText = movie.overview; 

        status.innerText = movie.status;
        idioma.innerText = movie.original_language;
        duracao.innerText = movie.runtime;
        orcamento.innerText = movie.budget;
        receita.innerText = movie.revenue;
        lucro.innerText = movie.revenue - movie.budget;

        let url = "https://image.tmdb.org/t/p/original" + movie.poster_path;
        image.src = url;

        nota.innerText = movie.vote_average;
        let gs = movie.genres;
        let g_names = [];;
        gs.forEach(item => {
            g_names.push(item.name);
        })

        g_names.forEach(item => {
            let g = document.createElement("span");
             g.innerHTML = item; 
            tags.append(g);
        })

        fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=ad3fa5abde2b19507e9081fa56da993b&language=pt-BR`)
            .then(data => data.json())
            .then(dataJson => {
                let videos = dataJson.results;
                trailer.src = "https://www.youtube.com/embed/" + videos[0].key;

            })

    })
