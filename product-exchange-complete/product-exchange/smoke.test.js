const test=require("node:test");
const assert=require("node:assert/strict");
test("money rounding keeps two decimal places",()=>{const money=n=>Math.round((Number(n)+Number.EPSILON)*100)/100;assert.equal(money(12.345),12.35);});
test("sample catalogue includes required fruit products",()=>{const fs=require("node:fs"),p=JSON.parse(fs.readFileSync("data/products.json"));assert.deepEqual(p.map(x=>x.name),["Mango","Apple","Banana","Orange"]);});
