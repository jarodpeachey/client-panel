import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
// import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  withStyles,
  TextField,
} from '@material-ui/core';

class AddClient extends Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      balance: '',
    };

    this.onFirstNameInputChange = this.onFirstNameInputChange.bind(this);
    this.onLastNameInputChange = this.onLastNameInputChange.bind(this);
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onPhoneInputChange = this.onPhoneInputChange.bind(this);
    this.onBalanceInputChange = this.onBalanceInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount () {}

  shouldComponentUpdate (nextState) {
    if (this.state.firstName !== nextState.firstName) {
      return true;
    }
    return false;
  }

  onFirstNameInputChange (e) {
    this.setState({ firstName: e.target.value });
  }

  onLastNameInputChange (e) {
    this.setState({ lastName: e.target.value });
  }

  onEmailInputChange (e) {
    this.setState({ email: e.target.value });
  }

  onPhoneInputChange (e) {
    this.setState({ phone: e.target.value });
  }

  onBalanceInputChange (e) {
    this.setState({ balance: e.target.value });
  }

  onSubmit (e) {
    e.preventDefault();

    const newClient = { ...this.state };

    if (newClient.balance === '') {
      newClient.balance = 0;
    }

    if (newClient.email !== '' && newClient.firstName !== '' && newClient.lastName !== '') {
      const { firestore, history } = this.props;

      firestore.collection('clients').add(newClient)
        .then((res) => {
          console.log(res);
          history.push('/');
        })
        .catch(err => console.log(err));      
    }
  }

  render () {
    const { classes } = this.props;
    // const { firstName, lastName, email, phone, balance } = this.state;

    // console.log("Props: ", this.props);

    return (
      <Wrapper>
        <Helmet title="Add Client - Client Panel" />
        <Card classes={{ root: classes.cardRoot }}>
          <CardContent>
            {/* <div className={classes.mainIconContainer}>
              <Person classes={{ root: classes.mainIcon }} />
            </div> */}
            <Heading className="center-text">Add Client</Heading>
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
                onChange={this.onFirstNameInputChange}
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
                onChange={this.onLastNameInputChange}
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
                onChange={this.onEmailInputChange}
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
                onChange={this.onPhoneInputChange}
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
                onChange={this.onBalanceInputChange}
              />
              <Button
                classes={{ root: classes.buttonRoot }}
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                margin="standard"
              >
                Add Client
              </Button>
            </form>
          </CardContent>
        </Card>
      </Wrapper>
    );
  }
}

const styles = theme => ({
  cardRoot: {
    maxWidth: '568px',
    margin: '0 auto',
    padding: 16,
  },
  // mainIcon: {
  //   width: 120,
  //   height: 120,
  //   padding: 16,
  //   background: '#ccc',
  //   color: 'white',
  //   borderRadius: '50%',
  // },
  // mainIconContainer: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   position: 'relative',
  //   width: '100%',
  //   left: 0,
  //   bottom: 'calc(32px + 60px)',
  // },
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

export default firestoreConnect()(withStyles(styles)(AddClient));
