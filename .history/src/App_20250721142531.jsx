import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import store from 're'; // Assuming you have a Redux store setup

// Lazy-loaded components and pages
const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CreateBlog = lazy(() => import('./pages/CreateBlog'));
const UpdateBlog = lazy(() => import('./pages/UpdateBlog'));
const ShowBlog = lazy(() => import('./pages/ShowBlog'));
const ForgetPassword = lazy(() => import('./pages/ForgetPassword'));
const Search = lazy(() => import('./components/Search'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));
const AdminPrivateRoute = lazy(() => import('./components/AdminPrivateRoute'));
const ThemeProvider = lazy(() => import('./components/ThemeProvider'));

// Optional: custom loading fallback
const Loading = () => <div className="text-center p-4">Loading...</div>;

const App = () => {
  return (
    <PersistGate persistor={persistStore(store)}>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <ScrollToTop />
            <ThemeProvider>
              <Header />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/blog/:blogSlug' element={<ShowBlog />} />
                <Route path='/search' element={<Search />} />
                <Route path='/forget-password' element={<ForgetPassword />} />

                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                  <Route path='/dashboard' element={<Dashboard />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<AdminPrivateRoute />}>
                  <Route path='/create-blog' element={<CreateBlog />} />
                  <Route path='/update-blog/:blogId' element={<UpdateBlog />} />
                </Route>
              </Routes>
              <Footer />
            </ThemeProvider>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </PersistGate>
  );
};

export default App;
