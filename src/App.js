
import React from 'react';
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import FontStyles from "./utils/fontStyles";

export default function App() {
  return (
    <Layout>
      <FontStyles />
      <Home />
    </Layout>
  );
}
