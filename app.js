// example search for title http://www.omdbapi.com/?apikey=c85894a7&t=mad+max
// example search for search http://www.omdbapi.com/?apikey=c85894a7&s=mad+max&type=movie

document.getElementById("movieSearch").value = "Aliens";

//vars
let results = document.querySelector(".results");
let searchInput = null;

//Events to get search value
document.getElementById("movieSearch").addEventListener("keyup", function() {
  if (event.keyCode == 13) {
    searchInput = this.value;
    fetchSearch();
    document.querySelector(".firstPageItems").classList.add("hidden");
    document.getElementById("copyright").classList.add("hidden");
  }
});

document.getElementById("goButton").addEventListener("click", function() {
  searchInput = document.getElementById("movieSearch").value;
  fetchSearch();
  document.querySelector(".firstPageItems").classList.add("hidden");
  document.getElementById("copyright").classList.add("hidden");
});

//fire search call to omdb
function fetchSearch() {
  fetch("http://www.omdbapi.com/?apikey=c85894a7&type=movie&s=" + searchInput)
    .then(function(response) {
      if (!response.ok) {
        console.error("HTTP error, status = " + response.status);
      }
      return response.json();
    })
    .then(function(myJson) {
      if (myJson.Response == "True") {
        // console.log(myJson);
        myJson.Search.forEach(function(film) {
          let movie = document.createElement("div");
          movie.classList.add("movie");
          results.appendChild(movie);
          let div1 = document.createElement("div");
          let div2 = document.createElement("div");
          let div3 = document.createElement("div");
          let img = document.createElement("img");
          img.src = film.Poster;
          div1.appendChild(img);
          div2.innerText = film.Title;
          div3.innerText = film.Year;
          movie.appendChild(div1);
          movie.appendChild(div2);
          movie.appendChild(div3);
          results.classList.remove("hidden");
          movie.addEventListener("click", function() {
            let id = film.imdbID;
            fetch("http://www.omdbapi.com/?apikey=c85894a7&i=" + id)
              .then(function(response) {
                if (!response.ok) {
                  console.error("HTTP error, status = " + response.status);
                }
                return response.json();
              })
              .then(function(movieJson) {
                console.log(movieJson);
                let moviePage = document.querySelector(".moviePage");
                moviePage.classList.remove("hidden");
                results.style.opacity = "0.05";
                let div4 = document.createElement("div");
                let div5 = document.createElement("div");
                moviePage.appendChild(div4);
                moviePage.appendChild(div5);
                div4.classList.add("border");
                let img2 = document.createElement("img");
                img2.src = movieJson.Poster;
                div5.appendChild(img2);
                let div6 = document.createElement("div");
                div6.innerText = movieJson.Title;
                div6.style.fontWeight = "500";
                div6.style.fontSize = "29px";
                div4.appendChild(div6);
                let div7 = document.createElement("div");
                div7.innerText = movieJson.Director + " - " + movieJson.Year;
                div4.appendChild(div7);
                let div8 = document.createElement("div");
                div8.innerText = movieJson.Actors;
                div4.appendChild(div8);
                let div9 = document.createElement("div");
                div9.innerText = movieJson.Plot;
                div4.appendChild(div9);
                let div10 = document.createElement("div");
                div10.innerText = movieJson.Genre;
                div4.appendChild(div10);
                let div11 = document.createElement("div");
                div11.innerText =
                  "imdb Rating: " +
                  movieJson.imdbRating +
                  " - " +
                  "Metascore Rating: " +
                  movieJson.Metascore;
                div4.appendChild(div11);
                let img3 = document.createElement("img");
                img3.src = "arrowLeft.ico";
                moviePage.appendChild(img3);
                img3.addEventListener("click", function() {
                  moviePage.classList.add("hidden");
                  moviePage.innerHTML = "";
                  results.style.opacity = "1";
                });
              });
          });
        });
      } else if (myJson.Response == "False") {
        results.innerText = myJson.Error;
        let back = document.createElement("button");
        back.innerHTML = "Go back ?";
        results.appendChild(back);
        results.style.fontSize = "40px";
        results.style.margin = "400px auto";
        back.style.marginLeft = "25px";
        back.style.width = "124px";
        back.style.height = "53px";
        back.addEventListener("click", function() {
          location.reload(true);
        });
        results.classList.remove("hidden");
      }
    });
}
