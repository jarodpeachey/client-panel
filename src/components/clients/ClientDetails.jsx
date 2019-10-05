import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { LinearProgress, Card, CardContent } from '@material-ui/core';

class ClientDetails extends Component {
  static propTypes = {

  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ client: nextProps.client });
  }

  shouldComponentUpdate (nextState) {
    if (this.state.client !== nextState.client) {
      return true;
    }
    return false;
  }

  render () {
    console.log(this.props);
    const { client } = this.state;

    return (
      <>
        {client ? (
          <>
            <h1>
              Client Details
              {' '}
              -
              {' '}
              {client.firstName}
              {' '}
              {client.lastName}
            </h1>
            <Card>
              <CardContent>
                Client ID:
                {' '}
                {client.id}
              </CardContent>
            </Card>
          </>
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
