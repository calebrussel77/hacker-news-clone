import React from "react";
import Link from "next/link";
import Head from "next/head";

const Layout = ({ children, title, description }) => {
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content={description} />
        <title>{title}</title>
      </Head>
      <div className="pt-6 container mx-auto">
        <nav className="px-6 bg-orange-700 w-full py-3">
          <Link href="/">
            <a className="uppercase font-bold text-2xl leading-tight py-10 text-gray-900">
              Hacker News Clone
            </a>
          </Link>
        </nav>
        {children}
      </div>
      <div className="text-sm text-gray-600 font-medium my-4 text-center">
        Made by @calebRussel
      </div>
    </div>
  );
};

export default Layout;
