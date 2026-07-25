import type { ReactElement } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

const YOUTUBE_ID = "qKfM4xvRxYo";

export default function Home(): ReactElement {
  return (
    <Layout
      title="SR3E Unofficial Documentation"
      description="Documentation for sr3e, an unofficial Shadowrun Third Edition system for Foundry VTT."
    >
      <header className={styles.heroBanner}>
        <div className="container">
          <Heading as="h1">sr3e</Heading>
          <p className={styles.tagline}>
            An unofficial Shadowrun Third Edition system for Foundry VTT. Svelte-driven sheets,
            a service layer that owns the rules, and DataModel-defined actors and items.
          </p>
          <div className={styles.videoWrapper}>
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
              title="sr3e overview video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/docs/for-users/getting-started">
              For Users
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/for-developers/architecture">
              For Developers
            </Link>
          </div>
        </div>
      </header>
    </Layout>
  );
}
