import React, { useMemo } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {Header, Tab} from 'semantic-ui-react'
import Attributes from './Attributes';
import Damage from "./Damage";

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
  
  return <div className='main'>
    <Header>Shakes and Fidget Rechner</Header>
    <Tab panes={panes} menu={{secondary: true, pointing: true}}/>
  </div>;
}

export default App;
