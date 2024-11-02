import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { LayoutWithTopNavigation } from "../common/layouts/LayoutWithTopNavigation";

export const remainders = () => {
  return (
    <LayoutWithTopNavigation titleScreen="Recondatorios" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text category="h1">Remainders Screen</Text>
    </LayoutWithTopNavigation>
  );
};

export default remainders;