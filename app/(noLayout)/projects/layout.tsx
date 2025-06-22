"use client";

import React from "react";
import LangqProvider from "@/components/LangqProvider/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactElement;
}>) {
  return (
    <div className="project layout">
      <LangqProvider
        locale="en"
        projectToken="eba4c5fb6b64467c.39539e5a3a329ce5c0ee03b50cbb0958b96dc1741f47356c0c9fafcccfa6a7e6"
      >
        {children}
      </LangqProvider>
    </div>
  );
}
