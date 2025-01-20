import React from "react";

const VideoCard = ({ video, onEdit, onDelete }) => {
  return (
    <div className="tg-surface-container-high video-card-container">
      <a href={video.video} className="video-link">
        <img
          src={video.imagen}
          alt={video.titulo}
          className="video-thumbnail"
        />
      </a>
      <div className="bottom-actions-container">
        <div className="flex-r-c-c button-actions">
          <button
            onClick={() => onEdit(video)}
            className="action-button tg-primary-text flex-r-c-c"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="24"
              height="24"
              strokeWidth="1.25"
            >
              <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
              <path d="M13.5 6.5l4 4"></path>
            </svg>
            Editar
          </button>
          <button
            onClick={() => onDelete(video.id)}
            className="action-button tg-primary-text flex-r-c-c"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="24"
              height="24"
              strokeWidth="1.25"
            >
              <path d="M4 7h16"></path>
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
              <path d="M10 12l4 4m0 -4l-4 4"></path>
            </svg>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
