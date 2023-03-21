import React from "react";
// import ReactDOM from "react-dom/client";
import ReactDOM from "react-dom";
// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('app');
// const root = createRoot(container);
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store";

// import { Provider as AlertProvider, positions, transitions } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";

// const options = {
//     position: positions.BOTTOM_CENTER,
//     timeout: 5000,
//     transition: transitions.SCALE,
//   };

ReactDOM.render(
// // const root = ReactDOM.createRoot(document.getElementById("root"));
// // root.render(
// root.render(
    <React.StrictMode>
        <Provider store={store}>
            {/* <AlertProvider template={AlertTemplate} {...options}> */}
            <App />
            {/* </AlertProvider> */}
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);