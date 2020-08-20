import React, { useState, useEffect, useCallback } from 'react';
import {Divider, Form, Header, Icon} from 'semantic-ui-react';
import useWitchRoles from './Hooks/UseWitchRoles';


type classes = 'krieger' |
    'beserker' |
    'warriormage' |
    'assassin' |
    'daemonenjaeger' |
    'kundschafter' |
    'magier';

const multiplicators = {
    'krieger': 2,
    'beserker': 2,
    'warriormage': 2,
    'assassin': 2,
    'daemonenjaeger': 2.5,
    'kundschafter': 2.5,
    'magier': 4.5,
}

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

export default function Damage(): React.ReactElement {
    const [auraLevel, setAuraLevel] = useState(1);
    const {rolesCount, setRolesCount, witchMultiplier} = useWitchRoles();
    const [characterLevel, setCharacterLevel] = useState(0);
    const [attributes, setAttributes] = useState(0);
    const [selectedClass, setSelectedClass] = useState<classes>();

    const updateBasedOnLevel = useCallback(() => {
        if(selectedClass) {
            let typeMultiplier = multiplicators[selectedClass];
            console.log(
                'Update based on level: ',
                `(${characterLevel} + 4 + ${auraLevel} * ${witchMultiplier}) * ${typeMultiplier}`
            );
            setAttributes((characterLevel + 4 + auraLevel * witchMultiplier) * typeMultiplier);
        }
    }, [selectedClass, witchMultiplier, characterLevel, auraLevel]);

    const updateBasedOnAttributes = useCallback((attributes: number) => {
        if(selectedClass) {
            let typeMultiplier = multiplicators[selectedClass];
            console.log(
                'Update based on attribtues: ',
                `${attributes} / ${typeMultiplier} - 4 - ${auraLevel} * ${witchMultiplier}`
            );
            setCharacterLevel(attributes / typeMultiplier - 4 - auraLevel * witchMultiplier);
        }
    }, [selectedClass, witchMultiplier, auraLevel]);

    useEffect(() => {
        updateBasedOnLevel();
    }, [updateBasedOnLevel]);
  
  
    return <>
        <Header>Konfiguration</Header>
        <Form>
            <Form.Field>
                Klasse
                <Form.Dropdown options={classOptions}
                               value={selectedClass}
                               className={'u-max-width'}
                               onChange={(e, {value}) => {
                    setSelectedClass(value as classes);
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
                  setAuraLevel(parseInt(value, 10));
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
                  setRolesCount(parseInt(value, 10));
              }}
            />
          </Form.Field>
          <Form.Input
              className={'u-max-width'}
              fluid
              label='Charakter Level'
              type='number'
              value={'' + characterLevel}
              min={0}
              onChange={(e, {value}) => {
                  const level = parseInt(value, 10);
                  setCharacterLevel(level);
              }}>
          </Form.Input>
        </Form>

        <Divider/>

        <Header>Ergebnis</Header>

        <Form>
            <Form.Input
                className={'u-max-width'}
                fluid
                label='Schaden'
                type='number'
                value={'' + attributes}
                min={0}
                readOnly
                onChange={(e, {value}) => {
                    setAttributes(parseInt(value, 10));
                    updateBasedOnAttributes(parseInt(value, 10));
                }}>
            </Form.Input>
        </Form>

    </>;
  }