import React from "react";
import Navigation from "./Navigation.jsx";
import Hero from "./Products.jsx";
import { Route, Routes } from "react-router-dom";
import CreatePage from "../pages/CreatePage.jsx";
import UpdatePage from "../pages/UpdatePage.jsx";

const HeroContent = () => {
  return (
    <section>
      <Navigation />
      <Routes>
        <Route index element={<Hero />} />
        <Route path="/create_product" element={<CreatePage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
      </Routes>
    </section>
  );
};

export default HeroContent;
