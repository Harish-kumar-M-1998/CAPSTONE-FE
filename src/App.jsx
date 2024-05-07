import React from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./screens/Home.jsx";
import Bookingscreen from "./screens/Bookingscreen.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./screens/Register.jsx";
import Login from "./screens/Login.jsx";
import Contact from "./screens/Contact.jsx";
import CleaningServicesAbout from "./screens/CleaningServicesAbout .jsx";
import LandingPage from "./components/LandingPage.jsx";
import RatingAndReview from "./components/RatingAndReview.jsx";
import Footer from "./components/Footr.jsx";

import Profile from "./components/Profile.jsx";
import Admin from "./components/Admin.jsx";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/bookingscreen/:serviceid" element={<Bookingscreen />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rating-and-review" element={<RatingAndReview />} />
          <Route path="/about" element={<CleaningServicesAbout />} />
          
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
