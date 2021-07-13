// create a create new keyword button
document.getElementById("my_form").addEventListener("submit", createButton);

function createButton(e) {
    e.preventDefault();
    const inputKeyWord = e.target.query.value;

    console.log(inputKeyWord);

    const createdButton = document.createElement("button");
    createdButton.type = "button";
    createdButton.innerText = inputKeyWord;
    document.getElementById("main_body").appendChild(createdButton);
    createdButton.addEventListener("click", getMovies);
}

function getMovies(e) {
    e.preventDefault();
    const inputKeyWord = e.target.parentElement.children[0].query.value;
    e.target.parentElement.children[0].query.value = "";

    const apiKey = "f192a57a";
    const URL = `http://www.omdbapi.com/?apikey=${apiKey}&s=${inputKeyWord}`;
    console.log(inputKeyWord);


    fetch(URL)
        .then((response) => response.json())
        .then((res) => {
            const movies = res.Search;
            console.log(movies);
            document.getElementById("container").innerHTML = ""; // setting the container to blank so it will load the content in slow networks
            displayMovies(movies);  // delegating below to show gifs in container
        })
        .catch((err) => console.log(err));

}

function displayMovies(films) {
    for (const film of films) {
        const title = film.Title;
        const year = film.Year;
        const posterUrl = film.Poster;

        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "18rem";

        card.innerHTML = `
            <img src = ${posterUrl} class = "card-img-top" alt=${title}>
            <div class="card-body">
            <p class="card-text">
            Title: ${title} <br>
            Year: ${year} </p>
            </div>
            `;
        document.getElementById("container").appendChild(card);

    }
}