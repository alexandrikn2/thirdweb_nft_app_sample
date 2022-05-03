import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { MoralisProvider } from "react-moralis";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <MoralisProvider appId="46Ewx0XEtZj1CElt4dj7GNBSZjXaNSpjSFycABBO" serverUrl="https://bo004bsoiwol.usemoralis.com:2053/server">
        <App />
    // </MoralisProvider>
);
