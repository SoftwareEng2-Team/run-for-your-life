import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

import "../public_html/leaderboard.js";

describe("Leaderboard Tests", () => {
  let leaderboardContainer;

  beforeEach(() => {
    // Tell fetchMock what to return when `fetch()` is called.
    fetchMock.mockResponseOnce(JSON.stringify([
      { name: "John Running", score: 120 },
      { name: "Unemployed Friend", score: 20 },
      { name: "Hacker", score: 50 },
      { name: "I am in third place", score: 40 }
    ]));

    // Set up a mock DOM
    document.body.innerHTML = `<div class="leaderboard-container"></div>`;
    leaderboardContainer = document.querySelector(".leaderboard-container");

    // Manually trigger DOMContentLoaded to simulate page load
    document.dispatchEvent(new Event("DOMContentLoaded"));
  });

  test("Leaderboard should create correct number of cards", () => {
    const cards = leaderboardContainer.querySelectorAll(".card");
    expect(cards.length).toBe(4);
  });

  test("Players are sorted by score in descending order", () => {
    const expectedOrder = [
      "John Running",
      "Hacker",
      "I am in third place",
      "Unemployed Friend"
    ];
    const renderedPlayers = Array.from(
      leaderboardContainer.querySelectorAll(".name")
    ).map(el => el.textContent);

    expect(renderedPlayers).toEqual(expectedOrder);
  });

  test("Leaderboard assigns correct rank classes", () => {
    expect(document.querySelector(".first-place-div")).not.toBeNull();
    expect(document.querySelector(".second-place-div")).not.toBeNull();
    expect(document.querySelector(".third-place-div")).not.toBeNull();
  });
});
