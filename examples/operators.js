
var toFunction = require('..');

var casting = [
  { name: { first: 'Megumi' }, age: 18, height: 175, weight:55 },
  { name: { first: 'Hitomi' }, age: 22, height: 160, weight:45 },
  { name: { first: 'Rika' }, age: 17, height: 175, weight:55 },
  { name: { first: 'Ayumi' }, age: 21, height: 180, weight: 60 }
];

var models = casting.filter(toFunction('age > 16 && age < 25 && height > 170 && weight < 65'));
console.log(models);

var thinOrTall = casting.filter(toFunction('weight < 55 || height > 175'));
console.log(thinOrTall);