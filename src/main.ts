import { countriesData } from "./data/countriesData";
import { getRandomNumber } from "./functions/getRandomNumber";
import "./main.scss";

// let totalScore: number = 0;
// let score: number = 0;
let nextButtonCounter = 1;

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
  rulesDescription.innerHTML = "";

  // generate radom country question
  let countryIndex: number = getRandomNumber(0, 249);
  questionContainer.innerHTML = `<div class="question-container__image"><img src="${countriesData[countryIndex].flag}" alt="The flag of ${countriesData[countryIndex].name}" class="question-container__image" /></div><p class="question-container__question">Which answer is closest to ${countriesData[countryIndex].name}'s population?</p>`;

  // generate random answer options to the question
  const startingMultiplier: number = getRandomNumber(5, 12);
  for (let i = 0; i < 4; i++) {
    answersContainer.innerHTML += `<button class="answers-container__answer">${Math.floor(
      ((startingMultiplier + i) / 10) * countriesData[countryIndex].population
    )}</button>`;
  }
};

const handleClickOnNextButton = () => {
  nextButtonCounter += 1;
  if (nextButtonCounter === 9) nexQuestionButton.style.display = "none";

  // generate next radom country question
  questionContainer.innerHTML = "";
  let countryIndex: number = getRandomNumber(0, 249);
  questionContainer.innerHTML += `<div class="question-container__image"><img src="${countriesData[countryIndex].flag}" alt="The flag of ${countriesData[countryIndex].name}" class="question-container__image" /></div><p class="question-container__question">Which answer is closest to ${countriesData[countryIndex].name}'s population?</p>`;

  // generate random answer options to the question

  answersContainer.innerHTML = "";
  const startingMultiplier: number = getRandomNumber(5, 12);
  for (let i = 0; i < 4; i++) {
    answersContainer.innerHTML += `<button class="answers-container__answer">${Math.floor(
      ((startingMultiplier + i) / 10) * countriesData[countryIndex].population
    )}</button>`;
  }
};

playButton.addEventListener("click", handleClickOnPlayButton);
nexQuestionButton.addEventListener("click", handleClickOnNextButton);

// const handleClickOnAnswerButton = () => {
//   answersContainer.innerHTML =
//     `<p class="answers-container__total-score">Your total score: ${totalScore} points</p><p class="answers-container__last-score">${score} points for the last guess</p>` +
//     answersContainer.innerHTML;
//   console.log("something");
// };
// answersContainer.addEventListener("click", handleClickOnAnswerButton);
