import React from "react";
import logo from "./logo.svg";
import { PageContextProvider } from "./usePageContext";
import type { PageContext } from "./types";
import "./PageShell.css";
import { Link } from "./Link";

export { PageShell };

import { DynamicContextProvider, DynamicWidget } from "@dynamic-labs/sdk-react";

// 1. Import the DynamicWagmiConnector
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";

function PageShell({
  children,
  pageContext,
}: {
  children: React.ReactNode;
  pageContext: PageContext;
}) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <DynamicContextProvider
          settings={{
            environmentId: "e8aee26c-efbc-4e28-9407-d990537a4a1c",
          }}
        >
          <DynamicWagmiConnector
            evmNetworks={[
              {
                blockExplorerUrls: ["https://etherscan.io/"],
                chainId: 1,
                chainName: "Ethereum Mainnet",
                iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
                nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
                networkId: 1,
                privateCustomerRpcUrls: ["https://mainnet.infura.io/v3/xxxx"],
                rpcUrls: ["https://cloudflare-eth.com"],
                vanityName: "Ethereum",
              },
            ]}
          >
            <DynamicWidget />

            <Layout>
              <Sidebar>
                <Logo />
                <Link className="navitem" href="/">
                  Home
                </Link>
                <Link className="navitem" href="/about">
                  About
                </Link>
              </Sidebar>
              <Content>{children}</Content>
            </Layout>
          </DynamicWagmiConnector>
        </DynamicContextProvider>
      </PageContextProvider>
    </React.StrictMode>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        maxWidth: 900,
        margin: "auto",
      }}
    >
      {children}
    </div>
  );
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: 20,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: "1.8em",
      }}
    >
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: 20,
        paddingBottom: 50,
        borderLeft: "2px solid #eee",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}

function Logo() {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 10,
      }}
    >
      <a href="/">
        <img src={logo} height={64} width={64} alt="logo" />
      </a>
    </div>
  );
}
