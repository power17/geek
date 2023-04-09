const add = require('../add.js')
describe('测试Add函数', () => {
	test("add(1,2) === 3", ()=> {
		expect(add(1,2)).toBe(3)
	} )
	test("add(2,2) === 4", ()=> {
		expect(add(2,2)).toBe(4)
	} )
})