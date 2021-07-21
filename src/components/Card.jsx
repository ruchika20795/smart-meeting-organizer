import styled, { css } from 'styled-components';

export default function Card({ title, children, value, onClick, showBorder }) {
    return (
        <CardWrapper onClick={onClick} showBorder={showBorder}>
            <strong>{title}</strong>
            <div>{children || value}</div>
            
        </CardWrapper>
    );
}

const CardWrapper = styled.div`
    width: 100%;
    text-align: left;
    vertical-align: top;
    padding: 20px;
    position: relative;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.17);
    margin: 0 15px 15px 0;
    box-sizing: border-box;
    border: 1px solid #ececec;
    ${({ onClick }) => onClick && css`cursor: pointer;`}
    ${({ showBorder }) => showBorder && css`
        border: 2px solid #00acdf;
        border-radius: 3px;
    `}
`;
