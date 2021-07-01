import React from 'react';
import styled from '@emotion/styled';
import Spot from './spot';

const BoardContainer = styled.div({
    display: 'table',
    borderCollapse: 'collapse',
    margin: 'auto',
    // verticalAlign: 'middle',
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
        }
        this.initBoard();
    }

    initBoard() {
        for (let i = 7; i >= 0; i--) {
            let row = [];
            for (let j = 0; j < 8; j++) {
                let black = i % 2 === j % 2;
                let spot = {
                    black: black,
                    piece: null,
                    row: i,
                    col: j,
                };
                row.push(spot);
            }
            this.state.board.push(row);
        }
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
        const letters = 'abcdefgh';
        let name = letters[col] + (row + 1);

        return <Spot key={name} black={black} cell={name} />
    }

    render() {
        return (
            <BoardContainer>
                {this.renderRow(0)}
                {this.renderRow(1)}
                {this.renderRow(2)}
                {this.renderRow(3)}
                {this.renderRow(4)}
                {this.renderRow(5)}
                {this.renderRow(6)}
                {this.renderRow(7)}
            </BoardContainer>
        );
    }
}

export default Board;