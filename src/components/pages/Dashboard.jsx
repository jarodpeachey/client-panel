import React from 'react';
import Clients from '../clients/Clients';
import Sidebar from '../Sidebar';

export default function Dashboard () {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col col-9">
          <Clients />
        </div>
        <div className="col col-3">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
