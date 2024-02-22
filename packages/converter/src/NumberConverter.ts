import { FrenchNumerals } from "./FrenchNumerals";
import { match, P } from 'ts-pattern';

/**
 * Abstract class representing a number converter.
 */
abstract class NumberConverter {
    constructor(public digit: number) { }
    abstract convert(): string;
}

//convert number from 0 to 99
class NumberLessThanHundredConverter extends NumberConverter {

    convert() {
        const digit = this.digit;
        const remainder = digit % 10;
        const tensIndex = Math.floor(digit / 10) - 1;
        const tensPart = FrenchNumerals.multiplesOfTenUpTill90[tensIndex];

        return match({digit, remainder})
            //0 to 9
            .with({digit: P.number.lt(10)}, () => FrenchNumerals.zeroToNine[digit])
            // 10
            .with({digit:10}, () => FrenchNumerals.multiplesOfTenUpTill90[0])
            // 11 to 19
            .with({digit: P.number.between(11, 19)}, () => FrenchNumerals.elevenToNineteen[digit - 11])
            
            /** 20 to 69 */ 
            // 20, 30, 40, 50, 60
            .with({digit: P.number.between(20, 69), remainder: 0}, () => FrenchNumerals.multiplesOfTenUpTill90[tensIndex])
            // 21, 31, 41, 51, 61
            .with({digit: P.number.between(20, 69), remainder: 1}, () => tensPart + "-et-un")
            // other numbers between 20 and 69
            .with({digit: P.number.between(20, 69), remainder: P.not(0).and(P.not(1))}, () => tensPart + "-" + FrenchNumerals.zeroToNine[remainder])

            /** 70 to 99 */
            // 70, 80 and 90
            .with({digit:P.union(70, 80, 90)}, () => FrenchNumerals.multiplesOfTenUpTill90[Math.floor(digit / 10) - 1])
            //71,
            .with({digit: 71}, () => "soixante" + "-et-onze" )
            //72 to 79
            .with({digit: P.number.between(72, 79)}, () => "soixante" + "-" + FrenchNumerals.elevenToNineteen[remainder - 1])
            //81 to 89
            .with({digit: P.number.between(81, 89)}, () => "quatre-vingt-" + FrenchNumerals.zeroToNine[remainder])
            //91 to 99
            .with({digit: P.number.between(91, 99)}, () => "quatre-vingt-" + FrenchNumerals.elevenToNineteen[remainder - 1])
            .otherwise( () => "quatre-vingt-" + FrenchNumerals.elevenToNineteen[remainder - 1])
    }

}

//convert number from 100 to 999
class HundredthNumberConverter extends NumberConverter {
    convert() {
        const hundreds: number = Math.floor(this.digit / 100);
        const remainder: number = this.digit % 100;
        const prefix: string = hundreds > 1 ? PickNumberConverter.pick(hundreds).convert() + "-" : "";

        return match(remainder)
        .with(0,  () => hundreds > 1 ? prefix + "cents" : prefix + "cent" )
        .with(1, () =>  prefix + "cent-un")
        .otherwise(() => prefix + "cent-" + PickNumberConverter.pick(remainder).convert())
    }
}

//convert number from 1000 to 9999
class ThousandthNumberConverter extends NumberConverter {
    convert(): string {
        const thousands: number = Math.floor(this.digit / 1000);
        const remainder: number = this.digit % 1000;
        let prefix: string = "";

        if(thousands == 1 && remainder == 0){
            return "mille"
        }

        if (thousands > 1) {
            prefix = PickNumberConverter.pick(thousands).convert() + "-";
        }

        if (remainder === 0) {
            return prefix + "milles";
        }
        if(remainder == 1){
            return prefix + "mille-"+ "et-un"
        } 
        else {
            return prefix + "mille-" + PickNumberConverter.pick(remainder).convert();
        }
    }

}

export class PickNumberConverter {

    static pick(digit: number): NumberConverter {
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
