// code here

// document.addEventListener("DOMContentLoaded", () => {
//     listShows();
//     addShowsToList(displayedShows);
// })

// list the shows under "shows"

// const showsList = document.getElementById("list");
// const queueList = document.getElementById("queued");
// const displayedShows = [];
// console.log(displayedShows)

// function listShows() {
//     fetch("http://localhost:3000/shows")
//     .then(response => response.json())
//     .then(shows => {
//         shows.forEach(show => displayedShows.push(show.title))
//     })
//}

// function addShowsToList(displayedShows) {
//     console.log("test", displayedShows)
//     displayedShows.forEach(displayedShow => {
//         let li = document.createElement("li")
//         li.innerText = displayedShow;
//         queueList.appendChild(li)
//     })
    //  displayedShows.forEach(displayedShow => console.log("li log", displayedShow)
        // let li = document.createElement("li")
        // li.innerText = displayedShow;
        // queueList.appendChild(li)
    //  )
//}
    

// function listShows() {
//     fetch("http://localhost:3000/shows")
//     .then(response => response.json())
//     .then(shows => {
//         shows.forEach(show => {
//             let li = document.createElement("li");
//             li.innerText = show.title;
//             li.id= `${show.title}`
//             li.className = "shows";
//             showsList.appendChild(li)
//         })})

// }

// click and add shows to queue

// const theWalkingDead = document.getElementById("The Walking Dead");
// const loki = document.getElementById("Loki");
// const riverdale = document.getElementById("Riverdale");
// const gameOfThrones = document.getElementById("Game of Thrones");
// const legacies = document.getElementById("Legacies")

// theWalkingDead.addEventListener("click", addToQueue)

// function addToQueue() {
//     console.log("clicked")
// }

// be able to search through the shows



// code here
const shows = [];
const queue = [];

document.addEventListener("DOMContentLoaded", () => {
    listShows();

})



// list the shows under "shows"

const showsList = document.getElementById("list")
const queueList = document.getElementById("queued")

function listShows() {
    fetch("http://localhost:3000/shows")
    .then(response => response.json())
    .then(shows => {
        shows.forEach(show => {
            let li = document.createElement("li");
            li.innerText = show.title;
            li.className = "shows";
            li.id = `${show.title}`;
            li.addEventListener("click", addToQueue(show.title))
            showsList.appendChild(li)
            shows.push(show.title)

        })})

}

// be able to search through the shows

// clicking adds to queue

function addToQueue(showTitle) {
    return function() {
        queue.push(showTitle)
        displayQueue();

    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// remove queues shows

function removeFromQueue(title) {
    return function() {

    const removeId = queue.indexOf(title)
    queue.splice(removeId, 1)
    displayQueue();
    }
}

function displayQueue() {
    removeAllChildNodes(queueList)
        queue.forEach(title => {
            let li = document.createElement("li");
            li.innerText = title;
            li.className = "queued";
            li.id = `${title}`;
            li.addEventListener("click", removeFromQueue(title))
            queueList.appendChild(li)
        })
}

