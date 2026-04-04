import React from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement>;

export default function ImageWithFallback(props: Props) {
  return <img {...props} />;
}
