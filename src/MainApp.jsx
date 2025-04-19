import React from "react";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import "./styles.css";

const MainApp = () => {
  return (
    <>
      <center>
        <Header />
        <NavBar />
        <div className="app-container">
          <AppRoutes />
        </div>
        <Footer />
      </center>
    </>
  );
};

export default MainApp;
