import path from "node:path";
import url from "node:url";
import { defineConfig } from "@rspress/core";
import { withCallstackPreset } from "@callstack/rspress-preset";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default withCallstackPreset(
  {
    context: __dirname,
    docs: {
      title: "React Native Meta Horizon OS docs",
      description:
        "Setup, develop, debug, and deploy React Native apps for Meta Quest",
      editUrl:
        "https://github.com/callstack/react-native-meta-horizon-os/edit/main/docs",
      // icon: '/logo.svg',
      // logoLight: '/logo-light.svg',
      // logoDark: '/logo-dark.svg',
      // ogImage: '/og-image.jpg',
      rootDir: "src",
      rootUrl: "https://oss.callstack.com/react-native-meta-horizon-os",
      socials: {
        github: "https://github.com/callstack/react-native-meta-horizon-os",
        x: "https://x.com/callstackio",
        discord: "https://discord.gg/dmDkGFNj9k",
      },
    },
  },
  defineConfig({
    base: "/react-native-meta-horizon-os/",
    outDir: "build",
  }),
);
