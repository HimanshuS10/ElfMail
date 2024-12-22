const Player = [];
const assignedName = [];

function addPlayer() {
    let playerName = document.getElementById("Name").value
    let playerEmail = document.getElementById("Email").value

    let isDuplicate = checkForDup(playerName, playerEmail);
    
    if (isDuplicate) {
        console.log("Error: Player with this name or email already exists.");
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
    let players = Player.length;

    if (players < 2) {
        console.log("Not enough players to assign gifts.");
        return;
    }

    let indices = Array.from({ length: players }, (_, index) => index);

    // Shuffle the indices
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Assign each player a random player to gift, ensuring no self-gifting
    for (let i = 0; i < players; i++) {
        const giftIndex = indices[i];
        if (giftIndex === i) {
            // If self-gifting occurs, reassign the indices array and restart
            return assignName();
        }
        Player[i].playerToGift = Player[giftIndex].name;
        Player[i].playerEmail = Player[giftIndex].email;
    }

    console.log("Gift assignments completed:", Player);
}
