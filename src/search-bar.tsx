import * as React from "react";
import icons from "./icons";
import Icons from "../basil-icons/icons";

const ICON_COUNT = icons.filter(icon => icon.style != 'Solid').length;

interface SearchInputProps extends React.HTMLProps<HTMLDivElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchInput({ value, onChange, onCheck, ...props }: SearchInputProps) {
  return (
    
    <div
      style={{
        position: "relative",
        padding: 8,
      }}
      {...props}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          padding: 8,
        }}
      >
        <svg
          viewBox="0 0 32 32"
          width={32}
          height={32}
          fill="none"
          dangerouslySetInnerHTML={{ __html: Icons.Outline.Search }}
        />
      </div>

      <div className="brr">
        <input
          autoFocus
          type="search"
          value={value}
          onChange={onChange}
          placeholder={`Search ${ICON_COUNT} icons -> Toggle for mode`}
        />
        <div className="toggle">
          <input type="checkbox" className="checkbox" name="style" id="style" onChange={onCheck} />
          <label htmlFor="style" className="label">
            <span className="inner" />
            <span className="switch" />
          </label>
        </div>
      </div>
    </div>
  );
}


export default SearchInput;

