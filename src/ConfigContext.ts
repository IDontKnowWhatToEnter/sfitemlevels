import React from "react";
import {classes} from "./Interfaces";
import {AvailableItemTypes} from "./Attributes";

export interface ConfigContextData {
    selectedClass: classes,
    auraLevel: number,
    rolesCount: number,
    characterLevel: number;
    selectedItemType: AvailableItemTypes;
}

export interface ConfigContext extends ConfigContextData {
    patch: (data: Partial<ConfigContextData>) => void;
}

export default React.createContext<ConfigContext>({
    patch: (data) => {},
    selectedClass: "assassin",
    auraLevel: 0,
    rolesCount: 0,
    characterLevel: 0,
    selectedItemType: "epic3"
});