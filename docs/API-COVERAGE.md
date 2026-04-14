# BattleMetrics API Coverage

Generated from `BM.ENDPOINTS` in `src/bm.js`. Keep this table aligned with the BattleMetrics developer documentation when endpoints change.

| Docs section | Method | Path | Wrapper method | Live secret gate | Status | Test file |
| --- | --- | --- | --- | --- | --- | --- |
| Ban Create | POST | `/bans` | `bans.create` | BM_TOKEN, BM_TEST_ORG_ID or BM_TEST_SERVER_ID | Implemented | `test/contract/endpoints/bans-create.test.js` |
| Ban Import | POST | `/bans/import` | `bans.import` | BM_TOKEN, BM_TEST_BAN_LIST_ID | Implemented | `test/contract/endpoints/bans-import.test.js` |
| Ban Export | GET | `/bans/export` | `bans.export` | BM_TOKEN, BM_TEST_BAN_LIST_ID | Implemented | `test/contract/endpoints/bans-export.test.js` |
| Ban Delete | DELETE | `/bans/{banId}` | `bans.delete` | BM_TOKEN, BM_TEST_MUTATION_BAN_ID | Implemented | `test/contract/endpoints/bans-delete.test.js` |
| Ban Info | GET | `/bans/{banId}` | `bans.info` | BM_TOKEN, BM_TEST_BAN_ID | Implemented | `test/contract/endpoints/bans-info.test.js` |
| Ban List | GET | `/bans` | `bans.list` | BM_TOKEN | Implemented | `test/contract/endpoints/bans-list.test.js` |
| Ban Update | PATCH | `/bans/{banId}` | `bans.update` | BM_TOKEN, BM_TEST_MUTATION_BAN_ID | Implemented | `test/contract/endpoints/bans-update.test.js` |
| Ban List Exemption Create | POST | `/bans/{banId}/relationships/exemptions` | `banListExemptions.create` | BM_TOKEN, BM_TEST_MUTATION_BAN_ID | Implemented | `test/contract/endpoints/banlistexemptions-create.test.js` |
| Ban List Exemption Read | GET | `/bans/{banId}/relationships/exemptions/{banExemptionId}` | `banListExemptions.read` | BM_TOKEN, BM_TEST_BAN_ID, BM_TEST_BAN_EXEMPTION_ID | Implemented | `test/contract/endpoints/banlistexemptions-read.test.js` |
| Ban List Exemption List Exemptions | GET | `/bans/{banId}/relationships/exemptions` | `banListExemptions.list` | BM_TOKEN, BM_TEST_BAN_ID | Implemented | `test/contract/endpoints/banlistexemptions-list.test.js` |
| Ban List Exemption Update | PATCH | `/bans/{banId}/relationships/exemptions` | `banListExemptions.update` | BM_TOKEN, BM_TEST_MUTATION_BAN_ID | Implemented | `test/contract/endpoints/banlistexemptions-update.test.js` |
| Ban List Exemption Delete | DELETE | `/bans/{banId}/relationships/exemptions` | `banListExemptions.delete` | BM_TOKEN, BM_TEST_MUTATION_BAN_ID | Implemented | `test/contract/endpoints/banlistexemptions-delete.test.js` |
| Ban List Create | POST | `/ban-lists` | `banLists.create` | BM_TOKEN, BM_TEST_ORG_ID | Implemented | `test/contract/endpoints/banlists-create.test.js` |
| Ban List Accept Invite | POST | `/ban-lists/accept-invite` | `banLists.acceptInvite` | BM_TOKEN, BM_TEST_BAN_LIST_INVITE_ID | Implemented | `test/contract/endpoints/banlists-acceptinvite.test.js` |
| Ban List List | GET | `/ban-lists` | `banLists.list` | BM_TOKEN | Implemented | `test/contract/endpoints/banlists-list.test.js` |
| Ban List Organization List | GET | `/ban-lists/{banListId}/relationships/organizations` | `banLists.listOrganizations` | BM_TOKEN, BM_TEST_BAN_LIST_ID | Implemented | `test/contract/endpoints/banlists-listorganizations.test.js` |
| Ban List Read Organization's Subscription | GET | `/ban-lists/{banListId}/relationships/organizations/{organizationId}` | `banLists.readOrganizationSubscription` | BM_TOKEN, BM_TEST_BAN_LIST_ID, BM_TEST_ORG_ID | Implemented | `test/contract/endpoints/banlists-readorganizationsubscription.test.js` |
| Ban List Read | GET | `/ban-lists/{banListId}` | `banLists.read` | BM_TOKEN, BM_TEST_BAN_LIST_ID | Implemented | `test/contract/endpoints/banlists-read.test.js` |
| Ban List Update | PATCH | `/ban-lists/{banListId}/relationships/organizations/{organizationId}` | `banLists.updateSubscription` | BM_TOKEN, BM_TEST_BAN_LIST_ID, BM_TEST_ORG_ID | Implemented | `test/contract/endpoints/banlists-updatesubscription.test.js` |
| Ban List Unsubscribe | DELETE | `/ban-lists/{banListId}/relationships/organizations/{organizationId}` | `banLists.unsubscribe` | BM_TOKEN, BM_TEST_BAN_LIST_ID, BM_TEST_ORG_ID | Implemented | `test/contract/endpoints/banlists-unsubscribe.test.js` |
| Ban List Invite Create | POST | `/ban-lists/{banListId}/relationships/invites` | `banListInvites.create` | BM_TOKEN, BM_TEST_BAN_LIST_ID | Implemented | `test/contract/endpoints/banlistinvites-create.test.js` |
| Ban List Invite Read | GET | `/ban-list-invites/{banListInviteId}` | `banListInvites.read` | BM_TOKEN, BM_TEST_BAN_LIST_INVITE_ID | Implemented | `test/contract/endpoints/banlistinvites-read.test.js` |
| Ban List Invite List | GET | `/ban-lists/{banListId}/relationships/invites` | `banListInvites.list` | BM_TOKEN, BM_TEST_BAN_LIST_ID | Implemented | `test/contract/endpoints/banlistinvites-list.test.js` |
| Ban List Invite Delete | DELETE | `/ban-lists/{banListId}/relationships/invites/{banListInviteId}` | `banListInvites.delete` | BM_TOKEN, BM_TEST_BAN_LIST_ID, BM_TEST_BAN_LIST_INVITE_ID | Implemented | `test/contract/endpoints/banlistinvites-delete.test.js` |
| Native Ban List | GET | `/bans-native` | `nativeBans.list` | BM_TOKEN | Implemented | `test/contract/endpoints/nativebans-list.test.js` |
| Native Ban Force Update | POST | `/bans-native/{nativeBanId}/force-update` | `nativeBans.forceUpdate` | BM_TOKEN, BM_TEST_NATIVE_BAN_ID | Implemented | `test/contract/endpoints/nativebans-forceupdate.test.js` |
| Commands Activity List | GET | `/organizations/{organizationId}/relationships/command-stats` | `commandsActivity.list` | BM_TOKEN, BM_TEST_ORG_ID | Implemented | `test/contract/endpoints/commandsactivity-list.test.js` |
| Coplay List | GET | `/players/{playerId}/relationships/coplay` | `coplay.list` | BM_TOKEN, BM_TEST_PLAYER_ID | Implemented | `test/contract/endpoints/coplay-list.test.js` |
| Data Point List | GET | `/metrics` | `dataPoints.list` | BM_TOKEN | Implemented | `test/contract/endpoints/datapoints-list.test.js` |
| Flag Player Create | POST | `/players/{playerId}/relationships/flags` | `playerFlags.assignToPlayer` | BM_TOKEN, BM_TEST_PLAYER_ID, BM_TEST_PLAYER_FLAG_ID | Implemented | `test/contract/endpoints/playerflags-assigntoplayer.test.js` |
| Flag Player Flags | GET | `/players/{playerId}/relationships/flags` | `playerFlags.listForPlayer` | BM_TOKEN, BM_TEST_PLAYER_ID | Implemented | `test/contract/endpoints/playerflags-listforplayer.test.js` |
| Flag Player Delete | DELETE | `/players/{playerId}/relationships/flags/{playerFlagId}` | `playerFlags.removeFromPlayer` | BM_TOKEN, BM_TEST_PLAYER_ID, BM_TEST_PLAYER_FLAG_ID | Implemented | `test/contract/endpoints/playerflags-removefromplayer.test.js` |
| Player Flag Create | POST | `/player-flags` | `playerFlags.create` | BM_TOKEN, BM_TEST_ORG_ID | Implemented | `test/contract/endpoints/playerflags-create.test.js` |
| Player Flag List | GET | `/player-flags` | `playerFlags.list` | BM_TOKEN | Implemented | `test/contract/endpoints/playerflags-list.test.js` |
| Player Flag Info | GET | `/player-flags/{playerFlagId}` | `playerFlags.info` | BM_TOKEN, BM_TEST_PLAYER_FLAG_ID | Implemented | `test/contract/endpoints/playerflags-info.test.js` |
| Player Flag Update | PATCH | `/player-flags/{playerFlagId}` | `playerFlags.update` | BM_TOKEN, BM_TEST_PLAYER_FLAG_ID | Implemented | `test/contract/endpoints/playerflags-update.test.js` |
| Player Flag Delete | DELETE | `/player-flags/{playerFlagId}` | `playerFlags.delete` | BM_TOKEN, BM_TEST_PLAYER_FLAG_ID | Implemented | `test/contract/endpoints/playerflags-delete.test.js` |
| Game List | GET | `/games` | `games.list` | none | Implemented | `test/contract/endpoints/games-list.test.js` |
| Game Info | GET | `/games/{gameId}` | `games.info` | none | Implemented | `test/contract/endpoints/games-info.test.js` |
| Game Features List | GET | `/game-features` | `gameFeatures.list` | none | Implemented | `test/contract/endpoints/gamefeatures-list.test.js` |
| Game Feature Options List | GET | `/game-features/{gameFeatureId}/relationships/options` | `gameFeatures.options` | none | Implemented | `test/contract/endpoints/gamefeatures-options.test.js` |
| Leaderboard List | GET | `/servers/{serverId}/relationships/leaderboards/time` | `servers.leaderboard` | BM_TOKEN, BM_TEST_SERVER_ID | Implemented | `test/contract/endpoints/servers-leaderboard.test.js` |
| Organization Player Stats | GET | `/organizations/{organizationId}/stats/players` | `organizations.playerStats` | BM_TOKEN, BM_TEST_ORG_ID | Implemented | `test/contract/endpoints/organizations-playerstats.test.js` |
| Organization Friend List | GET | `/organizations/{organizationId}/relationships/friends` | `organizationFriends.list` | BM_TOKEN, BM_TEST_ORG_ID | Implemented | `test/contract/endpoints/organizationfriends-list.test.js` |
| Organization Friend Organization Friend | GET | `/organizations/{organizationId}/relationships/friends/{friendOrganizationId}` | `organizationFriends.get` | BM_TOKEN, BM_TEST_ORG_ID, BM_TEST_FRIEND_ORG_ID | Implemented | `test/contract/endpoints/organizationfriends-get.test.js` |
| Organization Friend Create | POST | `/organizations/{organizationId}/relationships/friends` | `organizationFriends.create` | BM_TOKEN, BM_TEST_ORG_ID, BM_TEST_FRIEND_ORG_ID | Implemented | `test/contract/endpoints/organizationfriends-create.test.js` |
| Organization Friend Update Settings | PATCH | `/organizations/{organizationId}/relationships/friends/{friendOrganizationId}` | `organizationFriends.updateSettings` | BM_TOKEN, BM_TEST_ORG_ID, BM_TEST_FRIEND_ORG_ID | Implemented | `test/contract/endpoints/organizationfriends-updatesettings.test.js` |
| Organization Friend Bulk update Settings | PATCH | `/organizations/{organizationId}/relationships/friends` | `organizationFriends.bulkUpdateSettings` | BM_TOKEN, BM_TEST_ORG_ID | Implemented | `test/contract/endpoints/organizationfriends-bulkupdatesettings.test.js` |
| Organization Friend Delete | DELETE | `/organizations/{organizationId}/relationships/friends/{friendOrganizationId}` | `organizationFriends.delete` | BM_TOKEN, BM_TEST_ORG_ID, BM_TEST_FRIEND_ORG_ID | Implemented | `test/contract/endpoints/organizationfriends-delete.test.js` |
| Organization Friend Bulk Delete | DELETE | `/organizations/{organizationId}/relationships/friends` | `organizationFriends.bulkDelete` | BM_TOKEN, BM_TEST_ORG_ID | Implemented | `test/contract/endpoints/organizationfriends-bulkdelete.test.js` |
| Player List | GET | `/players` | `players.list` | BM_TOKEN | Implemented | `test/contract/endpoints/players-list.test.js` |
| Player Info | GET | `/players/{playerId}` | `players.info` | BM_TOKEN, BM_TEST_PLAYER_ID | Implemented | `test/contract/endpoints/players-info.test.js` |
| Player Match Identifiers | POST | `/players/match` | `players.matchIdentifiers` | BM_TOKEN, BM_TEST_IDENTIFIER_TYPE, BM_TEST_IDENTIFIER | Implemented | `test/contract/endpoints/players-matchidentifiers.test.js` |
| Player Quick Match Identifiers | POST | `/players/quick-match` | `players.quickMatchIdentifiers` | BM_TOKEN, BM_TEST_IDENTIFIER_TYPE, BM_TEST_IDENTIFIER | Implemented | `test/contract/endpoints/players-quickmatchidentifiers.test.js` |
| Player Server Information | GET | `/players/{playerId}/servers/{serverId}` | `players.serverInformation` | BM_TOKEN, BM_TEST_PLAYER_ID, BM_TEST_SERVER_ID | Implemented | `test/contract/endpoints/players-serverinformation.test.js` |
| Player Session History | GET | `/players/{playerId}/relationships/sessions` | `players.sessionHistory` | BM_TOKEN, BM_TEST_PLAYER_ID | Implemented | `test/contract/endpoints/players-sessionhistory.test.js` |
| Player Time Played History | GET | `/players/{playerId}/time-played-history/{serverId}` | `players.timePlayedHistory` | BM_TOKEN, BM_TEST_PLAYER_ID, BM_TEST_SERVER_ID | Implemented | `test/contract/endpoints/players-timeplayedhistory.test.js` |
| Related Player Identifier Info | GET | `/players/{playerId}/relationships/related-identifiers` | `players.relatedIdentifiers` | BM_TOKEN, BM_TEST_PLAYER_ID | Implemented | `test/contract/endpoints/players-relatedidentifiers.test.js` |
| Player Match Identifiers | POST | `/players/match` | `playerIdentifiers.match` | BM_TOKEN, BM_TEST_IDENTIFIER_TYPE, BM_TEST_IDENTIFIER | Implemented | `test/contract/endpoints/playeridentifiers-match.test.js` |
| Player Quick Match Identifiers | POST | `/players/quick-match` | `playerIdentifiers.quickMatch` | BM_TOKEN, BM_TEST_IDENTIFIER_TYPE, BM_TEST_IDENTIFIER | Implemented | `test/contract/endpoints/playeridentifiers-quickmatch.test.js` |
| Related Player Identifier Info | GET | `/players/{playerId}/relationships/related-identifiers` | `playerIdentifiers.related` | BM_TOKEN, BM_TEST_PLAYER_ID | Implemented | `test/contract/endpoints/playeridentifiers-related.test.js` |
| Player Note Create | POST | `/players/{playerId}/relationships/notes` | `playerNotes.create` | BM_TOKEN, BM_TEST_PLAYER_ID | Implemented | `test/contract/endpoints/playernotes-create.test.js` |
| Player Note Delete | DELETE | `/players/{playerId}/relationships/notes/{playerNoteId}` | `playerNotes.delete` | BM_TOKEN, BM_TEST_PLAYER_ID, BM_TEST_PLAYER_NOTE_ID | Implemented | `test/contract/endpoints/playernotes-delete.test.js` |
| Player Note Info | GET | `/players/{playerId}/relationships/notes/{playerNoteId}` | `playerNotes.info` | BM_TOKEN, BM_TEST_PLAYER_ID, BM_TEST_PLAYER_NOTE_ID | Implemented | `test/contract/endpoints/playernotes-info.test.js` |
| Player Note List | GET | `/players/{playerId}/relationships/notes` | `playerNotes.list` | BM_TOKEN, BM_TEST_PLAYER_ID | Implemented | `test/contract/endpoints/playernotes-list.test.js` |
| Player Note Update | PATCH | `/players/{playerId}/relationships/notes/{playerNoteId}` | `playerNotes.update` | BM_TOKEN, BM_TEST_PLAYER_ID, BM_TEST_PLAYER_NOTE_ID | Implemented | `test/contract/endpoints/playernotes-update.test.js` |
| Player Query Result Run Related Player Query | POST | `/players/{playerId}/relationships/player-query` | `playerQueryResults.runRelatedPlayerQuery` | BM_TOKEN, BM_TEST_PLAYER_ID | Implemented | `test/contract/endpoints/playerqueryresults-runrelatedplayerquery.test.js` |
| Player Query Result Run Saved Related Player Query | GET | `/players/{playerId}/relationships/player-query/{playerQueryId}` | `playerQueryResults.runSavedRelatedPlayerQuery` | BM_TOKEN, BM_TEST_PLAYER_ID, BM_TEST_PLAYER_QUERY_ID | Implemented | `test/contract/endpoints/playerqueryresults-runsavedrelatedplayerquery.test.js` |
| Related Player Query Create | POST | `/player-queries` | `relatedPlayerQueries.create` | BM_TOKEN, BM_TEST_ORG_ID | Implemented | `test/contract/endpoints/relatedplayerqueries-create.test.js` |
| Related Player Query Delete | DELETE | `/player-queries/{playerQueryId}` | `relatedPlayerQueries.delete` | BM_TOKEN, BM_TEST_PLAYER_QUERY_ID | Implemented | `test/contract/endpoints/relatedplayerqueries-delete.test.js` |
| Related Player Query Get | GET | `/player-queries/{playerQueryId}` | `relatedPlayerQueries.get` | BM_TOKEN, BM_TEST_PLAYER_QUERY_ID | Implemented | `test/contract/endpoints/relatedplayerqueries-get.test.js` |
| Related Player Query List | GET | `/player-queries` | `relatedPlayerQueries.list` | BM_TOKEN | Implemented | `test/contract/endpoints/relatedplayerqueries-list.test.js` |
| Related Player Query Update | PATCH | `/player-queries/{playerQueryId}` | `relatedPlayerQueries.update` | BM_TOKEN, BM_TEST_PLAYER_QUERY_ID | Implemented | `test/contract/endpoints/relatedplayerqueries-update.test.js` |
| Reserved Slot Create | POST | `/reserved-slots` | `reservedSlots.create` | BM_TOKEN, BM_TEST_SERVER_ID, BM_TEST_IDENTIFIER | Implemented | `test/contract/endpoints/reservedslots-create.test.js` |
| Reserved Slot Delete | DELETE | `/reserved-slots/{reservedSlotId}` | `reservedSlots.delete` | BM_TOKEN, BM_TEST_RESERVED_SLOT_ID | Implemented | `test/contract/endpoints/reservedslots-delete.test.js` |
| Reserved Slot Info | GET | `/reserved-slots/{reservedSlotId}` | `reservedSlots.info` | BM_TOKEN, BM_TEST_RESERVED_SLOT_ID | Implemented | `test/contract/endpoints/reservedslots-info.test.js` |
| Reserved Slot List | GET | `/reserved-slots` | `reservedSlots.list` | BM_TOKEN | Implemented | `test/contract/endpoints/reservedslots-list.test.js` |
| Reserved Slot Update | PATCH | `/reserved-slots/{reservedSlotId}` | `reservedSlots.update` | BM_TOKEN, BM_TEST_RESERVED_SLOT_ID | Implemented | `test/contract/endpoints/reservedslots-update.test.js` |
| Server Create | POST | `/servers` | `servers.create` | BM_TOKEN | Implemented | `test/contract/endpoints/servers-create.test.js` |
| Server Delete RCON | DELETE | `/servers/{serverId}/rcon` | `servers.deleteRcon` | BM_TOKEN, BM_TEST_RCON_SERVER_ID | Implemented | `test/contract/endpoints/servers-deletercon.test.js` |
| Server Downtime History | GET | `/servers/{serverId}/relationships/downtime` | `servers.downtimeHistory` | BM_TOKEN, BM_TEST_SERVER_ID | Implemented | `test/contract/endpoints/servers-downtimehistory.test.js` |
| Server Enable RCON | POST | `/servers/{serverId}/rcon` | `servers.enableRcon` | BM_TOKEN, BM_TEST_RCON_SERVER_ID | Implemented | `test/contract/endpoints/servers-enablercon.test.js` |
| Server First Time History | GET | `/servers/{serverId}/first-time-history` | `servers.firstTimeHistory` | BM_TOKEN, BM_TEST_SERVER_ID | Implemented | `test/contract/endpoints/servers-firsttimehistory.test.js` |
| Server Force Update | POST | `/servers/{serverId}/force-update` | `servers.forceUpdate` | BM_TOKEN, BM_TEST_RCON_SERVER_ID | Implemented | `test/contract/endpoints/servers-forceupdate.test.js` |
| Server Group Rank History | GET | `/servers/{serverId}/group-rank-history` | `servers.groupRankHistory` | BM_TOKEN, BM_TEST_SERVER_ID | Implemented | `test/contract/endpoints/servers-grouprankhistory.test.js` |
| Server Info | GET | `/servers/{serverId}` | `servers.info` | BM_TOKEN, BM_TEST_SERVER_ID | Implemented | `test/contract/endpoints/servers-info.test.js` |
| Server List | GET | `/servers` | `servers.list` | none | Implemented | `test/contract/endpoints/servers-list.test.js` |
| Server Outage History | GET | `/servers/{serverId}/relationships/outages` | `servers.outageHistory` | BM_TOKEN, BM_TEST_SERVER_ID | Implemented | `test/contract/endpoints/servers-outagehistory.test.js` |
| Server Player Count History | GET | `/servers/{serverId}/player-count-history` | `servers.playerCountHistory` | BM_TOKEN, BM_TEST_SERVER_ID | Implemented | `test/contract/endpoints/servers-playercounthistory.test.js` |
| Server Rank History | GET | `/servers/{serverId}/rank-history` | `servers.rankHistory` | BM_TOKEN, BM_TEST_SERVER_ID | Implemented | `test/contract/endpoints/servers-rankhistory.test.js` |
| Server RCON Connect | DELETE | `/servers/{serverId}/rcon/connect` | `servers.rconConnect` | BM_TOKEN, BM_TEST_RCON_SERVER_ID | Implemented | `test/contract/endpoints/servers-rconconnect.test.js` |
| Server RCON Disconnect | DELETE | `/servers/{serverId}/rcon/disconnect` | `servers.rconDisconnect` | BM_TOKEN, BM_TEST_RCON_SERVER_ID | Implemented | `test/contract/endpoints/servers-rcondisconnect.test.js` |
| Server Session History | GET | `/servers/{serverId}/relationships/sessions` | `servers.sessionHistory` | BM_TOKEN, BM_TEST_SERVER_ID | Implemented | `test/contract/endpoints/servers-sessionhistory.test.js` |
| Server Time Played History | GET | `/servers/{serverId}/time-played-history` | `servers.timePlayedHistory` | BM_TOKEN, BM_TEST_SERVER_ID | Implemented | `test/contract/endpoints/servers-timeplayedhistory.test.js` |
| Server Unique Player History | GET | `/servers/{serverId}/unique-player-history` | `servers.uniquePlayerHistory` | BM_TOKEN, BM_TEST_SERVER_ID | Implemented | `test/contract/endpoints/servers-uniqueplayerhistory.test.js` |
| Server Update | PATCH | `/servers/{serverId}` | `servers.update` | BM_TOKEN, BM_TEST_SERVER_ID | Implemented | `test/contract/endpoints/servers-update.test.js` |
| Server Group Rank History | GET | `/servers/{serverId}/group-rank-history` | `serverGroups.rankHistory` | BM_TOKEN, BM_TEST_SERVER_ID | Implemented | `test/contract/endpoints/servergroups-rankhistory.test.js` |
| Organization Player Stats | GET | `/organizations/{organizationId}/stats/players` | `stats.organizationPlayers` | BM_TOKEN, BM_TEST_ORG_ID | Implemented | `test/contract/endpoints/stats-organizationplayers.test.js` |
| Commands Activity List | GET | `/organizations/{organizationId}/relationships/command-stats` | `stats.commandActivity` | BM_TOKEN, BM_TEST_ORG_ID | Implemented | `test/contract/endpoints/stats-commandactivity.test.js` |
| Session Sessions | GET | `/sessions` | `sessions.list` | BM_TOKEN | Implemented | `test/contract/endpoints/sessions-list.test.js` |
| Session Session Details | GET | `/sessions` | `sessions.details` | BM_TOKEN, BM_TEST_SESSION_ID | Implemented | `test/contract/endpoints/sessions-details.test.js` |
| Session Sessions CoPlay | GET | `/sessions/{sessionId}/relationships/coplay` | `sessions.coplay` | BM_TOKEN, BM_TEST_SESSION_ID | Implemented | `test/contract/endpoints/sessions-coplay.test.js` |

## Resource Namespaces Without Dedicated Docs Endpoints

`files` and `users` are exposed with the generic namespace `request(method, path, options)` helper because the current documentation defines those resources but does not list standalone endpoints for them.
