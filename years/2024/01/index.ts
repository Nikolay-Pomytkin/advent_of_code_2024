import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";
import { normalizeTestCases } from "../../../util/test";

const YEAR = 2024;
const DAY = 1;

// solution path: /Users/nikolay/Documents/other/advent_of_code_2024/years/2024/01/index.ts
// data path    : /Users/nikolay/Documents/other/advent_of_code_2024/years/2024/01/data.txt
// problem url  : https://adventofcode.com/2024/day/1

async function p2024day1_part1(input: string, ...params: any[]) {
  const list1 = [];
  const list2 = [];

  // split input by newlines and triple space between numbers
  // add numbers in first column to list1
  // add numbers in second column to list2
  const lines = input.split("\n").map((line) => line.trim());
  for (const line of lines) {
    const [num1, num2] = line.split("   ");
    list1.push(Number(num1));
    list2.push(Number(num2));
  }

  // sort lists
  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  // find distance between lists
  let distance = 0;
  for (let i = 0; i < list1.length; i++) {
    distance += Math.abs(list1[i] - list2[i]);
  }

  return distance;
}

async function p2024day1_part2(input: string, ...params: any[]) {
  const list1 = [];
  const list2 = [];

  // split input by newlines and triple space between numbers
  // add numbers in first column to list1
  // add numbers in second column to list2
  const lines = input.split("\n").map((line) => line.trim());
  for (const line of lines) {
    const [num1, num2] = line.split("   ");
    list1.push(Number(num1));
    list2.push(Number(num2));
  }

  // sort list1
  list1.sort((a, b) => a - b);

  // create map of list2 with frequency of each number
  // const list2map = new Map<number, number>();
  // for (let i = 0; i < list2.length; i++) {
  //   const num2 = list2[i];
  //   if (list2map.has(num2)) {
  //     list2map.set(num2, list2map.get(num2)! + 1);
  //   } else {
  //     list2map.set(num2, 1);
  //   }
  // }
  // console.log(list2map);

  // find similarity score with list2map
  // let score = 0;
  // for (const num1 of list1) {
  //   score += num1 * list2map.get(num1)!;
  // }

  //  find similarity score with for loop
  let score = 0;
  for (let i = 0; i < list1.length; i++) {
    const num1 = list1[i];
    score += num1 * list2.filter((num2) => num2 === num1).length;
  }

  return score;
}

async function run() {
  const part1tests: TestCase[] = [];
  const part2tests: TestCase[] = [];

  const [p1testsNormalized, p2testsNormalized] = normalizeTestCases(
    part1tests,
    part2tests,
  );

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of p1testsNormalized) {
      test.logTestResult(
        testCase,
        String(
          await p2024day1_part1(testCase.input, ...(testCase.extraArgs || [])),
        ),
      );
    }
  });
  await test.section(async () => {
    for (const testCase of p2testsNormalized) {
      test.logTestResult(
        testCase,
        String(
          await p2024day1_part2(testCase.input, ...(testCase.extraArgs || [])),
        ),
      );
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2024day1_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2024day1_part2(input));
  const part2After = performance.now();

  logSolution(1, 2024, part1Solution, part2Solution);

  log(chalk.gray("--- Performance ---"));
  log(chalk.gray(`Part 1: ${util.formatTime(part1After - part1Before)}`));
  log(chalk.gray(`Part 2: ${util.formatTime(part2After - part2Before)}`));
  log();
}

run()
  .then(() => {
    process.exit();
  })
  .catch((error) => {
    throw error;
  });
