// itens html
const wrapper = document.querySelector(".movies");
const input = document.querySelector("input");
const button = document.querySelector("button");
const lis = document.querySelectorAll("li");


// pegar valor do input 
let request;
button.addEventListener("click", () => {
    request = input.value;
    handleSearch();
})



// pegar lista de gêneros 
let genres;
fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=ad3fa5abde2b19507e9081fa56da993b&&language=pt-BR")
    .then(data => data.json())
    .then(dataJson => {
        genres = dataJson.genres;
    })


// funções auxiliares 
function capitalize(string) {
    string = string.split(" ");

    for (let i = 0; i < string.length; i++) {
        string[i] = string[i][0].toUpperCase() + string[i].substr(1);
    }

    return string.join(" ");
}

function onlyNumbers(string) {
    for (let i = 0; i < string.length; i++) {
        if(string[i] >= 0 && string[i] < 10) {
            return true;
        } else {
            return false
        }
    }
}

// descobrir qual o tipo de search do input 
function handleSearch() {
    // formatar valor do input 
    request = request.toLowerCase();
    request = request.replace(request[0], request[0].toUpperCase());

    let genre;
    genres.forEach(item => {
        if (request === item.name) {
            genre = item.name;
        } 
    })

    // checar se o valor do input é um gênero 
    if (genre) {
        fetchGenre(genre)
    } else {
        let bool = onlyNumbers(request)
        // checar se o valor do input é um ano 
        if (bool) {
            request = Number(request);
            fetchYear(request);
        } else {
            fetchName(request);
        }
    }
}

// pegar filmes por ano 
function fetchYear(year) {
    console.log(year)
    let pages = 500;
    let movies = [];
    for (let i = 1; i < pages; i++) {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=ad3fa5abde2b19507e9081fa56da993b&&language=pt-BR&sort_by=popularity.desc&year=${year}&page=${i}`)
            .then(data => data.json())
            .then(dataJson => {
                let results = dataJson.results;
                results.forEach(item => {
                    movies.push(item);
                })
        })
    }
    buildPage(movies);
}

// pegar filmes por nome 
function fetchName(name) {
    name = capitalize(name);
    let pages = 500;
    let movies = [];
    for (let i = 1; i < pages; i++) {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=ad3fa5abde2b19507e9081fa56da993b&&language=pt-BR&page=${i}`)
            .then(data => data.json())
            .then(dataJson => {
                let results = dataJson.results;
                results.forEach(item => {
                    if(item.title.includes(name)){
                        movies.push(item);
                    }
                })
        })
    }
    buildPage(movies)
    
}

// pegar filmes por gênero 
function fetchGenre(genre) {
    let id;
    genres.forEach(item => {
        if(item.name === genre) {
            id = item.id;
        }
    })

    let pages = 500;
    let movies = [];
    if(id) {
        for (let i = 1; i < pages; i++) {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=ad3fa5abde2b19507e9081fa56da993b&&language=pt_BR&sort_by=popularity.desc&with_genres=${id}&page=${i}`)
                .then(data => data.json())
                .then(dataJson => {
                    let results = dataJson.results;
                    results.forEach(item => {
                        movies.push(item);
                    })
            })
        }
        buildPage(movies);
    } 


    
}

// construir a página 
function buildPage(array) {
    console.log(array);
    setTimeout(() => {
        
        array.forEach(item => {
            let title = document.createElement("h2");
            title.innerText = item.title;
            wrapper.append(title)
        })
    }, 500)
}


lis.forEach(item => {
    item.addEventListener("click", () => {
        let page = parseInt(item.innerText);
        console.log("próxima página:", page)
        changePage(page);
    })
})


let pages = 5;
let itemsPerPage = 5;

function changePage(page) {
    

}


// deletar depois 
fetch("https://api.themoviedb.org/3/discover/movie?api_key=ad3fa5abde2b19507e9081fa56da993b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true")
    .then(data => data.json())
    .then(dataJson => {
        let results =dataJson.results;
        console.log(dataJson);
        
        

    });

