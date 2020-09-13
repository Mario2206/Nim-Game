const prompt = require('./prompt')
const config = require("./config").config

function display(number) {
    const matches = []
    let separator = []
    for(let i = 0; i < number; i++) {
        matches.push(config.matchFront)
        separator.push("*")
    }
    separator = separator.join("") + "\n\n"
    console.log(separator + "Il y a : " + matches.join(" ") + "\n\n" + separator)
}

function askNumber(joueurNumber, callback) {
    prompt.question(`Joueur ${joueurNumber} : entre un nombre entre ${config.min} et ${config.max} \n`, (input) => {
        const number = parseInt(input)

        if(isNaN(number) || number > config.max || number < config.min) askNumber(joueurNumber, callback)
        else callback(number)
    })
}

function askToBot(current_matches) {
    let iaChoice = current_matches % 4 === 0 ? 1 : current_matches % 4
    console.log("IA retire " + iaChoice);
    return current_matches -= iaChoice
}


function changePlayer(current_player, max_player) {
    current_player++
    return current_player > max_player ? 1 : current_player
}

const soloGame = (playerTurn,current_matches, menu) => {
   

    display(current_matches)

    if(playerTurn) {

        askNumber("principal", (number)=> {

            current_matches -= number 

            display(current_matches)

            if(current_matches <= 0 ) {
                console.log("Joueur a gagné\n\n");
                menu()
                return 
            }

            current_matches = askToBot(current_matches)


            if(current_matches <= 0) {
                console.log("IA a gagné\n\n");
                menu()
                return
            }

            soloGame(true, current_matches, menu)
            
        })
    } 
    else
    {

        current_matches = askToBot(current_matches)

        soloGame(true, current_matches, menu)
    } 


}

const multiGame = (numberOfPlayers,current_player, current_matches, menu) =>{
    
    
    display(current_matches)

    askNumber(current_player, (number)=> {
       
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

    })
}

module.exports = {soloGame, multiGame}