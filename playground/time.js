const moment = require('moment');

// let date = new Date();

// console.log(date.getMonth());

let createdAt = 1536178633;
let date = moment(createdAt);
// date.add(100,'year').subtract(9,'months')
console.log(date.format('MMM Do, YYYY'));

console.log(date.format('h:mm:ss a'))