import React from 'react';
import styled from '@emotion/styled';
import Spot from './spot';

const BoardContainer = styled.div({
    display: 'table',
    borderCollapse: 'collapse',
    margin: 'auto',
});

const BoardRow = styled.div({
    display: 'table-row',
    height: '5em',
});

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [],
            selected: {},
        }
        this.initBoard();
    }

    initBoard() { // 8 x 8 Matrix
        for (let i = 0; i < 8; i++) {
            let row = [];
            for (let j = 0; j < 8; j++) {
                let black = i % 2 === j % 2;
                let piece = this.initPiece(i, j);
                let spot = {
                    black: black,
                    piece: piece,
                    row: i,
                    col: j,
                };
                row.push(spot);
            }
            this.state.board.push(row);
        }
    }

    initPiece(i, j) {
        let black = i > 5;
        let piece = null;
        if (i > 1 && i < 6) {
            return null;
        }
        if (i === 1 || i === 6) {
            piece = {
                type: 'pawn',
                black: black,
            }
        }
        else if (j === 0 || j === 7) {
            piece = {
                type: 'rook',
                black: black,
            }
        }
        else if (j === 1 || j === 6) {
            piece = {
                type: 'knight',
                black: black,
            }
        }
        else if (j === 2 || j === 5) {
            piece = {
                type: 'bishop',
                black: black,
            }
        }
        else if (j === 3) {
            piece = {
                type: 'queen',
                black: black,
            }
        }
        else if (j === 4) {
            piece = {
                type: 'king',
                black: black,
            }
        }
        return piece;
    }

    handleClick(i, j) {
        let spot = this.state.board[i][j];
        console.log(`clicked on spot(${i}, ${j})`);
        console.log(spot);
        this.setState({selected: spot});
    }

    renderRow(i) {
        return (
            <BoardRow>
                {this.renderSpot(i, 0)}
                {this.renderSpot(i, 1)}
                {this.renderSpot(i, 2)}
                {this.renderSpot(i, 3)}
                {this.renderSpot(i, 4)}
                {this.renderSpot(i, 5)}
                {this.renderSpot(i, 6)}
                {this.renderSpot(i, 7)}
            </BoardRow>
        )
    }
    
    renderSpot(i, j) {
        const spot = this.state.board[i][j];
        const row = spot.row;
        const col = spot.col;
        const black = spot.black;
        const piece = spot.piece;
        const letters = 'abcdefgh';
        let name = letters[col] + (row + 1);
        return <Spot key={name} black={black} cell={name} piece={piece} onClick={() => this.handleClick(i, j)}/>
    }

    render() {
        return (
            <BoardContainer>
                {this.renderRow(7)}
                {this.renderRow(6)}
                {this.renderRow(5)}
                {this.renderRow(4)}
                {this.renderRow(3)}
                {this.renderRow(2)}
                {this.renderRow(1)}
                {this.renderRow(0)}
            </BoardContainer>
        );
    }
}

export default Board;