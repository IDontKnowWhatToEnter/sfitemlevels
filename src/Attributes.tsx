import React, {useState, useContext} from 'react';
import {Divider, Form, Header, Radio, Tab} from 'semantic-ui-react';
import ConfigContext from "./ConfigContext";
import useCalculation from "./Hooks/UseCalculation";
import useReverseCalculation from "./Hooks/UseReverseCalculation";

export type AvailableItemTypes = 'normal' | 'epic3' | 'epic5';

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
        selectedClass,
        characterLevel,
        patch,
        selectedItemType
    } = useContext(ConfigContext);
    const seperateWeaponCalc = usesTwoHandedWeapons.includes(selectedClass);

    const typeMultiplier = selectedItemType ? typeMultipliers[selectedItemType] : 0;
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
              checked={selectedItemType === 'normal'}
              onChange={(e, {value}) => {
                  patch({selectedItemType: value as AvailableItemTypes});
              }}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Epic mit 3 Attributen'
              name='itemType'
              value='epic3'
              checked={selectedItemType === 'epic3'}
              onChange={(e, {value}) => {
                  patch({selectedItemType: value as AvailableItemTypes});
              }}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Epic mit 5 Attributen'
              name='itemType'
              value='epic5'
              checked={selectedItemType === 'epic5'}
              onChange={(e, {value}) => {
                  patch({selectedItemType: value as AvailableItemTypes});
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
                            patch({characterLevel: level});
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