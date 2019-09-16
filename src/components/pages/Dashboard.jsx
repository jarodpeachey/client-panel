import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Clients from '../clients/Clients';

export default function Dashboard () {
  return (
    <div>
      <div className="row mobile pt-lg">
        <div className="col col-9 pt-xxs">
          <Clients />
        </div>
        <div className="col col-3">
          <Link to="/client/add">
            <Button color="primary" variant="contained" className="m-none">
              <span
                style={{
                  fontSize: 32,
                  marginRight: 8,
                  padding: 0,
                  lineHeight: 0,
                }}
              >
                +
                {' '}
              </span>
              New
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
