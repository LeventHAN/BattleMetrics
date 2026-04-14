"use strict";

const assert = require("node:assert/strict");
const { test } = require("node:test");
const BM = require("../../../index");

function hasSecrets(...names) {
    return names.every((name) => Boolean(process.env[name]));
}

function client() {
    return new BM({ token: process.env.BM_TOKEN, serverID: process.env.BM_TEST_SERVER_ID, game: process.env.BM_TEST_GAME || "squad" });
}

function assertJsonApiDocument(document) {
    assert.ok(document && typeof document === "object");
    assert.ok(Object.prototype.hasOwnProperty.call(document, "data"));
}

test("games.info returns a JSON:API document", { skip: !hasSecrets("BM_TOKEN") }, async () => {
    const result = await client().games.info(process.env.BM_TEST_GAME || "squad");
    assertJsonApiDocument(result);
});

test("servers.info returns a JSON:API document", { skip: !hasSecrets("BM_TOKEN", "BM_TEST_SERVER_ID") }, async () => {
    const result = await client().servers.info(process.env.BM_TEST_SERVER_ID);
    assertJsonApiDocument(result);
});

test("players.info returns a JSON:API document", { skip: !hasSecrets("BM_TOKEN", "BM_TEST_PLAYER_ID") }, async () => {
    const result = await client().players.info(process.env.BM_TEST_PLAYER_ID);
    assertJsonApiDocument(result);
});

test("players.matchIdentifiers returns a JSON:API document", { skip: !hasSecrets("BM_TOKEN", "BM_TEST_IDENTIFIER_TYPE", "BM_TEST_IDENTIFIER") }, async () => {
    const result = await client().players.matchIdentifiers(BM.createIdentifierDocument(
        process.env.BM_TEST_IDENTIFIER_TYPE,
        process.env.BM_TEST_IDENTIFIER
    ));
    assertJsonApiDocument(result);
});
