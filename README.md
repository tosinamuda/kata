# Kata French to English Package
This is an nodejs npm package that converts digits from 0 to 999999 to the French word equivalent. You can add to a nodejs workspace as a package or run as a cli. 

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
