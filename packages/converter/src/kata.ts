import { PickNumberConverter } from "./NumberConverter";

class Kata {
    convert(digit: number): string {
        return PickNumberConverter.pick(digit).convert()
    }

    convertList(numberList: number[]): string[] {
        return numberList.map((digit) => PickNumberConverter.pick(digit).convert())
    }
}

export const convert = (digit: number) => PickNumberConverter.pick(digit).convert();
export const convertList = (numberList: number[]) => numberList.map((digit) => PickNumberConverter.pick(digit).convert())

export default new Kata();