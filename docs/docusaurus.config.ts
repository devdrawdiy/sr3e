import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
   title: "SR3E Unofficial Documentation",
   tagline: "-Project documentation",
   favicon: "img/favicon.ico",

   // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
   future: {
      v4: true, // Improve compatibility with the upcoming Docusaurus v4
   },

   // Set the production url of your site here (no sub-path)
   url: "https://devdrawdiy.github.io",
   // Set the /<baseUrl>/ pathname under which your site is served
   // For GitHub pages deployment, it is often '/<projectName>/'
   baseUrl: "/sr3e/",

   // GitHub pages deployment config.
   // If you aren't using GitHub pages, you don't need these.
   organizationName: "devdrawdiy", // Usually your GitHub org/user name.
   projectName: "sr3e", // Usually your repo name.

   onBrokenLinks: "throw",
   markdown: {
      hooks: {
         onBrokenMarkdownLinks: "warn",
      },
   },

   // Even if you don't use internationalization, you can use this field to set
   // useful metadata like html lang. For example, if your site is Chinese, you
   // may want to replace "en" with "zh-Hans".
   i18n: {
      defaultLocale: "en",
      locales: ["en"],
   },

   presets: [
      [
         "classic",
         {
            docs: {
               routeBasePath: "/docs",
               sidebarPath: "./sidebars.ts",
               // Please change this to your repo.
               // Remove this to remove the "edit this page" links.
               editUrl: "https://github.com/devdrawdiy/sr3e/edit/main/docs/",
            },
            blog: false,
            theme: {
               customCss: "./src/css/custom.css",
            },
         },
      ],
   ],

   themeConfig: {
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
         title: "SR3E Unofficial Documentation",
         logo: {
            alt: "My Site Logo",
            src: "img/logo.svg",
         },
         items: [
            {
               type: "docSidebar",
               sidebarId: "docsSidebar",
               position: "left",
               label: "Docs",
            },
            {
               href: "https://github.com/devdrawdiy/sr3e",
               label: "GitHub",
               position: "right",
            },
         ],
      },
      footer: {
         style: "dark",
         links: [
            {
               title: "Docs",
               items: [
                  {
                     label: "Home",
                     to: "/",
                  },
               ],
            },
            {
               title: "More",
               items: [
                  {
                     label: "GitHub",
                     href: "https://github.com/devdrawdiy/sr3e",
                  },
               ],
            },
         ],
         // copyright: `Last update ${new Date().getFullYear()} SR3E Unofficial. Built with Docusaurus.`,
      },
      prism: {
         theme: prismThemes.github,
         darkTheme: prismThemes.dracula,
      },
   },
};

export default config;
