import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClientProvider, QueryClient, } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryclient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')!).render(

        <QueryClientProvider client={queryclient}>
                <App />
                {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> */}
        </QueryClientProvider>

)
