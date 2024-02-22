import { expect, describe, test, it } from 'vitest'
import { convert } from "../src/kata"
import { numbersToTest, mapping } from '../src/TestData'

describe('Converting Numbers 0 to 100 to french behave as follow', () => {

    numbersToTest.filter((numbers) => (numbers < 100)).forEach((number) => {
        it(`${number} => ${mapping[number]}`, () => {
            expect(convert(number)).toEqual(mapping[number])
        })
    })

})

describe('Converting Numbers 100-999 to french behave as follow', () => {

    numbersToTest.filter((numbers) => (numbers >= 100 &&  numbers < 1000)).forEach((number) => {
        it(`${number} => ${mapping[number]}`, () => {
            expect(convert(number)).toEqual(mapping[number])
        })
    })

})

describe('Converting Numbers from 1000 and above to french behave as follow', () => {

    numbersToTest.filter((numbers) => (numbers > 1000)).forEach((number) => {
        it(`${number} => ${mapping[number]}`, () => {
            expect(convert(number)).toEqual(mapping[number])
        })
    })

})
