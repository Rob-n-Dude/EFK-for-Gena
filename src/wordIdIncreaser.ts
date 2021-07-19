function wordIdIncreaser(): () => number {
  let counter = 65;
  return () => counter++;
}

export const idCounter = wordIdIncreaser();
