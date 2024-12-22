import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ImageSlider from "./components/Slider/ImageSlider";
import InfoCard from "./components/InfoCard/InfoCard";
import Footer from "./components/Footer/Footer";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Reviews from "./components/Reviews/Reviews";

import "bootstrap/dist/css/bootstrap.min.css";

import "./components/Reviews/ReviewBackground.css";
import images from "./data/images";
import cards from "./data/cards";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Main */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <ImageSlider images={images} />
                <InfoCard cards={cards} />
                <Footer />
              </>
            }
          />
          {/* Admin */}
          <Route path="/admin" element={<AdminPanel />} />
          {/* Reviews */}
          <Route
            path="/reviews"
            element={
              <div>
                <Header />
                <div className="content">
                  <Reviews />
                </div>
                <Footer />
              </div>
            }
          />
          {/* Services */}
          <Route
            path="/services"
            element={
              <div>
                <Header />
                <div className="content">
                  <Reviews />
                </div>
                <Footer />
              </div>
            }
          />
          {/* Contacts */}
          <Route
            path="/contacts"
            element={
              <div>
                <Header />
                <div className="content">
                  <Reviews />
                </div>
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
