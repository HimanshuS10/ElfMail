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

}