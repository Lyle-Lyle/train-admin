import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import {Provider} from 'react-redux'
import store from './store/index.js'


import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";



import Welcome from './pages/main/Welcome.jsx'
import Betty from "./pages/Betty/Betty.jsx"
import Station from "./pages/main/Station.jsx";


const router = createBrowserRouter([
        {
            path: "/",
            element:
                    <App/>,
            children: [
                {
                    path: 'welcome',
                    element: <Welcome/>
                },
                {
                    path: 'station',
                    element: <Station/>
                },
            ]
        },

        {
            path: '/betty',
            element: <Betty/>
        }
    ]
);





ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
)
