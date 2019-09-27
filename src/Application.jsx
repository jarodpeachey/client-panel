/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import styled, { ThemeProvider } from 'styled-components';
import { firestoreConnect } from 'react-redux-firebase';
import theme from './mui-theme';
import styledTheme from './styled-theme';
import Header from './components/Header';
import Dashboard from './components/pages/Dashboard';

class Application extends Component {
  static propTypes = {
    getData: PropTypes.func,
    history: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {

  }

  render () {
    // console.log(this.props);
    return (
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={styledTheme}>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                    />
                  }
                  <Wrapper className="container">
                    <Dashboard {...props} database={this.props.firestore} />
                  </Wrapper>
                </>
              )}
            />
          </Switch>
        </ThemeProvider>
      </MuiThemeProvider>
    );
  }
}

const Wrapper = styled.div`
  // background: ${({ theme }) => theme.colors.gray1};
  height: 100% !important;
  padding-top: 88px;
`;

export default Application;
