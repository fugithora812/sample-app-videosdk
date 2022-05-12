/* eslint-disable no-restricted-globals */
import React from 'react';
import ReactDOM from 'react-dom';
import ZoomVideo from '@zoom/videosdk';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ZoomContext from './context/zoom-context';
import { devConfig } from './config/dev';
import { generateVideoToken } from './utils/util';

let meetingArgs: any = Object.fromEntries(new URLSearchParams(location.search));

meetingArgs.sdkKey = devConfig.sdkKey;
meetingArgs.sdkSecret = devConfig.sdkSecret;
meetingArgs.name = devConfig.name;
meetingArgs.password = devConfig.password;
meetingArgs.signature = devConfig.signature;

if (
  !meetingArgs.topic
  // !meetingArgs.sdkKey ||
  // !meetingArgs.name ||
  // !meetingArgs.signature
) {
  meetingArgs.topic = devConfig.topic;
}
if (!meetingArgs.signature && meetingArgs.sdkSecret && meetingArgs.topic) {
  meetingArgs.signature = generateVideoToken(
    meetingArgs.sdkKey,
    meetingArgs.sdkSecret,
    meetingArgs.topic,
    meetingArgs.password,
    '',
    ''
  );
}

console.log('meetingArgs', meetingArgs);
const zmClient = ZoomVideo.createClient();
ReactDOM.render(
  <React.StrictMode>
    <ZoomContext.Provider value={zmClient}>
      <App
        meetingArgs={meetingArgs as any} 
      />
    </ZoomContext.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
