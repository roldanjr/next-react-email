import * as React from "react";
import { Body, Html } from "@react-email/components";

export type TemplateProps = {
  children?: React.ReactNode;
};

export default function Template({ children }: TemplateProps) {
  return (
    <Html>
      <Body>{children}</Body>
    </Html>
  );
}
