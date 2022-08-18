// code here

document.addEventListener("DOMContentLoaded", () => {
    listShows();
})

// list the shows under "shows"

const showsList = document.getElementById("list")

function listShows() {
    fetch("http://localhost:3000/shows")
    .then(response => response.json())
    .then(shows => {
        shows.forEach(show => {
            let li = document.createElement("li");
            li.innerText = show.title;
            showsList.appendChild(li)
        })})

}

// be able to search through the shows



