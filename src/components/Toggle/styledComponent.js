import styled, { css } from 'styled-components';

const darkModeStyle = css`
    &::after {
        transform: translateX(${({ isChecked }) => (!isChecked ? '65px' : '38px')});
        top: 4px;
        background: ${({ theme }) => theme.colors.primaryShade1};
        width: 16px;
        height: 16px; 
        transition: transform .3s cubic-bezier(0.85, 0, 0.15, 1), backrgound 0s;
        transition-delay: ${({ isChecked }) => (isChecked ? '.2s' : '-.2s')};
    }
    &::before {
        background: #FFFFFF;
    }
    background: ${({ theme, isChecked }) => (!isChecked ? theme.colors.highlight : theme.colors.primaryShade1)};
`;

export const StyledToggle = styled.label`
    color: transparent;
    display: flex;
    width: 60px;
    height: 30px;
    border-radius: 30px;
    position: relative;
    background: ${({ theme, isChecked }) => (isChecked ? theme.colors.highlight : theme.colors.secondaryShade2)};
    align-items: center;
    overflow: hidden;
    padding: 4px;
    box-sizing: border-box;
    input[type="checkbox"]{
        opacity: 0;
    }
    &::before, &::after {
        content: "";
        width: 24px;
        height: 24px;
        border-radius: 26px;
        position: absolute;
        transition: all .3s cubic-bezier(0.85, 0, 0.15, 1);
    }
    &::before{
        background: #FFFFFF;
        top: 50%;
        transform: translateX(${({ isChecked }) => (isChecked ? 'calc(100% + 4px)' : '0')}) translateY(-50%);
    }
    ${({ isDarkModeToggle }) => isDarkModeToggle && darkModeStyle}
`;

export default null;
