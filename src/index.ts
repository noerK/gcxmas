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




WA.onInit().then(async () => {
    const countdownHours = (streamInt - nowInt) / 3600000
    for (let i = 5; i > 0; i--) {
        if (countdownHours < i) {
            WA.room.hideLayer(`countdown/${i}`);
        }
    }

    const menu = WA.ui.registerMenuCommand('Preise', {
        iframe: 'shop.html'
    })


    WA.room.onEnterZone('nyan2', () => {
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + nowString, []);
    })

    WA.room.onLeaveZone('nyan2', closePopUp)

    function closePopUp() {
        if (currentPopup !== undefined) {
            currentPopup.close();
            currentPopup = undefined;
        }
    }


    WA.room.onEnterZone('communityspace', () => {
        WA.chat.sendChatMessage('Join the GCXMAS Quiz! https://sli.do/v5B13dcujvVXbgmabj6rgN', 'Santa');
    })

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