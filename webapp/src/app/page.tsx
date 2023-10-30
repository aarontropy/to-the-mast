"use client";
import Head from "next/head";
import Hero from "../components/hero";
import Navbar from "../components/navbar";

const Home = () => {
  return (
    <>
      <Head>
        <title>To The Mast</title>
        <meta name="description" content="Product" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen is-info">
        <Navbar />
        <Hero />
      </div>
    </>
  );
};

export default Home;
