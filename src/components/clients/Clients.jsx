import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Clients extends Component {
  static propTypes = {

  };

  constructor (props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount () {

  }

  shouldComponentUpdate () {

  }

  render () {
    const clients = [
      {
        id: 12323516,
        firstName: 'Kevin',
        lastName: 'Johnson',
        email: 'kevin@mail.com',
        phone: '111-123-1234',
        balance: 150,
      },
      {
        id: 12323516,
        firstName: 'James',
        lastName: 'White',
        email: 'james@mail.com',
        phone: '432-1321-111',
        balance: 100,
      },
    ];

    return (
      <h3>This is the clients area.</h3>
    );
  }
}

export default Clients;
