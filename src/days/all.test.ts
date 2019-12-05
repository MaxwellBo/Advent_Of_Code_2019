import React from 'react';
import { day1 } from './day-1';
import * as fs from "fs";
import { RunnerArgs } from './day-0';

interface InvokeArgs {
  day: number
  using: (args: RunnerArgs) => any
  expecting: {
    part1: any,
    part2: any
  }
}

function invoke({ day, using, expecting }: InvokeArgs) {
  const input = fs.readFileSync(`src/days/inputs/day${day}.txt`, "utf-8")

  const part1 = using({ input, part: 1 })
  const part2 = using({ input, part: 2 })
  expect(part1).toBe(expecting.part1)
  expect(part2).toBe(expecting.part2)

  return { part1, part2 }
}

test('Day 1', () => {
    console.log(invoke({
      day: 1,
      using: day1,
      expecting: {
        part1: 3497998,
        part2: 5244112
      }
    }))
});
