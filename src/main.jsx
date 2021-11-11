/**
 * When routes have children it does two things:
 * 1) It nests the URLs ("/" + "expenses" and "/" + "invoices")
 * 2) It will nest the UI components for shared layout when the child route matches:
 * However, before (2) will work we need to render an Outlet in the App.jsx "parent" route
 * 
 * An <Outlet> renders whatever child route is currently active,
 * so you can think about this <Outlet> as a placeholder for
 * the child routes we defined above 
 * 
 */

import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Expenses from './routes/expenses';
import Invoices from './routes/invoices';
import Invoice from './routes/invoice';
import About from './routes/about';

const rootElement = document.getElementById('root');

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="invoices" element={<Invoices />}>
          <Route
            index
            element={
              <main style={{ padding: '1rem' }}>
                <p>Select an invoice</p>
              </main>
            }
          />
          <Route path=":invoiceId" element={<Invoice />} />
        </Route>

        <Route path="expenses" element={<Expenses />} />

        <Route path="about" element={<About />} />

        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,

  rootElement
);


