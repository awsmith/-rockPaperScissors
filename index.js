const choices = ['rock', 'paper', 'scissors']
const scores = {
    player: 0,
    comp: 0
}

function getComputerChoice() {
    return choices[Math.floor(Math.random() * 3)];
}

function playRound(playerChoice, computerChoice) {
    let roundResult;
    if(playerChoice === computerChoice) {
        console.log('Tie game!');
        return;
    }

    if(playerChoice === 'rock' && computerChoice === 'scissors' ||
        playerChoice === 'paper' && computerChoice === 'rock' ||
        playerChoice === 'scissors' && computerChoice === 'paper'
    ) {
        roundResult = `You Win! ${playerChoice} beats ${computerChoice}.`
        winner = 'player';
    } else {
        roundResult = `You Lose! ${computerChoice} beats ${playerChoice}.`;
        winner = 'comp'
    }
    console.log(roundResult);
    return winner;
}

function getPlayerChoice() {
    let userInput;
    do {
        userInput = prompt('Enter rock, paper, or scissors: ');
    }
    while(!choices.filter(choice => choice === userInput.toLowerCase()))

    return userInput;
}

function game() {
    for(let gameCount = 0; gameCount < 5; gameCount++) {
        console.log(`Game ${gameCount + 1}:\n`);
        let roundResult = playRound( getPlayerChoice(), getComputerChoice());
        scores[roundResult] += 1;
        console.log(`Current score\n\tPlayer: ${scores['player']}\n\tComp: ${scores['comp']}\n`);
    }
}

game();