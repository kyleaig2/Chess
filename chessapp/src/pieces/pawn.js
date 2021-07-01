import Piece from './piece';
import {StyledPiece} from './piece';

class Pawn extends Piece {
    render() {
        return <StyledPiece>{`P (${this.props.black})`}</StyledPiece>
    }
}

/*
class Knight extends Piece {
    render() {
        return <StyledPiece>K</StyledPiece>
    }
}

class Bishop extends Piece {
    render() {
        return <StyledPiece>B</StyledPiece>
    }
}

class Rook extends Piece {
    render() {
        return <StyledPiece>R</StyledPiece>
    }
}

class Queen extends Piece {
    render() {
        return <StyledPiece>Q</StyledPiece>
    }
}

class King extends Piece {
    render() {
        return <StyledPiece>KG</StyledPiece>
    }
}
*/

export default Pawn;