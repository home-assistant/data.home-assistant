/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + "/siteConfig.js");

function imgUrl(img) {
  return siteConfig.baseUrl + "img/" + img;
}

function docUrl(doc, language) {
  return (
    siteConfig.baseUrl +
    "docs/" +
    (language ? language + "/" : "") +
    doc +
    ".html"
  );
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + "/" : "") + page;
}

const PopularTopicsSection = ({ language }) => (
  <React.Fragment>
    <div className="introSection lightBackground">
      <Container>
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-evenly",
            paddingBottom: 18,
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", maxWidth: 420 }}
          >
            <h2>Explore Your Data</h2>
            <p>
              The Home Assistant Data Science portal is your one stop shop to
              get started exploring the data of your home. We will teach you
              about the data that Home Assistant tracks for you and we'll get
              you up and running with Jupyter Lab, a data science environment,
              to explore your own data.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 420
            }}
          >
            <h2>Documentation Structure</h2>
            <p>
              <b>
                <a href={docUrl("data_index", language)}>Data Primer.</a>
              </b>{" "}
              Introduction to the available data in Home Assistant. Learn all
              about events, states and context.
            </p>
            <p>
              <b>
                <a href={docUrl("quick_start_index", language)}>
                  Quick Start Guide.
                </a>
              </b>{" "}
              In 10 minutes you will set up a data science environment and run
              your first reports.
            </p>
          </div>
        </div>
      </Container>
    </div>
    <Container>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-evenly"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 420
          }}
        >
          <h2>You own your data</h2>
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
        </div>
        <div
          style={{
            maxWidth: 420,
            padding: 30
          }}
        >
          <img src={imgUrl("graphic/own-data.svg")} />
        </div>
      </div>
    </Container>
  </React.Fragment>
);

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: "_self"
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
);

const ProjectTitle = props => (
  <div>
    <h2 className="projectTitle">
      Home Assistant
      <small>Data Science Portal</small>
    </h2>
    <div>
      <a href="https://www.home-assistant.io">
        Not a data scientist? Go to the normal website
      </a>
    </div>
  </div>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || "";
    return (
      <SplashContainer>
        <Logo img_src={imgUrl("logo-responsive.svg")} />
        <div className="inner">
          <ProjectTitle />
          {/* <PromoSection>
            <Button href="#try">Try It Out</Button>
            <Button href={docUrl('doc1.html', language)}>Example Link</Button>
            <Button href={docUrl('doc2.html', language)}>Example Link 2</Button>
          </PromoSection> */}
        </div>
      </SplashContainer>
    );
  }
}

const IntroSection = ({ language }) => (
  <div className="videoSection">
    <Container>
      <div style={{ maxWidth: 600, margin: "auto" }}>
        <div className="videoWrapper">
          <iframe
            width={560}
            height={315}
            src="https://www.youtube.com/embed/Cfasc9EgbMU"
            frameBorder={0}
            allowFullScreen
          />
        </div>
      </div>
    </Container>
  </div>
);

class Index extends React.Component {
  render() {
    let language = this.props.language || "";

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer indexPage">
          <PopularTopicsSection language={language} />
          {/* <IntroSection language={language} /> */}
        </div>
      </div>
    );
  }
}

module.exports = Index;
