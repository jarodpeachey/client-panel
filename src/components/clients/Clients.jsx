import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import styled from 'styled-components';
import { withStyles, Button, Paper, LinearProgress } from '@material-ui/core';
import Person from '@material-ui/icons/Person';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Clients extends Component {
  static propTypes = {
    classes: PropTypes.object,
    // firestore: PropTypes.object.isRequired,
    // clients: PropTypes.array,
  };

  constructor (props) {
    super(props);
    this.state = {
      clients: [],
      totalOwed: 0,
    };
  }

  componentDidMount () {
    // this.props.database.collection('clients')
    //   .get()
    //   .then((querySnapshot) => {
    //     const array = [];
    //     querySnapshot.forEach((doc) => {
    //       console.log('Client: ', doc.data());
    //       array.push(doc.data());
    //     });
    //     console.log('Array: ', array);
    //     this.setState({ clients: array });
    //   })
    //   .catch((error) => {
    //     console.log('Error getting documents: ', error);
    //   });
  }

  // componentWillReceiveProps (nextProps) {
  //   if (this.props.clients !== nextProps.clients && this.props.clients) {
  //     let totalBalance = 0;
  //     this.props.clients.forEach((client) => {
  //       totalBalance += parseFloat(client.balance.toString());
  //     });

  //     this.setState({ totalOwed: totalBalance });
  //   }
  // }

  static getDerivedStateFromProps (props, state) {
    const { clients } = props;

    if (clients) {
      const total = clients.reduce((total, client) => total + parseFloat(client.balance.toString()), 0);

      return { totalOwed: total };
    }

    return null;
  }

  shouldComponentUpdate (nextState, nextProps) {
    if (this.props.clients !== nextProps.clients && this.props.clients) {
      return true;
    }
    if (this.state.totalOwed !== nextState.totalOwed) {
      return true;
    }
    return false;
  }

  render () {
    const { classes, clients } = this.props;
    const { totalOwed } = this.state;

    console.log('Clients: ', clients);
    return (
      <>
        {clients && clients.length ? (
          <>
            <Paper elevation={0} classes={{ root: classes.root }}>
              <TableHeading>
                <div>
                  <h2 className="m-none display-flex align-left v-align-center">
                    <Person
                      style={{
                        height: 15,
                        width: 15,
                        fontSize: 15,
                      }}
                    />
                    <Person
                      style={{
                        height: 35,
                        width: 35,
                        fontSize: 35,
                        position: 'relative',
                        right: 10,
                      }}
                    />
                    <Person
                      style={{
                        height: 15,
                        width: 15,
                        fontSize: 15,
                        position: 'relative',
                        right: 20,
                        marginRight: -10,
                      }}
                    />
                    {' '}
                    Clients
                  </h2>
                </div>
                <Link to="/client/add">
                  <Button
                    color="secondary"
                    variant="contained"
                    className={classes.newButton}
                  >
                    <PlusIcon>+ </PlusIcon>
                    New
                  </Button>
                </Link>
              </TableHeading>
              <div className="py-sm px-md pt-xs">
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableCellHead}>
                        Name
                      </TableCell>
                      <TableCell className={classes.tableCellHead}>
                        Email
                      </TableCell>
                      <TableCell className={classes.tableCellHead}>
                        Balance
                      </TableCell>
                      <TableCell
                        className={classes.tableCellHead}
                        align="right"
                      />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clients.map(client => (
                      <TableRow key={client.id}>
                        <TableCell
                          className={classes.tableCellBody}
                          component="th"
                          scope="row"
                        >
                          {client.firstName}
                          {' '}
                          {client.lastName}
                        </TableCell>
                        <TableCell className={classes.tableCellBody}>
                          {client.email}
                        </TableCell>
                        <TableCell className={classes.tableCellBody}>
                          $
                          {parseFloat(client.balance).toFixed(2)}
                        </TableCell>
                        <TableCell
                          className={classes.tableCellBody}
                          align="right"
                        >
                          <Link to={`client/${client.id}`}>
                            <Button
                              variant="contained"
                              size="small"
                              className={classes.button}
                            >
                              Details
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-sm">
                  <strong>
                    Total Owed: $
                    {parseFloat(totalOwed).toFixed(2)}
                  </strong>
                </div>
              </div>
            </Paper>
          </>
        ) : (
          <>
            {!clients ? (
              <>
                <div className="center-text mb-md">
                  <h3>Loading clients...</h3>
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
  root: {
    marginTop: theme.spacing(6),
    boxShadow: '0px 0px 1px 1px #f1f1f1',
  },
  table: {
    minWidth: 0,
  },
  button: {
    margin: 0,
  },
  newButton: {
    paddingTop: 2,
    paddingBottom: 2,
    margin: 0,
  },
  tableCellHead: {
    color: [theme.palette.secondary.main],
    fontSize: 14,
  },
  tableCellBody: {},
});

const TableHeading = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlusIcon = styled.span`
  font-size: 32px;
  margin-right: 8px;
  padding: 0;
  line-height: 0;
`;

const mapStateToProps = state => ({
  clients: state.firestore.ordered.clients,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'clients' }]),
)(withStyles(styles)(Clients));
