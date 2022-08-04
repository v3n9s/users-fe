import React from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks';
import { removeAlert } from '../store/alertsSlice';

const Alerts: React.FC = () => {
  const alerts = useAppSelector((state) => state.alerts);
  const dispatch = useAppDispatch();
  return (
    <Container
      style={{
        position: 'absolute',
        pointerEvents: 'none'
      }}
    >
      {
        alerts.map(({ id, text, variant }) => (
          <Alert
            key={id}
            variant={variant}
            dismissible
            onClose={() => dispatch(removeAlert(id))}
            style={{
              position: 'relative',
              margin: '5px auto',
              opacity: 0.8,
              width: 'fit-content',
              pointerEvents: 'all'
            }}
          >
            {text}
          </Alert>
        ))
      }
    </Container>
  );
}

export default Alerts;
