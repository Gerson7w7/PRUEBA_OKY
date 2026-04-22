import React, { type ReactNode } from "react";
import { Link } from "gatsby";

import "../styles/global.css";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">OKY Wallet Simulator</p>
          <h1>Transaction Explorer</h1>
        </div>
        <Link to="/" className="home-link">
          Volver a la lista
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}
