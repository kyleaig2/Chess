import React from 'react';
import styled from '@emotion/styled';
import Spot from './spot';

const BoardContainer = styled.div({
    // display: 'block',
    // margin: '1% 25%',
    width: '50%',
    margin: '0 auto',
});

const BoardRow = styled.div({
    display: 'block',
    height: 'fit-content',
    padding: '0',
});

const StatusBar = styled.ul({
    padding: '0',
    margin: '0',
    listStyle: 'none',
    position: 'absolute',
    top: '1em',
    left: '1em',
    width: '20%',
});

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [],
            selected: {},
            whiteTurn: true,
            whiteCheck: false,
            blackCheck: false,
            whiteCheckMate: false,
            blackCheckMate: false,
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
        let oldSpot = this.state.selected;
        let newSpot = this.state.board[i][j];
        let newBoard = [...this.state.board];
        let whiteTurn = this.state.whiteTurn;
        
        // Calculate move validity:
        let validMove = true;
        if (oldSpot === newSpot || (!oldSpot.piece && !newSpot.piece)) { // Deselect if same spot
            validMove = false;
            newSpot = {};
        }
        else if (oldSpot.piece && newSpot.piece) { // piece 1 vs piece 2
            validMove = oldSpot.piece.black !== newSpot.piece.black; 
        }
        else { // piece vs empty spot
            validMove = oldSpot.piece && !newSpot.piece;
        }
        
        if (validMove) {  // Moving
            newBoard[i][j].piece = oldSpot.piece;
            newBoard[oldSpot.row][oldSpot.col].piece = null;
            newSpot = {};
            whiteTurn = !whiteTurn;
        }

        this.setState({board: newBoard, selected: newSpot, whiteTurn: whiteTurn});
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
        const piece = spot.piece;
        const row = spot.row, col = spot.col;
        const black = spot.black;

        const letters = 'abcdefgh';
        let name = letters[col] + (row + 1);
        let disabled = false;
        
        // Not turn
        if (!this.state.selected.piece) { // If no piece is selected
            if (piece) { 
                disabled = this.state.whiteTurn === piece.black; // Not your turn
            }
            else { // No random cell clicking
                disabled = true;
            }
        }
        
        return <Spot key={name} black={black} 
                cell={name} piece={piece} 
                onClick={() => this.handleClick(i, j)}
                disabled={disabled}/>
    }

    render() {
        return (
            <div className='game'>
                <StatusBar>
                    <li>{this.state.whiteTurn ? 'White' : 'Black'}'s Turn</li>
                    <li>Selected: {JSON.stringify(this.state.selected)}</li>
                </StatusBar>
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
            </div>
        );
    }
}

export default Game;