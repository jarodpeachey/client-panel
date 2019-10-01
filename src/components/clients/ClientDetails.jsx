import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';
import { withStyles, Button, Card, LinearProgress } from '@material-ui/core';
import Person from '@material-ui/icons/Person';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class ClientDetails extends Component {
  static propTypes = {
    classes: PropTypes.object,
    // firestore: PropTypes.object.isRequired,
    // clients: PropTypes.array,
  };

  constructor (props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount () {

  }

  shouldComponentUpdate (nextProps) {
    if (this.props.client !== nextProps.client && this.props.client) {
      return true;
    }
    return false;
  }

  render () {
    const { classes, client } = this.props;
    console.log('Client: ', client);

    return (
      <>
        {client ? (
          <h1>Client Details</h1>
        ) : (
          <>
            {!client ? (
              <>
                <div className="center-text mb-md">
                  <h3>Loading client details...</h3>
                </div>
                <LinearProgress />
              </>
            ) : (
              <div className="center-text">
                <h3>Sorry, there was an error fetching your clients.</h3>
              </div>
            )}
          </>
        )}
      </>
    );
  }
}

const styles = () => ({

});

const mapStateToProps = state => ({
  client: state.firestore.ordered.client && state.firestore.ordered.client[0],
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id },
  ]),
)(withStyles(styles)(ClientDetails));
