import * as fs from "fs";
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// https://adventofcode.com/2019/day/1
export function day1(input: string, part: number) {
  const moduleMasses = input.trim().split('\n').map(xs => parseInt(xs))

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

test('Day 1', () => {
  const input = fs.readFileSync('src/inputs/day1.txt', 'utf-8')

  const part1 = day1(input, 1)
  const part2 = day1(input, 2)
  expect(part1).toBe(3497998)
  expect(part2).toBe(5244112)
  console.log({ part1, part2 })
});

////////////////////////////////////////////////////////////////////////////////

// https://adventofcode.com/2019/day/2
export function day2(input: string, part: number) {
  const ops = input.trim().split(',').map(xs => parseInt(xs))
  ops[1] = 12
  ops[2] = 2

  for (let ip = 0; ip < ops.length;) {
    if (ops[ip] === 1) {
      ops[ops[ip + 3]] = ops[ops[ip + 1]] + ops[ops[ip + 2]];
      ip += 4
    }
    else if (ops[ip] === 2) {
      ops[ops[ip + 3]] = ops[ops[ip + 1]] * ops[ops[ip + 2]];
      ip += 4
    }
    else if (ops[ip] === 99) {
      return ops[0]
    }
  }

  return ops[0]
}

test('Day 2', () => {
  const input = fs.readFileSync('src/inputs/day2.txt', 'utf-8')

  const part1 = day2(input, 1)
  const part2 = day2(input, 2)
  expect(part1).toBe(4090701)
  expect(part2).toBe(undefined)
  console.log({ part1, part2 })
});