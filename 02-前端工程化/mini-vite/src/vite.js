const Koa = require("koa");
const fs = require("fs");
const path = require("node:path");
const app = new Koa();
const sfc = require("@vue/compiler-sfc");
const compilerDom = require("@vue/compiler-dom");
app.use(async (ctx) => {
  const { url, query } = ctx.request;
  // 加载 html
  if (url === "/") {
    let content = fs.readFileSync("./index.html", "utf-8");
    // 注入process变量，模拟node环境
    content = content.replace(
      "<script",
      `<script>
    const process = {
      env: {NODE_ENV:'dev'}
    }
  </script>
  <script
    `
    );
    ctx.type = "text/html";
    ctx.body = content;
  }
  // 加载js
  if (url.endsWith(".js")) {
    // console.log(path.dirname());
    const p = path.resolve(__dirname, "../" + url.slice(1));
    const content = fs.readFileSync(p, "utf-8");
    ctx.type = "application/javascript";
    ctx.body = rewritedImport(content);
  }
  // 支持第三方库
  // 改写vue => @/module
  function rewritedImport(code) {
    return code.replace(/ from ['|"]([^'"]+)['|"]/g, (match, p1) => {
      if (p1[0] === "." || p1[0] === "/") {
        return match;
      } else {
        return `from "/@modules/${p1}"`;
      }
    });
  }
  if (url.match(/\/@modules/)) {
    let prefix = url.replace(/\/@modules/, "./node_modules");
    prefix = path.resolve(__dirname, "../" + prefix + "/");
    const pkgPath = prefix + "/package.json";
    const module = require(pkgPath).module;
    const m = fs.readFileSync(prefix + "/" + module, "utf-8");
    ctx.type = "application/javascript";
    ctx.body = rewritedImport(m);
  }
  // 单文件sfc支持
  // *.vue => template模板
  if (url.match(/\.vue/)) {
    const p = path.resolve(__dirname, "../" + url.split("?")[0].slice(1));
    const content = fs.readFileSync(p, "utf-8");
    const { descriptor } = sfc.parse(content);
    // .vue文件script的处理
    if (!query.type) {
      ctx.type = "application/javascript";
      ctx.body = `${rewritedImport(
        descriptor.script.content.replace("export default", "const __script = ")
      )}
      import {render as __render} from "${url}?type=tempale"
      __script.render = __render
      export default __script
      `;
      // .vue的template处理
    } else {
      const template = descriptor.template.content;
      const render = compilerDom.compile(template, { mode: "module" });
      ctx.type = "application/javascript";
      ctx.body = rewritedImport(render.code);
    }
  }
  // css文件支持
  if (url.endsWith(".css")) {
    const p = path.resolve(__dirname, "../", url.slice(1));
    const file = fs.readFileSync(p, "utf-8");
    console.log(file);
    const content = `const css = "${file.replace(/\n/g, "")}"
    const link = document.createElement('style')
    link.setAttribute("type", "text/css")
    document.head.appendChild(link)
    link.innerHTML = css
    export default css
    `;
    ctx.type = "application/javascript";
    ctx.body = content;
  }
});
app.listen(1024, () => {
  console.log("vite start .....");
});
