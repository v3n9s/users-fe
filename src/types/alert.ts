import { AlertProps } from 'react-bootstrap/Alert';

export interface Alert extends Required<Pick<AlertProps, 'variant'>> {
  id: string;
  text: string;
}
