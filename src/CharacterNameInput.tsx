import React, {useState} from "react";
import useSaveState from "./Hooks/UseSaveState";
import {Input} from "semantic-ui-react";

export default function CharacterNameInput({saveStateIndex}: {saveStateIndex:  number}): React.ReactElement {
    const {data, patchName} = useSaveState();
    const [name, setName] = useState(data[saveStateIndex].name);

    return <Input value={name} onChange={(e, {value}) => {
        setName(value);
    }} onBlur={() => {
        patchName(saveStateIndex, name)
    }}/>
}