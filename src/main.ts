import { countriesData } from "./data/countriesData";
import { randomRange } from "./functions/generateRandomNumber";
import "./main.scss";

const questionsData = countriesData[0];
let totalScore: number = 0;
let maxPointsSoFar: number = 0;
let score: number = 0;
let isPlayButtonClicked = false;

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

if (!rulesDescription || !playButton || !questionContainer || !answersContainer)
  throw new Error("Issue with selector");

const handleClickOnPlayButton = () => {
  isPlayButtonClicked = true;
  rulesDescription.innerHTML = "";
  playButton.innerHTML = "Next question!";
  questionContainer.innerHTML = `<div class="question-container__image"><img src="${questionsData.flag}" alt="The flag of ${questionsData.name}" class="question-container__image" /></div><p class="question-container__question">Which answer is closest to ${questionsData.name}'s population?</p>`;

  const multipliers: number[] = randomRange(5, 15, 4);

  if (isPlayButtonClicked) {
    answersContainer.innerHTML += `<p class="answers-container__total-score">Your total score: ${totalScore}/${maxPointsSoFar} points</p><p class="answers-container__last-score">${score} points for the last guess</p>`;
    multipliers.forEach((multiplier) => {
      answersContainer.innerHTML += `<button class="answers-container__answer">${Math.floor(
        (questionsData.population * multiplier) / 10
      )}</button>`;
    });
  } else {
    answersContainer.innerHTML = ``;
  }
};

playButton.addEventListener("click", handleClickOnPlayButton);
