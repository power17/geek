// 生成AST语法树
const parser = require('@babel/parser')
// 爬取AST语法树
const traverse = require('@babel/traverse').default
// 将AST还原成代码
const generator = require('@babel/generator').default
const types = require('@babel/types')
const fs = require('fs')
const source = fs.readFileSync('./source.ts').toString()

const ast = parser.parse(source, { plugins: ['typescript', 'jsx'] })
console.log(ast)
traverse(ast, {
	CallExpression(path) {
		const  calleeStr = generator(path.node.callee).code 
		console.log(calleeStr)
		if (['console.log', 'console.error'].includes(calleeStr)) { 
			const { line, column } = path.node.loc.start
			 path.node.arguments.unshift(types.stringLiteral(`${fileName}(${ }
	}
})
