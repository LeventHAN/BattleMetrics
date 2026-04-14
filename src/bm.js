"use strict";

const http = require("node:http");
const https = require("node:https");

const DEFAULT_BASE_URL = "https://api.battlemetrics.com";

const ENDPOINTS = [
    e("bans.create", "bans", "create", "POST", "/bans", [], { body: true, docs: "Ban Create", mutation: true, secrets: "BM_TOKEN, BM_TEST_ORG_ID or BM_TEST_SERVER_ID" }),
    e("bans.import", "bans", "import", "POST", "/bans/import", [], { body: true, docs: "Ban Import", mutation: true, secrets: "BM_TOKEN, BM_TEST_BAN_LIST_ID" }),
    e("bans.export", "bans", "export", "GET", "/bans/export", [], { docs: "Ban Export", secrets: "BM_TOKEN, BM_TEST_BAN_LIST_ID" }),
    e("bans.delete", "bans", "delete", "DELETE", "/bans/{banId}", ["banId"], { docs: "Ban Delete", mutation: true, secrets: "BM_TOKEN, BM_TEST_MUTATION_BAN_ID" }),
    e("bans.info", "bans", "info", "GET", "/bans/{banId}", ["banId"], { docs: "Ban Info", secrets: "BM_TOKEN, BM_TEST_BAN_ID" }),
    e("bans.list", "bans", "list", "GET", "/bans", [], { docs: "Ban List", secrets: "BM_TOKEN" }),
    e("bans.update", "bans", "update", "PATCH", "/bans/{banId}", ["banId"], { body: true, docs: "Ban Update", mutation: true, secrets: "BM_TOKEN, BM_TEST_MUTATION_BAN_ID" }),

    e("banListExemptions.create", "banListExemptions", "create", "POST", "/bans/{banId}/relationships/exemptions", ["banId"], { body: true, docs: "Ban List Exemption Create", mutation: true, secrets: "BM_TOKEN, BM_TEST_MUTATION_BAN_ID" }),
    e("banListExemptions.read", "banListExemptions", "read", "GET", "/bans/{banId}/relationships/exemptions/{banExemptionId}", ["banId", "banExemptionId"], { docs: "Ban List Exemption Read", secrets: "BM_TOKEN, BM_TEST_BAN_ID, BM_TEST_BAN_EXEMPTION_ID" }),
    e("banListExemptions.list", "banListExemptions", "list", "GET", "/bans/{banId}/relationships/exemptions", ["banId"], { docs: "Ban List Exemption List Exemptions", secrets: "BM_TOKEN, BM_TEST_BAN_ID" }),
    e("banListExemptions.update", "banListExemptions", "update", "PATCH", "/bans/{banId}/relationships/exemptions", ["banId"], { body: true, docs: "Ban List Exemption Update", mutation: true, secrets: "BM_TOKEN, BM_TEST_MUTATION_BAN_ID" }),
    e("banListExemptions.delete", "banListExemptions", "delete", "DELETE", "/bans/{banId}/relationships/exemptions", ["banId"], { body: true, docs: "Ban List Exemption Delete", mutation: true, secrets: "BM_TOKEN, BM_TEST_MUTATION_BAN_ID" }),

    e("banLists.create", "banLists", "create", "POST", "/ban-lists", [], { body: true, docs: "Ban List Create", mutation: true, secrets: "BM_TOKEN, BM_TEST_ORG_ID" }),
    e("banLists.acceptInvite", "banLists", "acceptInvite", "POST", "/ban-lists/accept-invite", [], { body: true, docs: "Ban List Accept Invite", mutation: true, secrets: "BM_TOKEN, BM_TEST_BAN_LIST_INVITE_ID" }),
    e("banLists.list", "banLists", "list", "GET", "/ban-lists", [], { docs: "Ban List List", secrets: "BM_TOKEN" }),
    e("banLists.listOrganizations", "banLists", "listOrganizations", "GET", "/ban-lists/{banListId}/relationships/organizations", ["banListId"], { docs: "Ban List Organization List", secrets: "BM_TOKEN, BM_TEST_BAN_LIST_ID" }),
    e("banLists.readOrganizationSubscription", "banLists", "readOrganizationSubscription", "GET", "/ban-lists/{banListId}/relationships/organizations/{organizationId}", ["banListId", "organizationId"], { docs: "Ban List Read Organization's Subscription", secrets: "BM_TOKEN, BM_TEST_BAN_LIST_ID, BM_TEST_ORG_ID" }),
    e("banLists.read", "banLists", "read", "GET", "/ban-lists/{banListId}", ["banListId"], { docs: "Ban List Read", secrets: "BM_TOKEN, BM_TEST_BAN_LIST_ID" }),
    e("banLists.updateSubscription", "banLists", "updateSubscription", "PATCH", "/ban-lists/{banListId}/relationships/organizations/{organizationId}", ["banListId", "organizationId"], { body: true, docs: "Ban List Update", mutation: true, secrets: "BM_TOKEN, BM_TEST_BAN_LIST_ID, BM_TEST_ORG_ID" }),
    e("banLists.unsubscribe", "banLists", "unsubscribe", "DELETE", "/ban-lists/{banListId}/relationships/organizations/{organizationId}", ["banListId", "organizationId"], { docs: "Ban List Unsubscribe", mutation: true, secrets: "BM_TOKEN, BM_TEST_BAN_LIST_ID, BM_TEST_ORG_ID" }),

    e("banListInvites.create", "banListInvites", "create", "POST", "/ban-lists/{banListId}/relationships/invites", ["banListId"], { body: true, docs: "Ban List Invite Create", mutation: true, secrets: "BM_TOKEN, BM_TEST_BAN_LIST_ID" }),
    e("banListInvites.read", "banListInvites", "read", "GET", "/ban-list-invites/{banListInviteId}", ["banListInviteId"], { docs: "Ban List Invite Read", secrets: "BM_TOKEN, BM_TEST_BAN_LIST_INVITE_ID" }),
    e("banListInvites.list", "banListInvites", "list", "GET", "/ban-lists/{banListId}/relationships/invites", ["banListId"], { docs: "Ban List Invite List", secrets: "BM_TOKEN, BM_TEST_BAN_LIST_ID" }),
    e("banListInvites.delete", "banListInvites", "delete", "DELETE", "/ban-lists/{banListId}/relationships/invites/{banListInviteId}", ["banListId", "banListInviteId"], { docs: "Ban List Invite Delete", mutation: true, secrets: "BM_TOKEN, BM_TEST_BAN_LIST_ID, BM_TEST_BAN_LIST_INVITE_ID" }),

    e("nativeBans.list", "nativeBans", "list", "GET", "/bans-native", [], { docs: "Native Ban List", secrets: "BM_TOKEN" }),
    e("nativeBans.forceUpdate", "nativeBans", "forceUpdate", "POST", "/bans-native/{nativeBanId}/force-update", ["nativeBanId"], { body: true, docs: "Native Ban Force Update", mutation: true, secrets: "BM_TOKEN, BM_TEST_NATIVE_BAN_ID" }),
    e("commandsActivity.list", "commandsActivity", "list", "GET", "/organizations/{organizationId}/relationships/command-stats", ["organizationId"], { docs: "Commands Activity List", secrets: "BM_TOKEN, BM_TEST_ORG_ID" }),
    e("coplay.list", "coplay", "list", "GET", "/players/{playerId}/relationships/coplay", ["playerId"], { docs: "Coplay List", secrets: "BM_TOKEN, BM_TEST_PLAYER_ID" }),
    e("dataPoints.list", "dataPoints", "list", "GET", "/metrics", [], { docs: "Data Point List", secrets: "BM_TOKEN" }),

    e("playerFlags.assignToPlayer", "playerFlags", "assignToPlayer", "POST", "/players/{playerId}/relationships/flags", ["playerId"], { body: true, docs: "Flag Player Create", mutation: true, secrets: "BM_TOKEN, BM_TEST_PLAYER_ID, BM_TEST_PLAYER_FLAG_ID" }),
    e("playerFlags.listForPlayer", "playerFlags", "listForPlayer", "GET", "/players/{playerId}/relationships/flags", ["playerId"], { docs: "Flag Player Flags", secrets: "BM_TOKEN, BM_TEST_PLAYER_ID" }),
    e("playerFlags.removeFromPlayer", "playerFlags", "removeFromPlayer", "DELETE", "/players/{playerId}/relationships/flags/{playerFlagId}", ["playerId", "playerFlagId"], { docs: "Flag Player Delete", mutation: true, secrets: "BM_TOKEN, BM_TEST_PLAYER_ID, BM_TEST_PLAYER_FLAG_ID" }),
    e("playerFlags.create", "playerFlags", "create", "POST", "/player-flags", [], { body: true, docs: "Player Flag Create", mutation: true, secrets: "BM_TOKEN, BM_TEST_ORG_ID" }),
    e("playerFlags.list", "playerFlags", "list", "GET", "/player-flags", [], { docs: "Player Flag List", secrets: "BM_TOKEN" }),
    e("playerFlags.info", "playerFlags", "info", "GET", "/player-flags/{playerFlagId}", ["playerFlagId"], { docs: "Player Flag Info", secrets: "BM_TOKEN, BM_TEST_PLAYER_FLAG_ID" }),
    e("playerFlags.update", "playerFlags", "update", "PATCH", "/player-flags/{playerFlagId}", ["playerFlagId"], { body: true, docs: "Player Flag Update", mutation: true, secrets: "BM_TOKEN, BM_TEST_PLAYER_FLAG_ID" }),
    e("playerFlags.delete", "playerFlags", "delete", "DELETE", "/player-flags/{playerFlagId}", ["playerFlagId"], { docs: "Player Flag Delete", mutation: true, secrets: "BM_TOKEN, BM_TEST_PLAYER_FLAG_ID" }),

    e("games.list", "games", "list", "GET", "/games", [], { docs: "Game List", secrets: "none" }),
    e("games.info", "games", "info", "GET", "/games/{gameId}", ["gameId"], { docs: "Game Info", secrets: "none" }),
    e("gameFeatures.list", "gameFeatures", "list", "GET", "/game-features", [], { docs: "Game Features List", secrets: "none" }),
    e("gameFeatures.options", "gameFeatures", "options", "GET", "/game-features/{gameFeatureId}/relationships/options", ["gameFeatureId"], { docs: "Game Feature Options List", secrets: "none" }),

    e("servers.leaderboard", "servers", "leaderboard", "GET", "/servers/{serverId}/relationships/leaderboards/time", ["serverId"], { docs: "Leaderboard List", secrets: "BM_TOKEN, BM_TEST_SERVER_ID" }),
    e("organizations.playerStats", "organizations", "playerStats", "GET", "/organizations/{organizationId}/stats/players", ["organizationId"], { docs: "Organization Player Stats", secrets: "BM_TOKEN, BM_TEST_ORG_ID" }),
    e("organizationFriends.list", "organizationFriends", "list", "GET", "/organizations/{organizationId}/relationships/friends", ["organizationId"], { docs: "Organization Friend List", secrets: "BM_TOKEN, BM_TEST_ORG_ID" }),
    e("organizationFriends.get", "organizationFriends", "get", "GET", "/organizations/{organizationId}/relationships/friends/{friendOrganizationId}", ["organizationId", "friendOrganizationId"], { docs: "Organization Friend Organization Friend", secrets: "BM_TOKEN, BM_TEST_ORG_ID, BM_TEST_FRIEND_ORG_ID" }),
    e("organizationFriends.create", "organizationFriends", "create", "POST", "/organizations/{organizationId}/relationships/friends", ["organizationId"], { body: true, docs: "Organization Friend Create", mutation: true, secrets: "BM_TOKEN, BM_TEST_ORG_ID, BM_TEST_FRIEND_ORG_ID" }),
    e("organizationFriends.updateSettings", "organizationFriends", "updateSettings", "PATCH", "/organizations/{organizationId}/relationships/friends/{friendOrganizationId}", ["organizationId", "friendOrganizationId"], { body: true, docs: "Organization Friend Update Settings", mutation: true, secrets: "BM_TOKEN, BM_TEST_ORG_ID, BM_TEST_FRIEND_ORG_ID" }),
    e("organizationFriends.bulkUpdateSettings", "organizationFriends", "bulkUpdateSettings", "PATCH", "/organizations/{organizationId}/relationships/friends", ["organizationId"], { body: true, docs: "Organization Friend Bulk update Settings", mutation: true, secrets: "BM_TOKEN, BM_TEST_ORG_ID" }),
    e("organizationFriends.delete", "organizationFriends", "delete", "DELETE", "/organizations/{organizationId}/relationships/friends/{friendOrganizationId}", ["organizationId", "friendOrganizationId"], { docs: "Organization Friend Delete", mutation: true, secrets: "BM_TOKEN, BM_TEST_ORG_ID, BM_TEST_FRIEND_ORG_ID" }),
    e("organizationFriends.bulkDelete", "organizationFriends", "bulkDelete", "DELETE", "/organizations/{organizationId}/relationships/friends", ["organizationId"], { body: true, docs: "Organization Friend Bulk Delete", mutation: true, secrets: "BM_TOKEN, BM_TEST_ORG_ID" }),

    e("players.list", "players", "list", "GET", "/players", [], { docs: "Player List", secrets: "BM_TOKEN" }),
    e("players.info", "players", "info", "GET", "/players/{playerId}", ["playerId"], { docs: "Player Info", secrets: "BM_TOKEN, BM_TEST_PLAYER_ID" }),
    e("players.matchIdentifiers", "players", "matchIdentifiers", "POST", "/players/match", [], { body: true, docs: "Player Match Identifiers", secrets: "BM_TOKEN, BM_TEST_IDENTIFIER_TYPE, BM_TEST_IDENTIFIER" }),
    e("players.quickMatchIdentifiers", "players", "quickMatchIdentifiers", "POST", "/players/quick-match", [], { body: true, docs: "Player Quick Match Identifiers", secrets: "BM_TOKEN, BM_TEST_IDENTIFIER_TYPE, BM_TEST_IDENTIFIER" }),
    e("players.serverInformation", "players", "serverInformation", "GET", "/players/{playerId}/servers/{serverId}", ["playerId", "serverId"], { docs: "Player Server Information", secrets: "BM_TOKEN, BM_TEST_PLAYER_ID, BM_TEST_SERVER_ID" }),
    e("players.sessionHistory", "players", "sessionHistory", "GET", "/players/{playerId}/relationships/sessions", ["playerId"], { docs: "Player Session History", secrets: "BM_TOKEN, BM_TEST_PLAYER_ID" }),
    e("players.timePlayedHistory", "players", "timePlayedHistory", "GET", "/players/{playerId}/time-played-history/{serverId}", ["playerId", "serverId"], { docs: "Player Time Played History", secrets: "BM_TOKEN, BM_TEST_PLAYER_ID, BM_TEST_SERVER_ID" }),
    e("players.relatedIdentifiers", "players", "relatedIdentifiers", "GET", "/players/{playerId}/relationships/related-identifiers", ["playerId"], { docs: "Related Player Identifier Info", secrets: "BM_TOKEN, BM_TEST_PLAYER_ID" }),
    e("playerIdentifiers.match", "playerIdentifiers", "match", "POST", "/players/match", [], { body: true, docs: "Player Match Identifiers", secrets: "BM_TOKEN, BM_TEST_IDENTIFIER_TYPE, BM_TEST_IDENTIFIER" }),
    e("playerIdentifiers.quickMatch", "playerIdentifiers", "quickMatch", "POST", "/players/quick-match", [], { body: true, docs: "Player Quick Match Identifiers", secrets: "BM_TOKEN, BM_TEST_IDENTIFIER_TYPE, BM_TEST_IDENTIFIER" }),
    e("playerIdentifiers.related", "playerIdentifiers", "related", "GET", "/players/{playerId}/relationships/related-identifiers", ["playerId"], { docs: "Related Player Identifier Info", secrets: "BM_TOKEN, BM_TEST_PLAYER_ID" }),

    e("playerNotes.create", "playerNotes", "create", "POST", "/players/{playerId}/relationships/notes", ["playerId"], { body: true, docs: "Player Note Create", mutation: true, secrets: "BM_TOKEN, BM_TEST_PLAYER_ID" }),
    e("playerNotes.delete", "playerNotes", "delete", "DELETE", "/players/{playerId}/relationships/notes/{playerNoteId}", ["playerId", "playerNoteId"], { docs: "Player Note Delete", mutation: true, secrets: "BM_TOKEN, BM_TEST_PLAYER_ID, BM_TEST_PLAYER_NOTE_ID" }),
    e("playerNotes.info", "playerNotes", "info", "GET", "/players/{playerId}/relationships/notes/{playerNoteId}", ["playerId", "playerNoteId"], { docs: "Player Note Info", secrets: "BM_TOKEN, BM_TEST_PLAYER_ID, BM_TEST_PLAYER_NOTE_ID" }),
    e("playerNotes.list", "playerNotes", "list", "GET", "/players/{playerId}/relationships/notes", ["playerId"], { docs: "Player Note List", secrets: "BM_TOKEN, BM_TEST_PLAYER_ID" }),
    e("playerNotes.update", "playerNotes", "update", "PATCH", "/players/{playerId}/relationships/notes/{playerNoteId}", ["playerId", "playerNoteId"], { body: true, docs: "Player Note Update", mutation: true, secrets: "BM_TOKEN, BM_TEST_PLAYER_ID, BM_TEST_PLAYER_NOTE_ID" }),
    e("playerQueryResults.runRelatedPlayerQuery", "playerQueryResults", "runRelatedPlayerQuery", "POST", "/players/{playerId}/relationships/player-query", ["playerId"], { body: true, docs: "Player Query Result Run Related Player Query", secrets: "BM_TOKEN, BM_TEST_PLAYER_ID" }),
    e("playerQueryResults.runSavedRelatedPlayerQuery", "playerQueryResults", "runSavedRelatedPlayerQuery", "GET", "/players/{playerId}/relationships/player-query/{playerQueryId}", ["playerId", "playerQueryId"], { docs: "Player Query Result Run Saved Related Player Query", secrets: "BM_TOKEN, BM_TEST_PLAYER_ID, BM_TEST_PLAYER_QUERY_ID" }),
    e("relatedPlayerQueries.create", "relatedPlayerQueries", "create", "POST", "/player-queries", [], { body: true, docs: "Related Player Query Create", mutation: true, secrets: "BM_TOKEN, BM_TEST_ORG_ID" }),
    e("relatedPlayerQueries.delete", "relatedPlayerQueries", "delete", "DELETE", "/player-queries/{playerQueryId}", ["playerQueryId"], { docs: "Related Player Query Delete", mutation: true, secrets: "BM_TOKEN, BM_TEST_PLAYER_QUERY_ID" }),
    e("relatedPlayerQueries.get", "relatedPlayerQueries", "get", "GET", "/player-queries/{playerQueryId}", ["playerQueryId"], { docs: "Related Player Query Get", secrets: "BM_TOKEN, BM_TEST_PLAYER_QUERY_ID" }),
    e("relatedPlayerQueries.list", "relatedPlayerQueries", "list", "GET", "/player-queries", [], { docs: "Related Player Query List", secrets: "BM_TOKEN" }),
    e("relatedPlayerQueries.update", "relatedPlayerQueries", "update", "PATCH", "/player-queries/{playerQueryId}", ["playerQueryId"], { body: true, docs: "Related Player Query Update", mutation: true, secrets: "BM_TOKEN, BM_TEST_PLAYER_QUERY_ID" }),

    e("reservedSlots.create", "reservedSlots", "create", "POST", "/reserved-slots", [], { body: true, docs: "Reserved Slot Create", mutation: true, secrets: "BM_TOKEN, BM_TEST_SERVER_ID, BM_TEST_IDENTIFIER" }),
    e("reservedSlots.delete", "reservedSlots", "delete", "DELETE", "/reserved-slots/{reservedSlotId}", ["reservedSlotId"], { docs: "Reserved Slot Delete", mutation: true, secrets: "BM_TOKEN, BM_TEST_RESERVED_SLOT_ID" }),
    e("reservedSlots.info", "reservedSlots", "info", "GET", "/reserved-slots/{reservedSlotId}", ["reservedSlotId"], { docs: "Reserved Slot Info", secrets: "BM_TOKEN, BM_TEST_RESERVED_SLOT_ID" }),
    e("reservedSlots.list", "reservedSlots", "list", "GET", "/reserved-slots", [], { docs: "Reserved Slot List", secrets: "BM_TOKEN" }),
    e("reservedSlots.update", "reservedSlots", "update", "PATCH", "/reserved-slots/{reservedSlotId}", ["reservedSlotId"], { body: true, docs: "Reserved Slot Update", mutation: true, secrets: "BM_TOKEN, BM_TEST_RESERVED_SLOT_ID" }),

    e("servers.create", "servers", "create", "POST", "/servers", [], { body: true, docs: "Server Create", mutation: true, secrets: "BM_TOKEN" }),
    e("servers.deleteRcon", "servers", "deleteRcon", "DELETE", "/servers/{serverId}/rcon", ["serverId"], { docs: "Server Delete RCON", mutation: true, secrets: "BM_TOKEN, BM_TEST_RCON_SERVER_ID" }),
    e("servers.downtimeHistory", "servers", "downtimeHistory", "GET", "/servers/{serverId}/relationships/downtime", ["serverId"], { docs: "Server Downtime History", secrets: "BM_TOKEN, BM_TEST_SERVER_ID" }),
    e("servers.enableRcon", "servers", "enableRcon", "POST", "/servers/{serverId}/rcon", ["serverId"], { body: true, docs: "Server Enable RCON", mutation: true, secrets: "BM_TOKEN, BM_TEST_RCON_SERVER_ID" }),
    e("servers.firstTimeHistory", "servers", "firstTimeHistory", "GET", "/servers/{serverId}/first-time-history", ["serverId"], { docs: "Server First Time History", secrets: "BM_TOKEN, BM_TEST_SERVER_ID" }),
    e("servers.forceUpdate", "servers", "forceUpdate", "POST", "/servers/{serverId}/force-update", ["serverId"], { body: true, docs: "Server Force Update", mutation: true, secrets: "BM_TOKEN, BM_TEST_RCON_SERVER_ID" }),
    e("servers.groupRankHistory", "servers", "groupRankHistory", "GET", "/servers/{serverId}/group-rank-history", ["serverId"], { docs: "Server Group Rank History", secrets: "BM_TOKEN, BM_TEST_SERVER_ID" }),
    e("servers.info", "servers", "info", "GET", "/servers/{serverId}", ["serverId"], { docs: "Server Info", secrets: "BM_TOKEN, BM_TEST_SERVER_ID" }),
    e("servers.list", "servers", "list", "GET", "/servers", [], { docs: "Server List", secrets: "none" }),
    e("servers.outageHistory", "servers", "outageHistory", "GET", "/servers/{serverId}/relationships/outages", ["serverId"], { docs: "Server Outage History", secrets: "BM_TOKEN, BM_TEST_SERVER_ID" }),
    e("servers.playerCountHistory", "servers", "playerCountHistory", "GET", "/servers/{serverId}/player-count-history", ["serverId"], { docs: "Server Player Count History", secrets: "BM_TOKEN, BM_TEST_SERVER_ID" }),
    e("servers.rankHistory", "servers", "rankHistory", "GET", "/servers/{serverId}/rank-history", ["serverId"], { docs: "Server Rank History", secrets: "BM_TOKEN, BM_TEST_SERVER_ID" }),
    e("servers.rconConnect", "servers", "rconConnect", "DELETE", "/servers/{serverId}/rcon/connect", ["serverId"], { docs: "Server RCON Connect", mutation: true, secrets: "BM_TOKEN, BM_TEST_RCON_SERVER_ID" }),
    e("servers.rconDisconnect", "servers", "rconDisconnect", "DELETE", "/servers/{serverId}/rcon/disconnect", ["serverId"], { docs: "Server RCON Disconnect", mutation: true, secrets: "BM_TOKEN, BM_TEST_RCON_SERVER_ID" }),
    e("servers.sessionHistory", "servers", "sessionHistory", "GET", "/servers/{serverId}/relationships/sessions", ["serverId"], { docs: "Server Session History", secrets: "BM_TOKEN, BM_TEST_SERVER_ID" }),
    e("servers.timePlayedHistory", "servers", "timePlayedHistory", "GET", "/servers/{serverId}/time-played-history", ["serverId"], { docs: "Server Time Played History", secrets: "BM_TOKEN, BM_TEST_SERVER_ID" }),
    e("servers.uniquePlayerHistory", "servers", "uniquePlayerHistory", "GET", "/servers/{serverId}/unique-player-history", ["serverId"], { docs: "Server Unique Player History", secrets: "BM_TOKEN, BM_TEST_SERVER_ID" }),
    e("servers.update", "servers", "update", "PATCH", "/servers/{serverId}", ["serverId"], { body: true, docs: "Server Update", mutation: true, secrets: "BM_TOKEN, BM_TEST_SERVER_ID" }),
    e("serverGroups.rankHistory", "serverGroups", "rankHistory", "GET", "/servers/{serverId}/group-rank-history", ["serverId"], { docs: "Server Group Rank History", secrets: "BM_TOKEN, BM_TEST_SERVER_ID" }),
    e("stats.organizationPlayers", "stats", "organizationPlayers", "GET", "/organizations/{organizationId}/stats/players", ["organizationId"], { docs: "Organization Player Stats", secrets: "BM_TOKEN, BM_TEST_ORG_ID" }),
    e("stats.commandActivity", "stats", "commandActivity", "GET", "/organizations/{organizationId}/relationships/command-stats", ["organizationId"], { docs: "Commands Activity List", secrets: "BM_TOKEN, BM_TEST_ORG_ID" }),
    e("sessions.list", "sessions", "list", "GET", "/sessions", [], { docs: "Session Sessions", secrets: "BM_TOKEN" }),
    e("sessions.details", "sessions", "details", "GET", "/sessions", [], { docs: "Session Session Details", secrets: "BM_TOKEN, BM_TEST_SESSION_ID" }),
    e("sessions.coplay", "sessions", "coplay", "GET", "/sessions/{sessionId}/relationships/coplay", ["sessionId"], { docs: "Session Sessions CoPlay", secrets: "BM_TOKEN, BM_TEST_SESSION_ID" })
];

function e(key, namespace, methodName, httpMethod, path, params, options = {}) {
    return Object.assign({
        key,
        namespace,
        methodName,
        httpMethod,
        path,
        params,
        body: false,
        mutation: false,
        docs: key,
        secrets: "BM_TOKEN"
    }, options);
}

const ENDPOINTS_BY_KEY = ENDPOINTS.reduce((acc, endpoint) => {
    acc[endpoint.key] = endpoint;
    return acc;
}, {});

class BattleMetricsError extends Error {
    constructor(message, details = {}) {
        super(message);
        this.name = "BattleMetricsError";
        this.status = details.status;
        this.code = details.code;
        this.title = details.title;
        this.detail = details.detail;
        this.errors = details.errors || [];
        this.response = details.response;
        this.isBattleMetricsError = true;
    }
}

function isObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value) && !(value instanceof Date);
}

function normalizeQueryKey(key) {
    const colonIndex = key.indexOf(":");
    if (colonIndex === -1) {
        return key;
    }

    const prefix = key.slice(0, colonIndex);
    const suffix = key.slice(colonIndex + 1);
    if (prefix === "filter" || prefix === "fields" || prefix === "page") {
        return `${prefix}[${suffix}]`;
    }

    return key;
}

function flattenQuery(query, prefix, output) {
    if (!query) {
        return output;
    }

    Object.keys(query).forEach((key) => {
        const value = query[key];
        if (value === undefined || value === null) {
            return;
        }

        const normalizedKey = normalizeQueryKey(key);
        const fullKey = prefix ? `${prefix}[${normalizedKey}]` : normalizedKey;

        if (value instanceof Date) {
            output[fullKey] = value.toISOString();
        } else if (Array.isArray(value)) {
            output[fullKey] = value.map((item) => item instanceof Date ? item.toISOString() : item);
        } else if (isObject(value)) {
            flattenQuery(value, fullKey, output);
        } else {
            output[fullKey] = value;
        }
    });

    return output;
}

function buildQuery(query) {
    return flattenQuery(query, "", {});
}

function serializeQuery(params) {
    const parts = [];
    Object.keys(params || {}).forEach((key) => {
        const value = params[key];
        const values = Array.isArray(value) ? value : [value];
        values.forEach((item) => {
            if (item === undefined || item === null) {
                return;
            }
            parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`);
        });
    });
    return parts.join("&");
}

function interpolatePath(path, params) {
    return path.replace(/\{([^}]+)\}/g, (match, name) => {
        const value = params[name];
        if (value === undefined || value === null || value === "") {
            throw new TypeError(`Missing required path parameter "${name}" for ${path}`);
        }
        return encodeURIComponent(String(value));
    });
}

function hasBody(endpoint) {
    if (typeof endpoint.body === "boolean") {
        return endpoint.body;
    }

    return endpoint.httpMethod === "POST" || endpoint.httpMethod === "PATCH" || endpoint.httpMethod === "PUT";
}

function normalizeError(error) {
    if (error && error.isBattleMetricsError) {
        return error;
    }

    const response = error && error.response;
    const responseData = response && response.data;
    const errors = responseData && Array.isArray(responseData.errors) ? responseData.errors : [];
    const first = errors[0] || {};
    const status = response && response.status ? response.status : first.status;
    const message = first.detail || first.title || (error && error.message) || "BattleMetrics request failed";

    return new BattleMetricsError(message, {
        status,
        code: first.code,
        title: first.title,
        detail: first.detail,
        errors,
        response
    });
}

function stripUndefinedHeaders(headers) {
    return Object.keys(headers || {}).reduce((acc, key) => {
        if (headers[key] !== undefined && headers[key] !== null) {
            acc[key] = headers[key];
        }
        return acc;
    }, {});
}

function parseResponseBody(rawBody, contentType, responseType) {
    if (responseType === "arraybuffer") {
        return Buffer.from(rawBody);
    }

    const text = rawBody.toString("utf8");
    if (!text) {
        return null;
    }

    if (responseType === "text") {
        return text;
    }

    if (contentType && contentType.toLowerCase().includes("application/json")) {
        return JSON.parse(text);
    }

    try {
        return JSON.parse(text);
    } catch (error) {
        return text;
    }
}

function createNativeHttpClient(options = {}) {
    const baseURL = options.baseURL || DEFAULT_BASE_URL;
    const defaultHeaders = stripUndefinedHeaders(options.headers || {});
    const timeout = options.timeout;

    return {
        request(config = {}) {
            return new Promise((resolve, reject) => {
                const requestURL = new URL(config.url || "/", baseURL);
                const queryString = config.paramsSerializer
                    ? config.paramsSerializer(config.params || {})
                    : serializeQuery(config.params || {});

                if (queryString) {
                    requestURL.search += requestURL.search ? `&${queryString}` : `?${queryString}`;
                }

                const headers = stripUndefinedHeaders(Object.assign({}, defaultHeaders, config.headers));
                let requestBody;
                if (config.data !== undefined && config.data !== null) {
                    if (Buffer.isBuffer(config.data) || typeof config.data === "string") {
                        requestBody = config.data;
                    } else {
                        requestBody = JSON.stringify(config.data);
                    }
                    if (!headers["Content-Length"] && !headers["content-length"]) {
                        headers["Content-Length"] = Buffer.byteLength(requestBody);
                    }
                }

                const requestOptions = {
                    method: (config.method || "GET").toUpperCase(),
                    headers
                };
                const transport = requestURL.protocol === "http:" ? http : https;
                const request = transport.request(requestURL, requestOptions, (response) => {
                    const chunks = [];
                    response.on("data", (chunk) => chunks.push(chunk));
                    response.on("end", () => {
                        const rawBody = Buffer.concat(chunks);
                        let data;
                        try {
                            data = parseResponseBody(rawBody, response.headers["content-type"], config.responseType);
                        } catch (error) {
                            reject(error);
                            return;
                        }

                        const result = {
                            status: response.statusCode,
                            statusText: response.statusMessage,
                            headers: response.headers,
                            data,
                            config
                        };

                        if (response.statusCode >= 200 && response.statusCode < 300) {
                            resolve(result);
                            return;
                        }

                        const error = new Error(`BattleMetrics request failed with status ${response.statusCode}`);
                        error.response = result;
                        error.config = config;
                        reject(error);
                    });
                });

                request.on("error", reject);
                if (timeout) {
                    request.setTimeout(timeout, () => {
                        request.destroy(new Error(`BattleMetrics request timed out after ${timeout}ms`));
                    });
                }
                if (requestBody !== undefined) {
                    request.write(requestBody);
                }
                request.end();
            });
        }
    };
}

function createIdentifierDocument(typeIdentifier, identifiers) {
    const list = Array.isArray(identifiers) ? identifiers : [identifiers];

    return {
        data: list.map((identifier) => ({
            type: "identifier",
            attributes: {
                type: typeIdentifier,
                identifier: String(identifier)
            }
        }))
    };
}

function assertValidDateRange(startTime, stopTime, maxDays) {
    if (!(startTime instanceof Date) || Number.isNaN(startTime.getTime())) {
        throw new TypeError("Start time is not a valid Date.");
    }
    if (!(stopTime instanceof Date) || Number.isNaN(stopTime.getTime())) {
        throw new TypeError("Stop time is not a valid Date.");
    }
    if (startTime > stopTime) {
        throw new RangeError("Start time is after stop time.");
    }
    if (typeof maxDays === "number") {
        const diffMs = stopTime.getTime() - startTime.getTime();
        const maxMs = maxDays * 24 * 60 * 60 * 1000;
        if (diffMs > maxMs) {
            throw new RangeError(`Date range can not be greater than ${maxDays} days.`);
        }
    }
}

class BM {
    constructor(options = {}) {
        const token = options.token || process.env.BM_TOKEN;
        const baseURL = options.baseURL || DEFAULT_BASE_URL;
        const httpClient = options.httpClient;

        this.token = token;
        this.serverID = options.serverID || options.serverId;
        this.game = options.game;
        this.baseURL = baseURL;
        this.debug = options.debug === true || process.env.BM_DEBUG === "true";
        this.debugLogger = options.debugLogger || console.log;
        this.deprecationWarnings = options.deprecationWarnings !== false;
        this._deprecatedWarnings = new Set();

        if (httpClient) {
            this.httpClient = httpClient;
        } else {
            this.httpClient = createNativeHttpClient({
                baseURL,
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                timeout: options.timeout
            });
        }

        this._installNamespaces();
    }

    static get ENDPOINTS() {
        return ENDPOINTS.slice();
    }

    static get ENDPOINTS_BY_KEY() {
        return Object.assign({}, ENDPOINTS_BY_KEY);
    }

    static jsonApi(type, attributes = {}, relationships, id) {
        const data = { type, attributes };
        if (id !== undefined && id !== null) {
            data.id = String(id);
        }
        if (relationships) {
            data.relationships = relationships;
        }
        return { data };
    }

    async request(method, path, options = {}) {
        const query = buildQuery(options.query || options.params);
        const config = {
            method: method.toUpperCase(),
            url: path,
            params: query,
            paramsSerializer: serializeQuery,
            headers: options.headers || undefined,
            responseType: options.responseType,
            data: options.body !== undefined ? options.body : options.data
        };

        try {
            const response = await this.httpClient.request(config);
            this._logDebugResponse(config, response);
            return response.data;
        } catch (error) {
            if (error && error.response) {
                this._logDebugResponse(config, error.response, true);
            }
            throw normalizeError(error);
        }
    }

    get(path, query, options = {}) {
        return this.request("GET", path, Object.assign({}, options, { query }));
    }

    post(path, body, query, options = {}) {
        return this.request("POST", path, Object.assign({}, options, { body, query }));
    }

    patch(path, body, query, options = {}) {
        return this.request("PATCH", path, Object.assign({}, options, { body, query }));
    }

    delete(path, query, options = {}) {
        return this.request("DELETE", path, Object.assign({}, options, { query }));
    }

    endpoint(key) {
        const endpoint = ENDPOINTS_BY_KEY[key];
        if (!endpoint) {
            throw new Error(`Unknown BattleMetrics endpoint "${key}".`);
        }
        return (...args) => this._callEndpoint(endpoint, args);
    }

    _installNamespaces() {
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

        namespaceNames.forEach((name) => {
            const namespace = {
                request: (method, path, options) => this.request(method, path, options)
            };
            Object.defineProperty(namespace, "_endpoints", {
                enumerable: false,
                value: ENDPOINTS.filter((endpoint) => endpoint.namespace === name)
            });
            this[name] = namespace;
        });

        ENDPOINTS.forEach((endpoint) => {
            this[endpoint.namespace][endpoint.methodName] = (...args) => this._callEndpoint(endpoint, args);
        });
    }

    _callEndpoint(endpoint, args) {
        if (args.length === 1 && isObject(args[0]) && args[0].path) {
            const pathParams = args[0].path || {};
            const body = args[0].body !== undefined ? args[0].body : args[0].data;
            const query = args[0].query || args[0].params;
            const path = interpolatePath(endpoint.path, pathParams);
            return this.request(endpoint.httpMethod, path, { body, query });
        }

        const pathParams = {};
        let index = 0;
        endpoint.params.forEach((name) => {
            pathParams[name] = args[index];
            index += 1;
        });

        let body;
        let query;
        if (hasBody(endpoint)) {
            body = args[index];
            query = args[index + 1];
        } else {
            query = args[index];
        }

        const path = interpolatePath(endpoint.path, pathParams);
        return this.request(endpoint.httpMethod, path, { body, query });
    }

    _warnDeprecated(methodName, replacement) {
        if (!this.deprecationWarnings || this._deprecatedWarnings.has(methodName)) {
            return;
        }

        this._deprecatedWarnings.add(methodName);
        const replacementText = replacement ? ` Use ${replacement} instead.` : "";
        console.warn(`[BattleMetrics] ${methodName} is deprecated.${replacementText}`);
    }

    _logDebugResponse(config, response, failed = false) {
        if (!this.debug) {
            return;
        }

        this.debugLogger("[BattleMetrics debug]", {
            method: config.method,
            url: config.url,
            params: config.params,
            status: response && response.status,
            failed,
            data: response && response.data
        });
    }

    async getServerInfoById(serverId) {
        this._warnDeprecated("getServerInfoById", "servers.info");
        const result = await this.servers.info(serverId, { include: "player" });
        return result.data;
    }

    async getGameInfo(game = this.game) {
        this._warnDeprecated("getGameInfo", "games.info");
        const result = await this.games.info(game);
        return result.data;
    }

    async getServerInfoByName(name, pageLength = 10) {
        this._warnDeprecated("getServerInfoByName", "servers.list");
        const result = await this.servers.list({
            filter: { search: name },
            page: { size: pageLength }
        });
        return (result.data || []).map((server) => server.attributes).filter(Boolean);
    }

    async getServerInfoByNameAndGame(serverName, game = this.game, pageLength = 10) {
        this._warnDeprecated("getServerInfoByNameAndGame", "servers.list");
        const result = await this.servers.list({
            filter: { search: serverName, game },
            page: { size: pageLength }
        });
        return (result.data || []).map((server) => server.attributes).filter(Boolean);
    }

    async getAllServersByServerNameCountryAndGame(serverName, country, game = this.game, pageLength = 10) {
        this._warnDeprecated("getAllServersByServerNameCountryAndGame", "servers.list");
        const result = await this.servers.list({
            filter: {
                search: serverName,
                game,
                "countries[]": country
            },
            page: { size: pageLength }
        });
        return (result.data || []).map((server) => server.attributes).filter(Boolean);
    }

    async getPlayTimeHistory(playerId, serverId = this.serverID, startTime, stopTime) {
        this._warnDeprecated("getPlayTimeHistory", "players.timePlayedHistory");
        assertValidDateRange(startTime, stopTime, 90);
        const result = await this.players.timePlayedHistory(playerId, serverId, {
            start: startTime,
            stop: stopTime
        });
        return result.data;
    }

    async getServerPlayerInfo(playerId, serverId = this.serverID) {
        this._warnDeprecated("getServerPlayerInfo", "players.serverInformation");
        return this.players.serverInformation(playerId, serverId);
    }

    async getPlayerInfo(playerId) {
        this._warnDeprecated("getPlayerInfo", "players.info");
        return this.players.info(playerId);
    }

    async getBanInfoByID(banId) {
        this._warnDeprecated("getBanInfoByID", "bans.info");
        return this.bans.info(banId);
    }

    async getBans(query) {
        this._warnDeprecated("getBans", "bans.list");
        return this.bans.list(query);
    }

    async getLeaderBoard(listSize, startTime, stopTime) {
        this._warnDeprecated("getLeaderBoard", "servers.leaderboard");
        assertValidDateRange(startTime, stopTime, 90);
        const result = await this.servers.leaderboard(this.serverID, {
            page: { size: listSize },
            filter: { period: `${startTime.toISOString()}:${stopTime.toISOString()}` }
        });
        return result.data;
    }

    async getGameFeatures(game = this.game) {
        this._warnDeprecated("getGameFeatures", "gameFeatures.list");
        return this.gameFeatures.list({ filter: { game } });
    }

    async getGameFeatureOptionsList(gameFeatureID) {
        this._warnDeprecated("getGameFeatureOptionsList", "gameFeatures.options");
        return this.gameFeatures.options(gameFeatureID);
    }

    async getPlayerInfoBy(typeIdentifier, identifier) {
        this._warnDeprecated("getPlayerInfoBy", "players.matchIdentifiers");
        return this.players.matchIdentifiers(createIdentifierDocument(typeIdentifier, identifier));
    }

    async getPlayersInfoBy(typeIdentifier, identifiers) {
        this._warnDeprecated("getPlayersInfoBy", "players.matchIdentifiers");
        return this.players.matchIdentifiers(createIdentifierDocument(typeIdentifier, identifiers));
    }
}

BM.BattleMetricsError = BattleMetricsError;
BM.DEFAULT_BASE_URL = DEFAULT_BASE_URL;
BM.buildQuery = buildQuery;
BM.serializeQuery = serializeQuery;
BM.createIdentifierDocument = createIdentifierDocument;
BM.createNativeHttpClient = createNativeHttpClient;

module.exports = BM;
