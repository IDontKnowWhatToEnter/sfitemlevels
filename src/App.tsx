import React, {useMemo, useState} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {Divider, Header, Tab} from 'semantic-ui-react'
import Attributes from './Attributes';
import Damage from "./Damage";
import CommonConfig from "./CommonConfig";
import ConfigContext, {ConfigContextData} from "./ConfigContext";
import useSaveStateData from "./Hooks/UseSaveStateData";

function App() {
  const panes = useMemo(() => [
    {
      menuItem: 'Attribute',
      render: () => <Attributes/>
    },
    {
      menuItem: 'Schaden',
      render: () => <Damage/>
    },
  ], []);

  const {data, patch: patchSaveState} = useSaveStateData();

  
  return <div className='main'>
    <ConfigContext.Provider value={{
      ...data,
      patch: (data) => {patchSaveState(data)}
    }}>
      <Header color={'blue'} as={'h1'}>Shakes and Fidget Rechner</Header>

      <CommonConfig/>

      <Divider hidden/>

      <Tab panes={panes}/>
    </ConfigContext.Provider>
  </div>;
}

export default App;
