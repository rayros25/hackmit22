const fileUploadForm = document.querySelector('form');
const fileUploadWidget = document.querySelector('input');
// const [file] = document.getById('fileupload').files;
const reader = new FileReader();

fileUploadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    file = fileUploadWidget.files[0]
    /* <input type="file" id="file-selector" accept=".jpg, .jpeg, .png"> */
    console.log(file);
    // console.log(typeof file);

    file.text().then((result) => {
        console.log(result);
    })
})