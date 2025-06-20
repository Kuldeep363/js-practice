/*
    Problem Statement -
        Create your custom cookie that is available on the document object
        with the only max-age option.

    Example:
        document.myCookie = "blog=learnersbucket" ;
        document.myCookie = "name=prashant;max-age=1" ; // this will expire after 1 second
        console.log( document .myCookie); // "blog=learnersbucket; name=prashant"
        setTimeout( () => {
            console.log( document .myCookie);
        }, 1500 );
        // "blog=learnersbucket"
        // "name=prashant" is expired after 1 second
*/

function defineMyCookie() {
  const data = new Map();
  Object.defineProperty(document, "myCookie", {
    configurable: true,
    set(val) {
      const [actualValue, ...properties] = val.split(";");
      const [key, value] = actualValue.split("=");
      const options = {};
      for (const prop of properties) {
        const [key, value] = prop.split("=");
        options[key] = value;
      }
      if (options["max-age"]) {
        data.set(key, {
          value,
          expiry: Date.now() + Number(options["max-age"]) * 1000,
        });
      } else {
        data.set(key, { value });
      }
    },
    get() {
      const cookie = [];
      for (const [key, { value, expiry }] of data) {
        if (expiry && expiry < Date.now()) {
          data.delete(key);
          continue;
        }
        cookie.push(`${key}=${value}`);
      }
      return cookie.join(";");
    },
  });
}

defineMyCookie();
document.myCookie = "blog=learnersbucket";
// this will expire after 1 second
document.myCookie = "name=prashant;max-age=1";
console.log(document.myCookie);
setTimeout(() => {
  console.log(document.myCookie);
}, 1500);
