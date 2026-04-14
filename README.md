# BattleMetrics

A zero-dependency Node.js client for the [BattleMetrics API](https://www.battlemetrics.com/developers/documentation).

This package provides resource-based methods for the documented BattleMetrics JSON:API endpoints, plus compatibility methods for projects that used the older BattleMetricsAPI-style wrapper.

## Installation

```sh
npm install @leventhan/battlemetrics
```

```js
const BM = require("@leventhan/battlemetrics");
```

## Quick Start

Create a BattleMetrics API token from your BattleMetrics developer settings, then pass the token without the `Bearer` prefix.

```js
const BM = require("@leventhan/battlemetrics");

const battleMetrics = new BM({
  token: process.env.BM_TOKEN,
});

const server = await battleMetrics.servers.info("10281405");

console.log(server.data.attributes.name);
```

## Resource API

Resource methods return the raw BattleMetrics JSON:API response document.

```js
const servers = await battleMetrics.servers.list({
  filter: {
    search: "squad",
    game: "squad",
  },
  page: {
    size: 10,
  },
});
```

Query helpers support BattleMetrics JSON:API options such as `filter`, `page`, `fields`, `include`, and `sort`.

```js
const server = await battleMetrics.servers.info("10281405", {
  include: "player",
  fields: {
    server: "name,ip,port",
  },
});
```

POST and PATCH endpoints accept a JSON:API request body as the first argument after path parameters.

```js
const matches = await battleMetrics.players.matchIdentifiers(
  BM.createIdentifierDocument("steamID", "76561198110941835"),
);
```

Every namespace also includes a low-level `request` method for new or changed BattleMetrics endpoints.

```js
const result = await battleMetrics.servers.request("GET", "/servers", {
  query: {
    filter: { search: "rust" },
    page: { size: 5 },
  },
});
```

## Namespaces

The client currently includes these namespaces:

`bans`, `banLists`, `banListExemptions`, `banListInvites`, `nativeBans`, `commandsActivity`, `coplay`, `dataPoints`, `files`, `games`, `gameFeatures`, `players`, `playerIdentifiers`, `playerFlags`, `playerNotes`, `relatedPlayerQueries`, `playerQueryResults`, `reservedSlots`, `servers`, `serverGroups`, `sessions`, `organizations`, `organizationFriends`, `stats`, and `users`.

For the full endpoint matrix, see [docs/API-COVERAGE.md](docs/API-COVERAGE.md).

## Compatibility Methods

Older method names are still available for migration purposes. They emit a deprecation warning once per method per client instance.

```js
const server = await battleMetrics.getServerInfoById("10281405");
```

Prefer the resource API for new code:

```js
const server = await battleMetrics.servers.info("10281405");
```

Available compatibility methods:

- `getServerInfoById(serverId)`
- `getGameInfo(game)`
- `getServerInfoByName(name, pageLength)`
- `getServerInfoByNameAndGame(serverName, game, pageLength)`
- `getAllServersByServerNameCountryAndGame(serverName, country, game, pageLength)`
- `getPlayTimeHistory(playerId, serverId, startTime, stopTime)`
- `getServerPlayerInfo(playerId, serverId)`
- `getPlayerInfo(playerId)`
- `getBanInfoByID(banId)`
- `getBans(query)`
- `getLeaderBoard(listSize, startTime, stopTime)`
- `getGameFeatures(game)`
- `getGameFeatureOptionsList(gameFeatureId)`
- `getPlayerInfoBy(typeIdentifier, identifier)`
- `getPlayersInfoBy(typeIdentifier, identifiers)`

To silence compatibility warnings:

```js
const battleMetrics = new BM({
  token: process.env.BM_TOKEN,
  deprecationWarnings: false,
});
```

## Debugging

Enable debug mode to log each response payload with method, URL, query params, status, and failure state. Request headers are not logged, so your API token is not printed.

```js
const battleMetrics = new BM({
  token: process.env.BM_TOKEN,
  debug: true,
});
```

You can also enable debug logging with `BM_DEBUG=true`.

Use `debugLogger` to route logs into your own logger.

```js
const battleMetrics = new BM({
  token: process.env.BM_TOKEN,
  debug: true,
  debugLogger: (label, payload) => logger.debug(label, payload),
});
```

## Constructor Options

```js
const battleMetrics = new BM({
  token: process.env.BM_TOKEN,
  serverID: "10281405",
  game: "squad",
  timeout: 10000,
  debug: false,
  deprecationWarnings: true,
});
```

- `token`: BattleMetrics API token, without `Bearer`.
- `serverID`: Optional default server ID used by compatibility helpers.
- `game`: Optional default game ID used by compatibility helpers.
- `timeout`: Optional request timeout in milliseconds.
- `debug`: Enables response logging.
- `debugLogger`: Custom debug logging function.
- `deprecationWarnings`: Set to `false` to silence compatibility warnings.
- `baseURL`: Override the API base URL for testing.
- `httpClient`: Inject a request-compatible client for tests.

## Errors

Failed API responses are normalized into `BM.BattleMetricsError`.

```js
try {
  await battleMetrics.bans.list();
} catch (error) {
  if (error.isBattleMetricsError) {
    console.error(error.status, error.detail);
  }
}
```

The original BattleMetrics JSON:API `errors` array is available as `error.errors`.

## Tests

```sh
npm test
```

Additional scripts:

```sh
npm run test:unit
npm run test:contract
npm run test:live:read
npm run test:live:mutation
```

Local live test scripts automatically read `.env` with Node's built-in `--env-file-if-exists` flag. Normal `npm test` does not require `.env`.

Live mutation tests are intentionally gated because they can create, update, or delete BattleMetrics resources.

```sh
BM_ENABLE_MUTATION_TESTS=true
BM_CONFIRM_MUTATION_TESTS=I_UNDERSTAND_THIS_MUTATES_BATTLEMETRICS
```

Required live test variables:

- `BM_TOKEN`
- `BM_TEST_GAME`
- `BM_TEST_SERVER_ID`
- `BM_TEST_PLAYER_ID`
- `BM_TEST_IDENTIFIER_TYPE`
- `BM_TEST_IDENTIFIER`

Optional admin and mutation fixture variables are listed in [.env.example](.env.example) and [docs/API-COVERAGE.md](docs/API-COVERAGE.md).
