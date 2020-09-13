import {useCallback, useEffect, useState} from 'react';
import {
    changeSelectedState,
    addNew as addNewSaveState,
    getCurrentStateIndex,
    getSaveStates,
    listen, saveNameOfState,
    SaveState,
    unsubscribe, removeState
} from "../SaveStates";

export default function useSaveState(): {
    data: SaveState[],
    selectedStateIndex: number,
    patchSelectedIndex: (idx: number) => void,
    patchName: (idx: number, name: string) => void,
    addNew: () => void,
    remove: (idx: number) => void
} {
    const [saveData, setSaveData] = useState<SaveState[]>(() => getSaveStates());
    const [selectedStateIndex, setSelectedStateIndex] = useState<number>(() => getCurrentStateIndex());

    const patchSelectedIndex = useCallback((selectedIndex: number) => {
        changeSelectedState(selectedIndex);
    }, []);
    const addNew = useCallback(() => {
        addNewSaveState();
    }, []);
    const patchName = useCallback((idx: number, name: string) => {
        saveNameOfState(idx, name);
    }, []);
    const remove = useCallback((idx: number) => {
        removeState(idx);
    }, []);

    console.log(saveData);

    useEffect(() => {
        const callback = () => {
            console.log(getSaveStates());
            setSaveData(getSaveStates());
            setSelectedStateIndex(getCurrentStateIndex());
        };
        listen(callback);

        return () => {
            unsubscribe(callback);
        }
    }, []);

    return {
        data: saveData,
        selectedStateIndex,
        patchSelectedIndex,
        patchName,
        addNew,
        remove
    };
}