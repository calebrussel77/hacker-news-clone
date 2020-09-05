import React from "react";

const Comment = ({ comment }) => {
  return (
    <div className="comment mb-6 max-w-6xl">
      <div className="comment-user mb-2 font-bold text-xl">{comment.user}</div>
      <div
        className="comment-content text-gray-600 text-base"
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />
      {comment.comments && (
        <div className="nested-comments">
          {comment.comments.map((nestedComment) => (
            <Comment key={nestedComment.id} comment={nestedComment} />
          ))}
        </div>
      )}

      <style jsx>{`
        .comment-content :global(p) {
          margin: 0;
          margin-bottom: 0.5em;
          word-wrap: break-word;
        }
        .comment-content :global(a) {
          color: #f60;
          text-decoration: underline;
        }
        .comment-content :global(pre) {
          max-width: 100%;
          overflow: scroll;
        }
        .nested-comments {
          margin-top: 1em;
          border-left: 1px solid rgba(0, 0, 0, 0.1);
          padding-left: 1em;
        }
      `}</style>
    </div>
  );
};

export default Comment;
