import type { LinksFunction } from "@remix-run/node";
import { Layout } from "antd";
import Header from "app/components/header";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import normalize from "normalize.css/normalize.css";
import antdStyleSheet from "./styles/antd.css";
import globalStyleSheet from "./styles/styles.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: normalize },
    { rel: "stylesheet", href: antdStyleSheet },
    { rel: "stylesheet", href: globalStyleSheet },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900"
          rel="stylesheet"
          type="text/css"
        ></link>
      </head>
      <body>
        <Layout style={{ height: "100%" }}>
          <Header />
          <Layout className="ContentContainer">
            <Outlet />
          </Layout>
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
