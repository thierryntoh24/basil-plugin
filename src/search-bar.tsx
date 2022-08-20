import * as React from "react";
import icons from "./icons";
import { Basil, Edge } from "../icons/index";

interface SearchInputProps extends React.HTMLProps<HTMLDivElement> {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  packs: string[]
  activePack: string
  setActivePack: React.Dispatch<React.SetStateAction<string>>
  isSelected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
}

function SearchInput({ value, packs, activePack, isSelected, onChange, setSelected, setActivePack, ...props }: SearchInputProps) {

  const
    [isDropped, setIsDropped] = React.useState(false),
    styles: { [key: string]: string[] } = {
      'Basil': ['Outline', 'Solid'],
      'Edge': ['Regular', 'Thin', 'Medium'],
      'Clickons': ['Stroke', 'Fill'],
      'Circum': ['Thin'],
    }

  let state: string;

  return (
    <>
      <div className="tabs">
        {
          packs.map(pack => (<>
            <div key={pack} className={`pack ${activePack === pack ? state = 'active' : null}`} onClick={() => { setActivePack(pack); setSelected(styles[pack][0]); }}>
              {`${pack} (${icons.filter(icon => icon.pack === pack).length})`}
            </div>
          </>
          ))
        }

      </div>

      <div
        className="search-select"
        {...props}
      >
        <div className="style" onClick={() => setIsDropped(!isDropped)}>
          <div className="select-field">
            {isSelected}

            <svg
              className="dropdown-icon"
              viewBox="0 0 20 20"
              width={18}
              height={18}
              fill="none"
              dangerouslySetInnerHTML={{ __html: Basil.Outline.CarDown }}
            />
          </div>

          {
            isDropped && (
              <div className="style-options">
                {styles[activePack].map(style => (
                  <div key={style} className='option' onClick={() => {
                    setIsDropped(!isDropped);
                    setSelected(style)
                  }}>
                    {style}
                  </div>
                ))}
              </div>
            )
          }
        </div>

        <div className="brr">
          <div
            className="search-icon"
          >
            <svg
              viewBox="0 0 22 22"
              width={20}
              height={20}
              fill="none"
              dangerouslySetInnerHTML={{ __html: Edge.Thin.Search }}
            />
          </div>

          <input
            autoFocus
            type="search"
            value={value}
            onChange={onChange}
            placeholder={`Search all ${icons.length} icons`}
          />
        </div>
      </div>
    </>
  );
}
export default SearchInput;

