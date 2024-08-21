import React from 'react';

interface TrailerProps {
  src: string;
  width?: string;
  height?: string;
  title?: string;
}

const Trailer: React.FC<TrailerProps> = ({
  src,
  width = '560',
  height = '315',
  title = 'YouTube video player',
}) => {
  return (
    <iframe
      width={width}
      height={height}
      src={src}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};

export default Trailer;
