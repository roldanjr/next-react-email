import * as React from "react";
import { Head, Html } from "@react-email/components";

export type HeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export default function Header({ title, children }: HeaderProps) {
  return (
    <Html>
      <Head>
        <title>{title}</title>
      </Head>
    </Html>
  );
}
