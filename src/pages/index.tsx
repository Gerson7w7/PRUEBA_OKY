import type { HeadFC, PageProps } from "gatsby";
import { Layout } from "../components/Layout";
import { Countries } from "../features";
import React from "react";

export default function IndexPage(_props: PageProps) {
  return (
    <Layout>
      <Countries />
    </Layout>
  );
}

export const Head: HeadFC = () => (
  <title>OKY Wallet | Transaction Explorer</title>
);
