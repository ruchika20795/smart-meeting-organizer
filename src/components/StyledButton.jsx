import styled, { css } from 'styled-components';

export default function StyledButton({ onClick, children, disabled }) {
    return (
        <Button onClick={onClick} disabled={disabled}>{children}</Button>
    )
}

const Button = styled.button`
    height: 50px;
    border: 1px solid #00acdf;
    background-color: #00acdf;
    color: white;
    font-size: 16px;
    cursor: pointer;
    font-weight: 700;
    margin-bottom: 20px;
    width: 150px;
    ${({ disabled }) => disabled && css`
        cursor: not-allowed;
        pointer-events: none;
        background-color: lightgray;
        border-color: lightgray;
    `}
`;