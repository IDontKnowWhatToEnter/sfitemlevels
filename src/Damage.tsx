import React, {useState, useContext} from 'react';
import {Form, Header, Tab} from 'semantic-ui-react';
import ConfigContext from "./ConfigContext";
import useCalculation from "./Hooks/UseCalculation";
import useReverseCalculation from "./Hooks/UseReverseCalculation";


const multiplicators = {
    'krieger': 2,
    'beserker': 2,
    'warriormage': 2,
    'assassin': 2,
    'daemonenjaeger': 2.5,
    'kundschafter': 2.5,
    'magier': 4.5,
}

export default function Damage(): React.ReactElement {
    const {
        selectedClass,
        characterLevel,
        patch
    } = useContext(ConfigContext);

    const multiplicator = multiplicators[selectedClass];
    const damageValue = useCalculation(characterLevel, multiplicator);


    const [damageInput, setDamageInput] = useState(0);
    const reversedCharacterLevel = useReverseCalculation(damageInput, multiplicator);


    return <Tab.Pane>
        <Header color={'blue'}>Level -> Schaden</Header>

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
                <i>
                    <b>Schaden: {damageValue}</b>
                </i>
            </div>
        </div>


        <Header color={'blue'}>Schaden -> Level</Header>

        <div className={'u-flex-row'}>
            <div className={'u-width-half u-padding-right'}>
                <Form>
                    <Form.Input
                        className={'u-max-width'}
                        fluid
                        label={'Schaden'}
                        type='number'
                        value={'' + damageInput}
                        min={0}
                        onChange={(e, {value}) => {
                            setDamageInput(parseInt(value, 10));
                        }}>
                    </Form.Input>
                </Form>
            </div>

            <div className={'u-width-half'}>
                <i>
                    <b>Level: {reversedCharacterLevel}</b>
                </i>
            </div>
        </div>
    </Tab.Pane>;
}