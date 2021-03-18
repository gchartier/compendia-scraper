const $ = require("cheerio")
const axios = require("axios")
const sleep = require("../../utils/sleep")
const logger = require("../../utils/logger.js")
const getParsedComic = require("./parse/comic.js")
const toProperCasing = require("../../utils/toProperCasing")

const SLEEP_SECONDS = 4

async function getScrapedReleaseLinksAndFormats() {
    const newReleasesURL = "https://www.previewsworld.com/NewReleases"
    const { data: newReleasesResponse } = await axios.get(newReleasesURL)
    const newReleaseLinks = $(
        '.nrGalleryItem[dmd-cat="1"] .nrGalleryItemDmdNo a, .nrGalleryItem[dmd-cat="3"] .nrGalleryItemDmdNo a',
        newReleasesResponse
    )
    const newReleaseFormats = $(
        '.nrGalleryItem[dmd-cat="1"], .nrGalleryItem[dmd-cat="3"]',
        newReleasesResponse
    )

    if (newReleaseLinks.length !== newReleaseFormats.length)
        throw new Error("Retrieved links and formats do not have equal lengths")

    const linksAndFormats = []
    for (let i = 0; i < newReleaseLinks.length; i++)
        linksAndFormats.push({
            link: newReleaseLinks[i].attribs.href,
            format: newReleaseFormats[i],
        })

    return linksAndFormats
}

async function getScrapedSeriesName(seriesLink) {
    logger.info(`# Requesting series from ${seriesLink}`)
    await sleep(SLEEP_SECONDS)
    const { data: seriesNameHTML } = await axios.get(seriesLink)
    if (!seriesNameHTML)
        logger.warn(`! Failed HTML request to ${seriesLink} and could not retrieve series name`)

    return toProperCasing($(".Title", seriesNameHTML).text().slice(8))
}

async function getScrapedRelease(releaseLink, releaseFormat) {
    const baseURL = "https://www.previewsworld.com"
    const url = `${baseURL}${releaseLink}`

    logger.info(`# Requesting release from ${url}`)
    await sleep(SLEEP_SECONDS)
    const { data: newReleaseResponse } = await axios.get(url)

    const title = " " + $(".Title", newReleaseResponse).text() + " "
    const seriesLink = $(".ViewSeriesItemsLink", newReleaseResponse).attr("href")
    const seriesName = seriesLink ? ` ${await getScrapedSeriesName(baseURL + seriesLink)} ` : ""
    if (!seriesLink)
        logger.warn(
            "! Could not retrieve series name from series link. Series name will be retrieved from title."
        )

    logger.info(`# Scraped ${url} with title ${title}:`)

    const scrapedRelease = {
        url: url,
        title: title,
        series: {
            name: seriesName,
            link: seriesLink,
        },
        publisher: { name: toProperCasing($(".Publisher", newReleaseResponse).text()) },
        releaseDate: $(".ReleaseDate", newReleaseResponse).text().slice(10),
        coverPrice: $(".SRP", newReleaseResponse).text().slice(5),
        coverURL: baseURL + $(".mainContentImage .ImageContainer", newReleaseResponse).attr("href"),
        description: $("div.Text", newReleaseResponse)
            .first()
            .contents()
            .filter(function () {
                return this.type === "text"
            })
            .text()
            .replace(/\s+/g, " ")
            .trim(),
        creators: $(".Creators", newReleaseResponse).text().replace(/\s+/g, " ").trim().split(" "),
        diamondID: $(".ItemCode", newReleaseResponse).text(),
        format: releaseFormat === 1 ? "Comic" : "",
    }

    return scrapedRelease
}

function filterOutReleasesWithFlaggedPublishers(releases) {
    const flaggedPublishers = [
        "DIGITAL MANGA DISTRIBUTION",
        "DYNAMIC FORCES",
        "GHOST SHIP",
        "J-NOVEL CLUB",
        "J-NOVEL HEART",
        "KODANSHA AMERICA",
        "KODANSHA COMICS",
        "ONE PEACE BOOKS",
        "SEVEN SEAS ENTERTAINMENT LLC",
        "SQUARE ENIX MANGA",
        "SUBLIME",
        "TOHAN CORPORATION",
        "TOKYOPOP",
        "UDON ENTERTAINMENT INC",
        "VERTICAL COMICS",
        "VIZ LLC",
        "YEN ON",
        "YEN PRESS",
    ]

    const filteredReleases = releases.filter(
        (release) => flaggedPublishers.includes(release.publisher.toUpperCase()) === false
    )

    logger.info(
        `Filtered out ${
            releases.length - filteredReleases.length
        } releases with flagged publishers.`
    )

    return filteredReleases
}

async function getScrapedPreviewsWorldReleases() {
    logger.info(`# Started retrieving Previews World new releases`)

    const scrapedLinksAndFormats = await getScrapedReleaseLinksAndFormats()
    const scrapedReleases = []
    for (const { link, format } of scrapedLinksAndFormats)
        scrapedReleases.push(await getScrapedRelease(link, format))

    const filteredScrapedReleases = filterOutReleasesWithFlaggedPublishers(scrapedReleases)
    const releases = []
    for (const [index, release] of filteredScrapedReleases.entries()) {
        await sleep(1)
        logger.info(`# Release ${index + 1} of ${filteredScrapedReleases.length}`)
        releases.push(await getParsedComic(release))
        logger.info(`# Finished new release from ${release.url}`)
    }

    logger.info(`# Finished retrieving Previews World new releases`)
    return releases
}

module.exports = getScrapedPreviewsWorldReleases
