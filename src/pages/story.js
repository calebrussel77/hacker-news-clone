import React from "react";
import axiosInstance from "../utils/axiosInstance";
import Error from "next/error";
import Layout from "../components/Layout/Layout";
import CommentList from "../components/CommentList/CommentList";

const Story = ({ story }) => {
  if (!story) {
    return <Error statusCode={503} />;
  }
  return (
    <Layout title={`Hacker News Clone | ${story.title}`}>
      <main className="w-full px-6 bg-gray-200 pt-2 pb-1">
        <h1 className="text-5xl font-bold text-gray-900 my-4 hover:underline">
          <a href={story.url} target="_blank">
            {story.title}
          </a>
        </h1>
        <div className="inline-flex space-x-3 items-center mb-3">
          <strong>{story.points} points </strong>
          <strong>{story.comments_count} comments </strong>
          <strong className="text-sm text-red-600">{story.time_ago}</strong>
        </div>
        {story.comments.length > 0 ? (
          <CommentList comments={story.comments} />
        ) : (
          <div className="text-center font-semibold text-gray-600 text-xl">
            No comments for this story
          </div>
        )}
      </main>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  let story;

  try {
    const storyId = query.id;
    const response = await axiosInstance.get(
      `https://node-hnapi.herokuapp.com/item/${storyId}`
    );
    story = await response.data;
  } catch (e) {
    console.log(e);
    story = null;
  }
  return {
    props: {
      story,
    },
  };
}

export default Story;
