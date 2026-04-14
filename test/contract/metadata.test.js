"use strict";

const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const BM = require("../../index");

const namespaceNames = [
    "bans",
    "banLists",
    "banListExemptions",
    "banListInvites",
    "nativeBans",
    "commandsActivity",
    "coplay",
    "dataPoints",
    "files",
    "games",
    "gameFeatures",
    "players",
    "playerIdentifiers",
    "playerFlags",
    "playerNotes",
    "relatedPlayerQueries",
    "playerQueryResults",
    "reservedSlots",
    "servers",
    "serverGroups",
    "sessions",
    "organizations",
    "organizationFriends",
    "stats",
    "users"
];

function fileNameFor(key) {
    return `${key.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase()}.test.js`;
}

test("all planned namespaces are installed", () => {
    const bm = new BM({ httpClient: { request: async () => ({ data: {} }) } });
    for (const name of namespaceNames) {
        assert.equal(typeof bm[name], "object", `${name} namespace should exist`);
        assert.equal(typeof bm[name].request, "function", `${name}.request should exist`);
    }
});

test("every endpoint has a generated contract test file", () => {
    const endpointDir = path.join(__dirname, "endpoints");
    for (const endpoint of BM.ENDPOINTS) {
        assert.ok(fs.existsSync(path.join(endpointDir, fileNameFor(endpoint.key))), `${endpoint.key} is missing a contract test file`);
    }
});
