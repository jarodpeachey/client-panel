import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Clients from '../clients/Clients';

export default function Dashboard () {
  return (
    <div>
      <Clients />
    </div>
  );
}
