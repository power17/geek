const walk = require("./../walk");
describe("测试walk函数", () => {
  it("单节点", () => {
    const ast = {
      a: 1,
    };
    const enter = jest.fn();
    const leave = jest.fn();
    walk(ast, { enter, leave });
    let calls = enter.mock.calls;
    expect(calls.length).toBe(1);
    expect(calls[0][0]).toEqual({ a: 1 });
    expect(calls[0][0]).toEqual({ a: 1 });
  });
  it("多节点", () => {
    const ast = {
      a: { b: 2 },
      c: { d: 3 },
    };
    const enter = jest.fn();
    const leave = jest.fn();
    walk(ast, { enter, leave });
    let calls = enter.mock.calls;
    expect(calls.length).toBe(3);
    expect(calls[0][0]).toEqual({
      a: { b: 2 },
      c: { d: 3 },
    });
    expect(calls[1][0]).toEqual({ b: 2 });
    expect(calls[2][0]).toEqual({ d: 3 });
  });

  it("数组节点", () => {
    const ast = {
      a: [{ b: 1 }],
    };
    const enter = jest.fn();
    const leave = jest.fn();
    walk(ast, { enter, leave });
    let calls = enter.mock.calls;
    expect(calls.length).toBe(3);
    expect(calls[0][0]).toEqual({ a: [{ b: 1 }] });
    expect(calls[1][0]).toEqual([{ b: 1 }]);
    expect(calls[2][0]).toEqual({ b: 1 });

    expect(calls[2][0]).toEqual({ b: 1 });
    expect(calls[1][0]).toEqual([{ b: 1 }]);
    expect(calls[0][0]).toEqual({ a: [{ b: 1 }] });
  });
});
