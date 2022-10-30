import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TextFieldStyled = styled(TextField)`
  .MuiFormHelperText-root {
    color: ${({ theme }) => theme.palette.error.main} !important;
  }
  .MuiOutlinedInput-input {
    &:-webkit-autofill {
      border-radius: 15px;
      margin: 2px;
      box-shadow: 0 0 0 100px #fdfdff inset;
    }
  }
`;
