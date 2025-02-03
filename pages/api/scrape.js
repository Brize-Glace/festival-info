const axios = require("axios");
const cheerio = require("cheerio");

export default async function handler(req, res) {
  try {
    console.log("Cheerio module:", cheerio);
    console.log("Cheerio load function:", cheerio.load);

    const { data } = await axios.get(
      "https://www.insomniac.com/events/our-world/electric-daisy-carnival/"
    );
    const $ = cheerio.load(data);

    const festivals = [];

    const cards = $(".layout .layout__block .card");

    cards.each((index, card) => {
      const image = $(card)
        .find(".card__img a.mparticle-event img")
        .attr("src");

      const categoryText = $(card)
        .find(".card__category.section--events")
        .text()
        .trim();

      const [eventType, ageRestriction] = categoryText
        .match(/^(.*?)(\d+\+|All Ages)?$/)
        ?.slice(1) || ["Unknown Event", "No Age Restriction"];

      const name = $(card).find(".card__title").text().trim();
      const details = $(card)
        .find(".card__content .card__detail")
        .map((i, el) => $(el).text().trim())
        .toArray();

      const othersInfos = [
        eventType.trim(),
        ageRestriction?.trim() || "No Age Restriction",
      ];

      festivals.push({ name, details, image, othersInfos });
    });

    res.status(200).json({ festivals });
    console.log("Festivals scraped:", festivals);
  } catch (error) {
    console.error("Erreur lors du scraping :", error);
    res.status(500).json({ error: "Erreur lors du scraping" });
  }
}
