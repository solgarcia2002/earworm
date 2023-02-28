import {HTMLAttributes} from 'react';

interface SpotifyProps extends HTMLAttributes<HTMLIFrameElement> {
  [key: string]: any;

  link: string;
  width?: number | string;
  height?: number | string;
  frameBorder?: number | string;
  allow?: string;
}

const Spotify = ({
                   link,
                   width = 300,
                   height = 315,
                   frameBorder = 0,
                   allow = 'encrypted-media',
                   ...props
                 }: SpotifyProps) => {
  const url = new URL(link);
  return (
    <iframe
      title="Spotify Web Player"
      src={`https://open.spotify.com/embed${url.pathname}`}
      width={width}
      height={height}
      frameBorder={frameBorder}
      allow={allow}
      style={{
        borderRadius: 0,
      }}
      {...props}
    />
  );
};

export default Spotify;
