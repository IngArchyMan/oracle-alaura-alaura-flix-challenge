import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategorySection from "../components/CategorySection";
import VideoModal from "../components/VideoModal";
import { api } from "../services/api";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const response = await api.getVideos();
      setVideos(response.data);
    } catch (error) {
      console.error("Error loading videos:", error);
    }
  };

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este video?")) {
      try {
        await api.deleteVideo(id);
        loadVideos();
      } catch (error) {
        console.error("Error deleting video:", error);
      }
    }
  };

  const handleSave = async (videoData) => {
    try {
      await api.updateVideo(videoData.id, videoData);
      loadVideos();
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  return (
    <div className="main-app-container body-medium tg-on-surface-text">
        <main className="main flex-c-c-c">
    {/* Hero Section */}
    <div className="video-grid-container flex-c-s-c">
      <div className="video-group-container">
        <h2 className="group-title">FRONTEND</h2>
        <div className="flex-grid flex-r-s-c">
        {videos
            .filter((video) => video.categoria === "Frontend").slice(1)
            .map((video) => (
              <VideoCard key={video.id} video={video} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
        </div>
      </div>

      <div className="video-group-container">
        <h2 className="group-title">BACKEND</h2>
        <div className="flex-grid flex-r-s-c">
          {videos
            .filter((video) => video.categoria === "Backend")
            .map((video) => (
              <VideoCard key={video.id} video={video} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
        </div>
      </div>

      <div className="video-group-container">
        <h2 className="group-title">INNOVACIÓN Y GESTIÓN</h2>
        <div className="flex-grid flex-r-s-c">
          {videos
            .filter((video) => video.categoria === "Innovación y Gestión")
            .map((video) => (
              <VideoCard key={video.id} video={video} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
        </div>
      </div>
    </div>
  </main>

      {/* Edit Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedVideo(null);
        }}
        video={selectedVideo}
        onSave={handleSave}
      />
    </div>
  );
};

export default Home;
