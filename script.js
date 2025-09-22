let flippedCards = []; //array to hold the flipped cards, set to be empty at start
let lockBoard = false; //boolean to lock the board when 2 cards are flipped

const images = [ //array of the image sources, 6 images, 2 cards each image
    'Assets/img1.png', 'Assets/img1.png',
    'Assets/img2.png', 'Assets/img2.png',
    'Assets/img3.png', 'Assets/img3.png',
    'Assets/img4.png', 'Assets/img4.png',
    'Assets/img5.png', 'Assets/img5.png',
    'Assets/img6.png', 'Assets/img6.png'
];

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

document.querySelectorAll('.card').forEach(card => { //selects all cards
    card.addEventListener('click', function() { //adds event listener to each card
        if (lockBoard == true) return;
        if (flippedCards.includes(card)) return; //stops from clicking the already flipped card

        card.classList.add('flipped'); //adds the flipped class to the clicked card
        flippedCards.push(card); //adds clicked card to the flippedCards array

        if (flippedCards.length == 2) { //if there are 2 flipped cards, check for match
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

    } else { //if they dont match
        lockBoard = true; //freezes the board
        flippedCards = []; //empties the flippedCards array

        setTimeout(() => {
            card1.classList.remove('flipped'); //removes flipped class from both cards
            card2.classList.remove('flipped');
            
            lockBoard = false; //unfreezes the board
        }, 500);
    }
}

document.getElementById('play-again').addEventListener('click', function() { //play again button on click
    lockBoard = true; //freezes the board
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped'); //removes the flipped and matched classes from every card
        card.classList.remove('matched');
        card.style.pointerEvents = 'auto'; //makes all cards clickable again
    });
    
    flippedCards = []; //empties the flippedCards array
    
    setTimeout(() => {
        shuffle(images); //reshuffles the images array

        document.querySelectorAll('.card-back img').forEach((img, index) => { //assigns the shuffled images to each card back
            img.src = images[index];
        });

        lockBoard = false; //unfreezes the board
    }, 600);
    
});