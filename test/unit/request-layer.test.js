"use strict";

const assert = require("node:assert/strict");
const http = require("node:http");
const { test } = require("node:test");
const BM = require("../../index");
const { createErrorClient, createMockClient } = require("../helpers/mock-client");

test("buildQuery supports JSON:API filter, page, fields, include, and date values", () => {
    const start = new Date("2026-01-02T03:04:05.000Z");
    assert.deepEqual(BM.buildQuery({
        include: "server",
        filter: { search: "abc", at: start },
        page: { size: 10 },
        fields: { server: "name,ip" },
        "filter:game": "squad"
    }), {
        include: "server",
        "filter[search]": "abc",
        "filter[at]": "2026-01-02T03:04:05.000Z",
        "page[size]": 10,
        "fields[server]": "name,ip",
        "filter[game]": "squad"
    });
});

test("serializeQuery repeats array values and encodes bracket keys", () => {
    assert.equal(
        BM.serializeQuery({ "filter[countries][]": ["DE", "US"], include: "server" }),
        "filter%5Bcountries%5D%5B%5D=DE&filter%5Bcountries%5D%5B%5D=US&include=server"
    );
});

test("request normalizes BattleMetrics JSON:API errors", async () => {
    const { bm } = createErrorClient({
        response: {
            status: 403,
            data: {
                errors: [
                    { status: "403", title: "Forbidden", detail: "Missing scope", code: "forbidden" }
                ]
            }
        }
    });

    await assert.rejects(
        () => bm.get("/bans"),
        (error) => {
            assert.equal(error.name, "BattleMetricsError");
            assert.equal(error.status, 403);
            assert.equal(error.detail, "Missing scope");
            assert.equal(error.code, "forbidden");
            return true;
        }
    );
});

test("raw request returns the response data document", async () => {
    const { bm, calls } = createMockClient({ data: { type: "game", id: "squad" } });
    const result = await bm.get("/games/squad", { include: "server" });

    assert.deepEqual(result, { data: { type: "game", id: "squad" } });
    assert.equal(calls[0].url, "/games/squad");
    assert.equal(calls[0].params.include, "server");
});
test("default client uses native HTTP request without dependencies", async () => {
    const server = http.createServer((request, response) => {
        const chunks = [];
        request.on("data", (chunk) => chunks.push(chunk));
        request.on("end", () => {
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify({
                data: {
                    type: "echo",
                    attributes: {
                        method: request.method,
                        url: request.url,
                        authorization: request.headers.authorization,
                        body: Buffer.concat(chunks).toString("utf8")
                    }
                }
            }));
        });
    });

    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    try {
        const address = server.address();
        const bm = new BM({ token: "native-token", baseURL: `http://127.0.0.1:${address.port}` });
        const result = await bm.post("/native", { hello: "world" }, { page: { size: 1 } });

        assert.equal(result.data.attributes.method, "POST");
        assert.equal(result.data.attributes.url, "/native?page%5Bsize%5D=1");
        assert.equal(result.data.attributes.authorization, "Bearer native-token");
        assert.equal(result.data.attributes.body, JSON.stringify({ hello: "world" }));
    } finally {
        await new Promise((resolve) => server.close(resolve));
    }
});


