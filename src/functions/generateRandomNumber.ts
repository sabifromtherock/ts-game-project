export const randomRange = (min: number, max: number, amount: number) => {
  const numbersArray: number[] = [];

  let i: number = 0;
  while (i < amount) {
    const randomNumber: number = Math.floor(
      Math.random() * (max - min + 1) + min
    );

    if (!numbersArray.includes(randomNumber)) {
      numbersArray.push(randomNumber);
      i++;
    }
  }
  return numbersArray;
};
