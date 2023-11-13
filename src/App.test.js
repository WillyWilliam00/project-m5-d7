import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import fantasy from "./books/fantasy.json";
import history from "./books/history.json";
import horror from "./books/horror.json";
import romance from "./books/romance.json";
import scifi from "./books/scifi.json";

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

describe("TEST RENDERIZZAZIONE COMPONENTI", () => {
  test("render di Welcome component:", () => {
    const screen = render(
      <>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </>,
    );

    const welcomeElement = screen.getByTestId("welcome");
    expect(welcomeElement).toBeInTheDocument();
  });
  test("numero di libri renderizzati uguali al numero di libri del JSON:", () => {
    const screen = render(
      <>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </>,
    );
    const allTheBookCards = screen.queryAllByTestId("book-card");
    expect(allTheBookCards).toHaveLength(fantasy.length);
  });
});
