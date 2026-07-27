const paragraph = document.getElementById("paragraph");
const input = document.getElementById("input");

const timeTag = document.getElementById("time");
const wpmTag = document.getElementById("wpm");
const accuracyTag = document.getElementById("accuracy");
const mistakesTag = document.getElementById("mistakes");

const restartBtn = document.getElementById("restart");

let timer = 60;
let interval = null;
let started = false;

let mistakes = 0;
let totalTyped = 0;

let currentText = "";

// Load Random Paragraph
function loadParagraph() {

    currentText = paragraphs[
        Math.floor(Math.random() * paragraphs.length)
    ];

    paragraph.innerHTML = "";

    currentText.split("").forEach(char => {

        const span = document.createElement("span");
        span.innerText = char;
        paragraph.appendChild(span);

    });

    paragraph.querySelector("span").classList.add("current");

}

loadParagraph();


// Timer
function startTimer(){

    interval = setInterval(()=>{

        timer--;

        timeTag.innerText = timer;

        if(timer===0){

            clearInterval(interval);

            input.disabled=true;

            alert("Time's Up!");

        }

    },1000);

}


// Typing Logic

input.addEventListener("input",()=>{

    if(!started){

        started=true;
        startTimer();

    }

    const characters = paragraph.querySelectorAll("span");

    const typed = input.value.split("");

    mistakes = 0;

    characters.forEach((character,index)=>{

        const letter = typed[index];

        if(letter==null){

            character.classList.remove("correct","wrong");
            character.classList.add("current");

        }

        else if(letter===character.innerText){

            character.classList.add("correct");
            character.classList.remove("wrong","current");

        }

        else{

            character.classList.add("wrong");
            character.classList.remove("correct","current");

            mistakes++;

        }

    });

    totalTyped = typed.length;

    updateResult();

});



// Update Result

function updateResult(){

    let minutes = (60-timer)/60;

    if(minutes===0)
        minutes=1/60;

    let words = totalTyped/5;

    let wpm = Math.round(words/minutes);

    if(wpm<0)
        wpm=0;

    wpmTag.innerText = wpm;

    let accuracy = totalTyped===0
        ?100
        :Math.round(((totalTyped-mistakes)/totalTyped)*100);

    if(accuracy<0)
        accuracy=0;

    accuracyTag.innerText = accuracy+"%";

    mistakesTag.innerText = mistakes;

}



// Restart

restartBtn.addEventListener("click",()=>{

    clearInterval(interval);

    timer=60;

    started=false;

    mistakes=0;

    totalTyped=0;

    input.value="";

    input.disabled=false;

    timeTag.innerText=60;

    wpmTag.innerText=0;

    accuracyTag.innerText="100%";

    mistakesTag.innerText=0;

    loadParagraph();

});