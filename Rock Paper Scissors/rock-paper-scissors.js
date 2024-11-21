// Date generation
function updateDate() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let date_paragraph = document.querySelector('.js-date-paragraph');

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    date_paragraph.innerHTML = `${hours}:${minutes}`;

    // Getting some elements to change the color layout
    const body = document.querySelector('body');
    const section = document.querySelector('.input-section');

    // Set the color layout based on the hours
    if (hours < 6) {
        body.classList.add('body-early-morning')
        section.classList.add('input-section-early-morning');
        body.classList.remove('body-evening');
        section.classList.remove('input-section-evening');
    } else if (hours >= 6 && hours < 12) {
        body.classList.add('body-morning');
        section.classList.add('input-section-morning');
        body.classList.remove('body-early-morning');
        section.classList.remove('input-section-early-morning');
    } else if (hours >= 12 && hours < 17) {
        body.classList.add('body-afternoon');
        section.classList.add('input-section-afternoon');
        body.classList.remove('body-morning');
        section.classList.remove('input-section-morning');
    } else if (hours >= 17 && hours < 19) {
        body.classList.add('body-late-afternoon');
        section.classList.add('input-section-late-afternoon');
        body.classList.remove('body-afternoon');
        section.classList.remove('input-section-afternoon');
    } else if (hours >= 19) {
        body.classList.add('body-evening');
        section.classList.add('input-section-evening');
        body.classList.remove('body-late-afternoon');
        section.classList.remove('input-section-late-afternoon');
    }
}

// Update the date every 1 second
setInterval(updateDate, 1000);




// Set the score, if you dont have the score, then all the values will be 0
const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};



function playGame(player) {

    let result = '';
    const computer = computerPlay();

    const roundResult = document.getElementById('js-result-paragraph');
    

    // document.querySelector('#js-score-paragraph')
    const score_paragraph = document.getElementById('js-score-paragraph');

    if (player === 'rock') {
        if (computer === 'rock') {
            result = 'Tie.';
        } else if (computer === 'paper') {
            result = 'You lost!';
        } else if (computer === 'scissors') {
            result = 'You won!';
        }
    } else if (player === 'paper') {
        if (computer === 'rock') {
            result = 'You won!';
        } else if (computer === 'paper') {
            result = 'Tie.';
        } else if (computer === 'scissors') {
            result = 'You lost!';
        }
    } else if (player === 'scissors') {
        if (computer === 'rock') {
            result = 'You lost!';
        } else if (computer === 'paper') {
            result = 'You won!';
        } else if (computer === 'scissors') {
            result = 'Tie.';
        }
    }

    roundResult.innerHTML = `You <img src="images/${player}-emoji.png" alt=""> VS 
    <img src="images/${computer}-emoji.png" alt=""> Computer <br> ${result}`;

    if (result === 'You won!') {
        score.wins++;
    } else if (result === 'You lost!') {
        score.losses++;
    } else if (result === 'Tie.') {
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    score_paragraph.innerHTML = `Wins: ${score.wins}; Losses: ${score.losses}; Ties: ${score.ties}.`;

}


function computerPlay() {
    let computer = '';
    const randomNumber = Math.random();

    if (randomNumber <= 1 / 3) {
        computer = 'rock';
    } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
        computer = 'paper';
    } else if (randomNumber > 2 / 3 && randomNumber <= 1) {
        computer = 'scissors';
    }

    return computer;
}

function resetScore() {
    localStorage.removeItem('score');

    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    const score_paragraph = document.getElementById('js-score-paragraph');
    if(score_paragraph) {
        score_paragraph.innerHTML = `Wins: ${score.wins}; Losses: ${score.losses}; Ties: ${score.ties}`;
    }
}