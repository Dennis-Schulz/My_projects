const eventsStore = [
    {
        title: "INFJ Personality Type - Coffee Shop Meet & Greet",
        description: "Being an INFJ",
        date: new Date(2024, 2, 23, 15),
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w",
        type: "Offline",
        attendees: 99,
        category: "Hobbies and Passions",
        distance: 50,
    },
    {
        title: "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience",
        description: "New York AI Users",
        date: new Date(2024, 2, 23, 11, 30),
        image: "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "Offline",
        attendees: 43,
        category: "Technology",
        distance: 25,
    },
    {
        title: "Book 40+ Appointments Per Month Using AI and Automation",
        description: "New Jersey Business Network",
        date: new Date(2024, 2, 16, 14),
        image: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "Online",
        category: "Technology",
        distance: 10,
    },
    {
        title: "Dump writing group weekly meetup",
        description: "Dump writing group",
        date: new Date(2024, 2, 13, 11),
        image: "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "Online",
        attendees: 77,
        category: "Business",
        distance: 100,
    },
    {
        title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
        description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
        date: new Date(2024, 2, 14, 11),
        image: "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "Online",
        attendees: 140,
        category: "Social Activities",
        distance: 74,
    },
    {
        title: "All Nations - Manhattan Missions Church Bible Study",
        description: "Manhattan Bible Study Meetup Group",
        date: new Date(2024, 2, 14, 11),
        image: "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "Offline",
        category: "Health and Wellbeing",
        distance: 15,
    },
]

const selectType = document.getElementById("type");
const selectDistance = document.getElementById("distance");
const selectCategory = document.getElementById("category");
const root = document.getElementById("root");

selectType.addEventListener("change", () => {
    filterEvents(selectType.value, "type");
});
selectDistance.addEventListener("change", () => {
    filterEvents(selectDistance.value, "distance");
});
selectCategory.addEventListener("change", () => {
    filterEvents(selectCategory.value, "category");
});

function firstWord(text) {
    return text.match(/\b\w+\b/)[0]; 
}
function filterEvents(value, eventType) {
    const eventValue = firstWord(value);
    console.log(eventValue);
    console.log(eventType);
    const filteredEvents = eventsStore.filter(event => {
        if (eventType === "type") {
            return event.type === eventValue;
        } else if (eventType === "distance") {
            return event.distance <= eventValue;
        } else if (eventType === "category") {
            return event.category === eventValue;
        }
    })
    renderEvents(filteredEvents);
}

function renderEvents(events) {
    
    let attendees;
    root.innerHTML = "";
    events.forEach(event => {
        if (event.attendees === undefined){
            attendees = "";
        } else {
            attendees = event.attendees + " attendees";
        }
        const card = document.createElement("div");
        card.classList.add("card");
        const formattedDate = event.date.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
        card.innerHTML = `
              <img src="${event.image}" alt="picture">
              <div class="card-text">
                <p class="card-text-date">${formattedDate}</p>
                <h3 class="card-text-title">${event.title}</h3>
                <p class="card-text-distance">${event.category} (${event.distance} km)</p>
                <p class="card-text-atendees">${attendees}</p>
              </div>
        `
        root.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderEvents(eventsStore);
});