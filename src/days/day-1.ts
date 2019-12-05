// https://adventofcode.com/2019/day/1
export function day1(input: string, part: number) {
  const moduleMasses = input.trim().split("\n").map(xs => parseInt(xs))

  const fuel = (mass: number): number => {
    const required = Math.floor(mass / 3) - 2

    return part == 1 
      ? required
      : required > 0 
        ? required + fuel(required)
        : 0
  }
   
  // Part 1: 3497998, Part 2: 5243999
  return moduleMasses.map(fuel).reduce((a: number, b: number) => a + b, 0)
}
