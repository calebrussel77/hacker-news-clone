import React from "react";
import Link from "next/link";

const StoryList = ({ stories }) => {
  return (
    <div className="w-full px-6 bg-gray-200 pt-2">
      {stories.map((story) => {
        return (
          <div key={story.id}>
            <h2 className="font-semibold text-lg py-2 text-gray-700">
              <a target="_blank" href={story.url}>
                {story.title}
              </a>
            </h2>
            <div className="inline-flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-600">
                {story.points || 0} points
              </span>
              <Link href={`/story?id=${story.id}`}>
                <a className="hover:underline text-red-600">
                  {story.comments_count || 0} comments
                </a>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StoryList;
