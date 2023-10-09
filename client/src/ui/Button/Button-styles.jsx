import styled from 'styled-components';

export const BtnStyle1 = styled.button`
  appearance: none;
  backface-visibility: hidden;
  background-color: ${(props) =>
    props.variant === 'secondary' ? '#fff' : '#1e8449'};
  border-radius: 8px;
  border-style: none;
  box-shadow: rgba(39, 174, 96, 0.15) 0 4px 9px;
  box-sizing: border-box;
  color: ${(props) => (props.variant === 'secondary' ? '#1e8449' : '#fff')};
  cursor: pointer;
  display: inline-block;

  font-size: 16px;
  font-weight: 600;
  letter-spacing: normal;
  line-height: 1.5;
  outline: none;
  overflow: hidden;
  padding: 0.5rem 1.5rem;
  position: relative;
  text-align: center;
  text-decoration: none;
  transform: translate3d(0, 0, 0);
  transition: all 0.3s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) =>
      props.variant === 'secondary' ? '#1e8449' : '#fff'};
    color: ${(props) => (props.variant === 'secondary' ? '#fff' : '#1e8449')};
    opacity: 1;
    transform: translateY(0);
    transition-duration: 0.35s;
    box-shadow: rgba(39, 174, 96, 0.2) 0 6px 12px;
  }
  &:active {
    transform: translateY(2px);
    transition-duration: 0.35s;
  }
`;

// export const StyledButton = styled.button`
//   border: 2px solid #4caf50;
//   background-color: ${(props) =>
//     props.variant === 'outline' ? '#fff' : '#4caf50'};
//   color: ${(props) => (props.variant === 'outline' ? '#4caf50' : '#fff')};
//   padding: 15px 32px;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
//   font-size: 16px;
//   cursor: pointer;
//   transition: 0.5s all ease-out;
//   &:hover {
//     // Within the curly braces specify the CSS
//     background-color: ${(props) =>
//       props.variant !== 'outline' ? '#fff' : '#4caf50'};
//     color: ${(props) => (props.variant !== 'outline' ? '#4caf50' : '#fff')};
//   }
// `;

// export const FancyButton = styled(StyledButton)`
//   // Specify any style we want to
//   background-image: linear-gradient(to right, #f6d365 0%, #fda085 100%);
//   border: none;
// `;

// export const SubmitButton = styled(StyledButton).attrs({
//   type: 'submit',
// })`
//   box-shadow: 0 9px #999;
//   &:active {
//     background-color: ${(props) =>
//       props.variant !== 'outline' ? '#fff' : '#4caf50'};
//     box-shadow: 0 5px #666;
//     transform: translateY(4px);
//   }
// `;

// const rotate = keyframes`
//   from{
//     transform: rotate(0deg);
//   }
//   to{
//     transform: rotate(360deg);
//   }
// `;

// export const AnimatedLogo = styled.img`
//   height: 40vmin;
//   pointer-events: none;
//   animation: ${rotate} infinite 2s linear;
// `;

// export const DarkButton = styled(StyledButton)`
//   border: 2px dolid ${(props) => props.theme.dark.primary};
//   background-color: ${(props) => props.theme.dark.primary};
//   color: ${(props) => props.theme.dark.text};
// `;
