import {HTMLAttributes} from 'react';

interface YouTubeProps extends HTMLAttributes<HTMLIFrameElement> {
  [key: string]: any;
  link: string;
  width?: number | string;
  height?: number | string;
  allow?: string;
}

const Genius = ({
                   link,
                   style = {},
                   width = 560,
                   height = 315,
                   allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                   ...props
                 }: YouTubeProps) => {
  const url = new URL('https://www.youtube.com/watch?v=XFkzRNyygfk');
 //get v param from url
  return (

    <iframe
      title="YouTube video player"
      src={`https://genius.com/Sia-chandelier-sample`}
      width={width}
      height={height}
      allow={allow}
      allowFullScreen={true}
      style={{
        borderRadius: 8,
        ...style,
      }}
      {...props}
    />
  );
};

export default Genius;
