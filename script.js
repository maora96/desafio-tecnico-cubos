// itens html
const wrapper = document.querySelector(".movies");
const input = document.querySelector("input");
const button = document.querySelector("button");
const lis = document.querySelectorAll("li");
const ul = document.querySelector("ul");
const form = document.querySelector("form");

// pegar valor do input 
let request;


form.addEventListener("submit", (event) => {
    event.preventDefault();
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
    wrapper.innerHTML = "";
    ul.innerHTML = "";
    setTimeout(() => {
        
        let pages = [];
        let page1 = [];
        let page2 = [];
        let page3 = [];
        let page4 = [];
        let page5 = [];
        let length = array.length;
        if (length / 5 <= 1) {
            array.forEach(item => {
                page1.push(item);
            })

            let li = document.createElement("li");
            li.innerHTML = "1";

            li.addEventListener("click", () => {
                let page = parseInt(li.innerText);
                li.classList.add("active");
                li2.classList.remove("active");
                li3.classList.remove("active");
                li4.classList.remove("active");
                li5.classList.remove("active");
                changePage(page1);
                })

            li.classList.add("active")
            
            ul.append(li);


        } else if(length / 5 <= 2) {
            array.forEach((item, i) => {
                if(i < 5) {
                    page1.push(item);
                } else if (i < 10) {
                    page2.push(item);
                } else if (i < 15 && i >= 10) {
                    page3.push(item);
                } else if (i < 20 && i >= 15) {
                    page4.push(item);
                } else {
                    page5.push(item);
                }
            })
            let li = document.createElement("li");
            let li2 = document.createElement("li");
            li.innerHTML = "1";
            li2.innerHTML = "2";
            li.classList.add("active")
            ul.append(li, li2);

            li.addEventListener("click", () => {
                let page = parseInt(li.innerText);

                li.classList.add("active");
                li2.classList.remove("active");
                li3.classList.remove("active");
                li4.classList.remove("active");
                li5.classList.remove("active");
                changePage(page1, page);
            })
            li2.addEventListener("click", () => {
                let page = parseInt(li.innerText);
                changePage(page2, page);
                li.classList.remove("active");
                li2.classList.add("active");
                li3.classList.remove("active");
                li4.classList.remove("active");
                li5.classList.remove("active");
            })
            
        } else if(length / 5 <= 3) {
            array.forEach((item, i) => {
                if(i < 5) {
                    page1.push(item);
                } else if (i < 10) {
                    page2.push(item);
                } else if (i < 15 && i >= 10) {
                    page3.push(item);
                } else if (i < 20 && i >= 15) {
                    page4.push(item);
                } else {
                    page5.push(item);
                }
            })
            let li = document.createElement("li");
            let li2 = document.createElement("li");
            let li3 = document.createElement("li");
            li.innerHTML = "1";
            li.classList.add("active")
            li2.innerHTML = "2";
            li3.innerHTML = "3";
            li.addEventListener("click", () => {
                let page = parseInt(li.innerText);
                li.classList.add("active");
                li2.classList.remove("active");
                li3.classList.remove("active");
                li4.classList.remove("active");
                li5.classList.remove("active");
                changePage(page1, page);
            })
            li2.addEventListener("click", () => {
                let page = parseInt(li.innerText);
                li.classList.remove("active");
                li2.classList.add("active");
                li3.classList.remove("active");
                li4.classList.remove("active");
                li5.classList.remove("active");
                changePage(page2, page);
            })
            li3.addEventListener("click", () => {
                let page = parseInt(li.innerText);
                li.classList.remove("active");
                li2.classList.remove("active");
                li3.classList.add("active");
                li4.classList.remove("active");
                li5.classList.remove("active");
                changePage(page3, page);
            })
            
          
            
            ul.append(li, li2, li3);

            

        
        } else if (length / 5 <= 4) {
            array.forEach((item, i) => {
                if(i < 5) {
                    page1.push(item);
                } else if (i < 10) {
                    page2.push(item);
                } else if (i < 15 && i >= 10) {
                    page3.push(item);
                } else if (i < 20 && i >= 15) {
                    page4.push(item);
                } else if (i < 25 && i >= 20){
                    page5.push(item);
                }
            })

            let li = document.createElement("li");
            let li2 = document.createElement("li");
            let li3 = document.createElement("li");
            let li4 = document.createElement("li");
            li.innerHTML = "1";
            li2.innerHTML = "2";
            li3.innerHTML = "3";
            li4.innerHTML = "4";
            li.classList.add("active")
            li.addEventListener("click", () => {
                let page = parseInt(li.innerText);
                li.classList.add("active");
                li2.classList.remove("active");
                li3.classList.remove("active");
                li4.classList.remove("active");
                li5.classList.remove("active");
                changePage(page1, page);
            })
            li2.addEventListener("click", () => {
                let page = parseInt(li.innerText);
                li.classList.remove("active");
                li2.classList.add("active");
                li3.classList.remove("active");
                li4.classList.remove("active");
                li5.classList.remove("active");
                changePage(page2, page);
            })
            li3.addEventListener("click", () => {
                let page = parseInt(li.innerText);
                changePage(page3, page);
                li.classList.remove("active");
                li2.classList.remove("active");
                li3.classList.add("active");
                li4.classList.remove("active");
                li5.classList.remove("active");
            })
            
            li4.addEventListener("click", () => {
                let page = parseInt(li.innerText);
                changePage(page4, page);
                li.classList.remove("active");
                li2.classList.remove("active");
                li3.classList.remove("active");
                li4.classList.add("active");
                li5.classList.remove("active")
            })

            
            ul.append(li, li2, li3, li4);

            
        } else {
            array.forEach((item, i) => {

                if(i < 5) {
                    page1.push(item);
                } else if (i < 10) {
                    page2.push(item);
                } else if (i < 15 && i >= 10) {
                    page3.push(item);
                } else if (i < 20 && i >= 15) {
                    page4.push(item);
                } else if (i < 25 && i >= 20) {
                    page5.push(item);
                }
            })
            let li = document.createElement("li");
            let li2 = document.createElement("li");
            let li3 = document.createElement("li");
            let li4 = document.createElement("li");
            let li5 = document.createElement("li");
            li.innerHTML = "1";
            li2.innerHTML = "2";
            li3.innerHTML = "3";
            li4.innerHTML = "4";
            li5.innerHTML = "5";
            li.classList.add("active")

            li.addEventListener("click", () => {
                let page = parseInt(li.innerText);
                li.classList.add("active");
                li2.classList.remove("active");
                li3.classList.remove("active");
                li4.classList.remove("active");
                li5.classList.remove("active");
                changePage(page1, page);
            })
            li2.addEventListener("click", () => {
                let page = parseInt(li.innerText);
                li.classList.remove("active");
                li2.classList.add("active");
                li3.classList.remove("active");
                li4.classList.remove("active");
                li5.classList.remove("active");
                changePage(page2, page);
            })
            li3.addEventListener("click", () => {
                let page = parseInt(li.innerText);
                li.classList.remove("active");
                li2.classList.remove("active");
                li3.classList.add("active");
                li4.classList.remove("active");
                li5.classList.remove("active");
                changePage(page3, page);
            })
            
            li4.addEventListener("click", () => {
                let page = parseInt(li.innerText);
                changePage(page4, page);
                li.classList.remove("active");
                li2.classList.remove("active");
                li3.classList.remove("active");
                li4.classList.add("active");
                li5.classList.remove("active");
            })

            li5.addEventListener("click", () => {
                let page = parseInt(li.innerText);
                li.classList.remove("active");
                li2.classList.remove("active");
                li3.classList.remove("active");
                li4.classList.remove("active");
                li5.classList.add("active");
                changePage(page5, page);
            })

            ul.append(li, li2, li3, li4, li5);

        };

        pages.push(page1, page2, page3, page4, page5);


        pages[0].forEach(item => {
            let movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");

            let movieImg = document.createElement("img");
            let url = "https://image.tmdb.org/t/p/original/" + item.poster_path;
            movieImg.src = url;
            
            let movieContent = document.createElement("div");
            movieContent.classList.add("movie-content");
            
            let title = document.createElement("h2");

            let titleDiv = document.createElement("div");
            titleDiv.classList.add("title-div")

            let link = document.createElement("a");
            link.innerText = item.title;
            link.href = "movie.html";


            let span = document.createElement("span");
            let split = item.release_date.split("-");
            let reverse = split.reverse();
            let final = reverse.join("/");


            let summary = document.createElement("div");
            summary.classList.add("description");
            summary.innerText = item.overview;

            let tags = document.createElement("div");
            tags.classList.add("tags");

            let g_ids = item.genre_ids;
            let g_names = [];;
            g_ids.forEach(item => {
                genres.forEach(g => {
                    if (item === g.id) {
                        g_names.push(g.name)
                    }
                })
            })
            g_names.forEach(item => {
                let g = document.createElement("span");
                g.innerHTML = item; 
                tags.append(g);
            })

            let nota = document.createElement("div");
            nota.classList.add("nota");
            nota.innerText = (item.vote_average * 10) + "%";

            link.addEventListener("click", () => {
                localStorage.setItem("movie", JSON.stringify(item));
            })
            title.append(link);
            titleDiv.append(title);

            span.innerText = final;
            movieContent.append(titleDiv, span, summary, tags, nota);
            movieCard.append(movieImg, movieContent);
            wrapper.append(movieCard);
        })
    }, 700)

    
}


function changePage(page, int) {
    wrapper.innerHTML = "";
    page.forEach(item => {
        let movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");

            let movieImg = document.createElement("img");
            let url = "https://image.tmdb.org/t/p/original/" + item.poster_path;
            movieImg.src = url;
            
            let movieContent = document.createElement("div");
            movieContent.classList.add("movie-content");
            
            let title = document.createElement("h2");
            let link = document.createElement("a");
            link.innerText = item.title;
            link.href = "movie.html";

            let titleDiv = document.createElement("div");
            titleDiv.classList.add("title-div")

            let span = document.createElement("span");
            let split = item.release_date.split("");
            let reverse = split.reverse();
            let join = reverse.join("");
            let final = join.replace("-", "/");

            let summary = document.createElement("div");
            summary.classList.add("description");
            summary.innerText = item.overview;

            let tags = document.createElement("div");
            tags.classList.add("tags");

            let g_ids = item.genre_ids;
            let g_names = [];;
            g_ids.forEach(item => {
                genres.forEach(g => {
                    if (item === g.id) {
                        g_names.push(g.name)
                    }
                })
            })
            g_names.forEach(item => {
                let g = document.createElement("span");
                g.innerHTML = item; 
                tags.append(g);
            })

            let nota = document.createElement("div");
            nota.classList.add("nota");
            nota.innerText = (item.vote_average * 10) + "%";

            link.addEventListener("click", () => {
                localStorage.setItem("movie", JSON.stringify(item));
            })
            title.append(link);
            titleDiv.append(title);
            span.innerText = final;
            movieContent.append(titleDiv, span, summary, tags, nota);
            movieCard.append(movieImg, movieContent);
            wrapper.append(movieCard);

    })
}



