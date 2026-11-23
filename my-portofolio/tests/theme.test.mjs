import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function loadModule(file, globals, dependencies = {}) {
  const source = fs.readFileSync(file, "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, { exports, ...globals, require: name => dependencies[name] ?? {} });
  return exports;
}

const config = loadModule("app/_components/theme-config.ts", {});

test("saved preferences select the theme before hydration", () => {
  for (const [stored, expected] of [["dark", "dark"], ["light", "light"], [null, "light"], ["unknown", "light"]]) {
    const document = { documentElement: { dataset: {} } };
    vm.runInNewContext(config.themeBootstrap, { document, localStorage: { getItem: () => stored } });
    assert.equal(document.documentElement.dataset.theme, expected);
  }
});

test("blocked browser storage still permits the light-mode bootstrap", () => {
  const document = { documentElement: { dataset: {} } };
  vm.runInNewContext(config.themeBootstrap, { document, localStorage: { getItem: () => { throw new Error("blocked"); } } });
  assert.equal(document.documentElement.dataset.theme, "light");
});

test("toggle synchronizes the document, saved preference, and subscribers", () => {
  const document = { documentElement: { dataset: { theme: "light" } } };
  const saved = new Map();
  const events = [];
  const theme = loadModule("app/_components/use-theme.ts", {
    document, Event,
    localStorage: { setItem: (key, value) => saved.set(key, value) },
    window: { dispatchEvent: event => events.push(event.type) },
  }, { "./theme-config": config });
  theme.toggleTheme();
  assert.equal(document.documentElement.dataset.theme, "dark");
  assert.equal(saved.get(config.THEME_STORAGE_KEY), "dark");
  assert.equal(events[0], "portfolio-theme-change");
  theme.toggleTheme();
  assert.equal(document.documentElement.dataset.theme, "light");
  assert.equal(saved.get(config.THEME_STORAGE_KEY), "light");
});

test("a storage write error does not prevent the switch or notification", () => {
  const document = { documentElement: { dataset: { theme: "light" } } };
  let notifications = 0;
  const theme = loadModule("app/_components/use-theme.ts", {
    document, Event,
    localStorage: { setItem: () => { throw new Error("blocked"); } },
    window: { dispatchEvent: () => notifications++ },
  }, { "./theme-config": config });
  theme.toggleTheme();
  assert.equal(document.documentElement.dataset.theme, "dark");
  assert.equal(notifications, 1);
});
