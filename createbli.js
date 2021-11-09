const delay = require("delay");
const fetch = require("node-fetch");
const readlineSync = require("readline-sync");
const fs = require("fs-extra");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin());
const chalk = require("chalk");
var figlet = require("figlet");
const randstr = (length) =>
  new Promise((resolve, reject) => {
    var text = "";
    var possible =
      "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    resolve(text);
  });
const acakserver = () => {
  let list = ["googleappsmail.com", "reginekarlsen.me"];
  // console.log(list)
  const pilih = list[Math.floor(Math.random() * list.length)];
  return pilih;
};
const functionGetLink = (email, name, domain) =>
  new Promise((resolve, reject) => {
    fetch(`https://generator.email/${email}`, {
      method: "get",
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
        "accept-encoding": "gzip, deflate, br",
        cookie: `_ga=GA1.2.659238676.1567004853; _gid=GA1.2.273162863.1569757277; embx=%5B%22${name}%40${domain}%22%2C%22hcycl%40nongzaa.tk%22%5D; _gat=1; io=io=tIcarRGNgwqgtn40O${randstr(
          3
        )}; surl=${domain}%2F${name}`,
        "upgrade-insecure-requests": 1,
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36",
      },
    })
      .then((res) => res.text())
      .then((text) => {
        const $ = cheerio.load(text);
        const src = $(
          "#bodyTable > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr:nth-child(5) > td > strong"
        ).text();
        resolve(src);
      })
      .catch((err) => reject(err));
  });

const generateIndoName = () =>
  new Promise((resolve, reject) => {
    fetch("https://swappery.site/data.php?qty=1", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
//   const response = await pollForRequestResults(apiKey, requestId);

//   await page.evaluate(
//     `document.getElementById("g-recaptcha-response").innerHTML="${response}";`
//   );

//   page.click("#register-form button[type=submit]");
// })();

// async function initiateCaptchaRequest(apiKey) {
//   const formData = {
//     method: "userrecaptcha",
//     googlekey: siteDetails.sitekey,
//     key: apiKey,
//     pageurl: siteDetails.pageurl,
//     json: 1,
//   };
//   const response = await request.post("http://2captcha.com/in.php", {
//     form: formData,
//   });
//   return JSON.parse(response).request;
// }

// async function pollForRequestResults(
//   key,
//   id,
//   retries = 30,
//   interval = 1500,
//   delay = 15000
// ) {
//   await timeout(delay);
//   return poll({
//     taskFn: requestCaptchaResults(key, id),
//     interval,
//     retries,
//   });
// }

// function requestCaptchaResults(apiKey, requestId) {
//   const url = `http://2captcha.com/res.php?key=${apiKey}&action=get&id=${requestId}&json=1`;
//   return async function () {
//     return new Promise(async function (resolve, reject) {
//       const rawResponse = await request.get(url);
//       const resp = JSON.parse(rawResponse);
//       if (resp.status === 0) return reject(resp.request);
//       resolve(resp.request);
//     });
//   };
// }

// const timeout = (millis) =>
//   new Promise((resolve) => setTimeout(resolve, millis));
const functionGetTokenAction = (sitekey) =>
  new Promise((resolve, reject) => {
    fetch(
      `http://2captcha.com/in.php?key=${keyCaptcha}&method=userrecaptcha&version=v2&action=action&min_score=0.3
    &googlekey=${sitekey}&pageurl=https://www.blibli.com/register`,
      {
        method: "get",
      }
    )
      .then((res) => res.text())
      .then((text) => {
        resolve(text);
      })
      .catch((err) => reject(err));
  });

const functionGetRealTokenAction = (id) =>
  new Promise((resolve, reject) => {
    fetch(
      `http://2captcha.com/res.php?key=${keyCaptcha}&action=get&json=1&id=${id}`,
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      .then((text) => {
        resolve(text);
      })
      .catch((err) => reject(err));
  });
function a(index, reff, apiKey, requestId) {
  (async () => {
    while (true) {
      const pw = "Kontol123!";
      const domain = await acakserver();
      const indoName = await generateIndoName();
      const { result } = indoName;
      const name =
        result[0].firstname.toLowerCase() + result[0].lastname.toLowerCase();
      const email = `${name}@${domain}`;
      // console.log(email);
      const browser = await puppeteer.launch({
        ignoreDefaultArgs: ["--enable-automation"],
        executablePath:
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        userDataDir: "a" + index,
        headless: false,
        devtools: false,
        args: [
          "--disable-notifications",
          "--disable-features=site-per-process",
          "--disable-dev-shm-usage",
        ],
      });
      const ua = fs.readFileSync("ua.txt", "utf8").split(/\r\n|\r|\n/);
      const agent = ua[Math.floor(Math.random() * ua.length)];
      //   console.log(agent);

      const time = { visible: true, timeout: 0 };
      const page = await browser.newPage();
      //   await page.setUserAgent(agent);
      //   await page.setUserAgent(uagent);
      await page.setViewport({ width: 350, height: 700 });

      // console.log("[INFO] Mencoba mendaftar dengan nomor "+nomor)
      // regist

      await page.goto(reff, {
        waitUntil: "networkidle2",
        timeout: 0,
      });
      //   const url = await page.url();
      //   const regust = url;
      // const actionToken = await functionGetTokenAction(
      //   "6LdVKasZAAAAADj3_hmPPUlhMU4RRYH1hVkTIi99",
      //   regust
      // );
      // const requestId = actionToken.split("|")[1];
      // console.log(requestId);
      // let resultActionToken = {
      //   request: "",
      // };
      // do {
      //   resultActionToken = await functionGetRealTokenAction(requestId);
      //   console.log(resultActionToken);
      // } while (resultActionToken.request === "CAPCHA_NOT_READY");
      // const theRealActionToken = resultActionToken.request;
      // console.log(theRealActionToken);
      // await page.goto(`https://blibli.app.link/bq3cCRTvWkb`, {
      //   waitUntil: "networkidle2",
      //   timeout: 0,
      // });
      await page.waitForSelector(
        "#blibliApp > div > div.collabs-wrapper > div:nth-child(15) > div > div.message-container.member-collab > div > section > div > div > div > div > div > div.login__register > a"
      );
      await page.evaluate(() =>
        document
          .querySelectorAll(
            "#blibliApp > div > div.collabs-wrapper > div:nth-child(15) > div > div.message-container.member-collab > div > section > div > div > div > div > div > div.login__register > a"
          )[0]
          .click()
      );
      await page.waitForSelector(
        "#gdn-register-form > div:nth-child(1) > label",
        {
          visible: true,
          timeout: 60000,
        }
      );
      await page.click("#gdn-register-form > div:nth-child(1) > label");
      await page.type("#gdn-register-form > div:nth-child(1) > label", name);
      await page.waitForSelector(
        "#gdn-register-form > div:nth-child(2) > label",
        {
          visible: true,
          timeout: 60000,
        }
      );
      await page.click("#gdn-register-form > div:nth-child(2) > label");
      await page.type("#gdn-register-form > div:nth-child(2) > label", email);
      await page.waitForSelector(
        "#gdn-register-form > div:nth-child(3) > label",
        {
          visible: true,
          timeout: 60000,
        }
      );
      await page.click("#gdn-register-form > div:nth-child(3) > label");
      await page.type("#gdn-register-form > div:nth-child(3) > label", pw);
      await page.waitForSelector("#accept");
      await page.evaluate(() =>
        document.querySelectorAll("#accept")[0].click()
      );
      await page.waitForSelector(
        "#blibliApp > div > div.collabs-wrapper > div:nth-child(15) > div > div.message-container.member-collab > div > section > div > div:nth-child(2) > div.blu-card.register-page__container > div > div > div.blu-card > div > div.register-page__button > button",
        { visible: true, timeout: 0 }
      );
      await page.click(
        "#blibliApp > div > div.collabs-wrapper > div:nth-child(15) > div > div.message-container.member-collab > div > section > div > div:nth-child(2) > div.blu-card.register-page__container > div > div > div.blu-card > div > div.register-page__button > button"
      );
      try {
        await page.waitForSelector(
          "#blibliApp > div > div.collabs-wrapper > div:nth-child(15) > div > div.message-container.member-collab > div > section > div > div:nth-child(2) > div.blu-card.register-page__container > div > div > div.blu-card > div > article > div > div",
          { timeout: 10000 }
        );
        const validasi = await page.evaluate(
          () =>
            document.querySelectorAll(
              "#blibliApp > div > div.collabs-wrapper > div:nth-child(15) > div > div.message-container.member-collab > div > section > div > div:nth-child(2) > div.blu-card.register-page__container > div > div > div.blu-card > div > article > div > div"
            )[0].innerText
        );
        console.log(validasi);
        await browser.close();
        await fs.remove("a" + index);
      } catch (error) {
        await page.waitForSelector(
          "#blibliApp > div > div.collabs-wrapper > div:nth-child(15) > div > div.message-container.member-collab > div > section > div > div.blu-modal.otp-modal.b-page.b-no-button > div.blu-modal__container > div.blu-modal__body.b-overflow-y > div > ul > li:nth-child(1) > input",
          { visible: true, timeout: 0 }
        );

        let linkConfirm;
        do {
          linkConfirm = await functionGetLink(
            email,
            email.split("@")[0],
            email.split("@")[1]
          );
          //   console.log(linkConfirm);
        } while (!linkConfirm);
        await page.waitForSelector(
          "#blibliApp > div > div.collabs-wrapper > div:nth-child(15) > div > div.message-container.member-collab > div > section > div > div.blu-modal.otp-modal.b-page.b-no-button > div.blu-modal__container > div.blu-modal__body.b-overflow-y > div > ul > li:nth-child(1) > input"
        );
        await page.type(
          "#blibliApp > div > div.collabs-wrapper > div:nth-child(15) > div > div.message-container.member-collab > div > section > div > div.blu-modal.otp-modal.b-page.b-no-button > div.blu-modal__container > div.blu-modal__body.b-overflow-y > div > ul > li:nth-child(1) > input",
          linkConfirm
        );
        await page.waitForSelector(
          "#blibliApp > div > div.collabs-wrapper > div:nth-child(15) > div > div.message-container.member-collab > div > section > div > div.blu-modal.otp-modal.b-page.b-no-button > div.blu-modal__container > div.blu-modal__body.b-overflow-y > div > div.otp__confirm > button"
        );
        await page.click(
          "#blibliApp > div > div.collabs-wrapper > div:nth-child(15) > div > div.message-container.member-collab > div > section > div > div.blu-modal.otp-modal.b-page.b-no-button > div.blu-modal__container > div.blu-modal__body.b-overflow-y > div > div.otp__confirm > button"
        );
        await page.waitForSelector(
          "#blibliApp > div > div.collabs-wrapper > div:nth-child(15) > div > div.message-container.member-collab > div > section > div > div > div > div.benefit__footer > button.blu-btn.footer__btn.b-ghost.b-secondary"
        );
        await page.click(
          "#blibliApp > div > div.collabs-wrapper > div:nth-child(15) > div > div.message-container.member-collab > div > section > div > div > div > div.benefit__footer > button.blu-btn.footer__btn.b-ghost.b-secondary"
        );

        await page.waitForSelector(
          "#blibliApp > div > div.collabs-wrapper > div:nth-child(5) > div > div.container > div > section > div > div > div > button"
        );
        await page.click(
          "#blibliApp > div > div.collabs-wrapper > div:nth-child(5) > div > div.container > div > section > div > div > div > button"
        );
        await delay(2000);
        await page.waitForSelector(
          "#blibliApp > div > div.collabs-wrapper > div:nth-child(5) > div > div.container > div > section > div > section > div > div.milestones__container > div.blu-card.milestones__header > div > button"
        );
        await page.click(
          "#blibliApp > div > div.collabs-wrapper > div:nth-child(5) > div > div.container > div > section > div > section > div > div.milestones__container > div.blu-card.milestones__header > div > button"
        );
        // console.log("Berhasil ngereff ke " + kontol);

        await delay(3000);
        // await page.waitForSelector(
        //   "#blibliApp > div > div.collabs-wrapper > div:nth-child(5) > div > div.container > div > section > div > section > div > div.milestones__container > div.milestones__show > div > div.milestones__mission-list > div:nth-child(6) > div > div > div > div.blu-card > div > div.bottom-content__name"
        // );
        // const hasil = await page.evaluate(
        //   () =>
        //     document.querySelectorAll(
        //       "#blibliApp > div > div.collabs-wrapper > div:nth-child(5) > div > div.container > div > section > div > section > div > div.milestones__container > div.milestones__show > div > div.milestones__mission-list > div:nth-child(6) > div > div > div > div.blu-card > div > div.bottom-content__name"
        //     )[0].innerText
        // );
        const reff = readlineSync.question(" ");
        fs.appendFileSync(`akunblibli1.txt`, `${email} => ${pw}\n`);
        fs.appendFileSync(`url.txt`, `${reff}\n`);
        const data = {
          status: true,
          data: [
            {
              Message: "Berhasil Mendaftar",
            },
          ],
        };
        console.log(data);
        await browser.close();
        await fs.remove("a" + index);
      }
    }
  })();
}
(async () => {
  console.log(
    chalk.yellow(figlet.textSync("Auto Create", { horizontalLayout: "fitted" }))
  );
  //    var jumlahbrowser = readlineSync.question('Jumlah akun : ');
  // if (menu == 1) {
  const reff = readlineSync.question("masukan reff : ");
  for (let index = 0; index < 1; index++) {
    await delay(1000);
    a(index, reff);
  }
})();
