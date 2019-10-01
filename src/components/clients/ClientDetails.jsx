import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { LinearProgress } from '@material-ui/core';

class ClientDetails extends Component {
  static propTypes = {

  };

  constructor (props) {
    super(props);
    this.state = {};
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
    console.log(this.props);
    const { client } = this.props;
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

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id },
  ]),
  connect(({ firestore: { data } }, props) => ({
    client: data.client,
  })),
)(ClientDetails);
