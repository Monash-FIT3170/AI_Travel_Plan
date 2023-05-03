/**
 * This file is an example of how a page looks in the application
 * Consider a page as being a single page of the application
 * for example, you may be redirected from the HOME page to a LOG IN page to log into your account
 * Each page should contain all the relevant components specific to that page
 * 
 * In terms of react components, a page is also a react component that has components in it
 */

import React from 'react'
import Template from "./../components/Template";

export default function ExamplePage() {
  return (
    <div>
        <Template></Template>
    </div>
  )
}
