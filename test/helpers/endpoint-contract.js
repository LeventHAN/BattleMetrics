"use strict";

const assert = require("node:assert/strict");
const { test } = require("node:test");
const BM = require("../../index");
const { createMockClient } = require("./mock-client");

function bodyFor(endpoint) {
    return {
        data: {
            type: endpoint.namespace,
            attributes: {
                contract: endpoint.key
            }
        }
    };
}

function queryFor(endpoint) {
    return {
        include: "server",
        filter: {
            search: "contract-search"
        },
        page: {
            size: 1
        },
        fields: {
            [endpoint.namespace]: "id"
        }
    };
}

function argsFor(endpoint) {
    const args = endpoint.params.map((name) => `${name}-value`);
    if (endpoint.body) {
        args.push(bodyFor(endpoint));
    }
    args.push(queryFor(endpoint));
    return args;
}

function expectedPath(endpoint) {
    return endpoint.path.replace(/\{([^}]+)\}/g, (match, name) => encodeURIComponent(`${name}-value`));
}

function testEndpoint(key) {
    const endpoint = BM.ENDPOINTS_BY_KEY[key];
    if (!endpoint) {
        throw new Error(`Unknown endpoint test key: ${key}`);
    }

    test(`${key} maps to ${endpoint.httpMethod} ${endpoint.path}`, async () => {
        const response = { data: { type: "ok", id: endpoint.key } };
        const { bm, calls } = createMockClient(response);
        const result = await bm[endpoint.namespace][endpoint.methodName](...argsFor(endpoint));

        assert.deepEqual(result, response);
        assert.equal(calls.length, 1);
        assert.equal(calls[0].method, endpoint.httpMethod);
        assert.equal(calls[0].url, expectedPath(endpoint));
        assert.equal(calls[0].params.include, "server");
        assert.equal(calls[0].params["filter[search]"], "contract-search");
        assert.equal(calls[0].params["page[size]"], 1);
        assert.equal(calls[0].params[`fields[${endpoint.namespace}]`], "id");

        if (endpoint.body) {
            assert.deepEqual(calls[0].data, bodyFor(endpoint));
        } else {
            assert.equal(calls[0].data, undefined);
        }
    });
}

module.exports = {
    testEndpoint
};
