import "./App.scss";
import MyNavBar from "./MyComponents/MyNav";
import Jumbotron from "./MyComponents/Welcome";
import Footer from "./MyComponents/Footer";
import TableBook from "./MyComponents/TableBook";
import NotFound from "./MyComponents/NotFound";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ThemeContext from "./Context/theme";
import GenreContext from "./Context/Genre";
import BookDetails from "./MyComponents/BookDetails";
import fantasy from "./books/fantasy.json";
import history from "./books/history.json";
import horror from "./books/horror.json";
import romance from "./books/romance.json";
import scifi from "./books/scifi.json";
import cn from "classnames";

function App() {
  const [name, setName] = useState("");
  const [dark, setDark] = useState(false);

  const MyLibrary = {
    fantasy,
    history,
    horror,
    romance,
    scifi,
  };

  return (
    <div className={cn(dark && "dark-mode")}>
      <ThemeContext.Provider value={{ dark, setDark }}>
        <GenreContext.Provider value={{ MyLibrary }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <MyNavBar name={name} setName={setName} />
                  <Jumbotron />
                  <TableBook name={name} />
                </>
              }
            ></Route>
            <Route
              path="/:genre"
              element={
                <>
                  <MyNavBar name={name} setName={setName} />
                  <Jumbotron />
                  <TableBook name={name} />
                </>
              }
            ></Route>
            <Route
              path="/:genre/:id"
              element={
                <>
                  {" "}
                  <MyNavBar name={name} setName={setName} />
                  <BookDetails />
                </>
              }
            />
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </GenreContext.Provider>
        <Footer />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
