export const getRandomNumber = (min: number, max: number) => {
  const randomNumber: number = Math.floor(
    Math.random() * (max - min + 1) + min
  );

  return randomNumber;
};
