"use strict";

const fs = require("node:fs");
const path = require("node:path");
const BM = require("../index");

const root = path.resolve(__dirname, "..");
const endpointDir = path.join(root, "test", "contract", "endpoints");
const docsDir = path.join(root, "docs");
fs.mkdirSync(endpointDir, { recursive: true });
fs.mkdirSync(docsDir, { recursive: true });

function fileNameFor(key) {
    return `${key.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase()}.test.js`;
}

for (const endpoint of BM.ENDPOINTS) {
    const file = path.join(endpointDir, fileNameFor(endpoint.key));
    const content = `"use strict";\n\nconst { testEndpoint } = require("../../helpers/endpoint-contract");\n\ntestEndpoint(${JSON.stringify(endpoint.key)});\n`;
    fs.writeFileSync(file, content, "ascii");
}

const lines = [
    "# BattleMetrics API Coverage",
    "",
    "Generated from `BM.ENDPOINTS` in `src/bm.js`. Keep this table aligned with the BattleMetrics developer documentation when endpoints change.",
    "",
    "| Docs section | Method | Path | Wrapper method | Live secret gate | Status | Test file |",
    "| --- | --- | --- | --- | --- | --- | --- |"
];

for (const endpoint of BM.ENDPOINTS) {
    lines.push(`| ${endpoint.docs} | ${endpoint.httpMethod} | \`${endpoint.path}\` | \`${endpoint.namespace}.${endpoint.methodName}\` | ${endpoint.secrets} | Implemented | \`test/contract/endpoints/${fileNameFor(endpoint.key)}\` |`);
}

lines.push("", "## Resource Namespaces Without Dedicated Docs Endpoints", "", "`files` and `users` are exposed with the generic namespace `request(method, path, options)` helper because the current documentation defines those resources but does not list standalone endpoints for them.", "");

fs.writeFileSync(path.join(docsDir, "API-COVERAGE.md"), `${lines.join("\n")}` , "ascii");
