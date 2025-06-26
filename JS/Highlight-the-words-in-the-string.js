/*
    Problem Statement -
        Given a string and array of keywords, highlight the words in the string
        that are part of the array of keywords.
    
    const str = "Ultimate JavaScript / FrontEnd Guide" ;
    const words = [ 'Front','End','JavaScript' ];
    highlight(str, words);
    // "Ultimate <strong>JavaScript</strong> / <strong>FrontEnd</strong> Guide"
*/

function highlight(str, words) {
  const strArr = str.split(" ");
  const wordsSet = new Set(words);
  const highlightedStrArr = strArr.map((word) => {
    let output = "";
    if (wordsSet.has(word)) output = `<strong>${word}</strong>`;
    else {
      for (let i = 0; i < word.length; i++) {
        const prefixWord = word.slice(0, i + 1);
        const suffixWord = word.slice(i + 1);
        if (wordsSet.has(prefixWord) && wordsSet.has(suffixWord)) {
          output = `<strong>${word}</strong>`;
          break;
        } else if (wordsSet.has(prefixWord))
          output = `<strong>${prefixWord}</strong>${suffixWord}`;
        else if (wordsSet.has(suffixWord))
          output = `${prefixWord}<strong>${suffixWord}</strong>`;
      }
    }
    return output !== "" ? output : word;
  });
  return highlightedStrArr.join(" ");
}

const str = "Ultimate JavaScript / FrontEnd Guide";
const words = ["Front", "End", "JavaScript"];
console.log(highlight(str, words));
