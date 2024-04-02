import { test, expect } from "@playwright/test";

// RaceCard component tests
test("RaceCard displays race information correctly", async ({ page }) => {
  // Navigate to the page containing the RaceCard component
  await page.goto("http://localhost:3000");

  // Get the first RaceCard element
  const raceCard = await page.locator(".race-card").first();

  // Get the race data
  const raceName = await raceCard.locator("h2").textContent();
  const circuitName = await raceCard.locator("p").first().textContent();
  const qualifyingDateTime = await raceCard.locator("p").nth(1).textContent();
  const raceDateTime = await raceCard.locator("p").nth(2).textContent();

  // Assert the race information
  expect(raceName).toBeTruthy();
  expect(circuitName).toBeTruthy();
  expect(qualifyingDateTime).toContain("Qualifying:");
  expect(raceDateTime).toContain("Race:");
});

test("RaceCard displays upcoming race correctly", async ({ page }) => {
  // Navigate to the page containing the RaceCard component
  await page.goto("http://localhost:3000");

  // Get the first upcoming RaceCard element
  const raceCard = await page.locator(".race-card.upcoming").first();

  // Get the race data
  const raceName = await raceCard.locator("h2").textContent();
  const circuitName = await raceCard.locator("p").first().textContent();
  const qualifyingDateTime = await raceCard.locator("p").nth(1).textContent();
  const raceDateTime = await raceCard.locator("p").nth(2).textContent();
  const countdownText = await raceCard.locator("p").nth(3).textContent();

  // Assert the upcoming race information
  expect(raceName).toBeTruthy();
  expect(circuitName).toBeTruthy();
  expect(qualifyingDateTime).toContain("Qualifying:");
  expect(raceDateTime).toContain("Race:");
  expect(countdownText).toContain("in");
});

test("RaceCard opens race detail page on click", async ({ page }) => {
  // Navigate to the page containing the RaceCard component
  await page.goto("http://localhost:3000");

  // Get the first RaceCard element
  const raceCard = await page.locator(".race-card").first();

  // Click on the RaceCard
  await raceCard.click();

  // Check if the race detail page is opened and contains a div called race-detail
  await expect(page.locator(".race-detail")).toBeVisible();
});
