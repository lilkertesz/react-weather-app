import React from 'react'
import { Tab } from 'semantic-ui-react'
import Registration from './Registration';
import Login from './Login';

const tabStyle = {
    margin: "auto",
    width: "500px",
    paddingTop: "20px"
  };

const panes = [
  { menuItem: 'Login', render: () => <Tab.Pane><Login/></Tab.Pane> },
  { menuItem: 'Register', render: () => <Tab.Pane><Registration/></Tab.Pane> },
]

const RegistrationTab = () => <Tab panes={panes} style={tabStyle}/>

export default RegistrationTab;