"use strict";

const BM = require("../../index");

function createMockClient(responseData = { data: { type: "contract", id: "1" } }) {
    const calls = [];
    const httpClient = {
        request: async (config) => {
            calls.push(config);
            return { status: 200, data: responseData };
        }
    };

    return {
        bm: new BM({ token: "test-token", serverID: "server-1", game: "squad", httpClient, deprecationWarnings: false }),
        calls
    };
}

function createErrorClient(error) {
    const calls = [];
    const httpClient = {
        request: async (config) => {
            calls.push(config);
            throw error;
        }
    };

    return {
        bm: new BM({ token: "test-token", serverID: "server-1", game: "squad", httpClient, deprecationWarnings: false }),
        calls
    };
}

module.exports = {
    createMockClient,
    createErrorClient
};

