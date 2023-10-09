import { ThemeProvider, createGlobalStyle } from 'styled-components';
import logo from '../../assets/images/logo.svg';
import {
  StyledButton,
  FancyButton,
  SubmitButton,
  AnimatedLogo,
  DarkButton,
} from '../../ui/Button/Button';

const theme = {
  dark: {
    primary: '#000',
    text: '#fff',
  },
  light: {
    primary: '#fff',
    text: '#000',
  },
};

const GlobalStyle = createGlobalStyle`
  button{
    font-family:'Roboto';
  }
`;

const LandingFront = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <StyledButton type="submit">Click Me</StyledButton>
        <div>
          <br />
        </div>
        <StyledButton variant="outline">Click Me</StyledButton>
        <div>
          <br />
        </div>
        <FancyButton as="a">I am Fancy</FancyButton>
        <div>
          <br />
        </div>
        <SubmitButton>I am Fancy</SubmitButton>
        <div>
          <br />
        </div>
        <DarkButton>dark Theme</DarkButton>
      </div>
    </ThemeProvider>
  );
};
export default LandingFront;
