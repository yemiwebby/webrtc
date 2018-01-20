// global variables

let width = 500,
    height = 0,
    filter = 'none',
    streaming = false;


// DOM Elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');


// Get the media stream
navigator.mediaDevices.getUserMedia({video: true, audio: false})
.then((stream) => {
// link to the video source
video.srcObject = stream;
// play the video
video.play();
})
.catch((err) => {
console.log(`Error: ${err}`);
});

// play when ready
video.addEventListener('canplay', (e) => {
    if(!streaming) {
        // Set video canvas height
        height = video.videoHeight / (video.videoWidth / width);

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);

        streaming = true;
    }
}, false);


photoButton.addEventListener('click', (e) => {
    takePicture();

    e.preventDefault();
}, false);

// Filter event
photoFilter.addEventListener('change', function(e) {
    // set filter to chosen option
    filter = e.target.value;
    // set filter to video
    video.style.filter = filter;
     e.preventDefault();
});

// clear event
clearButton.addEventListener('click', (e) => {
    // clear photos
    photos.innerHTML = '';

    //change filter back to normal
    filter = 'none';
    // Set video filter
    video.style.filter = filter;
    // REset select list
    photoFilter.selectedIndex = 0;
});

// Take picture
function takePicture() {
    // create canvas
    const context = canvas.getContext('2d');
    if(width && height) {
        // set c anvas props
        canvas.width = width;
        canvas.height = height;

        //draw an image of the video on the canvas
        context.drawImage(video, 0, 0, width, height);

        //create image from the canvas
        const imgUrl = canvas.toDataURL('image/png'); 
        const img = document.createElement('img');

        //set image src
        img.setAttribute('src', imgUrl);

        // Set image filter
        img.style.filter = filter;

        photos.appendChild(img);
    }
}