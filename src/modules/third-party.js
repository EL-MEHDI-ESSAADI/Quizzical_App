export const API = `https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple`;

export function getData(url, successGetData) {
   fetchData(url)
      .then(successGetData)
      .catch((err) => {
         console.error(err);
         if (err instanceof RangeError) window.alert(err.message);
      });
}

// fetch data
async function fetchData(url) {
   const response = await fetch(url);
   // throw a range error because respinse.og is out of the range 200-299
   if (!response.ok) throw new RangeError(`${response.status} request error`);
   return await response.json();
}
