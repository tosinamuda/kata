import { NumberConverterFactory } from "./NumberConverter";

class Kata {
    convert(digit: number): string {
        return NumberConverterFactory.createConverter(digit).convert()
    }

    convertList(numberList: number[]): string[] {
        return numberList.map((digit) => NumberConverterFactory.createConverter(digit).convert())
    }
}

export const convert = (digit: number) => NumberConverterFactory.createConverter(digit).convert();
export const convertList = (numberList: number[]) => numberList.map((digit) => NumberConverterFactory.createConverter(digit).convert())

export default new Kata();