import {classes} from "./Interfaces";
import {AvailableItemTypes} from "./Attributes";
import defaultsDeep from 'lodash/defaultsDeep';
import cloneDeep from 'lodash/cloneDeep';

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

export function getCurrentStateIndex(): number {
    return currentState;
}

export function getSaveStates(): SaveStates {
    return parsedStates;
}
export function getSaveStateData(): SaveStateData {
    return parsedStates[currentState].data;
}

export function saveStateData(data: Partial<SaveStateData>) {
    parsedStates[currentState].data = cloneDeep({
        ...parsedStates[currentState].data,
        ...data
    });

    localStorage.setItem('saveStates', JSON.stringify(parsedStates));
    notifySubscribers();
}

export function saveNameOfState(idx: number, name: string) {
    parsedStates[idx].name = name;
    parsedStates = cloneDeep(parsedStates);

    localStorage.setItem('saveStates', JSON.stringify(parsedStates));
    notifySubscribers();
}

export function addNew() {
    parsedStates.push(cloneDeep(defaultState));
    parsedStates = cloneDeep(parsedStates);
    localStorage.setItem('saveStates', JSON.stringify(parsedStates));
    notifySubscribers();
}

export function removeState(idx: number) {
    currentState = 0;
    parsedStates = cloneDeep(parsedStates);
    parsedStates.splice(idx, 1);
    localStorage.setItem('saveStates', JSON.stringify(parsedStates));
    notifySubscribers();
}

function notifySubscribers(): void {
    subscribers.forEach((subscriber) => subscriber(parsedStates[currentState]));
}

export function listen(callback: (newData: SaveState) => void) {
    subscribers.push(callback);
}

export function unsubscribe(callback:  (newData: SaveState) => void) {
    const index = subscribers.indexOf(callback);
    delete subscribers[index];
    subscribers = subscribers.filter((subscriber) => subscriber);
}

export function changeSelectedState(newIdx: number): void {
    currentState = newIdx;
    notifySubscribers();
}