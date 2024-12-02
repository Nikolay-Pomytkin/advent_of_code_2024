import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";
import { normalizeTestCases } from "../../../util/test";

const YEAR = 2024;
const DAY = 2;

// solution path: /Users/nikolay/Documents/other/advent_of_code_2024/years/2024/02/index.ts
// data path    : /Users/nikolay/Documents/other/advent_of_code_2024/years/2024/02/data.txt
// problem url  : https://adventofcode.com/2024/day/2

const getData = (input: string) => {
  const lines = input.split("\n");
  const data: number[][] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.length === 0) {
      continue;
    }
    const numbers = line.split(" ").map(Number);
    data.push(numbers);
  }
  return data;
};

async function p2024day2_part1(input: string, ...params: any[]) {
  const data = getData(input);
  let safeCount = 0;

  // iterate through each line
  // if the line is safe, increment safeCount
  // the line is safe when all of the numbers are either increasing or decreasing and the  difference between any two numbers is at most 3 or at least 1
  for (const line of data) {
    let increasing = null;
    let diff = 0;
    console.log(line);
    for (let i = 0; i < line.length; i++) {
      if (diff <= 3 && diff >= 1 && i === line.length - 1) {
        safeCount = safeCount + 1;
        console.log("incrementing safecount", i);
        break;
      }
      const current = line[i];
      const next = line[i + 1];

      if (current < next) {
        if (increasing === null) {
          increasing = true;
        } else if (increasing === false) {
          console.log("breaking cause decreasing", i);
          break;
        }
      } else if (current > next) {
        if (increasing === null) {
          increasing = false;
        } else if (increasing === true) {
          console.log("breaking cause increasing", i);
          break;
        }
      }
      diff = Math.abs(current - next);

      if (diff > 3 || diff < 1) {
        console.log("breaking cause diff is not between 1 or 3 index:", i);
        break;
      }
    }
  }
  return safeCount.toString();
}

async function p2024day2_part2(input: string, ...params: any[]) {
  return "Not implemented";
}

async function run() {
  const part1tests: TestCase[] = [{ input: "1 2 3 4 5", expected: "1" }];
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
          await p2024day2_part1(testCase.input, ...(testCase.extraArgs || [])),
        ),
      );
    }
  });
  await test.section(async () => {
    for (const testCase of p2testsNormalized) {
      test.logTestResult(
        testCase,
        String(
          await p2024day2_part2(testCase.input, ...(testCase.extraArgs || [])),
        ),
      );
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2024day2_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2024day2_part2(input));
  const part2After = performance.now();

  logSolution(2, 2024, part1Solution, part2Solution);

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
