const prompt = require('./prompt')

const config = {
    numberMatches : 10,
    matchFront : "|",
    min : 1,
    max : 3
}

const changeConfiguration = (menu) => {

    prompt.question("Choisir un nouveau symbole pour afficher les alumettes ", (input)=> {

        if(input.length === 1)  config.matchFront = input

        prompt.question("Définir le nombre d'allumettes", number => {

            if(!isNaN(number)) config.numberMatches = number

            menu()

        })
    })
}

module.exports = {config, changeConfiguration}