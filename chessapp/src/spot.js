import React from 'react';
import styled from '@emotion/styled';
import Piece from './pieces/piece';

const SpotCell = styled.button(props => ({
    backgroundColor: props.black ? '#eeefff' : '#fff',
    width: '8em',
    height: 'inherit',
    border: '1px solid black',
    display: 'table-cell',
    })
);

function Spot(props) {
    let piece = props.piece;
    return (
        <SpotCell black={props.black} title={props.cell} onClick={props.onClick}>
            {piece ? <Piece type={piece.type} black={piece.black} /> : null}
        </SpotCell>
    );
};

export default Spot;