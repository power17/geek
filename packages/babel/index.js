const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const types = require('@babel/types')
const fs = require('fs')
const source = fs.readFileSync('./source.ts').toString()

const ast = parser.parse(source, { plugins: ['typescript', 'jsx'] })
console.log(ast)