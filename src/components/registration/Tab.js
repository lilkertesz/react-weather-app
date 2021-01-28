import React from 'react'
import { Tab } from 'semantic-ui-react'
import Registration from './Registration';
import Login from './Login';

const panes = [
  { menuItem: 'Register', render: () => <Tab.Pane><Registration/></Tab.Pane> },
  { menuItem: 'Login', render: () => <Tab.Pane><Login/></Tab.Pane> },
]

const RegistrationTab = () => <Tab panes={panes} />

export default RegistrationTab;