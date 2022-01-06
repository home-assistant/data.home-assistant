module.exports = {
  title: "Home Assistant",
  tagline: "Data Science Portal",
  url: "https://data.home-assistant.io",
  baseUrl: "/",
  favicon: "img/favicon.png",
  organizationName: "home-assistant", // Usually your GitHub org/user name.
  projectName: "data.home-assistant", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "Data Science",
      logo: {
        alt: "Home Assistant",
        src: "img/logo-pretty.svg",
        srcDark: "img/logo-pretty.svg",
      },
      items: [
        { to: "/docs/data", label: "Docs", position: "left" },
        { to: "/docs/quick-start", label: "Quick Start", position: "left" },
        // { to: "/blog", label: "Blog", position: "left" },
      ],
    },
    footer: {
      logo: {
        alt: "Home Assistant",
        src: "img/logo-white.svg",
        href: "https://www.home-assistant.io",
      },
      style: "dark",
      links: [
        {
          title: "Social",
          items: [
            // {
            //   label: "Blog",
            //   to: "blog",
            // },
            {
              label: "GitHub",
              href: "https://github.com/home-assistant/data.home-assistant",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/hass_devs",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Home Assistant, Inc. Built with Docusaurus.`,
    },
    image: "img/default-social.png",
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/home-assistant/data.home-assistant/edit/master/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],
};
