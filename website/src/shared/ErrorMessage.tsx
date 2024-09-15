import { Alert } from '@mui/material';

export const ErrorMessage = (props: { message?: string; onClick?: () => void }) =>
  props.message ? (
    <Alert severity="error" sx={{ my: 3 }} {...props}>
      {props.message}
    </Alert>
  ) : null;

export default ErrorMessage;
