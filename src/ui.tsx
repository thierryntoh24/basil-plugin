import * as React from "react";
import * as ReactDOM from "react-dom";
import Fuse from "../node_modules/fuse.js/dist/fuse";
import IconButton from "./icon-buttons";
import icons, { version } from "./icons";
import SearchInput from "./search-bar";
import "./ui.css";

function App() {

  //For the pills
  const
    [query, setQuery] = React.useState(""),
    [activePack, setActivePack] = React.useState<string>('Basil'),
    [isSelected, setSelected] = React.useState('Outline'),
    packs = [...new Set(icons.map(icon => icon.pack))],

    //For search 
    fuse = new Fuse(icons, {
      keys: ["name", "tags"],
      shouldSort: true,
      findAllMatches: true,
      threshold: 0.2,
      location: 0,
      distance: 100,
      minMatchCharLength: 1,
    }),

    results = query.trim() ? fuse.search(query.trim()).map((icon) => icon.item) : icons;

  React.useEffect(() => {
    setQuery('')
  }, [activePack])

  return (
    <div className="wrapper-div">
      <SearchInput
        key={Math.floor(Math.random() * 100)}

        value={query}
        onChange={(event) => setQuery(event.target.value)}

        packs={packs}
        activePack={activePack}
        setActivePack={setActivePack}

        isSelected={isSelected}
        setSelected={setSelected}

        style={{
          position: "sticky",
          top: 0,
          borderBottom: "1px solid rgba(0, 0, 0, 0.03)",
        }}
      />

      <div style={{ padding: 8, paddingTop: 4 }} id="results">
        {
          !query.trim() ? (
            <>
              {
                [...new Set(icons.filter(icon => icon.pack === activePack).map(icon => icon.category))].map((category) => (
                  <>
                    <p style={{ paddingLeft: 8, fontSize: 14 }}>{category}</p>
                    <div
                      key={category}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(6, 1fr)",
                        gridGap: 4,
                      }}
                    >
                      {results.filter((icon) => (icon.pack === activePack) && (icon.category == category)).map((icon) => icon.paths.filter(path =>
                        path.style === isSelected).map(path => (
                          <IconButton
                            key={path.id}
                            name={icon.name}
                            contents={path.path}
                            id={path.id}
                            pack={icon.pack}
                            category={category}
                          />
                        )))}
                    </div>
                  </>
                ))
              }
            </>
          ) : (<>
            {
              results ? (
                [...new Set(results.map(icon => icon.pack))].map(pack => (<>
                  <p key={pack} style={{ paddingLeft: 8, fontSize: 14 }}>{pack}</p>

                  <div key={pack}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(6, 1fr)",
                      gridGap: 4,
                    }}
                  >
                    {results.filter(icon => icon.pack === pack).map((icon) => icon.paths.map(path => (
                      <IconButton
                        key={path.id}
                        name={icon.name}
                        contents={path.path}
                        id={path.id}
                        pack={icon.pack}
                        category={icon.category}
                      />
                    )))}
                  </div>
                </>))) : (<p style={{ paddingLeft: 8, fontSize: 14 }}>{'No results found, please try another keyword'}</p>)
            }
          </>)
        }
      </div>

      <div
        style={{
          marginTop: 2,
          marginBottom: 0,
          padding: 8,
          fontSize: 12,
          positon: 'fixed',
          color: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>
          <a href="http://icons.craftwork.design">Craftwork Icons, v{version}</a>
        </p>
        <p>
          By <a href="http://thierryntoh.webflow.com">Thiérry Ntoh</a>
        </p>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("ui-page"));
