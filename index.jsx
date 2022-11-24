// For the full documentation please visit:
// https://github.com/felixhageloh/uebersicht

import { run } from 'uebersicht'

let currentState = 'stopped';

let humanInputPending = false;

const PAUSE_PATH = 'M 2 2 L 2 14 L 6 14 L 6 2 L 2 2 z M 10 2 L 10 14 L 14 14 L 14 2 L 10 2 z';

const PLAY_PATH = 'M 3,2 V 14 L 14,8 Z';

export const initialState = { output: currentState }

export const command = 'osascript "playpause.widget/playerstate.applescript"'

export const refreshFrequency = 300

export const className = `

    top: auto;
    left: auto;
    right: 22px;
    bottom: 50px;
    user-select: none;

    .icon {
        width: 22px;
        height: 22px;
        border-radius: 6px;
        transition-property: transform, opacity;
        transition-duration: 200ms;
    }

    .icon:hover {
        background-color: rgba(255,255,255,0.05);
        transform: scale(1.2);
    }

    .icon:active {
        background-color: rgba(255,255,255,0.1)
    }

    .stopped {
        opacity: 0;
        transform: translate(0, 5px) scale(0.8);
    }

`

function handleClick(dispatch) {

    switch (currentState) {
    case 'playing' :
        currentState = 'paused';
        break;
    case 'paused' :
        currentState = 'playing';
        break;
    default :
        currentState = 'stopped';
  }

  dispatch({ output: currentState });

  humanInputPending = true;

  run('osascript "playpause.widget/playpause.applescript"')
    .then(output => {
        humanInputPending = false;
        dispatch({ output });
    });

}

export function render({ output = "stopped" }, dispatch){

  if (!humanInputPending) {
    // fix bug where ubersight injects a line break after the output string
    currentState = output.split('\n')[0];
  }

  return (
    <div className={`icon ${currentState}`} onClick={() => handleClick(dispatch)}>
        <svg height="22" width="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
	        <path style={{"fill":"#ffffff"}} d={ currentState === 'playing' ? PAUSE_PATH : PLAY_PATH } transform="translate(3 3)"/>
        </svg>
    </div>
  );
}
