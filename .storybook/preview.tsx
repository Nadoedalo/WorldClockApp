import type { Preview } from "@storybook/react";
import React from "react";
import "../app/globals.css";
import ThemeProvider from "../components/ThemeProvider";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-6">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: { expanded: true },
    layout: "centered",
  },
};

export default preview;
