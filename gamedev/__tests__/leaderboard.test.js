import "../public_html/leaderboard.js";

  
describe("Leaderboard Tests", () => {
let leaderboardContainer;

beforeEach(() => {
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
    const expectedOrder = ["John Running", "Hacker", "I am in third place", "Unemployed Friend"];
    const renderedPlayers = Array.from(leaderboardContainer.querySelectorAll(".name")).map(el => el.textContent);
    expect(renderedPlayers).toEqual(expectedOrder);
});

test("Leaderboard assigns correct rank classes", () => {
    expect(document.querySelector(".first-place-div")).not.toBeNull();
    expect(document.querySelector(".second-place-div")).not.toBeNull();
    expect(document.querySelector(".third-place-div")).not.toBeNull();
});
});
  