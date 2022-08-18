
// code here
const shows = [];
const queue = [];

document.addEventListener("DOMContentLoaded", () => {
    populateShows();
})

// utility function in order to delete necessary li from ul

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// empty array variables so I can mainpulate and change which data to display

const showsList = document.getElementById("list")
const queueList = document.getElementById("queued")

// fetching shows from API sending title to shows array in order to manipulate later


function populateShows() {
    fetch("http://localhost:3000/shows")
    .then(response => response.json())
    .then(data => {
        data.forEach(show => {
            shows.push(show.title)

        })
        displayShows();
    })

}

// creating the li's under the ul of "list"

function displayShows() {
    removeAllChildNodes(showsList)
        shows.forEach(show => {
            let li = document.createElement("li");
            li.innerText = show;
            li.className = "shows";
            li.id = `${show}`;
            li.addEventListener("click", addToQueue(show))
            showsList.appendChild(li)
        })
}



// clicking on title adds to queue

function addToQueue(showTitle) {
    return function() {
        queue.push(showTitle)
        displayQueue();

    }
}



// clicking on title removes show from queue

function removeFromQueue(title) {
    return function() {
        const removeId = queue.indexOf(title)
        queue.splice(removeId, 1)
        displayQueue();
    }
}

// creating li's under the ul of "queue"

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

