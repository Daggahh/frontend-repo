import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Loader from "./components/Pages/Loader";
import Error from "./components/Pages/Error";
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Pricing from "./components/Pages/Pricing";
import ContactUs from "./components/Pages/ContactUs";
import AboutUs from "./components/Dashboard/Pages/AboutUs";

const Nav = lazy(() => import("./components/Pages/Nav"));
const HeroSection = lazy(() => import("./components/Pages/HeroSection"));
const Features = lazy(() => import("./components/Pages/Features"));
const Services = lazy(() => import("./components/Pages/Services"));
const Mission = lazy(() => import("./components/Pages/Mission"));
// const Testimonials = lazy(() => import("./components/Pages/Testimonials"));
const FAQ = lazy(() => import("./components/Pages/Faq"));
const CTA = lazy(() => import("./components/Pages/Cta"));
const Footer = lazy(() => import("./components/Pages/Footer"));
const AuthPage = lazy(() => import("./components/Pages/AuthPage"));
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const Overview = lazy(() =>
  import("./components/Dashboard/Pages/Overview/Overview")
);
const MyApplication = lazy(() =>
  import("./components/Dashboard/Pages/MyApplication")
);
const Contact = lazy(() => import("./components/Dashboard/Pages/Contact"));
const SupportCenter = lazy(() =>
  import("../src/components/Dashboard/Pages/SupportCenter")
);
const Account = lazy(() =>
  import("./components/Dashboard/Pages/Account/Account")
);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("Current Path: ", window.location.pathname);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <div className="jobjot-entire-wrap">
                <Nav />
                <div className="jobjot-main-container">
                  <HeroSection />
                  <Features />
                  <Services />
                  <Mission />
                  {/* <Testimonials /> */}
                  <FAQ />
                  <CTA />
                </div>
                <Footer />
              </div>
            </Suspense>
          }
        />
        <Route
          path="/auth/*"
          element={
            <Suspense fallback={<Loader />}>
              <AuthPage />
            </Suspense>
          }
        />
        <Route
          path="/pricing"
          element={
            <Suspense fallback={<Loader />}>
              <Pricing />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<Loader />}>
              <ContactUs />
            </Suspense>
          }
        />
         <Route
          path="/about"
          element={
            <Suspense fallback={<Loader />}>
              <AboutUs />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/supportcenter"
          element={
            <Suspense fallback={<Loader />}>
              <SupportCenter />
            </Suspense>
          }
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard/*"
            element={
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            }
          >
            <Route index path="home" element={<Overview />} />
            <Route path="my-applications/*" element={<MyApplication />} />
            <Route path="contacts" element={<Contact />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
