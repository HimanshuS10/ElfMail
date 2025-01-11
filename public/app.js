// Define the players
const Player = [];

const assignedName = [];

/*
    Add player functions - add the players Name and their 
    email to an Array.
*/
function addPlayer() {
    // get the user input and assigns it to the variable 
    let playerName = document.getElementById("Name").value
    let playerEmail = document.getElementById("Email").value

    // Check if the are repeated Name or Email address
    let isDuplicate = checkForDup(playerName, playerEmail);

    // Print the error message
    if (isDuplicate) {
        let errorMessage = "Error: Player with this name or email already exists"
        document.getElementById("error-msg").innerHTML = errorMessage;
        return;
    }

    // Check if both email and the name exist
    if (playerName && playerEmail) {
        // Make an object
        let object = {
            name: playerName,
            email: playerEmail
        }

        // Pushes the object to the array called "Player"
        Player.push(object);

        // When the add player button is click the input will clear
        document.getElementById("Name").value = "";
        document.getElementById("Email").value = "";

        // Calls the print function
        printPlayerList();
    }
}

// Function that check for Duplicate names
function checkForDup(name, email) {
    let playerLen = Player.length;

    for (let i = 0; i < playerLen; i++) {

        if (name === Player[i].name || email === Player[i].email) {
            return true;
        }
    }
    return false;
}

// Function that assigns each player a name
function assignName() {
    if (Player.length < 2) {
        let errorMessage = "Not enough players to assign gifts"
        document.getElementById("error-msg").innerHTML = errorMessage;

        return;
    }

    let indices = Array.from({ length: Player.length }, (_, index) => index);

    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Loop through each player in the Player array
    for (let i = 0; i < Player.length; i++) {
        // Get the index of the player to gift from the indices array
        const giftIndex = indices[i];

        // If a player is assigned to gift themselves, reassign names
        if (giftIndex === i) {
            return assignName();
        }

        // Assign the name and email of the player to gift
        Player[i].playerToGift = Player[giftIndex].name;
        Player[i].playerEmail = Player[giftIndex].email;
    }

    Player.forEach(giver => {
        sendEmail(giver.name, giver.email, giver.playerToGift);
    });

}


function printPlayerList() {
    const playerListContainer = document.getElementById("playerList");
    playerListContainer.innerHTML = "";

    for (let i = 0; i < Player.length; i++) {
        const name = Player[i].name;
        const email = Player[i].email;

        const playerDiv = document.createElement("div");
        playerDiv.className = "player";
        playerDiv.style.marginBottom = "20px";

        const playerInfoDiv = document.createElement("div");
        playerInfoDiv.style.display = "flex";
        playerInfoDiv.style.flexDirection = "row";
        playerInfoDiv.style.marginBottom = "10px";

        const nameLabel = document.createElement("label");
        nameLabel.textContent = `Name: ${name}`;
        nameLabel.style.marginRight = "10px";

        const emailLabel = document.createElement("label");
        emailLabel.textContent = `Email: ${email}`;

        playerInfoDiv.appendChild(nameLabel);
        playerInfoDiv.appendChild(emailLabel);

        const buttonDiv = document.createElement("div");
        buttonDiv.style.display = "flex";
        buttonDiv.style.marginTop = "5px";

        const editButton = document.createElement("button");
        editButton.style.backgroundColor = "#f33737";
        editButton.style.padding = "10px";
        editButton.style.marginRight = "10px";
        editButton.textContent = "Edit";
        editButton.className = "editButton";
        editButton.onclick = () => editPlayer(i);

        const deleteButton = document.createElement("button");
        deleteButton.style.backgroundColor = "#f33737";
        deleteButton.style.padding = "10px";
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteButton";
        deleteButton.onclick = () => deletePlayer(i);

        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(deleteButton);

        playerDiv.appendChild(playerInfoDiv);
        playerDiv.appendChild(buttonDiv);

        playerListContainer.appendChild(playerDiv);
    }
}

function editPlayer(index) {
    const newName = prompt("Enter new name:", Player[index].name);
    const newEmail = prompt("Enter new email:", Player[index].email);

    if (newName !== null && newName.trim() !== "") {
        Player[index].name = newName;
    }
    if (newEmail !== null && newEmail.trim() !== "") {
        Player[index].email = newEmail;
    }

    printPlayerList();
}

function deletePlayer(index) {
    if (confirm("Are you sure you want to delete this player?")) {
        Player.splice(index, 1);
        printPlayerList();
    }
}

function sendEmail(senderName, senderEmail, playerToGift) {

    emailjs.send("service_oc4d5se", "template_0xtgd6v", {
        playerToGift: playerToGift,
        playerToGiftEmail: senderEmail,
    }).then(response => {
        alert("Success! Emails have been sent to all participants. Check your inbox for your Secret Santa match!");
    }).catch(error => {
        alert("Error sending email please try again or come back later.");
    });
}
