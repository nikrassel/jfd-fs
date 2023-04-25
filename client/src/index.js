import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "bootstrap/dist/css/bootstrap.css"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import reportWebVitals from "./reportWebVitals"
import { createStore } from "./store/createStore"
import { Provider } from "react-redux"

const root = ReactDOM.createRoot(document.getElementById("root"))
const store = createStore()
root.render(
    <React.StrictMode>
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
        ></link>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
