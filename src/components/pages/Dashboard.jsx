import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Clients from '../clients/Clients';

class Dashboard extends React.Component {
  render () {
    return (
      <div>
        <Clients database={this.props.database} />
      </div>
    );
  }
}

export default Dashboard;

