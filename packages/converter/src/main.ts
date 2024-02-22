#!/usr/bin/env node
import { Command } from 'commander';
import { convertList } from '.'; // Assuming NumberConverter.ts contains your conversion functions

// Define CLI logic
export function runCLI() {
    const program = new Command();

    program
        .version('1.0.0')
        .description('Convert numbers to French word representations');

    program
        .command('convert <numbers...>')
        .description('Convert a list of numbers to French words')
        .action((numbers: string[]) => {
            const numberList = parseInput(numbers);
            const frenchWords = convertList(numberList);
            console.log(frenchWords.join(', '));
        });


    program.parse();
}

function parseInput(numbers: string[]): number[] {

    if (numbers.length == 1) {
        const input = numbers[0];
        // Check if input starts with "[" and ends with "]"
        if (input?.startsWith('[') && input?.endsWith(']')) {
            // Remove "[" and "]" and split by comma
            return input.slice(1, -1).split(',').map(Number);
        } else {
            // Split input by space and convert to numbers
            return input.split(' ').map(Number);
        }
    }
    else {
        return numbers.map(Number);

    }


}

// Check if script is executed directly
if (require.main === module) {
    // If executed directly from command line
    runCLI();
}