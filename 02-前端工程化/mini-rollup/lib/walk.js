function walk(ast, { enter, leave }) {
  visit(ast, null, enter, leave);
}
function visit(node, parent, enter, leave) {
  if (!node) return;
  if (enter) {
    enter.call(null, node, parent);
  }
  let childKey = Object.keys(node).filter(
    (key) => typeof node[key] === "object"
  );
  childKey.forEach((key) => {
    let val = node[key];
    visit(val, node, enter, leave);
  });
  if (leave) {
    leave(node, parent);
  }
}

module.exports = walk;
