// https://adventofcode.com/2019/day/1
import * as R from 'ramda';
import { RunnerArgs } from './day-0';

export function day1({ input, part }: RunnerArgs) {
  const moduleMasses = input.trim().split("\n").map(n => parseInt(n))


  const fuel = (mass: number): number => {
    const required = Math.floor(mass / 3) - 2

    return part == 1 
      ? required
      : required > 0 
        ? required + fuel(required)
        : 0
  }
   
  return moduleMasses
    .map(fuel)
    .reduce((a: number, b: number) => a + b, 0) 
}
