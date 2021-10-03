//stylesheets
import "../styles/core/Reset.scss";
import "../styles/layout/Main.scss";
//components
import Header from "./Header";
import Filters from "./Filters";
import CharacterList from "./CharacterList";
import CharacterDetail from "./CharacterDetail";

import api from "../services/CharacterApi";
import { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router";

function App() {
  // STATES
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchSpecies, setSearchSpecies] = useState("all");

  //USEFFECT
  useEffect(() => {
    api().then((initialData) => {
      setData(initialData);
    });
  }, []);

  //HANDLE
  const handleSearchName = (ev) => {
    setSearchName(ev.currentTarget.value);
  };

  const handleSearchSpecies = (ev) => {
    setSearchSpecies(ev.target.value);
  };

  const routeData = useRouteMatch("/character/:id");
  const characterId = routeData !== null ? routeData.params.id : "";

  const selectedCharacter = data.find(
    (character) => character.id === parseInt(characterId)
  );

  console.log(selectedCharacter);

  const filteredData = data
    .filter((character) =>
      character.name
        .toLocaleLowerCase()
        .includes(searchName.toLocaleLowerCase())
    )
    .filter(
      (character) =>
        searchSpecies === "all" || character.species === searchSpecies
    );

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/character/:id">
          <section>
            <CharacterDetail character={selectedCharacter} />
          </section>
        </Route>{" "}
        <Route exact path="/">
          <main className="main__section">
            <section>
              <Filters
                searchName={searchName}
                handleSearchName={handleSearchName}
                searchSpecies={searchSpecies}
                handleSearchSpecies={handleSearchSpecies}
              />
            </section>
            <section>
              <CharacterList data={filteredData} />
            </section>
          </main>
        </Route>
        <Route>
          <section>Oh! Página equivocada</section>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
