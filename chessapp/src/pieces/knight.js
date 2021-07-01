import Piece from './piece';
import {StyledPiece} from './piece';

class Knight extends Piece {
    render() {
        return <StyledPiece>{`K (${this.props.black})`}</StyledPiece>
    }
}

export default Knight;