import {useContext, useMemo} from 'react';
import ConfigContext from "../ConfigContext";
import useWitchMultiplier from "./UseWitchMultiplier";

export default function useCalculation(characterLevel: number, multiplier: number): number {
    const {
        rolesCount,
        auraLevel
    } = useContext(ConfigContext);
    const witchMultiplier = useWitchMultiplier(rolesCount);

    return useMemo(() => {
        if(multiplier) {
            console.log(
                'Calculation: ',
                `(${characterLevel} + 4 + ${auraLevel} * ${witchMultiplier}) * ${multiplier}`
            );
            return Math.max((characterLevel + 4 + auraLevel * witchMultiplier) * multiplier, 0);
        }
        return 0;
    }, [characterLevel, multiplier, witchMultiplier, auraLevel]);
}