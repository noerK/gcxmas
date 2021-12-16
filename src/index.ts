/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));




let currentPopup: any = undefined;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();



WA.room.onEnterZone('nyan', () => {
    currentPopup =  WA.ui.openPopup("clockPopup","It's " + time,[]);
})

WA.room.onLeaveZone('nyan', closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}


WA.room.onEnterZone('communityspace', () => {
    currentPopup =  WA.ui.openPopup("livestream", ".", []);
})

WA.room.onLeaveZone('nyan', closePopUp)

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



WA.chat.sendChatMessage('Join the GCXMAS Quiz! https://sli.do/v5B13dcujvVXbgmabj6rgN', 'Santa');

WA.room.onEnterZone('gotoholzmarkt', () => {
    console.log('WA.player.name', WA.player.name)
    if(WA.player.name === 'gigagiga') {
        WA.nav.goToRoom('holzmarkt.json');
    }
})


const menu = WA.ui.registerMenuCommand('Preise',
    {
        iframe: 'shop.html'
    })
