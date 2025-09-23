let flippedCards = []; //array to hold the flipped cards, set to be empty at start
let lockBoard = false; //boolean to lock the board
let matchedPairs = 0; //counter for matched pairs
let time = 0; //game timer
let timer; //variable to hold the timer interval
let timersStarted = false; //boolean to check if the timer has started

function startTimer() { //function to start the game timer
    timer = setInterval(() => {
        time++;
    }, 1000);
    timersStarted = true;
}

function stopTimer(timer) { //function to stop the game timer
    clearInterval(timer);
}

function resetTimer() { //function to reset the game timer
    clearInterval(timer);
    time = 0;
    timersStarted = false;
}

const images = [ //array of the image sources, 6 images, 2 cards each image
    'Assets/img1.png', 'Assets/img1.png',
    'Assets/img2.png', 'Assets/img2.png',
    'Assets/img3.png', 'Assets/img3.png',
    'Assets/img4.png', 'Assets/img4.png',
    'Assets/img5.png', 'Assets/img5.png',
    'Assets/img6.png', 'Assets/img6.png'
];

let totalPairs = images.length / 2; //total number of pairs in the game

function shuffle(array) { //images array shuffle function
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(images); //shuffles the images array

document.querySelectorAll('.card-back img').forEach((img, index) => { //assigns the shuffled images to each card back
    img.src = images[index];
});

document.querySelectorAll('.card').forEach(card => { //adds click event listener to each card
    card.addEventListener('click', function() { 
        if (lockBoard == true) return;
        if (flippedCards.includes(card)) return; //stops from clicking the already flipped card

        if (!timersStarted) startTimer(); //starts the timer on first click

        card.classList.add('flipped'); //adds the flipped class to the clicked card
        flippedCards.push(card); //adds clicked card to the flippedCards array

        if (flippedCards.length == 2) { //check if 2 cards match
            checkForMatch();
        }
    });
});

function checkForMatch() {
    const [card1, card2] = flippedCards; //creates variables for each flipped card

    const img1 = card1.querySelector('.card-back img').src; //adds the image source of the back of each card to a variable
    const img2 = card2.querySelector('.card-back img').src;

    if (img1 === img2) { //if they match
        card1.style.pointerEvents = 'none'; //makes the matched cards unclickable
        card2.style.pointerEvents = 'none';

        flippedCards = [];//empties the flippedCards array

        setTimeout(() => {
            card1.classList.add('matched'); //adds the matched class to the cards
            card2.classList.add('matched');
        }, 300);
        
        matchedPairs++; //increments the matched pairs counter

        if (matchedPairs === totalPairs) { //if all pairs are matched (WIN)
            lockBoard = true;
            stopTimer(timer); //stops the timer

            setTimeout(() => {
                document.getElementById('win-overlay').classList.add('visible'); //shows the win overlay
                document.getElementById('time-taken').textContent = time; //displays the time taken

                confetti({ //confetti effect
                    particleCount: 100,
                    spread: 180,
                    origin: { y: 0.6 },
                    scalar: 2
                });

                lockBoard = false;

            }, 300);
        }
        
    } else { //if they dont match
        lockBoard = true; 
        flippedCards = []; //empties the flippedCards array

        setTimeout(() => {
            card1.classList.remove('flipped'); //removes flipped class from both cards
            card2.classList.remove('flipped');
            
            lockBoard = false; 
        }, 500);
    }
}

document.getElementById('play-again').addEventListener('click', function() { //play again button on click
    lockBoard = true;
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped'); //removes the flipped and matched classes from every card
        card.classList.remove('matched');
        card.style.pointerEvents = 'auto'; //makes all cards clickable again
    });
    
    document.getElementById('win-overlay').classList.remove('visible'); //hides the win overlay
    
    flippedCards = []; //empties the flippedCards array
    matchedPairs = 0; //resets the matched pairs counter
    resetTimer(); //resets the timer
    
    setTimeout(() => {
        shuffle(images); //reshuffles the images array

        document.querySelectorAll('.card-back img').forEach((img, index) => { //assigns the shuffled images to each card back
            img.src = images[index];
        });

        lockBoard = false;
    }, 600);
    
});