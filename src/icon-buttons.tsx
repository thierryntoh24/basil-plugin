import * as React from "react";

interface IconButtonProps {
  name: string;
  contents: string;
  id: number
  pack: string
category: string
}

//interface for individual icon button
function IconButton({ name, contents, id, pack, category }: IconButtonProps) { 
  return (
    <button
      key={name}
      aria-label={name}
      onClick={() => parent.postMessage({ pluginMessage: { type: name, pack: pack, id: id, category: category } }, "*")}
    >
      <svg
          width={28}
          height={28}
          viewBox="0 0 24 24"
          fill="none"
          dangerouslySetInnerHTML={{ __html: contents }}
        />
    </button>
  );
}

export default IconButton;
