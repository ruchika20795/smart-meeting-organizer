/**
 * Generates a random number between min and max values;
 */
export default function getRandomNumber(min = 1, max = 50) {
    return Math.floor(Math.random() * (max - min) + min);
  }
