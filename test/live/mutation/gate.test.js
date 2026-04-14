"use strict";

const assert = require("node:assert/strict");
const { test } = require("node:test");

const enabled = process.env.BM_ENABLE_MUTATION_TESTS === "true";
const confirmed = process.env.BM_CONFIRM_MUTATION_TESTS === "I_UNDERSTAND_THIS_MUTATES_BATTLEMETRICS";

test("live mutation tests require an explicit double gate", { skip: !enabled }, async () => {
    assert.equal(confirmed, true, "Set BM_CONFIRM_MUTATION_TESTS=I_UNDERSTAND_THIS_MUTATES_BATTLEMETRICS to run live mutation tests.");
});
