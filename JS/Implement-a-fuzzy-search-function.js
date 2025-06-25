/*
    Problem Statement -
        Implement a function in JavaScript that performs fuzzy string
        matching, it accepts an array of strings and a query as input and
        returns the list of strings that matches
*/

function search(str,query) {
    const strLow = str.toLowerCase();
    let i = 0,
      lastSearchedIndex = -1,
      currentWord = query[i];
    while (currentWord) {
      if (
        !~(lastSearchedIndex = strLow.indexOf(
          currentWord,
          lastSearchedIndex + 1
        ))
      ) {
        return false;
      }
      currentWord = query[++i];
    }
    return true;
}

function fuzzySearch(strArr, query) {
    const queryLow = query.toLowerCase();
    const result = [];
    for (const str of strArr) {
        if (search(str, query)) {
            result.push(str)
        }
    }
    return result;
}

const strArr = [
  "Doomsayer",
  "Doomguard",
  "Doomhamer",
  "Bane of Doom",
  "Fearsome Doomguard",
  "Dr. Boom",
  "Majordomo",
  "Shadowbomber",
  "Shadowform",
  "Goldshire footman",
];
const query = "dr";

console.log(fuzzySearch(strArr, query));
