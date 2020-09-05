import axiosInstance from "../utils/axiosInstance";
import Error from "next/error";
import React from "react";
import { useRouter } from "next/router";
import StoryList from "../components/StoryList/StoryList";
import Layout from "../components/Layout/Layout";
import Link from "next/link";
import Router from "next/router";

export default function Home({ stories, page }) {
  if (!stories.length) {
    return <Error statusCode={504} />;
  }
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="text-center mt-32 font-bold text-3xl">is Loading...</div>
    );
  }

  return (
    <Layout
      title="New Links | Hacker Next"
      description="a hacker news clone made with made next js "
    >
      <StoryList stories={stories} />
      <footer className="my-10 text-center inline-flex items-center space-x-3">
        {page !== 1 ? (
          <span
            className="px-2 py-2 bg-red-400 text-white rounded-lg text-sm font-bold cursor-pointer"
            onClick={() => {
              Router.back();
            }}
          >
            Previous Page
          </span>
        ) : null}
        <Link href={`/?page=${page + 1}`}>
          <a className="px-2 py-2 bg-green-700 text-white rounded-lg text-sm font-bold">
            Next Page ({page + 1})
          </a>
        </Link>
      </footer>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  let stories;
  let page;

  try {
    page = Number(query.page) || 1;
    const response = await axiosInstance.get(
      `https://node-hnapi.herokuapp.com/news?page=${page}`
    );
    stories = await response.data;
  } catch (err) {
    console.log(err);
    stories = [];
  }
  return {
    props: {
      stories,
      page,
    },
  };
}
