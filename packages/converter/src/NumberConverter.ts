import { FrenchNumerals } from "./FrenchNumerals";
import { match, P } from 'ts-pattern';

/**
 * Abstract class representing a number converter.
 */
abstract class NumberConverter {
    constructor(public digit: number) { }
    abstract convert(): string;
}

/**
 * Class representing a number converter for numbers 0 to 99
 * @extends {NumberConverter}
 */
class NumberLessThanHundredConverter extends NumberConverter {

    /**
     * Convert a number to its French textual representation.
     * @returns {string} The French textual representation of the number.
     */
    convert() {
        const digit = this.digit;
        const remainder = digit % 10;
        const tensIndex = Math.floor(digit / 10) - 1;
        const tensPart = FrenchNumerals.multiplesOfTenUpTill90[tensIndex];

        return match({ digit, remainder })
            //0 to 9
            .with({ digit: P.number.lt(10) }, () => FrenchNumerals.zeroToNine[digit])

            //Multiples of Ten: 10, 20, 30, 40, 50, 60, 70, 80, 90
            .with({ remainder: 0 }, () => tensPart)

            // 11 to 19
            .with({ digit: P.number.between(11, 19) }, () => FrenchNumerals.elevenToNineteen[digit - 11])

            // 21, 31, 41, 51, 61 = (X/10) + "et-un"
            .with({ digit: P.number.between(20, 69), remainder: 1 }, () => tensPart + "-et-un")

            // other numbers between 22 and 69 = (X/10) + [0 - 9]
            .with({ digit: P.number.between(20, 69), remainder: P.not(0).and(P.not(1)) }, () => tensPart + "-" + FrenchNumerals.zeroToNine[remainder])

            //71 = 60 + 11 = "soixante-et-onze" i.e i.e 60 + [11-19]
            .with({ digit: 71 }, () => "soixante" + "-et-onze")

            //72 to 79 e.g 74 = 60 + 14 = "soixante-quatorze" i.e 60  + [11-19]
            .with({ digit: P.number.between(72, 79) }, () => "soixante" + "-" + FrenchNumerals.elevenToNineteen[remainder - 1])

            //81 to 89 e.g 81 = (4 * 20) + 1 = "quatre-vingt-un"  i.e (4*20) + [0-9]
            .with({ digit: P.number.between(81, 89) }, () => "quatre-vingt-" + FrenchNumerals.zeroToNine[remainder])

            //91 to 99 = e.g 91 = (4 * 20) + 11 = "quatre-vingt-onze" i.e (4*20) + [11-19]
            .with({ digit: P.number.between(91, 99) }, () => "quatre-vingt-" + FrenchNumerals.elevenToNineteen[remainder - 1])
            .otherwise(() => "quatre-vingt-" + FrenchNumerals.elevenToNineteen[remainder - 1])
    }

}

/**
 * Class representing a number converter for numbers 100 to 999
 * @extends {NumberConverter}
 */
class HundredthNumberConverter extends NumberConverter {

    /**
     * Convert a number to its French textual representation.
     * @returns {string} The French textual representation of the number.
     */
    convert() {
        const hundreds: number = Math.floor(this.digit / 100);
        const remainder: number = this.digit % 100;
        const prefix: string = this.getPrefix();

        return match(remainder)
            //Hundreds like 100, 200, 300, ... 900
            .with(0, () => hundreds > 1 ? prefix + "cents" : prefix + "cent")
            //101, 201, 301, ... 901
            .with(1, () => prefix + "cent-un")
            //others like 102, 109...999 = conversion(number/100) + cent- + conversion(remainder)
            .otherwise(() => prefix + "cent-" + NumberConverterFactory.createConverter(remainder).convert())
    }

    /**
    * Gets the prefix for numbers in the hundredth place.
    * If the number is 100 or above, the prefix is the conversion of number divided by 100.
    * For example, 200 = 200/100 = 2, and the conversion of 2 will be the prefix.
    * @param {number} hundreds - The value of the hundreds place.
    * @returns {string} The prefix for numbers in the hundredth place.
    */
    private getPrefix(): string {
        const hundredsPlace = Math.floor(this.digit / 100);
        //number from 200 to 999 where number/100 > 1
        if (hundredsPlace > 1) {
            // Create a converter for the hundreds place and get its textual representation
            const hundredsPrefix = NumberConverterFactory.createConverter(hundredsPlace).convert();
            // Append "-" to the prefix
            return hundredsPrefix + "-";
        } else {
            // If the number is 99 or below, return an empty string as there's no prefix
            return "";
        }
    }
}

/**
   * Convert a number to its French textual representation.
   * @returns {string} The French textual representation of the number.
*/
class ThousandthNumberConverter extends NumberConverter {

    /**
     * Convert a number to its French textual representation.
     * @returns {string} The French textual representation of the number.
     */
    convert(): string {
        const thousands: number = Math.floor(this.digit / 1000);
        const remainder: number = this.digit % 1000;

        let prefix: string = this.getPrefix();

        return match({ thousands, remainder })
            // 1000
            .with({ thousands: 1, remainder: 0 }, () => "mille")
            // other thousands, like 2000, 3000. 4000, etc
            .with({
                thousands: P.number, remainder: 0
            }, () => prefix + "milles")
            // Other thousands ending in 1 like 1001, 2001 
            .with({ thousands: P.number, remainder: 1 }, () => prefix + "mille-" + "et-un")
            // Other number is broken => into conversion([digit/1000]) + "mille" + conversion(remainder)
            .otherwise(() => prefix + "mille-" + NumberConverterFactory.createConverter(remainder).convert())

    }


    /**
     * Gets the prefix for numbers greater than 1999.
     * If the number is 2000 or above, the prefix is the conversion of number divided by 1000.
     * For example, 2000 = 2000/1000 = 2, and the conversion of 2 will be the prefix.
     * @returns {string} The prefix for numbers greater than 1999.
     */
    private getPrefix(): string {
        const thousandsPlace: number = Math.floor(this.digit / 1000);
        // If the number is greater than 1999, calculate the prefix
        if (thousandsPlace > 1) {
            // Create a converter for the thousands place and get its textual representation
            const thousandsPrefix = NumberConverterFactory.createConverter(thousandsPlace).convert();
            // Append "-" to the prefix
            return thousandsPrefix + "-";
        } else {
            // If the number is 1000 to 1999, return an empty string as there's no prefix
            return "";
        }
    }



}

/**
 * Factory class for creating appropriate number converter instances. 
 * based on the input digit.
 */
export class NumberConverterFactory {

    /**
     * Picks the appropriate number converter based on the input digit.
     * @param {number} digit - The digit to be converted.
     * @returns {NumberConverter} The appropriate number converter.
     * @throws {Error} Throws an error if the digit is invalid for conversion (not within the range of 0 to 999999).
     */
    static createConverter(digit: number): NumberConverter {
        if (digit < 0 || digit > 999999) throw new Error("Invalid Number for Conversion")
        if (digit < 100) {
            return new NumberLessThanHundredConverter(digit)
        }
        else if (digit < 1000) {
            return new HundredthNumberConverter(digit)
        }
        else {
            return {
                digit,
                convert: () => new ThousandthNumberConverter(digit).convert()
            };
        }

    }
}
