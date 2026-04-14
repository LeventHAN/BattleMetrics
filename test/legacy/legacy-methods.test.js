"use strict";

const assert = require("node:assert/strict");
const { test } = require("node:test");
const BM = require("../../index");
const { createMockClient } = require("../helpers/mock-client");

test("legacy getServerInfoById returns the resource object", async () => {
    const server = { type: "server", id: "42", attributes: { name: "Test" } };
    const { bm, calls } = createMockClient({ data: server });

    const result = await bm.getServerInfoById("42");

    assert.deepEqual(result, server);
    assert.equal(calls[0].url, "/servers/42");
    assert.equal(calls[0].params.include, "player");
});

test("legacy server search methods return attributes arrays with fixed query strings", async () => {
    const response = {
        data: [
            { type: "server", id: "1", attributes: { name: "Alpha" } },
            { type: "server", id: "2", attributes: { name: "Beta" } }
        ]
    };
    const { bm, calls } = createMockClient(response);

    const result = await bm.getServerInfoByNameAndGame("GER", "squad", 25);

    assert.deepEqual(result, [{ name: "Alpha" }, { name: "Beta" }]);
    assert.equal(calls[0].url, "/servers");
    assert.equal(calls[0].params["filter[search]"], "GER");
    assert.equal(calls[0].params["filter[game]"], "squad");
    assert.equal(calls[0].params["page[size]"], 25);
});

test("legacy date helpers do not mutate Date inputs", async () => {
    const { bm, calls } = createMockClient({ data: [] });
    const start = new Date("2026-01-01T00:00:00.000Z");
    const stop = new Date("2026-01-02T00:00:00.000Z");
    const originalStart = start.toISOString();
    const originalStop = stop.toISOString();

    const result = await bm.getPlayTimeHistory("player-1", "server-1", start, stop);

    assert.deepEqual(result, []);
    assert.equal(start.toISOString(), originalStart);
    assert.equal(stop.toISOString(), originalStop);
    assert.equal(calls[0].url, "/players/player-1/time-played-history/server-1");
    assert.equal(calls[0].params.start, originalStart);
    assert.equal(calls[0].params.stop, originalStop);
});

test("legacy identifier helpers build players/match JSON:API documents", async () => {
    const { bm, calls } = createMockClient({ data: [] });

    await bm.getPlayersInfoBy("steamID", ["1", "2"]);

    assert.equal(calls[0].url, "/players/match");
    assert.deepEqual(calls[0].data, {
        data: [
            { type: "identifier", attributes: { type: "steamID", identifier: "1" } },
            { type: "identifier", attributes: { type: "steamID", identifier: "2" } }
        ]
    });
});
test("legacy methods emit a deprecation warning once per method", async () => {
    const calls = [];
    const warnings = [];
    const originalWarn = console.warn;
    const httpClient = {
        request: async (config) => {
            calls.push(config);
            return { status: 200, data: { data: { type: "game", id: "squad" } } };
        }
    };
    const bm = new BM({ token: "test-token", game: "squad", httpClient });

    console.warn = (message) => warnings.push(message);
    try {
        await bm.getGameInfo("squad");
        await bm.getGameInfo("squad");
    } finally {
        console.warn = originalWarn;
    }

    assert.equal(calls.length, 2);
    assert.deepEqual(warnings, ["[BattleMetrics] getGameInfo is deprecated. Use games.info instead."]);
});

