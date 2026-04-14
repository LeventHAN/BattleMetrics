"use strict";

const assert = require("node:assert/strict");
const { test } = require("node:test");
const BM = require("../../index");

test("debug mode logs successful response payloads", async () => {
    const logs = [];
    const httpClient = {
        request: async () => ({
            status: 200,
            data: { data: { type: "game", id: "squad" } }
        })
    };
    const bm = new BM({
        httpClient,
        debug: true,
        debugLogger: (...args) => logs.push(args)
    });

    await bm.get("/games/squad", { include: "server" });

    assert.equal(logs.length, 1);
    assert.equal(logs[0][0], "[BattleMetrics debug]");
    assert.deepEqual(logs[0][1], {
        method: "GET",
        url: "/games/squad",
        params: { include: "server" },
        status: 200,
        failed: false,
        data: { data: { type: "game", id: "squad" } }
    });
});

test("debug mode logs failed response payloads before normalizing errors", async () => {
    const logs = [];
    const httpClient = {
        request: async () => {
            const error = new Error("Forbidden");
            error.response = {
                status: 403,
                data: {
                    errors: [
                        { status: "403", detail: "Missing scope" }
                    ]
                }
            };
            throw error;
        }
    };
    const bm = new BM({
        httpClient,
        debug: true,
        debugLogger: (...args) => logs.push(args)
    });

    await assert.rejects(() => bm.get("/bans"), BM.BattleMetricsError);

    assert.equal(logs.length, 1);
    assert.equal(logs[0][0], "[BattleMetrics debug]");
    assert.equal(logs[0][1].method, "GET");
    assert.equal(logs[0][1].url, "/bans");
    assert.equal(logs[0][1].status, 403);
    assert.equal(logs[0][1].failed, true);
    assert.deepEqual(logs[0][1].data.errors, [{ status: "403", detail: "Missing scope" }]);
});
