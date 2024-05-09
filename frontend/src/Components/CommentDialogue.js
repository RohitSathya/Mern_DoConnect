import React from 'react';

export default function CommentDialogue({ comments, onClose }) {
  return (
    <div className="comment-dialogue">
      <div className="comment-dialogue-content">
        <button onClick={onClose} className="close-button">&times;</button>
        <h2>Comments</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}