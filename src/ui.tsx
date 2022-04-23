import * as React from "react";
import * as ReactDOM from "react-dom";
import Fuse from "../node_modules/fuse.js/dist/fuse";
import IconButton from "./icon-buttons";
import icons, { version } from "./icons";
import SearchInput from "./search-bar";
import "./ui.css";

function App() {

  //For the toggle
  let check: string;
  const [checked, setChecked] = React.useState(false);
  checked ? (check = "Solid") : (check = "Outline");

  const [query, setQuery] = React.useState("");

  //For search functionality
  const fuse = new Fuse(icons, {
    keys: ["name", "tags"],
    shouldSort: true,
    findAllMatches: true,
    threshold: 0.2,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
  });

  const results = query.trim() ? fuse.search(query.trim()).map((icon) => icon.item) : icons;

  const categories = [...new Set(results.map((icon) => icon.category))];

  return (
    <div className="wrapper-div">
      <SearchInput
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onCheck={() => setChecked(!checked)}
        style={{
          position: "sticky",
          top: 0,
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      />
      <div style={{ padding: 8, paddingTop: 4 }} id="results">
        <div
          style={{
            fontSize: 12,
            color: "rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* <p>Search is currently unavailable. Working on it :)</p> */}
        </div>
        {categories.map((cat) => (
          <>
            <p style={{ paddingLeft: 8, fontSize: 14 }}>{cat}</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gridGap: 4,
              }}
            >
              {results
                .filter((icon) => icon.category == cat && icon.style == check)
                .map((icon) => (
                  <IconButton
                    name={icon.name}
                    contents={icon.content}
                    cat={icon.category}
                    style={icon.style}
                  />
                ))}
            </div>
          </>
        ))}
      </div>

      <div
        style={{
          marginTop: 2,
          padding: 8,
          fontSize: 12,
          color: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>
          Basil Icons from <a href="http://craftwork.design">Craftwork, v{version}</a>
        </p>
        <p>
          By <a href="http://thierryntoh.webflow.com">Thiérry Ntoh</a>
        </p>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("ui-page"));
