import styled from '@emotion/styled';
import React from 'react';

const StyledPiece = styled.button({
    border: '0',
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    margin: 'auto',
});

function Pawn(props) {
    return (
        <svg black={props.black} xmlns="http://www.w3.org/2000/svg" version="1.1" width="45" height="45">
            <path d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z" 
                style={{opacity: '1', fill: props.black ? 'black' : 'white', fillOpacity: '1', fillRule: 'nonzero', stroke: 'black', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'miter', strokeMiterlimit: '4', strokeDasharray: 'none', strokeOpacity: '1'}}
            />
        </svg>
    );
}

function Rook(props) {
    return (
        <svg black={props.black} xmlns="http://www.w3.org/2000/svg" version="1.1" width="45" height="45">
            <g style={{opacity: '1', fill: props.black ? 'black' : 'white', fillOpacity: '1', fillRule: 'evenodd', stroke: '#000000', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '4', strokeDasharray: 'none', strokeOpacity: '1' }}>
                <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z " style={{ strokeLinecap: 'butt' }} />
                <path d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z " style={{ strokeLinecap: 'butt' }} />
                <path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z " style={{ strokeLinecap: 'butt' }} />
                <path d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z " style={{ strokeLinecap: 'butt', strokeLinejoin: 'miter' }} />
                <path d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z " style={{ strokeLinecap: 'butt' }} />
                <path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z " style={{ strokeLinecap: 'butt' }} />
                <path d="M 12,35.5 L 33,35.5 L 33,35.5" style={{ fill: 'none', stroke: '#ffffff', strokeWidth: '1', strokeLinejoin: 'miter' }} />
                <path d="M 13,31.5 L 32,31.5" style={{ fill: 'none', stroke: '#ffffff', strokeWidth: '1', strokeLinejoin: 'miter' }} />
                <path d="M 14,29.5 L 31,29.5" style={{ fill: 'none', stroke: '#ffffff', strokeWidth: '1', strokeLinejoin: 'miter' }} />
                <path d="M 14,16.5 L 31,16.5" style={{ fill: 'none', stroke: '#ffffff', strokeWidth: '1', strokeLinejoin: 'miter' }} />
                <path d="M 11,14 L 34,14" style={{ fill: 'none', stroke: '#ffffff', strokeWidth: '1', strokeLinejoin: 'miter' }} />
            </g>
        </svg>
    );
}

class Piece extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            captured: false,
        }
    }

    render() {
        if (this.props.type === 'pawn') {
            return <Pawn black={this.props.black} />
        }
        else if (this.props.type === 'rook') {
            return <Rook black={this.props.black} />
        }
        return (
            <StyledPiece>
                {this.props.type}<br />
                {`(${this.props.black})`}
            </StyledPiece>
        )
    }
}

export default Piece;
export { StyledPiece };