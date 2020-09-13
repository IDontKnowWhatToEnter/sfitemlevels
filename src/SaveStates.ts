import {classes} from "./Interfaces";
import {AvailableItemTypes} from "./Attributes";
import defaultsDeep from 'lodash/defaultsDeep';

export interface SaveStateData {
    selectedClass: classes;
    auraLevel: number;
    rolesCount: number;
    characterLevel: number;
    selectedItemType: AvailableItemTypes;
}

export interface SaveState {
    name: string;
    data: SaveStateData
}

type SaveStates = SaveState[];
let subscribers: Array<(newData: SaveState) => void> = [];

const states = window.localStorage.getItem('saveStates');


const defaultState: SaveState = {
    name: 'default',
    data: {
        selectedClass: 'assassin',
        auraLevel: 0,
        rolesCount: 0,
        characterLevel: 0,
        selectedItemType: 'epic3'
    }
};

let parsedStates: SaveStates = [defaultState];
let currentState = 0;

if(states) {
    parsedStates = JSON.parse(states);
    parsedStates.forEach((state) => defaultsDeep(state, defaultState));
}

export function getSaveStates(): SaveStates {
    return parsedStates;
}
export function getSaveStateData(idx: number): SaveStateData {
    return parsedStates[idx].data;
}

export function saveStateData(idx: number, data: Partial<SaveStateData>) {
    parsedStates[idx].data = {
        ...parsedStates[idx].data,
        ...data
    };

    localStorage.setItem('saveStates', JSON.stringify(parsedStates));
    subscribers.forEach((subscriber) => subscriber(parsedStates[idx]));
}

export function listen(callback: (newData: SaveState) => void) {
    subscribers.push(callback);
}

export function unsubscribe(callback:  (newData: SaveState) => void) {
    const index = subscribers.indexOf(callback);
    delete subscribers[index];
    subscribers = subscribers.filter((subscriber) => subscriber);
}