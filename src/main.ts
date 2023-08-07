import { countriesData } from "./data/countriesData";
import "./main.scss";

const questionsData = countriesData[0];

const rulesDescription = document.querySelector(
  ".rules__description"
) as HTMLParagraphElement;
const playButton = document.querySelector(
  ".rules__button"
) as HTMLButtonElement;
const questionContainer = document.querySelector(".question-container");
const answersContainer = document.querySelector(".answers-container");

if (!rulesDescription || !playButton || !questionContainer || !answersContainer)
  throw new Error("Issue with selector");

const handleClickOnPlayButton = () => {
  rulesDescription.innerHTML = "";
  playButton.innerHTML = "Next question!";
  questionContainer.innerHTML = `<div class="question-container__image"><img src="${questionsData.flag}" alt="The flag of ${questionsData.name}" class="question-container__image" /></div><p class="question-container__question">Which answer is closest to ${questionsData.name}'s population?</p>`;
  answersContainer.innerHTML = `<p class="answers-container__total-score">Your total score: 5/10 points</p><p class="answers-container__last-score">2 points for the last guess</p><button class="answers-container__answer">A</button><button class="answers-container__answer">B</button><button class="answers-container__answer">C</button><button class="answers-container__answer">D</button>`;
};

playButton.addEventListener("click", handleClickOnPlayButton);
