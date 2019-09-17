import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { withStyles, Button, Paper } from '@material-ui/core';
import Person from '@material-ui/icons/Person';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Clients extends Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {}

  shouldComponentUpdate () {}

  render () {
    const { classes } = this.props;

    const clients = [
      {
        id: 12323516,
        firstName: 'Kevin',
        lastName: 'Johnson',
        email: 'kevin@mail.com',
        phone: '111-123-1234',
        balance: 150,
      },
      {
        id: 235231535,
        firstName: 'James',
        lastName: 'White',
        email: 'james@mail.com',
        phone: '432-1321-111',
        balance: 100,
      },
    ];

    return (
      <>
        {clients ? (
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
                    className="m-none"
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
                          {client.balance}
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
              </div>
            </Paper>
          </>
        ) : (
          <h3>This is the clients area.</h3>
        )}
      </>
    );
  }
}

const styles = theme => ({
  root: {
    marginTop: theme.spacing(4),
    boxShadow: '0px 0px 1px 1px #f1f1f1',
  },
  table: {
    minWidth: 0,
  },
  button: {
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
`;

const PlusIcon = styled.span`
  font-size: 32;
  margin-right: 8;
  padding: 0;
  line-height: 0;
`;

export default withStyles(styles)(Clients);
