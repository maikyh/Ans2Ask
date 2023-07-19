import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

const videoLink = "https://www.youtube.com/watch?v=fou37kNbsqE"; // link to video page

async function fillDataFromPage(page) {
    const dataFromPage = await page.evaluate(() => {
      return {
        title: document.querySelector(`#title > h1`)?.textContent.trim(),

        likes: document
          .querySelector('#top-level-buttons-computed ytd-toggle-button-renderer:first-child .yt-core-attributed-string')
          .textContent.trim(),

        date: document
          .querySelector("#info-container > yt-formatted-string span:nth-child(3)")
          ?.textContent.trim(),

        views: document
          .querySelector("#info-container > yt-formatted-string span:nth-child(1)")
          ?.textContent.trim(),

        duration: document.querySelector(".ytp-time-duration")?.textContent.trim(),

        channel: {
          name: document.querySelector(`#owner #channel-name #text > a`)?.textContent.trim(),
          link: `https://www.youtube.com${document.querySelector(`#owner ytd-video-owner-renderer > a`)?.getAttribute("href")}`,
          thumbnail: document.querySelector(`#owner #avatar #img`)?.getAttribute("src"),
        },
      };
    });
    return dataFromPage;
  }

async function getDataFromYoutubeVideo() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.setDefaultNavigationTimeout(60000);
  await page.goto(videoLink);

  await page.waitForSelector("#contents");

  await page.waitForTimeout(10000);

  const dataFromVideoP = await fillDataFromPage(page);

  await browser.close();

  return dataFromVideoP;
}

getDataFromYoutubeVideo().then((result) => console.dir(result, { depth: null }));
