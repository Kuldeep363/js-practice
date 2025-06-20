/*
    Problem Statement -
        Extend the local storage to accept an expiry time and expire the entry
        after that time.
*/

window.myLocalStorage =  {
  setItem(key, value, expiry) {
    localStorage.setItem(
      key,
      JSON.stringify({
        value: value,
        validUpto: Date.now() + expiry,
      })
    );
  },
  getItem(key) {
    const item = JSON.parse(localStorage.getItem(key));
    if (Date.now() > item.validUpto) return null;
    return item.value;
  },
  clear(key) {
    localStorage.clear(key);
  }
}

myLocalStorage.setItem("foo", "bar", 1000);
setTimeout(() => {
  console.log(myLocalStorage.getItem("foo"));
}, 1500);