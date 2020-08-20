import { useMemo } from 'react';

export default function useWitchMultiplier(rolesCount: number): number {
    return useMemo(() => {
        if(rolesCount < 3) {
            return 1;
        } else {
            return 2 + (0.1667 * (rolesCount - 3) );
        }
    }, [rolesCount]);
}