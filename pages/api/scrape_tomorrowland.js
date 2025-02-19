const axios = require("axios");
const cheerio = require("cheerio");

export default async function handler(req, res) {
  try {
    console.log("Cheerio module:", cheerio);
    console.log("Cheerio load function:", cheerio.load);

    const { data } = await axios.get("https://www.tomorrowland.com/home/");
    const $ = cheerio.load(data);

    const festivals = [];

    const cards = $(
      ".Slider_slider__4DzTU .swiper .swiper-wrapper .swiper-slide .EventCard_eventCard__zkcxy"
    );

    cards.each((index, card) => {
      const image = $(card).find(".EventCard_cardLink___7UJH img").attr("src");

      const categoryText = $(card)
        .find(".EventCard_eventCard__zkcxy .EventCard_content__trNM_ .EventCard_links__FETFq a")
        .text()
        .trim();

      const [eventType, ageRestriction] = categoryText
        .match(/^(.*?)(\d+\+|All Ages)?$/)
        ?.slice(1) || ["Unknown Event", "No Age Restriction"];

      const name = $(card)
        .find(".EventCard_eventCard__zkcxy .EventCard_content__trNM_ h3")
        .text()
        .trim();
      const date = $(card)
        .find(
          ".EventCard_eventCard__zkcxy .EventCard_content__trNM_ .EventCard_date__Gi71A div p"
        )
        .map((i, el) => $(el).text().trim())
        .toArray();

      const location = $(card)
        .find(
          ".EventCard_eventCard__zkcxy .EventCard_content__trNM_ .EventCard_location__rOFC_ p"
        )
        .text()
        .trim();

        const othersInfos = [
          eventType.trim(),
          ageRestriction?.trim() || "No Age Restriction",
        ];

      festivals.push({ name, date, location, image, othersInfos });
    });

    res.status(200).json({ festivals });
    console.log("Festivals scraped:", festivals);
  } catch (error) {
    console.error("Erreur lors du scraping :", error);
    res.status(500).json({ error: "Erreur lors du scraping" });
  }
}
