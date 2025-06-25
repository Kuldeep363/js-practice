/*
    Problem Statement -
        Implement an in-memory search engine where multiple documents
        could be stored under a particular namespace and search on them and
        sort the search results by passing the orderBy parameter.

    const searchEngine = new InMemorySearch();
    searchEngine.addDocuments( 'Movies',
    {name: 'Avenger', rating: 8.5 , year: 2017 },
    {name: 'Black Adam', rating: 8.7 , year: 2022 },
    {name: 'Jhon Wick 4', rating: 8.2 , year: 2023 },
    {name: 'Black Panther', rating: 9.0 , year: 2022 }
    );
    console .log(searchEngine.search( 'Movies',(e) => e.rating > 8.5 , {key:'rating', asc: false }));
*/

class InMemorySearch {
  constructor() {
    this.db = new Map();
  }
  addDocuments(namespace, ...data) {
    const nameData = this.db.get(namespace);
    if (!nameData) {
      this.db.set(namespace, [...data]);
      return;
    }
    this.db.set(namespace, [...nameData, ...data]);
  }
  search(namespace, filterFunc, orderBy) {
    const nameData = this.db.get(namespace);
    if (!nameData) return [];
    const filteredData = nameData.filter((data) => filterFunc(data));
    return filteredData.sort((a, b) => {
      if (orderBy.asc) {
        return a[orderBy.key] - b[orderBy.key];
      }
      return b[orderBy.key] - a[orderBy.key];
    });
  }
}

const searchEngine = new InMemorySearch();
searchEngine.addDocuments(
  "Movies",
  { name: "Avenger", rating: 8.5, year: 2017 },
  { name: "Black Adam", rating: 8.7, year: 2022 },
  { name: "Jhon Wick 4", rating: 8.2, year: 2023 },
  { name: "Black Panther", rating: 9.0, year: 2022 }
);
console.log(
  searchEngine.search("Movies", (e) => e.rating > 8.5, {
    key: "rating",
    asc: false,
  })
);