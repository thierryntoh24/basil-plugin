import * as React from "react";
import axios from "../node_modules/axios/index";

interface IconButtonProps {
  name: string;
  contents: string;
  id: number
  pack: string
  category: string
}

const postIconData = async (iconData: IconButtonProps, callback: (error: string | null) => void) => {
  await axios({
    method: 'POST',
    url: `https://416.io/external/figma/ping`,
    data: { iconData }
  }).then(response => {
    if (response.status !== 200) callback(`Unable to ping endpoint! ::: ${response.status}`)
    else console.info('Pinged succefully')
  }).catch(error => callback(`Unable to ping endpoint!, ${error.message}`))
}

/**interface for individual icon button */
function IconButton({ name, contents, id, pack, category }: IconButtonProps) {
  return (
    <button
      key={name}
      aria-label={name}
      onClick={async () => {
        parent.postMessage({ pluginMessage: { type: name, pack: pack, id: id, category: category } }, "*");
        await postIconData({name, contents, id, pack, category}, error => { if (error) console.log(error)})
      }}
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
