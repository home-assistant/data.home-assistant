import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Explore Your Data</>,
    description: (
      <>
        The Home Assistant Data Science portal is your one stop shop to get
        started exploring the data of your home. We will teach you about the
        data that Home Assistant tracks for you and we'll get you up and
        running with Jupyter Lab, a data science environment,
        to explore your own data.
      </>
    ),
  },
  {
    title: <>Documentation Structure</>,
    description: (
      <>
        <b><a href='/docs/data'>Data Primer.</a></b>
        {' '}Introduction to the available data in Home Assistant. Learn all about events, states and context.
        <br />
        <b><a href='/docs/quick-start'>Quick Start Guide.</a></b>
        {' '}In 15 minutes you will set up a data science environment and run your first reports.
        <br />
        <b><a href='/docs/quick-start-core'>Quick Start Guide for Home Assistant Core users.</a></b>
        {' '}In 15 minutes you will set up a data science environment and run your first reports.
      </>
    ),
  },
  {
    title: <>You Own Your Data</>,
    description: (
      <>
        <p>
          With Home Assistant we are taking a different approach to smart home
          data. All data that is collected is to serve you, and only you.
        </p>
        <ul>
          <li>We believe that your data is yours, all of it.</li>
          <li>
            We believe that you don't need to share your data to learn from
            it.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: <></>,
    imageUrl: 'img/graphic/own-data.svg',
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--5', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Home Assistant Data Science`}
      description="Explore the data of your home">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <div className="row">
            <div className={clsx('col col--10')}>
              <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
              <p className={styles.heroTagline}>{siteConfig.tagline}</p>
              <p>
                <a className={styles.heroText} href="https://www.home-assistant.io">
                  Not a data scientist? Go to the normal website
                </a>
              </p>
              <div className={styles.buttons}>
                <Link
                  className={clsx(
                    'button button--outline button--secondary button--lg',
                    styles.getStarted,
                  )}
                  to={useBaseUrl('docs/quick-start')}>
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
