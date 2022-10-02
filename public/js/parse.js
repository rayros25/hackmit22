const fileUploadForm = document.querySelector('form');
const fileUploadWidget = document.querySelector('input');
const yesButton = document.getElementsByClassName('bt_y')[0];
const noButton = document.getElementsByClassName('bt_n')[0];
const flowerZone = document.getElementsByClassName('flower')[0];
const flashcardText = document.getElementsByClassName('flashcard_content')[0];
const flashcardBox = document.getElementsByClassName('flashcard')[0];

const growthImage = document.querySelector(".growth-img");

let parsed_words = [];
let curr = 0;
let which_side = 0;
let hasStarted = false;
let hasBeenFlipped = false;

const flowerGrowth = ["/images/flower1.png", "/images/flower2.png", "/images/flower3.png", "/images/flower4.png", "/images/flower5.png"];

const houseGrowth = ["/images/house1.png", "/images/house2.png", "/images/house3.png", "/images/house4.png", "/images/house5.png"];

const cakeGrowth = ["/images/cake1.png", "/images/cake2.png", "/images/cake3.png", "/images/cake4.png", "/images/cake5.png"];

const fishGrowth = ["/images/fish1.png", "/images/fish2.png", "/images/fish3.png", "/images/fish4.png", "/images/fish5.png"];

const birdGrowth = ["/images/bird1.png", "/images/bird2.png", "/images/bird3.png", "/images/bird4.png", "/images/bird5.png"];

const growthImgArrays = [flowerGrowth, houseGrowth, cakeGrowth, fishGrowth, birdGrowth];

const maxSteps = 15;
const numGrowthStages = 5;
// let numItemsLeft;
let cardsCorrect = 0;
let growthRate = 3;
let currGrowthStage = 0;
let currGrowthType;
let numGrown = 0;



fileUploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    file = fileUploadWidget.files[0]
    // console.log(file);

    // file.text().then((result) => {
    //     parsed_words = parse(result);
    // })  
    const result = await file.text();
    parsed_words = parse(result);
    numItemsLeft = parsed_words.length;
    flashcardText.innerHTML = 'File uploaded and ready! Click me to start!'
})

const parse = (words_from_file) => {
    // console.log(result);
    // we should probably do something else with the result too
    // console.log('wff', words_from_file)
    // console.log('BRUH', words_from_file.split('	'))
    // console.log('BRUH', words_from_file.split('\r\n'))
    const newlineRemoved = words_from_file.split('\r\n')
    const tabRemoved = [];
    newlineRemoved.forEach((w) => {
        tabRemoved.push(w.split('\t'))
    })
    // console.log(tabRemoved)
    return tabRemoved;
}

const randIndex = () => {
    return Math.floor(Math.random() * parsed_words.length)
}

const flipCard = () => {
    which_side = (which_side === 1) ? 0 : 1;
}
// yesButton.addEventListener('click event', (e) => {
//     // e.preventDefault();

//     console.log('YES PRESSED')
// })

const getNewCard = () => {
    if (parsed_words.length != 0) {
        flipCard();
        curr = randIndex();
        flashcardText.innerHTML = parsed_words[curr][which_side];
    }
    hasBeenFlipped = false;
}

// yesButton.onclick = () => {
//     console.log("num items left: " + numItemsLeft);
//     if (hasBeenFlipped) {
//         cardsCorrect++;
//         numItemsLeft--;
// 
//         updateGrowth();
//         getNewCard();
//     }
// }

function cardCorrect() {
    // console.log("num items left: " + numItemsLeft);
    console.log('user says: right')
    if (hasBeenFlipped) {
        cardsCorrect++;
        // numItemsLeft--;
        
        updateGrowth();
        getNewCard();
    }
}
yesButton.addEventListener("click", cardCorrect);
document.addEventListener("keydown", (e) => {
    if (e.key === "l" || e.key === "ArrowRight") {
        cardCorrect();
    }
    else if (e.key === "j" || e.key === "ArrowLeft") {
        console.log('user says: wrong')
        numItemsLeft--;
        if (hasBeenFlipped) {
            getNewCard();
        }
    } else if (e.key === "k" || e.key === " " || e.key === "ArrowUp" ||
               e.key === "ArrowDown") {
        if (!hasStarted) {
            flashcardText.innerHTML = parsed_words[curr][which_side];
            hasStarted = true;
        }
        else if (!hasBeenFlipped) {
            flipCard(); 
            flashcardText.innerHTML = parsed_words[curr][which_side];
            hasBeenFlipped = true;
        }
    }
});

noButton.onclick = () => {
    numItemsLeft--;
    if (hasBeenFlipped) {
        getNewCard();
    }
}

flashcardBox.onclick = () => {
    if (!hasStarted) {
        flashcardText.innerHTML = parsed_words[curr][which_side];
        hasStarted = true;
    }
    else if (!hasBeenFlipped) {
        flipCard(); 
        flashcardText.innerHTML = parsed_words[curr][which_side];
        hasBeenFlipped = true;
    }
}

// growth visualization

function setGrowthType() {
    currGrowthType = Math.floor(Math.random() * growthImgArrays.length);
}

// function setGrowthRate() {
//     if (numItemsLeft < maxSteps) {
//         // number of items market correct required to grow becomes
//         // items / 5
//         growthRate = Math.floor(numItemsLeft / numGrowthStages) + 1;
//     } else {
//         growthRate = 3;
//     }
// }

function updateGrowth() {
    // set start image after a growth cycle has been completed
    if (currGrowthStage === 0) {
        growthImage.setAttribute("src", "/images/start.png");
    }
    
    // reached threshold to update growth display 
    console.log("cards correct: " + cardsCorrect);
    console.log("growth rate:" + growthRate); 
    if (cardsCorrect % growthRate === 0) {
        growthImage.setAttribute("src", 
                    growthImgArrays[currGrowthType][currGrowthStage]);
        // if growth cycle completed, reset
        if ((currGrowthStage + 1) === numGrowthStages) {
            currGrowthStage = 0;
            numGrown++;
            setGrowthType();
            // setGrowthRate();
        } else {
            currGrowthStage++;
        }
    }
    // if all flashcards have been studied, stop growth
    // if (numItemsLeft === 0) {
    //     correctBtn.removeEventListener("click", incrementCorrect);
    // }
}

setGrowthType();
// setGrowthRate();
