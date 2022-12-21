// fetch
const getInfo = async () => {

    const request = new Request('/cv.json');
    //fetch() starts a request and returns a promise. When the request completes, the promise is resolved with the Response object. 
    //If the request fails due to some network problems, the promise is rejected.


    const response = await fetch(request);
   // await fetch('/cvjson') starts an HTTP request to '/movies' URL. Because the await keyword is present, 
   //the asynchronous function is paused until the request completes.
    const cvObj = await response.json();
    //response.json() is a method on the Response object that lets you extract a JSON object from the response. 
    //The method returns a promise, so you have to wait for the JSON: await response.json().
    
    //console.log(cvObj)
    return cvObj;
    
}


const populateCv = (cvObj) => {
let employmentHtml = ``;

cvObj.employment.forEach(element => {
    const listItem = `
    <li>
    <h4>${element.time}</h4>
    <p>
    <span >${element.jobTitle}</span>
    <span>${element.location}</span><br>
    ${element.text}
    </p>
    </li>`;

    employmentHtml +=listItem
    //console.log(cvObj.employment);
});
document.getElementById('employmentList').innerHTML = employmentHtml;

let educationHtml = ``;
cvObj.education.forEach(element => {
    const listItem = `<li>${element}</li>`;

    educationHtml +=listItem
    //console.log(cvObj.education);
});

document.getElementById('educationList').innerHTML = educationHtml;

let internshipsHtml = ``;
cvObj.internships.forEach(element => {
    let listItem = `<li>
    <p>
    <span >${element.companyName}</span>
    <span>${element.text}</span><br>
    </p>
    </li>`;

    internshipsHtml +=listItem
    console.log(cvObj.internships);
});
document.getElementById('internshipsList').innerHTML = internshipsHtml;
}

const cvObj = await getInfo();
populateCv(cvObj);

// The typewriter element
let typeWriterElement = document.getElementById('typewriter');

// The TextArray: 
let textArray = ["Hey, I'm Alexander.","Welcome to my CV page!"];

// You can also do this by transfering it through a data-attribute
// var textArray = typeWriterElement.getAttribute('data-array');


// function to generate the backspace effect 
function delWriter(text, i, cb) {
	if (i >= 0 ) {
		typeWriterElement.innerHTML = text.substring(0, i--);
		// generate a random Number to emulate backspace hitting.
 		var rndBack = 10 + Math.random() * 100;
		setTimeout(function() {
			delWriter(text, i, cb);
		},rndBack); 
	} else if (typeof cb == 'function') {
		setTimeout(cb,1000);
	}
};

// function to generate the keyhitting effect
function typeWriter(text, i, cb) {
	if ( i < text.length+1 ) {
		typeWriterElement.innerHTML = text.substring(0, i++);
		// generate a random Number to emulate Typing on the Keyboard.
		var rndTyping = 250 - Math.random() * 100;
		setTimeout( function () { 
			typeWriter(text, i++, cb)
		},rndTyping);
	} else if (i === text.length+1) {
		setTimeout( function () {
			delWriter(text, i, cb)
		},1000);
	}
};

// the main writer function
function StartWriter(i) {
	if (typeof textArray[i] == "undefined") {
		setTimeout( function () {
			StartWriter(0)
		},1000);
	} else if(i < textArray[i].length+1) {
		typeWriter(textArray[i], 0, function () {
			StartWriter(i+1);
		});
	}  
};
// wait one second then start the typewriter
setTimeout( function () {
	StartWriter(0);
},1000);
	