import "./main.scss";
import { countriesData } from "./data/countriesData";
import { getRandomNumber } from "./utils/getRandomNumber";
import { createAnswerInnerHTML } from "./utils/createAnswerInnerHTML";

let totalScore: number = 0;
let countryIndex: number = getRandomNumber(0, 247);
let nextButtonCounter: number = 1;
let amountOfQuestion: number = 0;
let isAnswerButtonClicked: boolean = true;
let questionText: string = "population";
const answerButtonIds: string[] = ["answerA", "answerB", "answerC", "answerD"];

const rulesDescription = document.querySelector(
  ".rules"
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
const score = document.querySelector(
  ".question__score"
) as HTMLParagraphElement;
const restartButton = document.querySelector(
  ".header__restart-button"
) as HTMLButtonElement;
const selectElement = document.querySelector(
  ".rules__select"
) as HTMLSelectElement;

if (
  !rulesDescription ||
  !playButton ||
  !questionContainer ||
  !answersContainer ||
  !nexQuestionButton ||
  !restartButton
)
  throw new Error("Issue with selector");

nexQuestionButton.style.display = "none";
restartButton.style.display = "none";

export let selectedValue: "population" | "area" = "population";
const handleSelectOptions = (): void => {
  //@ts-ignore --> Type 'string' is not assignable to type '"population" | "area"'.ts(2322)
  selectedValue = selectElement.value;
  if (selectedValue === "area") questionText = "land area (km&sup2;)";
};

const handleClickOnPlayButton = (): void => {
  selectElement.style.display = "none";
  playButton.style.display = "none";
  nexQuestionButton.style.display = "";
  answersContainer.style.display = "";
  rulesDescription.innerHTML = "";
  nexQuestionButton.disabled = isAnswerButtonClicked;
  restartButton.style.display = "";

  // generate radom country question
  questionContainer.innerHTML = `<div class="question-container__image"><img src="${countriesData[countryIndex].flag}" alt="The flag of ${countriesData[countryIndex].name}" class="question-container__image" /></div><p class="question-container__question">Which answer is closest to ${countriesData[countryIndex].name}'s ${questionText}?</p>`;

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
  score.innerHTML = `<p>Question number: ${
    amountOfQuestion + 1
  } <br/> Your score: <strong style="color: red">${totalScore}</strong></p>`;
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
  questionContainer.innerHTML += `<div class="question-container__image"><img src="${country.flag}" alt="The flag of ${country.name}" class="question-container__image" /></div><p class="question-container__question">Which answer is closest to ${country.name}'s ${questionText}?</p>`;

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
  score.innerHTML = `<p>Question number: ${
    amountOfQuestion + 1
  } <br/> Your score: <strong style="color: red">${totalScore}</strong></p><p style="display: none">${
    country.name
  }'s ${selectedValue} : ${country[selectedValue]}</p>`;
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

  const actualData = countriesData[countryIndex][selectedValue];
  console.log(actualData);
  const answers: number[] = [
    Number(answerA.innerText),
    Number(answerB.innerText),
    Number(answerC.innerText),
    Number(answerD.innerText),
  ];

  const closest = answers.reduce((prev, curr) => {
    return Math.abs(curr - actualData) < Math.abs(prev - actualData)
      ? curr
      : prev;
  });

  const handleClickOnAnswerButton = (event: Event) => {
    const clickedButton = event.target as HTMLButtonElement;
    const clickedButtonText: number = Number(clickedButton.innerText);
    amountOfQuestion++;

    if (closest === clickedButtonText) {
      totalScore++;
      clickedButton.style.color = "green";
    } else {
      clickedButton.style.color = "red";
    }

    answerButtons.forEach((button) => {
      isAnswerButtonClicked = false;
      button.disabled = true;
      if (nextButtonCounter === 10) isAnswerButtonClicked = true;
      nexQuestionButton.disabled = isAnswerButtonClicked;
    });
    const country = countriesData[countryIndex];

    score.innerHTML = `<p>Question number: ${amountOfQuestion} <br/> Your score: <strong style="color: red">${totalScore}</strong></p><p style="color: green"><strong>${country.name}'s ${questionText} : ${country[selectedValue]}</strong></p>`;
  };

  answerA.addEventListener("click", handleClickOnAnswerButton);
  answerB.addEventListener("click", handleClickOnAnswerButton);
  answerC.addEventListener("click", handleClickOnAnswerButton);
  answerD.addEventListener("click", handleClickOnAnswerButton);
};

restartButton.addEventListener("click", () => window.location.reload());
playButton.addEventListener("click", handleClickOnPlayButton);
nexQuestionButton.addEventListener("click", handleClickOnNextButton);
selectElement.addEventListener("change", handleSelectOptions);
