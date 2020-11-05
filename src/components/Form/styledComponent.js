import styled from 'styled-components';

export const FormWrapper = styled.form`
    width: 100%;
    color: ${({ theme }) => theme.colors.secondary};
    font-family: sans-serif;
    box-sizing: border-box;
    margin-top: 12px;
    p {
        font-size: 18px;
        margin: 0;
        margin-bottom: 8px;
    }
    div {
        margin-bottom: 16px;
        select {
            appearance: none;
            width: 100%;
            padding: 12px 20px;
            background: ${({ theme }) => theme.colors.primaryShade1};
            border: none;
            color: ${({ theme }) => theme.colors.secondary};
            font-size: 16px;
            border-radius: 8px;
            box-shadow: ${({ theme }) => theme.mainBoxShadow};
            outline: none;
            cursor: pointer;
            box-sizing: border-box;
        }
    }
    input[type="submit"]{
        appearance: none;
        width: 100%;
        padding: 12px 0;
        border: none;
        border-radius: 25px;
        outline: none;
        cursor: pointer;
        background: ${({ theme }) => theme.colors.highlight};
        color: ${({ theme }) => theme.colors.primary};
        font-size: 16px;
    }
`;

export default null;
