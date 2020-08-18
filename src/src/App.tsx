import React, { useState, useMemo } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {Header, Form, Radio, Tab} from 'semantic-ui-react'
import Attributes from './Attributes';

function Damage(): React.ReactElement {
  return <Tab.Pane>Damage</Tab.Pane>;
}
function Armour(): React.ReactElement {
  return <Tab.Pane>Armour</Tab.Pane>;
}


function App() {;
  const panes = useMemo(() => [
    {
      menuItem: 'Attributes',
      render: () => <Attributes/>
    },
    {
      menuItem: 'Damage',
      render: Damage
    },
    {
      menuItem: 'Armour',
      render: Armour
    },
  ], []);
  
  return <div className='main'>
    <Header>Shakes and Fidget Item Level Calculator</Header>
    <Tab panes={panes}/>
  </div>;
}

export default App;
