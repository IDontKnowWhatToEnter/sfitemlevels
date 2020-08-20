import React from "react";
import {classes} from "./Interfaces";

export interface ConfigContextData {
    selectedClass: classes,
    auraLevel: number,
    rolesCount: number,
}

export interface ConfigContext extends ConfigContextData {
    patch: (data: Partial<ConfigContextData>) => void;
}

export default React.createContext<ConfigContext>({
    patch: (data) => {},
    selectedClass: "assassin",
    auraLevel: 0,
    rolesCount: 0
});