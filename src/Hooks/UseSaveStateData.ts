import {useCallback, useEffect, useState} from 'react';
import {getSaveStateData, listen, SaveState, saveStateData, SaveStateData, unsubscribe} from "../SaveStates";

export default function useSaveStateData(): { data: SaveStateData, patch: (data: Partial<SaveStateData>) => void } {
    const [saveData, setSaveData] = useState<SaveStateData>(() => getSaveStateData());

    const patch = useCallback((data: Partial<SaveStateData>) => {
        saveStateData(data);
    }, []);

    useEffect(() => {
        const callback = ({data}: SaveState) => {
            setSaveData(data);
        };
        listen(callback);

        return () => {
            unsubscribe(callback);
        }
    }, []);
    return {
        data: saveData,
        patch
    };
}