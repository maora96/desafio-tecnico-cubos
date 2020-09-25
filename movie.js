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
const trailerDiv = document.querySelector(".movie-trailer");

// fetch mais info sober o filme
let movieID = movie_data.id;
let movie;
fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=ad3fa5abde2b19507e9081fa56da993b&language=pt-BR`)
    .then(data => data.json())
    .then(dataJson => {
        movie = dataJson;

        title.innerText = movie.title;

        let split = movie.release_date.split("-");
        let reverse = split.reverse();
        let final = reverse.join("/");

        release.innerText = final;
        summary.innerText = movie.overview; 

        /*
        Allowed Values: Rumored, Planned, In Production, Post Production, Released, Canceled*/

        if (movie.status === "Rumored") {
            status.innerText = "Rumor";
        } else if (movie.status === "Planned") {
            status.innerText = "Planejado";
        } else if (movie.status === "In Production") {
            status.innerText = "Em Produção"
        } else if (movie.status === "Post Production") {
            status.innerText = "Pós-produção";
        } else if (movie.status === "Released") {
            status.innerText = "Lançado"
        } else {
            status.innerText = "Cancelado"
        }

        idioma.innerText = movie.original_language;

        let runtime = movie.runtime;
        let horas = Math.floor(runtime / 60);
        let min = runtime % 60;
        duracao.innerText = horas + "h" + min +"min";
        
        let splitBudget = String((movie.budget)).split("");
        
        if (splitBudget.length === 9) { 
            splitBudget.splice(3, 0, ".")
            splitBudget.splice(7, 0, ".")
            let joinBudget = splitBudget.join("")
            orcamento.innerText = "$" + joinBudget + ",00";
        } else if (splitBudget.length === 8) {
            splitBudget.splice(2, 0, ".")
            splitBudget.splice(7, 0, ".")
            let joinBudget = splitBudget.join("")
            orcamento.innerText = "$" + joinBudget + ",00";

        } else if (splitBudget.length === 7) {
            splitBudget.splice(1, 0, ".")
            splitBudget.splice(5, 0, ".")
            let joinBudget = splitBudget.join("")
            orcamento.innerText = "$" + joinBudget + ",00";

        } 

        let splitRev = String((movie.revenue)).split("");
        if (splitRev.length === 9) {
            splitRev.splice(3, 0, ".")
            splitRev.splice(7, 0, ".")
            let joinRev = splitRev.join("")
            receita.innerText = "$" + joinRev + ",00";
        } else if (splitRev.length === 8) {
            splitRev.splice(2, 0, ".")
            splitRev.splice(6, 0, ".")
            let joinRev = splitRev.join("")
            receita.innerText = "$" + joinRev + ",00";

        } else if (splitRev.length === 7) {
            splitRev.splice(1, 0, ".")
            splitRev.splice(5, 0, ".")
            let joinRev = splitRev.join("")
            receita.innerText = "$" + joinRev + ",00";

        } 

        let lucTotal = movie.revenue - movie.budget;
        let splitLuc = String(lucTotal).split("");
        if (lucTotal < 0) {
            if (splitLuc.length === 10) {
                splitLuc.splice(1, 0, "$")
                splitLuc.splice(5, 0, ".")
                splitLuc.splice(9, 0, ".")
                let joinLuc = splitLuc.join("")
                lucro.innerText = joinLuc + ",00";
            } else if (splitLuc.length === 9) {
                splitLuc.splice(1, 0, "$")
                splitLuc.splice(4, 0, ".")
                splitLuc.splice(8, 0, ".")
                let joinLuc = splitLuc.join("")
                lucro.innerText = joinLuc + ",00";

            } else if (splitLuc.length === 8) {
                splitLuc.splice(1, 0, "$")
                splitLuc.splice(3, 0, ".")
                splitLuc.splice(7, 0, ".")
                let joinLuc = splitLuc.join("")
                lucro.innerText = joinLuc + ",00";

            } 
        } else {
            if (splitLuc.length === 9) {
                splitLuc.splice(3, 0, ".")
                splitLuc.splice(7, 0, ".")
                let joinLuc = splitLuc.join("")
                lucro.innerText = "$" + joinLuc + ",00";
            } else if (splitLuc.length === 8) {
                splitLuc.splice(2, 0, ".")
                splitLuc.splice(6, 0, ".")
                let joinLuc = splitLuc.join("")
                lucro.innerText = "$" + joinLuc + ",00";

            } else if (splitLuc.length === 7) {
                splitLuc.splice(1, 0, ".")
                splitLuc.splice(5, 0, ".")
                let joinLuc = splitLuc.join("")
                lucro.innerText = "$" + joinLuc + ",00";

            } 
        }
        


        let url = "https://image.tmdb.org/t/p/original" + movie.poster_path;
        image.src = url;

        nota.innerText = (movie.vote_average * 10) + "%";
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
                if(videos.length === 0) {
                    trailerDiv.innerText = "Nenhum trailer encontrado."
                } else {
                    trailer.src = "https://www.youtube.com/embed/" + videos[0].key;
                }
                

            })

    })
