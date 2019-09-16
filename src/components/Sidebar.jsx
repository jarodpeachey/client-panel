import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

class Sidebar extends Component {
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
    return (
      <Link to="/client/add">
        <Button color="primary" variant="contained">
          New Client
        </Button>
      </Link>
    );
  }
}

export default Sidebar;
