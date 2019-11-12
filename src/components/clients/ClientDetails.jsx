import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { firestoreConnect } from 'react-redux-firebase';
import {
  LinearProgress,
  Card,
  CardContent,
  CardHeader,
  withStyles,
  withTheme,
} from '@material-ui/core';

class ClientDetails extends Component {
  static propTypes = {
    firestore: PropTypes.object,
    client: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {}

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
    const { classes } = this.props;

    return (
      <>
        {client ? (
          <>
            <Helmet
              title={`Client Details - ${client.firstName} ${client.lastName}`}
            />
            <Card>
              <CardHeader
                title={(
                  <h2 className="m-none">
                    Client Details -
                    {' '}
                    {client.firstName}
                    {' '}
                    {client.lastName}
                  </h2>
                )}
                classes={{ root: classes.cardHeader }}
              />
              <CardContent>
                <div className="row mobile">
                  <div className="col col-8">
                    <h3>
                      Client ID:
                      {client.id}
                    </h3>
                  </div>
                  <div className="col col-4">
                    <div className="float-right">
                      <h3>
Balance: $
                        {parseFloat(client.balance).toFixed(2)}
                      </h3>
                    </div>
                  </div>
                </div>
                <hr />
                <CollectionItem>
                  Contact Email:
                  {client.email}
                </CollectionItem>
                <CollectionItem>
                  Contact Phone:
                  {client.phone}
                </CollectionItem>
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

const styles = theme => ({});

const CollectionItem = styled.div`
  background: #eee;
  padding: 8px;
  margin: 8px 0;
  border-radius: 1px;
`;

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id },
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0],
  })),
)(withTheme(withStyles(styles)(ClientDetails)));
