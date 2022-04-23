import * as React from "react";

interface IconButtonProps {
  name: string;
  contents: string;
  cat: string
  style: string
}

//interface for individual icon button
function IconButton({ name, contents, cat, style }: IconButtonProps) {
  const svgRender = () => {
    if (cat != "Feather Icons")
      return (
        <svg
          width={28}
          height={28}
          viewBox="0 0 24 24"
          fill="none"
          dangerouslySetInnerHTML={{ __html: contents }}
        />
      );
    else
      return (
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
          dangerouslySetInnerHTML={{ __html: contents }}
        />
      );
  };
  
  return (
    <button
      key={name}
      aria-label={name}
      onClick={() => parent.postMessage({ pluginMessage: { type: name, style: style } }, "*")}
    >
      {svgRender()}
    </button>
  );
}

export default IconButton;
