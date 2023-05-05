const path = require('path')
const rollup = require('./../lib/rollup')
const entry  = path.resolve(__dirname, './case1.js')
rollup(entry, './bundle.js')
