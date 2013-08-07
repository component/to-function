var _ = require('..');

var users = [
  { name: { first: 'Tobi' }, age: 2 },
  { name: { first: 'Loki' }, age: 2 },
  { name: { first: 'Jane' }, age: 6 }
];

var oldPets = users.filter(_('age > 2'));
console.log(oldPets);

console.log();

var youngPets = users.filter(_('age > 1 && age < 6'));
console.log(youngPets);
