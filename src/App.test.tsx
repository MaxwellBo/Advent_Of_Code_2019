import * as fs from "fs";
import * as R from 'ramda';
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

export function computer(ops: number[], noun: number, verb: number) {
  ops = [...ops]
  ops[1] = noun
  ops[2] = verb

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

// https://adventofcode.com/2019/day/2
export function day2(input: string, part: number) {
  const ops = input.trim().split(',').map(xs => parseInt(xs))

  if (part === 1) {
    return computer(ops, 12, 2)
  } else {

    for (let noun = 1; noun < 99 + 1; noun++) {
      for (let verb = 0; verb < 99 + 1; verb++) {
        const fst = computer(ops, noun, verb)

        if (fst === 19690720) {
          return 100 * noun + verb
        }
      }
    }
  }
}

test('Day 2', () => {
  const input = fs.readFileSync('src/inputs/day2.txt', 'utf-8')

  const part1 = day2(input, 1)
  const part2 = day2(input, 2)
  expect(part1).toBe(4090701)
  expect(part2).toBe(6421)
  console.log({ part1, part2 })
});