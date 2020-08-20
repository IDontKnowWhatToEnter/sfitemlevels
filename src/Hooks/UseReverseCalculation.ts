import {useContext, useMemo} from 'react';
import ConfigContext from "../ConfigContext";
import useWitchMultiplier from "./UseWitchMultiplier";

export default function useReverseCalculation(value: number, multiplier: number): number {
    const {
        rolesCount,
        auraLevel
    } = useContext(ConfigContext);
    const witchMultiplier = useWitchMultiplier(rolesCount);

    return useMemo(() => {
        if(multiplier) {
            console.log(
                'Update based on attribtues: ',
                `${value} / ${multiplier} - 4 - ${auraLevel} * ${witchMultiplier}`
            );
            return Math.max(value / multiplier - auraLevel * witchMultiplier - 4, 0);
        }
        return 0;
    }, [value, multiplier, witchMultiplier, auraLevel]);
}