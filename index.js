
// code here
const shows = [];
const queue = [];

document.addEventListener("DOMContentLoaded", () => {
    populateShows();
    

})



// list the shows under "shows"

const showsList = document.getElementById("list")
const queueList = document.getElementById("queued")

function populateShows() {
    fetch("http://localhost:3000/shows")
    .then(response => response.json())
    .then(data => {
        data.forEach(show => {
            console.log("showTitels", show.title)
            shows.push(show.title)

        })
        displayShows();
    })

}

function displayShows() {
    removeAllChildNodes(showsList)
    console.log("here")
        shows.forEach(show => {
            console.log("show", show)
            let li = document.createElement("li");
            li.innerText = show;
            li.className = "shows";
            li.id = `${show}`;
            li.addEventListener("click", addToQueue(show))
            showsList.appendChild(li)
        })
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

// search through movie list


function search() {
    let searchText = document.getElementById("search").value
    if(searchText == "" || searchText == null) {
        populateShows()
    }
    console.log("search text", searchText)
    for(let i = 0; i < shows.length; i++) {
        let show = shows[i];
        if (!show.toLowerCase().includes(searchText.toLowerCase())) {
            const removeId = shows.indexOf(show)
            shows.splice(removeId, 1)
            i--;
        }
    
    }
    displayShows();
}

