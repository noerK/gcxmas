/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {
    bootstrapExtra,
    getLayersMap,
    Properties
} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

let currentPopup: any = undefined;
const now = new Date();
const stream = new Date('December 16, 2021 16:30:00');
const event = new Date('December 16, 2021 18:30:00');

const nowString = now.getHours() + ":" + now.getMinutes();
const nowInt = now.getTime();
const streamInt = stream.getTime();
const eventInt = event.getTime();

let interval;
let partyTimer;


const party = () => {
    if (nowInt >= eventInt) {
        partyLights();
        WA.room.hideLayer(`rooms/room_presentation1`);
        WA.room.showLayer(`rooms/party`);
        WA.room.setProperty('rooms/room_presentation1', 'openWebsite', undefined);
        WA.room.setProperty('rooms/party', 'openWebsite', 'https://www.youtube.com/embed/9UMxZofMNbA');
    } else {
        WA.room.setProperty('rooms/room_presentation1', 'openWebsite', 'https://www.youtube.com/embed/BLcFy-0pDxY');
        WA.room.setProperty('rooms/party', 'openWebsite', undefined);
    }
}

const partyLights = (light = 1) => {
    WA.room.hideLayer(`partylights/1`);
    WA.room.hideLayer(`partylights/2`);
    WA.room.hideLayer(`partylights/3`);
    WA.room.showLayer(`partylights/${light}`);
    const newLight = light <= 2 ? light + 1 : 1
    partyTimer = setTimeout(() => { partyLights(newLight);}, 1000)
}

WA.onInit().then(async () => {
    WA.room.hideLayer(`partylights/1`);
    WA.room.hideLayer(`partylights/2`);
    WA.room.hideLayer(`partylights/3`);
    WA.room.hideLayer(`rooms/party`);

    const countdownHours = (streamInt - nowInt) / 3600000
    for (let i = 5; i > 0; i--) {
        if (countdownHours < i) {
            WA.room.hideLayer(`countdown/${i}`);
        }
    }

    // const menu = WA.ui.registerMenuCommand('Preise', {
    //     iframe: 'shop.html'
    // })

    WA.room.onEnterZone('communityspace', () => {
        if (nowInt <= eventInt) {
            WA.chat.sendChatMessage('Join the GCXMAS Quiz! https://sli.do/v5B13dcujvVXbgmabj6rgN', 'Santa');
        } else {
            WA.chat.sendChatMessage('Go down the stairs to play games.', 'Santa');
        }
    })

    party()
    interval = setInterval(() => {
        party()
    }, 10000)



    WA.room.onEnterZone('secret_trigger', () => {
        WA.room.hideLayer('secret_door_outside');
    })

    WA.room.onLeaveZone('secret_trigger', () => {
        setTimeout(() => {
            WA.room.showLayer('secret_door_outside');
        }, 2000)
    })

    const doors = [
        'elevator_door_1',
        'elevator_door_2',
        'meeting_door_1',
        'meeting_door_2',
        'meeting_door_3',
        'main_door_1'
    ];
    for (const door of doors) {
        WA.room.onEnterZone(door, () => {
            WA.room.hideLayer(`level/${door}`);
        })

        WA.room.onLeaveZone(door, () => {
            WA.room.showLayer(`level/${door}`);
        })
    }
    const isProd = !WA.room.id.match(/\.json/gi)

    WA.room.onEnterZone('gotoholzmarkt', () => {
        if (WA.player.name.match(/giga/gi) || nowInt >= streamInt) {
            isProd ? WA.nav.goToRoom('/@/grandcentrix/grandcentrix/holzmarkt') : WA.nav.goToRoom('holzmarkt.json');

        }
    })

    WA.room.onEnterZone('gotogames', () => {
        isProd ? WA.nav.goToRoom('/@/grandcentrix/grandcentrix/games') : WA.nav.goToRoom('games.json');
    })

    if (isProd) {
        const layers = await getLayersMap();
        for (const layer of layers.values()) {
            const layerProperties = new Properties(layer.properties);
            const exitUrlProd = layerProperties.getString('exitUrlProd')
            if (exitUrlProd) {
                WA.room.setProperty(layer.name, 'exitUrl', exitUrlProd);
            }
        }
    }
});