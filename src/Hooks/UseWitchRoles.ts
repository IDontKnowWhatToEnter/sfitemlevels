import { useState, useMemo } from 'react';

export default function useWitchRoles(): {
    rolesCount: number;
    setRolesCount: (count: number) => void;
    witchMultiplier: number;
} {
    const [rolesCount, setRolesCount] = useState(0);
    const witchMultiplier = useMemo(() => {
        if(rolesCount < 3) {
            return 1;
        } else {
            return 2 + (0.1667 * (rolesCount - 3) );
        }
    }, [rolesCount]);

    return {
        rolesCount,
        setRolesCount,
        witchMultiplier
    };
}