"use client";

import Head from "next/head";
import NewsApp from "./components/page/NewsApp";
import Layout from "./components/Layout";

export default function Home() {
  return (
    <div className="font-sans">
      <Head>
        <title>News App</title>
        <meta
          name="description"
          content="Stay updated with the latest news and updates."
        />
        <meta name="keywords" content="news, updates, latest news, headlines" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Head>

      <Layout>
        <NewsApp />
      </Layout>
    </div>
  );
}
