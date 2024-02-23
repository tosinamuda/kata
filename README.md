# Kata Number to French Converter Package
This is an nodejs npm package that converts digits from 0 to 999999 to the French word equivalent. This package is written in ptypescript and you can use it by either adding it to a npm/pnpm/yarn workspace as a package or run it as a cli. 

## Library Structure
The repo is setup as workspace containing two packages in the [packages](https://github.com/tosinamuda/kata/tree/main/packages) directory,  the main package called kata is in the [converter](https://github.com/tosinamuda/kata/tree/main/packages/converter) and an example package that shows how to use kata in [example](https://github.com/tosinamuda/kata/tree/main/packages/examples).

The kata package contains a source folder (src) with 6  files:
1. kata.ts: this is the entrypoint to the application containing the `convert` and `convertList` function which are the major apis of the package
2. index.ts: exports all the public types, functions and class for the library to make the package importable in other packages
3. main.ts: expose the package as a CLI app
4. NumberConverter.ts: contains all the logic for converting a number
5. FrenchNumeral.ts: contains constant for the French numbers
6. TestData.ts: contains the input data for the task and also a mapping of the input data to the french word equivalent

## Requirement
1. Node version >= 18
2. Package Manager Yarn, NPM , PNPM (Recommended) 


## Setup
1. Run `pnpm install`
2. Run `pnpm kata compile`
3. Run `pnpm kata start convert <[list of numbers]>`   
e.g `pnpm kata start convert "[0, 1, 5, 10, 11, 15, 20, 21, 30, 35, 50, 51, 68, 70, 75, 99, 100, 101, 105, 111, 123, 168, 171, 175, 199, 200, 201, 555, 999, 1000, 1001, 1111, 1199, 1234, 1999, 2000, 2001, 2020, 2021, 2345, 9999, 10000, 11111, 12345, 123456, 654321, 999999]"`


## usage
### Run as CLI
Run `pnpm kata start convert <[list of numbers]>`   
e.g `pnpm kata start convert "[0, 1, 5, 10, 11, 15, 20, 21, 30, 35, 50, 51, 68, 70, 75, 99, 100, 101, 105, 111, 123, 168, 171, 175, 199, 200, 201, 555, 999, 1000, 1001, 1111, 1199, 1234, 1999, 2000, 2001, 2020, 2021, 2345, 9999, 10000, 11111, 12345, 123456, 654321, 999999]"`


### Run as an NPM Package
```
import {convertList}  from 'kata'

const input = [
    0, 1, 5, 10, 11, 15, 20, 21, 30, 35, 50, 51, 68, 70, 75, 99, 100, 101, 105,
    111, 123, 168, 171, 175, 199, 200, 201, 555, 999, 1000, 1001, 1111, 1199,
    1234, 1999, 2000, 2001, 2020, 2021, 2345, 9999, 10000, 11111, 12345, 123456,
    654321, 999999
];

const convertedList = convertList(input)

console.log(convertedList)
```


# LLM Used in Development of this Project
1. To expose NPM library as a CLI tool: 
Prompt used: `how can I expose my typescript nodejs npm library as a CLI app to take input like [0, 1]`
2. To generate the french equivalent of the test input: 
Prompt used: `Generate an object with structure [key: number]: string, where key is the input specified below, and the value is the french word of the number in key. For example const mapping: { [key: number]: string } = { 0: "zéro", 1: "un"}
Input: [0, 1, ...]`
3. Understand the french numbering rules: 
Prompt used: `Create a list of unabmgious rule that can be followed to convert a digit between 0 to 99999 to its french equivalent consdiering all the edge cases`
4. Get french transalaton of random number:
Prompt Used: `What is the {100} in french`
5. Generate JS DOC documentation
