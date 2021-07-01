import React from 'react';
import styled from '@emotion/styled';
import Piece from './pieces/piece';

const SpotButton = styled.div(props => ({
    backgroundColor: props.black ? '#eeefff' : '#fff',
    width: '5em',
    height: 'inherit',
    border: '1px solid black',
    padding: '0',
    margin: '0',
    display: 'table-cell',
    })
);

class Spot extends React.Component {
    constructor(props) {
        super(props);

        let cell = this.props.cell;
        let piece = null;
        let black = cell[1] >= 7;

        if (7 > cell[1] && cell[1] > 2) {
            piece = null;
        }
        else if (cell[1] === '2' || cell[1] === '7') {
            piece = {
                type: 'pawn',
                black: black,
            }
        }
        else if (cell[0] === 'a' || cell[0] === 'h') {
            piece = {
                type: 'rook',
                black: black,
            }    
        }
        else if (cell[0] === 'b' || cell[0] === 'g') {
            piece = {
                type: 'knight',
                black: black,
            }
        }
        else if (cell[0] === 'c' || cell[0] === 'f') {
            piece = {
                type: 'bishop',
                black: black,
            }
        }
        else if (cell[0] === 'd') {
            piece = {
                type: 'queen',
                black: black,
            }
        }
        else if (cell[0] === 'e') {
            piece = {
                type: 'king',
                black: black,
            }
        }

        this.state = {
            piece: piece,
        }
    }

    // setPiece(piece) {
    //     this.setState({piece: piece});
    // }

    renderPiece() {
        let piece = this.state.piece;
        console.log(piece);
        if (piece == null) {
            return null;
        }
        else {
            return <Piece type={piece.type} black={piece.black}/>;
        }
    }

    render() {
        return (
            <SpotButton black={this.props.black} title={this.props.cell}>
                {this.renderPiece()}
            </SpotButton>
        );
    }
}

export default Spot;