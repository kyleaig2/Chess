import React from 'react';
import styled from '@emotion/styled';
import Spot from './spot';

const BoardContainer = styled.div({
    // display: 'block',
    height: '50%',
    width: '50%',
    margin: 'auto',
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
    width: '22%',
    overflowWrap: 'break-word',
});

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [],
            selected: {},
            whiteTurn: true,
            blackKingSpot: {},
            whiteKingSpot: {},
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
        let type = '';
        if (i > 1 && i < 6) {
            return null;
        }
        if (i === 1 || i === 6) {
            type = 'pawn';
        }
        else if (j === 0 || j === 7) {
            type = 'rook';
        }
        else if (j === 1 || j === 6) {
            type = 'knight';
        }
        else if (j === 2 || j === 5) {
            type = 'bishop';
        }
        else if (j === 3) {
            type = 'queen';
        }
        else if (j === 4) {
            type = 'king';
        }

        return {type: type, black: black, hasMoved: false};
    }

    handleClick(i, j) {
        let oldSpot = this.state.selected;
        let newSpot = this.state.board[i][j];
        let newBoard = [...this.state.board];
        let whiteTurn = this.state.whiteTurn;
        
        // Calculate move validity:
        let validMove = false;
        if (oldSpot.piece) {
            validMove = this.getMoveSet(oldSpot).includes(newSpot);
            if (!validMove) { // Try again if invalid
                newSpot = {};
            }
        }
        if (validMove) {  // Moving
            oldSpot.piece.hasMoved = true;
            newBoard[i][j].piece = oldSpot.piece;
            newBoard[oldSpot.row][oldSpot.col].piece = null;

            this.setCheck(newSpot);
            newSpot = {};
            whiteTurn = !whiteTurn;
        }

        this.setState({board: newBoard, selected: newSpot, whiteTurn: whiteTurn});
    }

    setCheck(spot) {
        let piece = spot.piece;
        // let check = false;
        // // let kingSpot = 
        // let moves = this.getMoveSet(spot);

        
    }
 
    getKingMoves(spot) {
        let piece = spot.piece;
        let board = this.state.board;
        let moves = [];
        
        for (let i = -1; i < 2; i++) {
            let pathRow = board[spot.row + i];
            let j = -1;
            console.log(pathRow);
            while (pathRow !== undefined && j < 2) {
                let path = pathRow[spot.col + j];
                if (path !== undefined) {
                    if (!path.piece) {
                        moves.push(path);
                    }
                    else if (path.piece.black !== piece.black) {
                        moves.push(path);
                    }
                }
                j++
            }
        }

        return moves;
    }

    getQueenMoves(spot) {
        let piece = spot.piece;
        let pDir = piece.black ? -1 : 1;
        let board = this.state.board;
        let moves = [];
        for (let i = -1; i <= 1; i++) {
            let pathRow = board[spot.row + pDir * i];
            let path = {}, pathA = {}, pathB = {};
            let colA = spot.col, colB = spot.col;
            let clear = true, clearA = true, clearB = true;
            while (pathRow !== undefined && (clearA || clearB || clear)) {
                if (clearA) {
                    pathA = pathRow[colA += 1];
                }
                if (clearB) {
                    pathB = pathRow[colB -= 1];
                }
                if (clear) {
                    path = pathRow[spot.col];
                }

                if (path !== undefined && clear) {
                    if (!path.piece) {
                        moves.push(path);
                    }
                    else {
                        if (path.piece.black !== piece.black) {
                            moves.push(path);
                        }
                        clear = false;
                    }
                }

                if (pathA !== undefined && clearA) {
                    if (!pathA.piece) {
                        moves.push(pathA);
                    }
                    else {
                        if (pathA.piece.black !== piece.black) {
                            moves.push(pathA);
                        }
                        clearA = false;
                    }
                }
                else {
                    clearA = false;
                }
                
                if (pathB !== undefined && clearB) {
                    if (!pathB.piece) {
                        moves.push(pathB);
                    }
                    else {
                        if (pathB.piece.black !== piece.black) {
                            moves.push(pathB);
                        }
                        clearB = false;
                    }
                }
                else {
                    clearB = false;
                }
                pathRow = board[board.indexOf(pathRow) + pDir * i];
            }
        }
        return moves;
    }

    getRookMoves(spot) {
        let piece = spot.piece;
        let pDir = piece.black ? -1 : 1;
        let board = this.state.board;
        let moves = [];

        for (let i = 0; i < 2; i++) {
            let pathRow = board[spot.row], path = spot;
            let clearA = true, clearB = false;
            let pCol = spot.col;
            while (pathRow !== undefined) {
                if (clearA) {
                    path = pathRow[pCol += pDir];
                }
                else if (clearB) {
                    path = pathRow[spot.col];
                }

                if (path !== undefined && (clearA || clearB)) {
                    if (!path.piece) {
                        moves.push(path);
                    }
                    else {
                        if (path.piece.black !== piece.black) {
                            moves.push(path);
                        }
                        clearB = clearA;
                        clearA = false;
                    }
                }
                else {
                    clearB = clearA;
                    clearA = false;
                }
                if (!clearA) {
                    pathRow = board[board.indexOf(pathRow) + pDir];
                }
            }
            pDir *= -1;
        }
        return moves;
    }

    getBishopMoves(spot) {
        let piece = spot.piece;
        let pDir = piece.black ? -1 : 1;
        let row = spot.row, col = spot.col;
        let board = this.state.board;
        let moves = [];

        for (let i = 0; i < 2; i++) {
            let pathRow = board[row + pDir];
            let clearA = true, clearB = true;

            let pathA = spot, pathB = spot;
            let colA = col, colB = col;
            while (pathRow !== undefined) {
                pathA = pathRow[colA += 1];
                pathB = pathRow[colB -= 1];
                if (pathA !== undefined && clearA) {
                    if (!pathA.piece) {
                        moves.push(pathA);
                    }
                    else if (pathA.piece.black !== piece.black) {
                        moves.push(pathA);
                        clearA = false;
                    }
                    else {
                        clearA = false;
                    }
                }

                if (pathB !== undefined && clearB) {
                    if (!pathB.piece) {
                        moves.push(pathB);
                    }
                    else if (pathB.piece.black !== piece.black) {
                        moves.push(pathB);
                        clearB = false;
                    }
                    else {
                        clearB = false;
                    }
                }
                pathRow = board[board.indexOf(pathRow) + pDir];
            }
            pDir *= -1;
        }
        return moves;
    }

    getKnightMoves(spot) {
        let piece = spot.piece;
        let pDir = piece.black ? -1 : 1;
        let row = spot.row, col = spot.col;
        let board = this.state.board;
        let moves = [], temp = [];

        for (let i = 0; i < 2; i++) { // Advancing and Retreating
            let pathRow = board[row + pDir * 2];
            if (pathRow && pathRow[col + 1] !== undefined) {
                temp.push(pathRow[col + 1]);
            }
            if (pathRow && pathRow[col - 1] !== undefined) {
                temp.push(pathRow[col - 1]);
            }
            pathRow = board[row + pDir];
            if (pathRow && pathRow[col + 2] !== undefined) {
                temp.push(pathRow[col + 2]);
            }
            if (pathRow && pathRow[col - 2] !== undefined) {
                temp.push(pathRow[col - 2]);
            }
            pDir *= -1;
        }
        // Loading moves
        [...temp].forEach(spot => {
            if (!spot.piece) {
                moves.push(spot);
            }
            else if (piece.black !== spot.piece.black) {
                moves.push(spot);
            }
        });
        return moves;
    }

    getPawnMoves(spot) {
        let piece = spot.piece;
        let pDir = piece.black ? -1 : 1;
        let row = spot.row, col = spot.col;
        let board = this.state.board;
        let moves = [], path = {};

        // Normal advancing
        let i = 0;
        path = board[row + pDir][col];
        while (!path.piece && i <= 1) {
            moves.push(path);
            if (piece.hasMoved) {
                break;
            }
            i++;
            path = board[path.row + pDir * i][path.col];
        }
        // Pawn attack spots
        let atkSpots = [];
        if (row + pDir in board) { // out of bounds checks
            if (col + 1 in board[row + pDir]) {
                atkSpots.push(board[row + pDir][col + 1])
            }
            if (col - 1 in board[row + pDir]) {
                atkSpots.push(board[row + pDir][col - 1])
            }
        }
        atkSpots.forEach(targetSpot => {
            if (targetSpot.piece) {
                if (targetSpot.piece.black !== piece.black) {
                    moves.push(targetSpot);
                }
            }
        });
        return moves;
    }

    preventSelfCheck(moves) {
        // Prevent self check
    }

    getMoveSet(spot) {
        let piece = spot.piece;
        let type = piece.type;
        let moves = [];
        
        switch (type) {
            case 'king':
                moves = this.getKingMoves(spot);
                break;
            case 'queen':
                moves = this.getQueenMoves(spot);
                break;
            case 'rook':
                moves = this.getRookMoves(spot);
                break;
            case 'bishop':
                moves = this.getBishopMoves(spot);
                break;
            case 'knight':
                moves = this.getKnightMoves(spot);
                break;
            default:
                moves = this.getPawnMoves(spot);
                break;
        }

        this.preventSelfCheck(moves);
        console.log(moves);
        return moves;
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
                    {/* Black's View
                    {this.renderRow(0)}
                    {this.renderRow(1)}
                    {this.renderRow(2)}
                    {this.renderRow(3)}
                    {this.renderRow(4)}
                    {this.renderRow(5)}
                    {this.renderRow(6)}
                    {this.renderRow(7)} */}
                </BoardContainer>
            </div>
        );
    }
}

export default Game;