const Player = [];

const assignedName = [];

function addPlayer() {
    let playerName = document.getElementById("Name").value
    let playerEmail = document.getElementById("Email").value

    let isDuplicate = checkForDup(playerName, playerEmail);

    if (isDuplicate) {
        let errorMessage = "Error: Player with this name or email already exists"
        document.getElementById("error-msg").innerHTML = errorMessage;
        return; // Stop further execution if a duplicate is found
    }


    if (playerName && playerEmail) {
        let object = {
            name: playerName,
            email: playerEmail
        }

        Player.push(object);
        console.log(Player);

        document.getElementById("Name").value = "";  // Reset the name input
        document.getElementById("Email").value = ""; // Reset the email input
        printPlayerList();
    }
}

function checkForDup(name, email) {
    let playerLen = Player.length;

    for (let i = 0; i < playerLen; i++) {

        if (name === Player[i].name || email === Player[i].email) {
            return true;
        }
    }
    return false;
}

function assignName() {
    if (Player.length < 2) {
        console.log("Not enough players to assign gifts.");
        return;
    }

    let indices = Array.from({ length: Player.length }, (_, index) => index);

    // Shuffle the indices
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Assign each player a random player to gift, ensuring no self-gifting
    for (let i = 0; i < Player.length; i++) {
        const giftIndex = indices[i];
        if (giftIndex === i) {
            // If self-gifting occurs, reassign the indices array and restart
            return assignName();
        }
        Player[i].playerToGift = Player[giftIndex].name;
        Player[i].playerEmail = Player[giftIndex].email;
    }

    // Send emails to all players
    Player.forEach(giver => {
        sendEmail(giver.name, giver.email, giver.playerToGift);
    });

    console.log("Gift assignments completed");
}


function printPlayerList() {
    const playerListContainer = document.getElementById("playerList");
    playerListContainer.innerHTML = ""; // Clear existing content

    for (let i = 0; i < Player.length; i++) {
        const name = Player[i].name;
        const email = Player[i].email;

        // Create a div for each player
        const playerDiv = document.createElement("div");
        playerDiv.className = "player";
        playerDiv.style.marginBottom = "20px";  // Space between Player

        // Create a div for the name and email
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

        // Create Edit button
        const editButton = document.createElement("button");
        editButton.style.backgroundColor = "#f33737";  
        editButton.style.padding = "10px";  
        editButton.style.marginRight = "10px";  
        editButton.textContent = "Edit";
        editButton.className = "editButton";
        editButton.onclick = () => editPlayer(i);

        // Create Delete button
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
