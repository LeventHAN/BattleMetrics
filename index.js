const axios = require('axios');

//var bearertoken;

/*function BMSettings(config) {
    bearertoken = config.bearertoken;
}*/

axios.defaults.baseURL = 'https://api.battlemetrics.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';
//axios.defaults.headers.common['Authorization'] = bearertoken

async function serverInfoByName(serverName, game) {
    let servers = [];
    await axios.get(`/servers?filter[search]='${serverName}&filter[game]=${game}`).then(res => {
        res.data.data.forEach(el => {
            var attributes = el.attributes;

            let info = {
                Id: attributes.id,
                Name: attributes.name,
                Players: attributes.players,
                MaxPlayers: attributes.maxPlayers,
                Country: attributes.country,
                Rank: attributes.rank,
                Description: attributes.details.rust_description
            }
            servers.push(info);
        });
    })
    return servers;
}

async function serverInfoById(serverId) {
    let server = [];
    await axios.get(`/servers/${serverId}`).then(res => {
        var attributes = res.data.data.attributes;

        let info = {
            Id: attributes.id,
            Name: attributes.name,
            Players: attributes.players,
            MaxPlayers: attributes.maxPlayers,
            Country: attributes.country,
            Rank: attributes.rank,
            Description: attributes.details.rust_description
        }

        server.push(info);
    })
    return server;
}

async function gameInfo(game) {
    let data = [];
    await axios.get(`/games/${game}`).then(res => {
        var attributes = res.data.data.attributes;

        let info = {
            AppID: attributes.metadata.appid,
            Players: attributes.players,
            Servers: attributes.servers,
            MinPlayers24H: attributes.minPlayers24H,
            MaxPlayers24H: attributes.maxPlayers24H,
            MinPlayers7D: attributes.minPlayers7D,
            MaxPlayers7D: attributes.maxPlayers7D,
            MinPlayers30D: attributes.minPlayers30D,
            MaxPlayers30D: attributes.maxPlayers30D
        }
        data.push(info);
    })
    return data;
}

async function getServerID(serverName, game) {
    let servers = [];
    await axios.get(`/servers?filter[search]='${serverName}&filter[game]=${game}`).then(res => {
        res.data.data.forEach(el => {
            var attributes = el.attributes;

            let info = {
                Id: attributes.id,
                Name: attributes.name,
            }
            servers.push(info);
        });
    })
    return servers;
}

async function getPlayTimeHistory(playerId, serverId, startTime, stopTime) {
    let servers = [];
    await axios.get(`https://api.battlemetrics.com/players/${playerId}/time-played-history/${serverId}?start=${startTime}T12%3A00%3A00Z&stop=${stopTime}T12%3A00%3A00Z`).then(res => {
        servers.push(res.data.data);
    })
    return servers;
}

async function getServerPlayerInfo(playerId, serverId) {
    let servers = [];
    await axios.get(`https://api.battlemetrics.com/players/${playerId}/servers/${serverId}`).then(res => {
        var attributes = res.data.data.attributes;

        let info = {
            FirstSeen: attributes.firstSeen,
            LastSeen: attributes.lastSeen,
            TimePlayed: attributes.timePlayed,
            Online: attributes.online
        }

        servers.push(info)
    })
    return servers;
}

async function getPlayerInfo(playerId) {
    let servers = [];
    await axios.get(`https://api.battlemetrics.com/players/${playerId}`).then(res => {
        var attributes = res.data.data.attributes;

        let info = {
            Name: attributes.name,
            Private: attributes.private,
            PossitiveMatch: attributes.positiveMatch,
            CreatedAt: attributes.createdAt,
            UpdatedAt: attributes.updatedAt
        }
        servers.push(info);
    })
    return servers;
}

/*async function banInfo(banid) {
    console.log(bearertoken)
    console.log(banid)
    await axios.get(`/bans/${banid}`).then(res => {
        console.log(res);
    })
}*/

module.exports.gameInfo = gameInfo;
module.exports.serverInfoByName = serverInfoByName;
module.exports.serverInfoById = serverInfoById;
module.exports.getServerID = getServerID;
module.exports.getPlayTimeHistory = getPlayTimeHistory;
module.exports.getServerPlayerInfo = getServerPlayerInfo;
module.exports.getPlayerInfo = getPlayerInfo;
//module.exports.BMSettings = BMSettings;
//module.exports.banInfo = banInfo;