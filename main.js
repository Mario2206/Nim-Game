const prompt = require('./prompt')
const config = require("./config").config
const multiGame = require("./game").multiGame
const soloGame = require("./game").soloGame
const changeConfiguration = require('./config').changeConfiguration

const menu = ()=> {
    prompt.question("1-Solo \n2-Multi\n3-options\n\n", choice => {

        switch(parseInt(choice)) {

            case 1: 
                soloGame(false,config.numberMatches, menu)
                break

            case 2 :

                prompt.question("Combien de joueurs pour la partie ?", number => {

                        if(isNaN(number)) return menu()

                        multiGame(number,1, config.numberMatches, menu)

                    }) 
                    break;

            case 3 : 
                    
                changeConfiguration(menu)
                break
            
            default: 
                process.exit()
                break
        }

        
    })
}

menu()
