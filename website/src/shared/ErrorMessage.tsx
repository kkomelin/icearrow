import { Alert } from '@mui/material';

export const ErrorMessage = (props: {
  message?: string;
  onClick?: () => void;
}) =>
  props.message ? (
    <Alert severity="error" {...props}>
      {props.message}
    </Alert>
  ) : null;

export default ErrorMessage;
