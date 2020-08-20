import React, {useState, useContext} from 'react';
import {Divider, Form, Header, Radio, Tab} from 'semantic-ui-react';
import ConfigContext from "./ConfigContext";
import useCalculation from "./Hooks/UseCalculation";
import useReverseCalculation from "./Hooks/UseReverseCalculation";

type AvailableItemTypes = 'normal' | 'epic3' | 'epic5';

const typeMultipliers = {
  'normal': 2,
  'epic3': 1.2,
  'epic5': 1
}


const usesTwoHandedWeapons = [
    'daemonenjaeger',
    'warriormage',
    'magier',
    'kundschafter',
];

export default function Attributes(): React.ReactElement {
    const {
        selectedClass
    } = useContext(ConfigContext);
    const seperateWeaponCalc = usesTwoHandedWeapons.includes(selectedClass);

    const [selectedType, setSelectedType] = useState<AvailableItemTypes>();
    const [characterLevel, setCharacterLevel] = useState(0);
    const typeMultiplier = selectedType ? typeMultipliers[selectedType] : 0;
    const attributes = useCalculation(characterLevel, typeMultiplier);
    const attributeTwoHanded = useCalculation(characterLevel, typeMultiplier * 2);


    const [attributesInputArmor, setAttributesInputArmor] = useState(0);
    const [attributesInputWeapon, setAttributesInputWeapon] = useState(0);

    const characterLevelArmor = useReverseCalculation(attributesInputArmor, typeMultiplier);
    const characterLevelWeapon = useReverseCalculation(attributesInputWeapon, typeMultiplier * 2);

    return <Tab.Pane>
        <Header color={'blue'}>Konfiguration</Header>
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
        </Form>

        <Divider/>

        <Header color={'blue'}>Level -> Attribute</Header>

        <div className={'u-flex-row'}>
            <div className={'u-width-half u-padding-right'}>
                <Form>
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
            </div>

            <div className={'u-width-half'}>
                {seperateWeaponCalc && <>
                    <i>
                        <b>Rüstung: {attributes}</b>
                    </i>
                    <br/>
                    <i>
                        <b>Waffe: {attributeTwoHanded}</b>
                    </i>
                </>
                }
                {!seperateWeaponCalc && <>
                    <i>
                        <b>Attribute: {attributes}</b>
                    </i>
                </>
                }
            </div>
        </div>


        <Header color={'blue'}>Attribute -> Level</Header>

        <div className={'u-flex-row'}>
            <div className={'u-width-half u-padding-right'}>
                <Form>
                    <Form.Input
                        className={'u-max-width'}
                        fluid
                        label={seperateWeaponCalc ? 'Rüstung' : 'Attribute'}
                        type='number'
                        value={'' + attributesInputArmor}
                        min={0}
                        onChange={(e, {value}) => {
                            setAttributesInputArmor(parseInt(value, 10));
                        }}>
                    </Form.Input>
                </Form>
            </div>

            <div className={'u-width-half'}>
                <i>
                    <b>Level: {characterLevelArmor}</b>
                </i>
            </div>
        </div>
        {seperateWeaponCalc &&<>
            <Divider hidden/>
            <div className={'u-flex-row'}>
                <div className={'u-width-half u-padding-right'}>
                    <Form>
                        <Form.Input
                            className={'u-max-width'}
                            fluid
                            label={'Waffe'}
                            type='number'
                            value={'' + attributesInputWeapon}
                            min={0}
                            onChange={(e, {value}) => {
                                setAttributesInputWeapon(parseInt(value, 10));
                            }}>
                        </Form.Input>
                    </Form>
                </div>

                <div className={'u-width-half'}>
                    <i>
                        <b>Level: {characterLevelWeapon}</b>
                    </i>
                </div>
            </div>
        </>
        }

    </Tab.Pane>;
  }