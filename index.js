const choices = ['rock', 'paper', 'scissors']
const scores = {
    player: 0,
    computer: 0
}

function getComputerChoice() {
    return choices[Math.floor(Math.random() * 3)];
}

function getWinner(playerChoice, computerChoice) {
    let winner;
    if(playerChoice === computerChoice) {
        winner = 'tie'
    } else if(playerChoice === 'rock' && computerChoice === 'scissors' ||
        playerChoice === 'paper' && computerChoice === 'rock' ||
        playerChoice === 'scissors' && computerChoice === 'paper'
    ) {
        winner = 'player';
    } else {
        winner = 'computer';
    }
    return winner;
}

function updateScore(winner) {
    let idToUpdate = winner + '-score';
    let winnerElement = document.getElementById(idToUpdate.toString());
    let currentScore = parseInt(winnerElement.value);
    winnerElement.value = (currentScore += 1).toString();
    return currentScore + 1;
}

function declareWinner(winner) {
    alert(`${winner} wins!`);
}

function resetScore() {
    let scores = document.querySelectorAll('input');
    for(let score in scores) {
        score.value = '0'.toString();
    }
    document.getElementById('history').innerHTML = "";
}

function recordGame(matchRecord) {
    let matchHistory = document.getElementById('history');
    matchHistory.appendChild(matchRecord);
}

function buildMatchRecord(playerChoice, computerChoice) {
    let matchRecord = document.createElement('div');
    let matchColor;
    matchRecord.classList.add('container');
    switch(matchColor) {
        case 'tie':
            matchColor = 'lightGray';
            break;
        case 'player':
            matchColor = 'gren';
            break;
        default:
            matchColor = 'red;'
    }
    matchRecord.appendChild(getRoundNumber());
    matchRecord.appendChild(buildChoiceRecord(playerChoice));
    matchRecord.appendChild(buildChoiceRecord(computerChoice));

    matchRecord.style.backgroundColor = matchColor;
    return matchRecord;
}


function buildChoiceRecord(choice) {
    let choiceRecord = document.createElement('img');
    choiceRecord.classList.toggle('record');
    choiceRecord.src=`./img/${choice}.jpg`;
    return choiceRecord;
}


function playRound(playerChoice, computerChoice) {
    let roundResult;
    let winner = getWinner(playerChoice, computerChoice);
    let winCount;
    switch (winner) {
        case 'tie':
            roundResult = 'Tie game!';
            break;
        case 'player':
            roundResult = `You Win! ${playerChoice} beats ${computerChoice}.`
            winner = 'player';
            break;
        default:
            roundResult = `You Lose! ${computerChoice} beats ${playerChoice}.`;
            winner = 'computer'
    }
    if(winner !== 'tie') {
        winCount = updateScore(winner);
    }

    let matchRecord = buildMatchRecord(playerChoice, computerChoice);
    console.log(matchRecord);
    recordGame(matchRecord, winner);
    console.log(roundResult);
    if(winCount) {
        console.log('Rest?');
        if(winCount === 5) {
            console.log('Resetting!');
            resetScore();
        }
    }
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

function getRoundNumber() {
    let roundElement = document.createElement('div');
    roundElement.style.width="50px";
    roundElement.style.height="50px";
    roundElement.innerHTML = document.getElementById('history').children.length.toString();
    return roundElement;
}

function game() {
        let roundResult = playRound( getPlayerChoice(), getComputerChoice());
        console.log(`Current score\n\tPlayer: ${scores['player']}\n\tComp: ${scores['computer']}\n`);
}

document.querySelectorAll('button').forEach(control => {
    control.addEventListener('click', function(e) {
        playRound(this.id, getComputerChoice());
    })
})
