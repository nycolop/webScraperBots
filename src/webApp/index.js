const puppeteer = require("puppeteer");

const scrapWebApp = async (targetPage, selector) => {
  if (targetPage || selector) {
    return;
  }

  try {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();

    // Waits to the link so it can load complety all the scripts (like an SPA)
    await page.goto(targetPage, {
      waitUntil: "networkidle0", // Wait until all renders, this is the most important thing about puppeteer
    });
    const data = await page.evaluate(
      () => document.querySelector("*").outerHTML
    );

    const elements = await page.evaluate(() => {
      const selectedItems = document.querySelectorAll(selector); // And you can use selectors like a normal page: a[title]#video-title

      const articles = [];
      // If you use map instead of basic for loop, the code doesn't work
      for (let item of selectedItems) {
        const payload = {
          innerText: item.innerText,
          innerHtml: item.innerHtml,
        };
        articles.push(payload);
      }

      return articles;
    });

    if (!elements.length) return res.status(404).send("Error, not found");

    // You can go to another page
    if (anotherTargetWebApp) {
      await page.goto(anotherTargetWebApp, {
        waitUntil: "networkidle0",
      });
      const charge = await page.evaluate(
        () => document.querySelector("*").outerHTML
      );
    }

    // Close browser when you don't need more that service
    await browser.close();

    console.log("🚀 ~ file: index.js ~ line 52 ~ scrapWebApp ~ elements", elements)
  } catch (e) {
    console.log(e);
  }
};

// scrapWebApp('https://www.youtube.com/c/eltrece/featured', 'a');
