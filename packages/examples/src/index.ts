import {convert, convertList, mapping, numbersToTest}  from 'kata'

const input = [
    0, 1, 5, 10, 11, 15, 20, 21, 30, 35, 50, 51, 68, 70, 75, 99, 100, 101, 105,
    111, 123, 168, 171, 175, 199, 200, 201, 555, 999, 1000, 1001, 1111, 1199,
    1234, 1999, 2000, 2001, 2020, 2021, 2345, 9999, 10000, 11111, 12345, 123456,
    654321, 999999
];

const convertedList = convertList(input)

console.log(convertedList)


function runTest(numbersToTest: number[], mapping: Record<number, string>){

    let fails = 0;
    let passes = 0;
    // Run test cases
    numbersToTest.forEach(number => {
        const expectedOutput = mapping[number];
        const actualOutput = convert(number);
        const result = expectedOutput === actualOutput ? "Pass" : "Fail"
        if (result == "Pass") passes++; else fails++;
        console.log(`${number}|${result}|${actualOutput}|${expectedOutput}`)
    });

    console.log({ passes, fails })

}
runTest(numbersToTest, mapping) 