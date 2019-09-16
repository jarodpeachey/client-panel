import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Person from '@material-ui/icons/Person';

class Clients extends Component {
  static propTypes = {};

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {}

  shouldComponentUpdate () {}

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
      <>
        {clients ? (
          <>
            <div>
              <h2 className="m-none display-flex align-left v-align-center">
                <Person
                  style={{
                    height: 15,
                    width: 15,
                    fontSize: 15,
                  }}
                />
                <Person
                  style={{
                    height: 35,
                    width: 35,
                    fontSize: 35,
                    position: 'relative',
                    right: 10,
                  }}
                />
                <Person
                  style={{
                    height: 15,
                    width: 15,
                    fontSize: 15,
                    position: 'relative',
                    right: 20,
                    marginRight: -10,
                  }}
                />
                {' '}
                Clients
              </h2>
            </div>
          </>
        ) : (
          <h3>This is the clients area.</h3>
        )}
      </>
    );
  }
}

export default Clients;
