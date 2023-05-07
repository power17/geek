import { updateChildren } from "../renderer";

test('diff node move', () => {
    const oldVnode = {
        tag: 'div',
        children: [
            {
                tag: 'p',
                children: 'p1',
                key: 1 
            },
            {
                tag: 'p',
                children: 'p2',
                key: 2
            },
            {
                tag: 'p',
                children: 'p3',
                key: 3
            },
        ]
    }
    const newVnode = {
        tag: 'div',
        children: [
            {
                tag: 'p',
                children: 'p3',
                key: 3
            },
            {
                tag: 'p',
                children: 'p1',
                key: 1 
            },
            {
                tag: 'p',
                children: 'p2',
                key: 2
            },
        ]
    }
    expect(updateChildren).toBe(true)
})