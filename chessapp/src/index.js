import ReactDOM from 'react-dom';
import React from 'react';
import Game from './game'
import {Global} from '@emotion/react';

ReactDOM.render(
    <div>
        <Global
            styles={{
                'html, body': {
                    margin: '0',
                    padding: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgb(240, 240, 240)'
                },
            }}
        />
        <Game />
    </div>, 
    document.getElementById("root")
);