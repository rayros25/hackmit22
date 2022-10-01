// import { parse } from 'csv-parse/sync';
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const { parse } = require('csv-parse');

const fileUploadForm = document.querySelector('form');
const fileUploadWidget = document.querySelector('input');

fileUploadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    file = fileUploadWidget.files[0]
    /* <input type="file" id="file-selector" accept=".jpg, .jpeg, .png"> */
    console.log(file);
    // console.log(typeof file);

    let words_from_file = "";
    file.text().then((result) => {
        console.log(result);
        words_from_file = result;
        // we should probably do something else with the result too
        console.log('wff', words_from_file)
        // console.log('BRUH', words_from_file.split('	'))
        console.log('BRUH', words_from_file.split('\r\n'))
        const newlineRemoved = words_from_file.split('\r\n')
        const tabRemoved = [];
        newlineRemoved.forEach((w) => {
            tabRemoved.push(w.split('\t'))
        })
        console.log(tabRemoved)
    })  
    // parse(words_from_file, {
    //     delimiter: '    '
    // }, function(err, parsed_result) {
    //     console.log(parsed_result);
    // })

    // console.log(big_mood)
})