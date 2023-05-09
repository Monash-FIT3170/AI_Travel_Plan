/**
 * This file is an example of how a page looks in the application
 * Consider a page as being a single page of the application
 * for example, you may be redirected from the HOME page to a LOG IN page to log into your account
 * Each page should contain all the relevant components specific to that page
 *
 * In terms of react components, a page is also just a react component.
 */

import React from "react";
import ExampleBox from "../components/examples/ExampleBox";
import Background from "../components/Background";
import BackgroundImage from "../components/BackgroundImage";

export default function ExamplePage() {
  return (
    <>
      <BackgroundImage />
      <Background>
        <ExampleBox />
        <ExampleBox />
        <ExampleBox />
      </Background>
    </>
  );
}
