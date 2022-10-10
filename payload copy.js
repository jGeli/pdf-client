const fs = require('fs');
const path = require('path');

const pera = 300;
const data = require('./test.json');

const arr = new Array(pera).fill(data);

let payloads = [];
console.log('WARAY PA')
console.log(payloads)

arr.map((zb, index) => {
  const count = index + 1;
  const key = `Gradebook_GBKA-PENK-${count}st term-SY2021-2022-20221009-0656`;
  const total = count * 100;

console.log(count);
  const newObj = {
    ...data, 
    key,
    header: {
      ...data.header, term: `${count}st Term`
    }
  };

  payloads.push(newObj);


})


const finalObj = {
  "request_type":"bulk",
  "export_type":"pdf",
  "key":`zipfiles-${new Date().toISOString()}`,
  "payload": payloads
  
}




let finalnatlga = JSON.stringify(finalObj)
const bubutangan = path.join(__dirname, 'src', 'data.json');

fs.writeFile(bubutangan, finalnatlga, (res, err) => {
  console.log(res)
  console.log(err)
})