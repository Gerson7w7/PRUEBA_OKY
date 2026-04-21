import React from "react";
import { Link } from "gatsby";

import { Layout } from "../components/Layout";

export default function NotFoundPage() {
  return (
    <Layout>
      <section className="card state-box">
        <h2>404</h2>
        <p>La pagina que buscas no existe.</p>
        <Link className="ghost-btn" to="/">
          Ir al inicio
        </Link>
      </section>
    </Layout>
  );
}
