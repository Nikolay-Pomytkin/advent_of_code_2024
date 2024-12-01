import * as util from "../../../util/util";
import * as test from "../../../util/test";

const YEAR = 2024;
const DAY = 1;

async function p2024day1_part1(input: string, ...params: any[]) {}

async function p2024day1_part2(input: string, ...params: any[]) {}

async function run() {
  const part1tests = [];
  const part2tests = [];

  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(
        testCase,
        String(
          await p2024day1_part1(testCase.input, ...(testCase.extraArgs || [])),
        ),
      );
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(
        testCase,
        String(
          await p2024day1_part2(testCase.input, ...(testCase.extraArgs || [])),
        ),
      );
    }
  });
  test.endTests();
}

run()
  .then(() => {
    process.exit();
  })
  .catch((error) => {
    throw error;
  });
