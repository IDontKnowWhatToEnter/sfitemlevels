import {Form} from "semantic-ui-react";
import React, {useContext} from "react";
import {classes} from "./Interfaces";
import ConfigContext from "./ConfigContext";

const classOptions = [
    {
        key: 'assassin',
        value: 'assassin',
        text: 'Assassin',
    },
    {
        key: 'beserker',
        value: 'beserker',
        text: 'Beserker',
    },
    {
        key: 'daemonenjaeger',
        value: 'daemonenjaeger',
        text: 'Dämonenjäger',
    },
    {
        key: 'warriormage',
        value: 'warriormage',
        text: 'Kampfmagier',
    },
    {
        key: 'krieger',
        value: 'krieger',
        text: 'Krieger',
    },
    {
        key: 'kundschafter',
        value: 'kundschafter',
        text: 'Kundschafter',
    },
    {
        key: 'magier',
        value: 'magier',
        text: 'Magier',
    },
]

export default function CommonConfig(): React.ReactElement {
    const {selectedClass, rolesCount, auraLevel, patch} = useContext(ConfigContext);

    return <Form>
        <Form.Field>
            Klasse
            <Form.Dropdown options={classOptions}
                           value={selectedClass}
                           className={'u-max-width'}
                           onChange={(e, {value}) => {
                               patch({selectedClass: value as classes});
                           }} selection/>
        </Form.Field>
        <Form.Field>
            <Form.Input
                label='Aura Level'
                type='number'
                className={'u-max-width'}
                value={'' + auraLevel}
                min={1}
                onChange={(e, {value}) => {
                    patch({auraLevel: parseInt(value, 10)});
                }}
            />
        </Form.Field>
        <Form.Field>
            <Form.Input
                className={'u-max-width'}
                label='Hexen Rollen'
                type='number'
                value={'' + rolesCount}
                min={0}
                onChange={(e, {value}) => {
                    patch({rolesCount: parseInt(value, 10)});
                }}
            />
        </Form.Field>
    </Form>
}