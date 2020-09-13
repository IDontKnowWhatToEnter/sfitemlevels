import {Button, Form, Header, Icon, Modal, Table} from "semantic-ui-react";
import React, {useContext, useMemo} from "react";
import {classes} from "./Interfaces";
import ConfigContext from "./ConfigContext";
import useSaveState from "./Hooks/UseSaveState";
import CharacterNameInput from "./CharacterNameInput";
import './CommonConfig.css';

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
    const {data,selectedStateIndex, patchSelectedIndex, addNew, remove} = useSaveState();

    const selectedCharacterOptions = useMemo(() => {
        return data.map((state, idx) => ({
            key: idx,
            value: idx,
            text: state.name
        }))
    }, [data]);

    return <Form>
        <Form.Field>
            Charakter
            <div className={'u-flex-row'}>
                <Form.Dropdown options={selectedCharacterOptions}
                               className={'commonConfig-characterDropdown'}
                               value={selectedStateIndex}
                               onChange={(e, {value}) => {
                                   patchSelectedIndex(value as number);
                               }} selection/>
               <Modal trigger={
                   <Icon name={'pencil square'} color={'blue'} size={'big'} className={'commonConfig-characterDropdownEditIcon'}/>
               } closeIcon>
                   <Modal.Content>
                       <Header color={'blue'}>Charaktere</Header>

                       <Table compact unstackable>
                           <colgroup>
                               <col style={{width: '100%'}}/>
                               <col style={{width: '45px'}}/>
                           </colgroup>
                           <Table.Header>
                               <Table.Row>
                                   <Table.HeaderCell>
                                       Name
                                   </Table.HeaderCell>
                                   <Table.HeaderCell></Table.HeaderCell>
                               </Table.Row>
                           </Table.Header>
                           <Table.Body>
                               {data.map((saveState, idx: number) => {
                                   return <Table.Row key={idx}>
                                       <Table.Cell>
                                           <CharacterNameInput saveStateIndex={idx}/>
                                       </Table.Cell>
                                       <Table.Cell>
                                           <Icon name={'minus circle'} color={'red'} onClick={() => {
                                               remove(idx);
                                           }}/>
                                       </Table.Cell>
                                   </Table.Row>;
                               })}
                           </Table.Body>
                       </Table>
                       <Button color={'green'} onClick={() => {
                           addNew();
                       }}>Neuen Charakter erstellen</Button>
                   </Modal.Content>
               </Modal>

            </div>
        </Form.Field>
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