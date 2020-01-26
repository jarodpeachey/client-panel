/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import styled, { ThemeProvider } from 'styled-components';
// import { firestoreConnect } from 'react-redux-firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import theme from './mui-theme';
import styledTheme from './styled-theme';
import Header from './components/Header';
import Dashboard from './components/pages/Dashboard';
import AddClient from './components/clients/AddClient';
import EditClient from './components/clients/EditClient';
import ClientDetails from './components/clients/ClientDetails';

library.add(faEdit, faCheckCircle);

class Application extends Component {
  static propTypes = {
    getData: PropTypes.func,
    history: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {}

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
                  {<Header {...props} pathname={location.pathname} />}
                  <Wrapper className="container">
                    <Dashboard {...props} />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/client/add"
              render={props => (
                <>
                  {<Header {...props} pathname={location.pathname} />}
                  <Wrapper className="container">
                    <AddClient {...props} />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/client/:id"
              render={props => (
                <>
                  {<Header {...props} pathname={location.pathname} />}
                  <Wrapper className="container">
                    <ClientDetails {...props} />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/client/edit/:id"
              render={props => (
                <>
                  {<Header {...props} pathname={location.pathname} />}
                  <Wrapper className="container">
                    <EditClient {...props} />
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
