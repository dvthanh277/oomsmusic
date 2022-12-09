import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/'

import './css/reset.css';
import './css/index.css';

import DefaultLayout from './Layout/DefaultLayout/DefaultLayout';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      {
        publicRoutes.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<DefaultLayout><Page /></DefaultLayout>}></Route>
        })
      }
    </Routes>
  </BrowserRouter>

);
