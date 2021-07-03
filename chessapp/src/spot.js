import React from 'react';
import styled from '@emotion/styled';
import Piece from './pieces/piece';

const SpotCell = styled.button(props => ({
    backgroundColor: props.black ? '#eeefff' : '#fff',
    width: '7em',
    height: 'inherit',
    border: '1px solid black',
    // display: 'table-cell',
    })
);

class Spot extends React.Component {
    renderPiece() {
        let piece = this.props.piece;
        if (piece == null) {
            return null;
        }
        else {
            return <Piece type={piece.type} black={piece.black}/>;
        }
    }

    render() {
        return (
            <SpotCell black={this.props.black} title={this.props.cell} onClick={this.props.onClick}>
                {this.renderPiece()}
            </SpotCell>
        );
    }
}

export default Spot;