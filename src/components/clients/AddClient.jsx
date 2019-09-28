import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  withStyles,
  TextField,
} from '@material-ui/core';
import Person from '@material-ui/icons/Person';

class AddClient extends Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {
      firstNameInputValue: '',
      lastNameInputValue: '',
      emailInputValue: '',
      phoneInputValue: '',
      balanceInputValue: '',
    };

    this.onFirstNameInputChange = this.onFirstNameInputChange.bind(this);
    this.onLastNameInputChange = this.onLastNameInputChange.bind(this);
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onPhoneInputChange = this.onPhoneInputChange.bind(this);
    this.onBalanceInputChange = this.onBalanceInputChange.bind(this);
  }

  componentDidMount () {}

  shouldComponentUpdate (nextState) {
    if (this.state.firstNameInputValue !== nextState.firstNameInputValue) {
      return true;
    }
    return false;
  }

  onFirstNameInputChange (e) {
    this.setState({ onFirstNameInputChange: e.target.value });
  }

  onLastNameInputChange (e) {
    this.setState({ onLastNameInputChange: e.target.value });
  }

  onEmailInputChange (e) {
    this.setState({ onEmailInputChange: e.target.value });
  }

  onPhoneInputChange (e) {
    this.setState({ onPhoneInputChange: e.target.value });
  }

  onBalanceInputChange (e) {
    this.setState({ onBalanceInputChange: e.target.value });
  }

  render () {
    const { classes } = this.props;
    const { firstNameInputValue, lastNameInputValue, emailInputValue, phoneInputValue, balanceInputValue } = this.state;
    return (
      <Wrapper>
        <Card classes={{ root: classes.cardRoot }}>
          <CardContent>
            <div className={classes.mainIconContainer}>
              <Person classes={{ root: classes.mainIcon }} />
            </div>
            <h2 className="center-text" style={{ marginTop: -54 }}>Add Client</h2>
            <form>
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
                color="primary"
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
  mainIcon: {
    width: 120,
    height: 120,
    padding: 16,
    background: [theme.palette.primary.main],
    color: 'white',
    borderRadius: '50%',
  },
  mainIconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    left: 0,
    bottom: 'calc(16px + 60px)',
  },
  buttonRoot: {
    padding: 10,
    marginTop: 8,
  },
});

const Wrapper = styled.div`
  margin-top: 64px;
`;

export default withStyles(styles)(AddClient);
