import React from 'react';
import styled from '@emotion/styled';
import Piece from './pieces/piece';

const SpotCell = styled.button(props => ({
    backgroundColor: props.black ? '#eeefff' : '#fff',
    width: '8em',
    height: '8em',
    padding: '-1px',
    // border: '1px solid black',
    border: '0',
    objectFit: 'scale-down',
    display: 'inline-block',
    })
);

function Spot(props) {
    let piece = props.piece;
    return (
        <SpotCell black={props.black} title={props.cell} onClick={props.onClick} disabled={props.disabled}>
            {piece ? <Piece type={piece.type} black={piece.black} /> : null}
        </SpotCell>
    );
};

export default Spot;