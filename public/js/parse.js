const fileUploadForm = document.querySelector('form');
const fileUploadWidget = document.querySelector('input');
const yesButton = document.getElementsByClassName('bt_y')[0];
const flashcardText = document.getElementsByClassName('flashcard_content')[0];
const flashcardBox = document.getElementsByClassName('flashcard')[0];

let parsed_words = [];
let curr = 0;
let which_side = 1;

fileUploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    file = fileUploadWidget.files[0]
    // console.log(file);

    // file.text().then((result) => {
    //     parsed_words = parse(result);
    // })  
    const result = await file.text();
    parsed_words = parse(result);

    console.log(parsed_words);
    // parse(words_from_file, {
    //     delimiter: '    '
    // }, function(err, parsed_result) {
    //     console.log(parsed_result);
    // })

    // console.log(big_mood)
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
yesButton.onclick = () => {
    if (parsed_words.length != 0) {
        curr = randIndex();
        flashcardText.innerHTML = parsed_words[curr][which_side];
    }
}

flashcardBox.onclick = () => {
    flipCard();
    flashcardText.innerHTML = parsed_words[curr][which_side];
}