import React from "react";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";

const MainApp = () => {
  return (
    <>
      <Header />
      <NavBar />
      <AppRoutes />
      <Footer />
    </>
  );
};

export default MainApp;
