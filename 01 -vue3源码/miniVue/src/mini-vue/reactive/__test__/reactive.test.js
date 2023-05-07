import { reactive } from "../";
test('reactive shold work', () => {
    const origin = {name : 'foo'}
    const observed = reactive(origin)
    expect(origin).not.toBe(observed)
    expect(observed.name).toBe(origin.name)
    observed.name = 'foooo'
    expect(origin.name).toBe('foooo')
    observed.bar = 'bar'
    expect(origin.bar).toBe('bar')
    delete observed.name
    expect(origin.name).toBe(undefined)
})