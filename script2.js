// --- HTML Quiz Data ---
const quizData = [
    {
        question: "Which tag is used to create a hyperlink in HTML?",
        options: ["<link>", "<a>", "<href>", "<hyper>"],
        answer: "<a>"
    },
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Multi Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which tag is used to display an image in HTML?",
        options: ["<image>", "<img>", "<src>", "<picture>"],
        answer: "<img>"
    },
    {
        question: "Which attribute is used to provide alternative text for an image?",
        options: ["title", "alt", "src", "text"],
        answer: "alt"
    },
    {
        question: "Which HTML tag is used to define a table row?",
        options: ["<td>", "<tr>", "<table>", "<row>"],
        answer: "<tr>"
    }
];

let currentQuestion = 0;
let score = 0;

// --- DOM Elements ---
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");

// --- Load a Quiz Question ---
function loadQuestion() {
    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;

    optionsEl.innerHTML = "";
    currentQuiz.options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("option-btn");
        button.textContent = option;
        button.addEventListener("click", () => selectOption(button, option));
        optionsEl.appendChild(button);
    });

    // Next button disabled until user selects an option
    nextBtn.disabled = true;
}

// --- Handle Option Selection ---
function selectOption(button, selected) {
    const currentQuiz = quizData[currentQuestion];
    const optionButtons = document.querySelectorAll(".option-btn");

    // Disable all options after selecting
    optionButtons.forEach(btn => btn.disabled = true);

    if(selected === currentQuiz.answer) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
        // Highlight the correct answer
        optionButtons.forEach(btn => {
            if(btn.textContent === currentQuiz.answer) {
                btn.classList.add("correct");
            }
        });
    }

    // Enable next button
    nextBtn.disabled = false;
}

// --- Handle Next Question ---
nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if(currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        // Quiz completed: show final score
        questionEl.textContent = "🎉 Quiz Completed!";
        optionsEl.innerHTML = "";
        scoreEl.textContent = `Your Score: ${score} / ${quizData.length}`;
        nextBtn.style.display = "none";
    }
});

// --- Initialize Quiz ---
loadQuestion();
nextBtn.disabled = true;

// --- Joke Generator ---
const jokeText = document.getElementById("joketext");
const jokeBtn = document.getElementById("jokeBtn");

jokeBtn.addEventListener("click", async () => {
    jokeText.textContent = "Loading joke...";
    try {
        const res = await fetch("https://official-joke-api.appspot.com/random_joke");
        const data = await res.json();
        jokeText.textContent = `${data.setup} - ${data.punchline}`;
    } catch (err) {
        jokeText.textContent = "Oops! Something went wrong 😢";
    }
});
