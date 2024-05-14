const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'sql.json');
const json = fs.readFileSync(filePath, 'utf8');
const tables = JSON.parse(json)

const category = tables.filter(table => table.name === 'categories')
console.log(category[0].data)

