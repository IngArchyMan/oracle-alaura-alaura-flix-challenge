import React from 'react';
import VideoCard from './VideoCard';

const CategorySection = ({ title, videos, onEdit, onDelete, backgroundColor = 'bg-blue-500' }) => {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="mb-12">
      {/* Category Header */}
      <div className="flex items-center mb-4">
        <div className={`h-8 w-4 ${backgroundColor} mr-4`}></div>
        <h2 className="text-white text-2xl font-bold">{title}</h2>
      </div>

      {/* Category Description - First video description */}
      {videos[0] && (
        <p className="text-gray-400 mb-4">{videos[0].descripcion}</p>
      )}

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;