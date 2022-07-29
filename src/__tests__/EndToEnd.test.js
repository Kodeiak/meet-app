const puppeteer = require("puppeteer");

// use describe - puppeteer works well with Jest.
describe("show/hide an event details", () => {
  let browser, page;
  beforeAll(async () => {
    browser = browser = await puppeteer.launch(
    //   {
    //   headless: false,
    //   slowMo: 250,
    //   ignoreDefaultArgs: ["--disable-extensions"]
    // }
    );
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    // wait for event cards to load
    await page.waitForSelector(".event");
  });

  afterAll(() => {
    browser.close();
  })
  
  test("An event element is collapsed by default", async() => {
    // page.$() works like document.querySelector() 
    const eventDetails = await page.$(".event .expanded-details");
    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to see its details", async () => {
    await page.click(".event .details-btn");

    const eventDetails = await page.$(".event .expanded-details");
    expect(eventDetails).toBeDefined();
  });

  test("User can collapse an event to hide its details", async () => {
    await page.click(".event .details-btn");
    const eventDetails = await page.$(".event .expanded-details");
    expect(eventDetails).toBeNull();
  });
});
