/**
 * A utility class for converting numerical values to their French word equivalents.
 */
export class FrenchNumerals {
    /**
     * Array containing French word equivalents for the digits 0 to 9.
     * Index corresponds to the English digit version: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].
     * @readonly
     */
    public static readonly zeroToNine = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];

    /**
     * Array containing French word equivalents for the numbers 11 to 19.
     * Index corresponds to the English digit version: [11, 12, 13, 14, 15, 16, 17, 18, 19].
     * @readonly
     */
    public static readonly elevenToNineteen = ["onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];

    /**
     * Array containing French word equivalents for multiples of ten up to 90.
     * Index corresponds to the English digit version: [10, 20, 30, 40, 50, 60, 70, 80, 90].
     * @readonly
     */
    public static readonly multiplesOfTenUpTill90 = ["dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingts", "quatre-vingt-dix"];
}

