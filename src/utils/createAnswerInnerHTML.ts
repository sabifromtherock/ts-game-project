import { selectedValue } from "../main";
import { Country } from "../types/Countries";

export const createAnswerInnerHTML = (
  container: HTMLElement,
  buttonIds: string[],
  multiplier: number,
  countries: Country[],
  index: number
): void => {
  for (let i = 0; i < 4; i++) {
    container.innerHTML += `<button class="answers-container__answer" id='${
      buttonIds[i]
    }'>${Math.floor(
      ((multiplier + i) / 10) * countries[index][selectedValue]
    )}</button>`;
  }
};
