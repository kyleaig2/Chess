import ReactDOM from 'react-dom';
import React from 'react';
import Board from './board'
import {Global} from '@emotion/react';

ReactDOM.render(
    <div>
        <Global
            styles={{
                'html, body': {
                    margin: '0',
                    padding: '0'
                },
            }}
        />
        <Board />
    </div>, 
    document.getElementById("root")
);