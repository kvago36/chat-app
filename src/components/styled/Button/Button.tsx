import { Button } from 'antd'
import styled from 'styled-components'

export const StyledButton = styled(Button)`
  /* Adapt the colors based on primary prop */
  background: ${({ theme, type }) => type === 'primary' ? theme.main : 'transparent' };
  color: ${({ theme, type }) => type === 'primary' ? '#fff' : theme.main};
  font-size: 1em;
  margin: 1em;
  font-weight: bold;
  padding: 0.25em 1em;
  outline: none;
  border: ${({ theme, type }) => `2px ${ type === 'dashed' ? 'dashed' : 'solid'} ${theme.main}`};
  border-radius: 3px;
  
  :hover {
    color: ${({ theme, type }) => type === 'primary' ? '#fff' : theme.mainHoverLight};
    border-color: ${({ theme }) => theme.mainHoverLight};
    background-color: ${({ theme, type }) => type === 'primary' ? theme.mainHover : 'transparent'};
  }

  :focus,
  :active {
    color: ${({ theme, type }) => type === 'primary' ? '#F2F2F2' : theme.mainActive};
    border-color: ${({ theme, type }) => type === 'primary' ? theme.mainActiveDark : theme.mainActive};
    background-color: ${({ theme, type }) => type === 'primary' ? theme.mainActive : 'transparent'};
  }
`;