import React, { useState, useEffect, useCallback } from 'react';
import {Divider, Form, Header, Icon, Radio} from 'semantic-ui-react';
import useWitchRoles from './Hooks/UseWitchRoles';

type AvailableItemTypes = 'normal' | 'epic3' | 'epic5';

const typeMultipliers = {
  'normal': 2,
  'epic3': 1.2,
  'epic5': 1
}

export default function Attributes(): React.ReactElement {
    const [selectedType, setSelectedType] = useState<AvailableItemTypes>();
    const [isSpecificWeaponType, setIsSpecificWeaponType] = useState(false);
    const [auraLevel, setAuraLevel] = useState(1);
    const {rolesCount, setRolesCount, witchMultiplier} = useWitchRoles();
    const [characterLevel, setCharacterLevel] = useState(0);
    const [attributes, setAttributes] = useState(0);

    const updateBasedOnLevel = useCallback(() => {
        if(selectedType) {
            let typeMultiplier = typeMultipliers[selectedType];
            if(isSpecificWeaponType) {
                typeMultiplier *= 2;
            }
            console.log(
                'Update based on level: ',
                `(${characterLevel} + 4 + ${auraLevel} * ${witchMultiplier}) * ${typeMultiplier}`
            );
            setAttributes((characterLevel + 4 + auraLevel * witchMultiplier) * typeMultiplier);
        }
    }, [selectedType, witchMultiplier, characterLevel, isSpecificWeaponType, auraLevel]);

    const updateBasedOnAttributes = useCallback((attributes: number) => {
        if(selectedType) {
            let typeMultiplier = typeMultipliers[selectedType];
            if(isSpecificWeaponType) {
                typeMultiplier *= 2;
            }
            console.log(
                'Update based on attribtues: ',
                `${attributes} / ${typeMultiplier} - 4 - ${auraLevel} * ${witchMultiplier}`
            );
            setCharacterLevel(attributes / typeMultiplier - 4 - auraLevel * witchMultiplier);
        }
    }, [selectedType, witchMultiplier, isSpecificWeaponType, auraLevel]);

    useEffect(() => {
        updateBasedOnLevel();
    }, [updateBasedOnLevel]);
  
  
    return <>
        <Header>Konfiguration</Header>
        <Form>
          <Form.Field>
            Item Typ:
          </Form.Field>
          <Form.Field>
            <Radio
              label='Normal'
              name='itemType'
              value='normal'
              checked={selectedType === 'normal'}
              onChange={(e, {value}) => {
                  setSelectedType(value as AvailableItemTypes);
              }}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Epic mit 3 Attributen'
              name='itemType'
              value='epic3'
              checked={selectedType === 'epic3'}
              onChange={(e, {value}) => {
                  setSelectedType(value as AvailableItemTypes);
              }}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Epic mit 5 Attributen'
              name='itemType'
              value='epic5'
              checked={selectedType === 'epic5'}
              onChange={(e, {value}) => {
                  setSelectedType(value as AvailableItemTypes);
              }}
            />
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
              label='Hexen Rollen'
              className={'u-max-width'}
              type='number'
              value={'' + rolesCount}
              min={0}
              onChange={(e, {value}) => {
                  setRolesCount(parseInt(value, 10));
              }}
            />
          </Form.Field>
          <Form.Field>
            <Form.Checkbox
              label='Ist eine Zweihand Waffe'
              checked={isSpecificWeaponType}
              onChange={() => {
                  setIsSpecificWeaponType(!isSpecificWeaponType);
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
                label='Attribute'
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