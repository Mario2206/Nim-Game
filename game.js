const prompt = require('./prompt')
const config = require("./config").config

function display(number) { //Affichage du nombre d'allumettes

    const matches = []
    let separator = []

    for(let i = 0; i < number; i++) {

        matches.push(config.matchFront)
        separator.push(" * ")

    }

    separator = separator.join("") + "\n\n"
    console.log(separator + "Il y a : " + matches.join(" ") + "\n\n" + separator)
}

function askNumber(joueurNumber) { //Récuperation du nombre demandé à l'utilisateur

    return new Promise(resolve => {

        prompt.question(`Joueur ${joueurNumber} : entre un nombre entre ${config.min} et ${config.max} \n`, (input) => {

            const number = input

            if(isNaN(number) || number > config.max || number < config.min)  resolve(askNumber(joueurNumber))

            resolve(number)

        })
    })
}

function askToBot(current_matches) { //Génération d'un nombre (pour l'IA)

    const modulo = current_matches % 4

    let iaChoice = modulo === 1 ? 1 : modulo === 0 ? 3 :  (current_matches % 4) - 1

    console.log("IA retire " + iaChoice);

    return iaChoice
}


function changePlayer(current_player, max_player) { // Changement de joueur

    current_player++

    return current_player > max_player ? 1 : current_player
}

const soloGame = async (playerTurn,current_matches, menu) => { //Fonction gérant la partie solo

    if(current_matches <= 0) {
        const name = playerTurn ? "Joueur" : "IA"
        console.log(name + " a gagné !!");
        return menu()
    }


    display(current_matches)

    if(playerTurn) {

        const number = await askNumber("principal")

        current_matches -= number 

        soloGame(!playerTurn, current_matches, menu)
    } 
    else
    {

        current_matches -= askToBot(current_matches)

        soloGame(!playerTurn, current_matches, menu)
    } 


}

const multiGame = async (numberOfPlayers,current_player, current_matches, menu) =>{ // Fonction gérant la partie multijoueur
    
    
    display(current_matches)

    const number = await askNumber(current_player)

    current_matches -= number
    
    if(current_matches > 0) 
    {

        current_player = changePlayer(current_player, numberOfPlayers)
            
        multiGame(numberOfPlayers,current_player, current_matches, menu)
    } 
    else
    {
        console.log(`Joueur ${current_player} tu as perdu`);

        menu()
    } 
}

module.exports = {soloGame, multiGame}