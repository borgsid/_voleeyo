const CheckEventsSimilarity = (firstEventTitle, secondEventTitle) => {

    var isSimilar = false;
    var isOneSubStringOfTwo = false;
    var isTwoSubStringOfOne = false;

    // Normalize special characters to ASCII characters
    const normalizedText1 = firstEventTitle.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normalizedText2 = secondEventTitle.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Remove spaces from the normalized texts
    const text1WithoutSpaces = normalizedText1.replace(/\s/g, '');
    const text2WithoutSpaces = normalizedText2.replace(/\s/g, '');

    // Remove non-alphanumeric characters and convert to lowercase for comparison
    const cleanedText1 = text1WithoutSpaces.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const cleanedText2 = text2WithoutSpaces.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    // Check if the cleaned texts have the same characters
    const areSimilar = (cleanedText1 == cleanedText2);

    // Check if firstEventTitle is a substring of secondEventTitle
    const isText1SubstringOfText2 = text2WithoutSpaces.includes(text1WithoutSpaces);

    // Check if secondEventTitle is a substring of firstEventTitle
    const isText2SubstringOfText1 = text1WithoutSpaces.includes(text2WithoutSpaces);

    if (areSimilar) {
        isSimilar = true;
    }

    if (isText1SubstringOfText2) {
        isOneSubStringOfTwo = true;
    }

    if (isText2SubstringOfText1) {
        isTwoSubStringOfOne = true;
    }
    return (isSimilar ||
        isOneSubStringOfTwo ||
        isTwoSubStringOfOne);
}
export default CheckEventsSimilarity;