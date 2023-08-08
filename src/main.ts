import "./main.scss";
import { countriesData } from "./data/countriesData";
import { getRandomNumber } from "./utils/getRandomNumber";
import { createAnswerInnerHTML } from "./utils/createAnswerInnerHTML";

let totalScore: number = 0;
let countryIndex: number = getRandomNumber(0, 247);
let nextButtonCounter = 1;
let amountOfQuestion = 0;
let isAnswerButtonClicked = true;
const answerButtonIds: string[] = ["answerA", "answerB", "answerC", "answerD"];

const rulesDescription = document.querySelector(
  ".rules__description"
) as HTMLParagraphElement;
const playButton = document.querySelector(
  ".rules__button"
) as HTMLButtonElement;
const questionContainer = document.querySelector(
  ".question-container"
) as HTMLElement;
const answersContainer = document.querySelector(
  ".answers-container"
) as HTMLElement;
const nexQuestionButton = document.querySelector(
  ".question__button"
) as HTMLButtonElement;

if (
  !rulesDescription ||
  !playButton ||
  !questionContainer ||
  !answersContainer ||
  !nexQuestionButton
)
  throw new Error("Issue with selector");

nexQuestionButton.style.display = "none";

const handleClickOnPlayButton = () => {
  playButton.style.display = "none";
  nexQuestionButton.style.display = "";
  answersContainer.style.display = "";
  rulesDescription.innerHTML = "";
  nexQuestionButton.disabled = isAnswerButtonClicked;

  // generate radom country question
  questionContainer.innerHTML = `<div class="question-container__image"><img src="${countriesData[countryIndex].flag}" alt="The flag of ${countriesData[countryIndex].name}" class="question-container__image" /></div><p class="question-container__question">Which answer is closest to ${countriesData[countryIndex].name}'s population?</p>`;

  // generate random answer options to the question
  const startingMultiplier: number = getRandomNumber(5, 12);
  createAnswerInnerHTML(
    answersContainer,
    answerButtonIds,
    startingMultiplier,
    countriesData,
    countryIndex
  );
  handleAnswers();
};

const handleClickOnNextButton = () => {
  isAnswerButtonClicked = true;
  nexQuestionButton.disabled = isAnswerButtonClicked;

  nextButtonCounter += 1;
  if (nextButtonCounter === 10) {
    nexQuestionButton.style.display = "none";
  }

  // generate next radom country question
  questionContainer.innerHTML = "";
  countryIndex = getRandomNumber(0, 247);
  const country = countriesData[countryIndex];
  questionContainer.innerHTML += `<div class="question-container__image"><img src="${country.flag}" alt="The flag of ${country.name}" class="question-container__image" /></div><p class="question-container__question">Which answer is closest to ${country.name}'s population?</p>`;

  // generate random answer options to the question
  answersContainer.innerHTML = "";
  const startingMultiplier: number = getRandomNumber(5, 12);
  createAnswerInnerHTML(
    answersContainer,
    answerButtonIds,
    startingMultiplier,
    countriesData,
    countryIndex
  );
  handleAnswers();
  questionContainer.innerHTML += `<p>Your score is: ${totalScore} out of ${amountOfQuestion}</p><p>${country.name}'s population : ..............</p>`;
};

const handleAnswers = (): void => {
  const answerA = document.getElementById("answerA") as HTMLButtonElement;
  const answerB = document.getElementById("answerB") as HTMLButtonElement;
  const answerC = document.getElementById("answerC") as HTMLButtonElement;
  const answerD = document.getElementById("answerD") as HTMLButtonElement;
  const answerButtons = document.querySelectorAll(
    ".answers-container__answer"
  ) as NodeListOf<HTMLButtonElement>;

  if (!answerA || !answerB || !answerC || !answerD)
    throw new Error("Issue with selector");

  const actualPopulation = countriesData[countryIndex].population;
  const answers: number[] = [
    Number(answerA.innerText),
    Number(answerB.innerText),
    Number(answerC.innerText),
    Number(answerD.innerText),
  ];

  const closest = answers.reduce((prev, curr) => {
    return Math.abs(curr - actualPopulation) < Math.abs(prev - actualPopulation)
      ? curr
      : prev;
  });

  const handleClickOnAnswerButton = (event: Event) => {
    const clickedButton = event.target as HTMLButtonElement;
    const clickedButtonText: number = Number(clickedButton.innerText);
    amountOfQuestion++;

    if (closest === clickedButtonText) totalScore++;

    answerButtons.forEach((button) => {
      isAnswerButtonClicked = false;
      button.disabled = true;
      if (nextButtonCounter === 10) isAnswerButtonClicked = true;
      nexQuestionButton.disabled = isAnswerButtonClicked;
    });
    const country = countriesData[countryIndex];

    questionContainer.innerHTML += `<p>Your score is: ${totalScore} out of ${amountOfQuestion}</p><p>${country.name}'s population : ${country.population}</p>`;
  };

  answerA.addEventListener("click", handleClickOnAnswerButton);
  answerB.addEventListener("click", handleClickOnAnswerButton);
  answerC.addEventListener("click", handleClickOnAnswerButton);
  answerD.addEventListener("click", handleClickOnAnswerButton);
};

playButton.addEventListener("click", handleClickOnPlayButton);
nexQuestionButton.addEventListener("click", handleClickOnNextButton);
