import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { firestoreConnect } from 'react-redux-firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withStyles } from '@material-ui/core/styles';
import {
  LinearProgress,
  Button,
  TextField,
  CardContent,
  Card,
} from '@material-ui/core';

class EditClient extends Component {
  static propTypes = {};

  constructor (props) {
    super(props);
    this.state = {};

    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.client) {
      this.setState({
        client: nextProps.client,
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

  onSubmit (e) {
    e.preventDefault();

    const { client } = this.state;
    const { firestore } = this.props;

    const updatedClient = {
      firstName: this.firstNameInput.current.firstElementChild.nextElementSibling.firstElementChild.value,
      lastName: this.lastNameInput.current.firstElementChild.nextElementSibling.firstElementChild.value,
      email: this.emailInput.current.firstElementChild.nextElementSibling.firstElementChild.value,
      phone: this.phoneInput.current.firstElementChild.nextElementSibling.firstElementChild.value,
      balance: this.balanceInput.current.firstElementChild.nextElementSibling.firstElementChild.value === '' ? 0 : this.balanceInput.current.firstElementChild.nextElementSibling.firstElementChild.value,
    };

    firestore.update({ collection: 'clients', doc: client.id }, updatedClient)
      .then(this.props.history.push('/'));
  }

  render () {
    const { client } = this.state;
    const { classes } = this.props;

    return (
      <>
        {client ? (
          <Wrapper>
            <Helmet title="Add Client - Client Panel" />
            <Card classes={{ root: classes.cardRoot }}>
              <CardContent>
                {/* <div className={classes.mainIconContainer}>
              <Person classes={{ root: classes.mainIcon }} />
            </div> */}
                <Heading className="center-text">
                  Edit Client
                  {' '}
                  {client.id}
                </Heading>
                <form onSubmit={this.onSubmit}>
                  <TextField
                    id="firstName"
                    name="firstName"
                    type="text"
                    fullWidth
                    placeholder="First Name"
                    variant="outlined"
                    margin="dense"
                    label="First Name"
                    defaultValue={client.firstName}
                    ref={this.firstNameInput}
                  />
                  <TextField
                    id="lastName"
                    name="lastName"
                    type="text"
                    fullWidth
                    placeholder="Last Name"
                    variant="outlined"
                    margin="dense"
                    label="Last Name"
                    defaultValue={client.lastName}
                    ref={this.lastNameInput}
                  />
                  <TextField
                    // id="email"
                    name="email"
                    type="email"
                    fullWidth
                    placeholder="Email"
                    variant="outlined"
                    margin="dense"
                    label="Email"
                    defaultValue={client.email}
                    ref={this.emailInput}
                  />
                  <TextField
                    id="phone"
                    name="phone"
                    type="text"
                    fullWidth
                    placeholder="Phone"
                    variant="outlined"
                    margin="dense"
                    label="Phone"
                    defaultValue={client.phone}
                    ref={this.phoneInput}
                  />
                  <TextField
                    id="balance"
                    name="balance"
                    type="text"
                    fullWidth
                    placeholder="Balance"
                    variant="outlined"
                    margin="dense"
                    label="Balance"
                    defaultValue={client.balance}
                    ref={this.balanceInput}
                  />
                  <Button
                    classes={{ root: classes.buttonRoot }}
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    margin="standard"
                  >
                    Edit Client
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Wrapper>
        ) : (
          <>
            {!client ? (
              <>
                <div className="center-text mb-md">
                  <h3>Loading edit form...</h3>
                </div>
                <LinearProgress />
              </>
            ) : (
              <div className="center-text">
                <h3>Sorry, there was an error fetching your client.</h3>
              </div>
            )}
          </>
        )}
      </>
    );
  }
}

const styles = theme => ({
  cardRoot: {
    maxWidth: '568px',
    margin: '0 auto',
    padding: 16,
  },
  buttonRoot: {
    padding: 10,
    marginTop: 8,
  },
});

const Wrapper = styled.div`
  margin-top: 16px;
`;

const Heading = styled.h2`
  // margin-top: -54px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id },
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0],
  })),
)(withStyles(styles)(EditClient));
