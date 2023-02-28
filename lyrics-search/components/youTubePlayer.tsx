import {HTMLAttributes} from 'react';

interface YouTubeProps extends HTMLAttributes<HTMLIFrameElement> {
  [key: string]: any;

  link: string;
  width?: number | string;
  height?: number | string;
  allow?: string;
}

const getVideoIdFromUrl = (link: string) => {
  const linkArr = link.split('v=');
  return linkArr[1] ?? ''
}

const YouTube = ({
                   link,
                   width = 560,
                   height = 315,
                   frameBorder = 0,
                   allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                   ...props
                 }: YouTubeProps) => {

  return (
    <iframe
      title="YouTube video player"
      src={`https://www.youtube.com/embed/${getVideoIdFromUrl(link)}`}
      width={width}
      height={height}
      allow={allow}
      frameBorder={frameBorder}
      allowFullScreen={true}
      style={{
        borderRadius: 8,
      }}
      {...props}
    />
  );
};

export default YouTube;
