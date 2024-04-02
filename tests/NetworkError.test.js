import { test, expect } from "@playwright/test";

test("App displays error message when API returns 503 status code", async ({
  page,
}) => {
  // Intercept the API request and return a 503 status code
  await page.route("https://ergast.com/api/f1/current.json", (route) => {
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "Service Unavailable" }),
    });
  });

  // Navigate to the main page
  await page.goto("http://localhost:3000");

  // Wait for the loading spinner to disappear
  await page.waitForSelector(".spinner", { state: "hidden" });

  // Get the error message Service Unavailable. Please try again later.
  const errorMessage = await page.locator(".error p").textContent();
  // Assert the error message
  expect(errorMessage).toBe("Service Unavailable. Please try again later.");
});
