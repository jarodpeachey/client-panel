import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { firestoreConnect } from 'react-redux-firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  LinearProgress,
  Card,
  CardContent,
  CardHeader,
  withStyles,
  withTheme,
  IconButton,
  Button,
} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

class ClientDetails extends Component {
  static propTypes = {
    firestore: PropTypes.object,
    client: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {
      showForm: false,
      balanceUpdateAmount: '',
      value: 0,
    };
    this.onUpdateBalance = this.onUpdateBalance.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  // componentDidMount () {
  //   this.setState({ value: parseFloat(this.state.client.balance).toFixed(2) });
  // }

  componentWillReceiveProps (nextProps) {
    if (nextProps.client) {
      this.setState({
        client: nextProps.client,
        value: nextProps.client.balance || 0,
      });
    }
  }

  shouldComponentUpdate (nextState) {
    if (this.state.client !== nextState.client) {
      return true;
    }
    if (this.state.showForm !== nextState.showForm) {
      return true;
    }
    return false;
  }

  onUpdateBalance () {
    const { firestore } = this.props;
    const { client, value } = this.state;

    const clientUpdate = {
      balance: parseFloat(value),
    };

    firestore.update({ collection: 'clients', doc: client.id }, clientUpdate);

    this.setState({ showForm: false });
  }

  onDelete () {
    const { firestore } = this.props;
    const { client } = this.state;

    firestore
      .delete({ collection: 'clients', doc: client.id })
      .then(() => this.props.history.push('/'));
  }

  render () {
    console.log(this.props);
    const { client, showForm } = this.state;
    const { classes } = this.props;

    const deleteTheme = createMuiTheme({
      palette: {
        primary: {
          main: '#ff6347',
          light: '#ff63f7',
          dark: '#ff63f7',
          contrastText: 'black',
        },
      },
    });

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
                  <div>
                    <h2 className="m-none">
                      Client Details -
                      {' '}
                      {client.firstName}
                      {' '}
                      {client.lastName}
                    </h2>
                    <ClientID>
                      Client ID:
                      {client.id}
                    </ClientID>
                  </div>
)}
                classes={{ root: classes.cardHeader }}
              />
              <CardContent>
                <ClientMainInfo>
                  <strong>Balance:</strong>
                  {' '}
$
                  {showForm ? (
                    <input
                      onChange={(e) => {
                        this.setState({ value: e.target.value });
                      }}
                      value={this.state.value}
                    />
                  ) : (
                    <>{parseFloat(this.state.value).toFixed(2)}</>
                  )}
                  {showForm ? (
                    <IconButton
                      onClick={this.onUpdateBalance}
                      classes={{ root: classes.editButtonCheck }}
                    >
                      <FontAwesomeIcon icon="check-circle" />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => {
                        this.setState({ showForm: true });
                      }}
                      classes={{ root: classes.editButton }}
                    >
                      <FontAwesomeIcon icon="edit" />
                    </IconButton>
                  )}
                </ClientMainInfo>
                <CollectionItem>
                  <strong>Contact Email: </strong>
                  {client.email}
                </CollectionItem>
                <CollectionItem>
                  <strong>Contact Phone: </strong>
                  {client.phone}
                </CollectionItem>
                <MuiThemeProvider theme={deleteTheme}>
                  <Button
                    onClick={this.onDelete}
                    className={classes.deleteButton}
                    color="primary"
                  >
                    DELETE
                  </Button>
                </MuiThemeProvider>
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

const styles = theme => ({
  editButton: {
    fontSize: 12,
    padding: '6px 4px 7px 6px',
    position: 'relative',
    top: -8,
  },
  editButtonCheck: {
    fontSize: 16,
    padding: 4,
    position: 'relative',
    top: -1,
    left: 4,
    color: 'green',
  },
  deleteButton: {
    background: 'tomato',
    color: 'white',
  },
});

const ClientID = styled.h5`
  font-weight: normal;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 6px;
`;

const ClientMainInfo = styled.h3`
  & input {
    font-weight: normal !important;
    font-size: 18px !important;
    width: 75px !important;
    min-width: 75px !important;
    max-width: 75px !important;
    display: inline;
  }
  font-weight: normal !important;
  font-size: 18px !important;
  margin-bottom: 0 !important;
  margin-left: auto !important;
  width: fit-content !important;
  & strong {
    font-size: 20px !important;
  }
`;

const CollectionItem = styled.div`
  background: #f4f4f4;
  padding: 14px 18px;
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
