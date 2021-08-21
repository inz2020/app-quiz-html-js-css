//getting all required elements
console.log("hello");
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec")
const timeLine = quiz_box.querySelector("header .time_line")
const timeOff = quiz_box.querySelector("header .timer_text")

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box")
const restart_quiz = result_box.querySelector(".buttons .restart")
const quit_quiz = result_box.querySelector(".buttons .quit")

//const timeCount = quiz_box.querySelector("")
const option_list = document.querySelector(".option_list");

//If start quiz button clicked
start_btn.addEventListener('click', () => {
        info_box.classList.add("activeInfo");
    })
    //If Exitbutton clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");

}

//If Continue Button clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.add("activeQuiz"); //SHow the quiz box
    //console.log(quiz_box);

    showQuestion(0);
    questionsCounter(1);
    startTimer(10);
    startTimerLine(0);

}

quit_quiz.onclick = () => {
    window.location.reload();
}

restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz")
    result_box.classList.remove("activeResult")

    let question_count = 0;
    let question_number = 1;
    let timeValue = 15;
    let widthValue = 0;
    // let userScore = 0;

    showQuestion(question_count);
    questionsCounter(question_number);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue)
    next_btn.style.display = "none"
    timeOff.textContent = "Time Left"

}

let question_count = 0;
let question_number = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;
//if next button clicked
next_btn.addEventListener('click', () => {
    if (question_count < questions.length - 1) {
        question_count++;
        question_number++;
        showQuestion(question_count);
        questionsCounter(question_number);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue)
            //Le button next_btn est invisible par defaut jusqu'à ce que le user selectionne sa reponse et cela tient compte du timer aussi
        next_btn.style.display = "none"
        timeOff.textContent = "Time Left"
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions completed!!");
        showResultBox()
    }
})

//getting questions and answers from array

function showQuestion(index) {
    const question_text = document.querySelector(".quest_text")

    let question_tag = '<span>' + questions[index].nber + "." + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[1] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[2] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[3] + '<span></span></div>';

    question_text.innerHTML = question_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");

    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}
let tickCross = ' <div class="icon cross"> <i class="fas fa-times"></i></div>';
let tickIcon = ' <div class="icon tick"><i class="fas fa-check"></i></div>';

function optionSelected(answer) {

    clearInterval(counter);
    clearInterval(counterLine);
    // startTimer(timeValue);
    let userAnswer = answer.textContent;
    let correctAnswer = questions[question_count].answer;
    //allOptions user can selected
    let allOptions = option_list.children.length;
    console.log(correctAnswer);

    if (userAnswer == correctAnswer) {
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct!!");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        answer.classList.add("incorrect")
        console.log("Answer is wrong!!");
        answer.insertAdjacentHTML("beforeend", tickCross);
        //If answers is incorr then automatically slected the correct answer
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correctAnswer) {
                option_list.children[i].setAttribute("class", "option correct")
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }

        }
    }
    //Once user selected disabled all options
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled")
    }
    next_btn.style.display = "block";
}

function questionsCounter(index) {
    let bottom_question = quiz_box.querySelector(".total_quest");

    let totalQuestionsCountTag = '<span>' + index + ' of ' + questions.length + ' questions</span>';
    bottom_question.innerHTML = totalQuestionsCountTag;
}

function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00"
            timeOff.textContent = "Time off"

            let correctAnswer = questions[question_count].answer;
            let allOptions = option_list.children.length

            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correctAnswer) {
                    option_list.children[i].setAttribute("class", "option correct")
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled")
            }
            next_btn.style.display = "block"
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);

    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}

function showResultBox() {
    info_box.classList.remove("activeInfo")
    quiz_box.classList.remove("activeQuiz")
    result_box.classList.add("activeResult")
    const scoreText = result_box.querySelector(".score_text")
    if (userScore > 3) {
        let scoreTag = '<span>and congrats!, you got <p>' + userScore + '<p>out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    } else if (userScore > 1) {
        let scoreTag = '<span>and nice, you got<p>' + userScore + '<p>out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = '<span>and sorry, you got only<p>' + userScore + '<p>out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    }
}