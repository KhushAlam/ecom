import React from "react";
import Breadcrum from "../Components/Breadcrum";
import About from "../Components/About";
import Value from "../Components/Value";
import Facts from "../Components/Facts";
import Features from "../Components/Features";
import Testomonial from "../Components/Testomonial";

export default function AboutPages() {
  return (
    <>
      <Breadcrum title="About Page" />
      <About/>
      <Value/>
      <Facts/>
      <Features/>
      <Testomonial/>
    </>
  );
}
