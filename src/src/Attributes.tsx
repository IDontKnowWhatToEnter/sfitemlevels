import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {Header, Divider, Form, Radio, Tab} from 'semantic-ui-react';


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
    const [rolesCount, setRolesCount] = useState(0);
    const [characterLevel, setCharacterLevel] = useState(0);
    const [attributes, setAttributes] = useState(0);
    const witchMultiplier = useMemo(() => {
      if(rolesCount < 3) {
        return 1;
      } else {
        return 2 + (0.1667 * (rolesCount - 3) );
      }
    }, [rolesCount]);

    useEffect(() => {
      if(selectedType) {
        let typeMultiplier = typeMultipliers[selectedType];
        if(isSpecificWeaponType) {
          typeMultiplier *= 2;
        }
        console.log(`(${characterLevel} + 4 + ${auraLevel} * ${witchMultiplier}) * ${typeMultiplier}`);
        setAttributes((characterLevel + 4 + auraLevel * witchMultiplier) * typeMultiplier);
      }
    }, [selectedType, witchMultiplier, rolesCount, characterLevel, isSpecificWeaponType, auraLevel]);
  
  
    return <Tab.Pane>
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
              onChange={(e, {value}) => setSelectedType(value as AvailableItemTypes)}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Epic mit 3 Attributen'
              name='itemType'
              value='epic3'
              checked={selectedType === 'epic3'}
              onChange={(e, {value}) => setSelectedType(value as AvailableItemTypes)}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Epic mit 5 Attributen'
              name='itemType'
              value='epic5'
              checked={selectedType === 'epic5'}
              onChange={(e, {value}) => setSelectedType(value as AvailableItemTypes)}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              label='Aura Level'
              type='number'
              value={'' + auraLevel}
              min={1}
              onChange={(e, {value}) => setAuraLevel(parseInt(value, 10))}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              label='Hexen Rollen'
              type='number'
              value={'' + rolesCount}
              min={0}
              onChange={(e, {value}) => setRolesCount(parseInt(value, 10))}
            />
          </Form.Field>
          <Form.Field>
            <Form.Checkbox
              label='Ist eine Zweihand Waffe'
              checked={isSpecificWeaponType}
              onChange={() => setIsSpecificWeaponType(!isSpecificWeaponType)}
            />
          </Form.Field>
          <Form.Input
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

        <Form>
          <Form.Input
              label='Attributes'
              type='number'
              value={'' + attributes}
              min={0}
              readOnly
              onChange={(e, {value}) => {
                setAttributes(parseInt(value, 10));
              }}>
          </Form.Input>
        </Form>
    </Tab.Pane>;
  }