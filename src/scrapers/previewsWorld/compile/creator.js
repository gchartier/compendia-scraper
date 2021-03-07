const patterns = require("../patterns.js")
const { infoLogger } = require("../../../utils/logger.js")

function getCreatorTypesFromScrapedCreator(scrapedCreator, existingTypes) {
    const creatorTypes = [
        { name: "Writer", matches: (node) => node.match(patterns.writer), values: ["W"] },
        { name: "Artist", matches: (node) => node.match(patterns.artist), values: ["A"] },
        {
            name: "Cover Artist",
            matches: (node) => node.match(patterns.coverArtist),
            values: ["CA"],
        },
        {
            name: "Artist / Cover Artist",
            matches: (node) => node.match(patterns.artistAndCoverArtist),
            values: ["A", "CA"],
        },
    ]

    const types = []
    creatorTypes.forEach((type) => {
        if (type.matches(scrapedCreator.type))
            type.values.forEach((value) => {
                if (!existingTypes.includes(value)) types.push(value)
            })
    })

    if (types.length < 1) infoLogger.error("! Creator did not have any types")

    return types
}

function addScrapedCreatorToList(scrapedCreator, creators) {
    scrapedCreator.name = scrapedCreator.name.replace(",", "").substring(1)
    const index = creators.findIndex((c) => c.name === scrapedCreator.name)
    if (index > 0)
        creators[index].types.push.apply(
            creators[index].types,
            getCreatorTypesFromScrapedCreator(scrapedCreator, creators[index].types)
        )
    else {
        if (!scrapedCreator.name) infoLogger.error("! Scraped creator did not have a name")

        creators.push({
            name: scrapedCreator.name,
            types: getCreatorTypesFromScrapedCreator(scrapedCreator, []),
        })
    }
    scrapedCreator.name = ""
}

function getIndexOfFirstMatchingCreator(creators, creatorToMatch) {
    return creators.findIndex(
        (c) => c.name === creatorToMatch.name && c.type === creatorToMatch.type
    )
}

function creatorNameIsValid(creatorName) {
    const paddedName = ` ${creatorName} `

    return (
        paddedName.match(patterns.photo) === null &&
        paddedName.match(patterns.more) === null &&
        paddedName.match(patterns.blankCover) === null
    )
}

function getFilteredUniqueCreators(creators) {
    return creators.filter(
        (creator, index, self) =>
            getIndexOfFirstMatchingCreator(self, creator) === index &&
            creatorNameIsValid(creator.name)
    )
}

function isEndOfNameNode(node) {
    return node.includes(",")
}

function isCreatorTypeNode(node) {
    return node.includes("(")
}

function isNameNode(node) {
    return node && !isCreatorTypeNode(node)
}

function isLastNode(nodeList, index) {
    return nodeList.length - 1 === index
}

function getCreatorsFromNodes(nodes) {
    if (!nodes) infoLogger.warn(`! No comic creator nodes found`)
    else {
        const creators = []
        const scrapedCreator = { name: "", type: "" }

        nodes.forEach((node, index, nodes) => {
            if (isNameNode(node)) {
                scrapedCreator.name = scrapedCreator.name.concat(" " + node)
                if (isEndOfNameNode(node)) addScrapedCreatorToList(scrapedCreator, creators)
            } else if (isCreatorTypeNode(node)) {
                if (scrapedCreator.name) addScrapedCreatorToList(scrapedCreator, creators)
                scrapedCreator.type = node
            }

            if (isLastNode(nodes, index)) addScrapedCreatorToList(scrapedCreator, creators)
        })

        return getFilteredUniqueCreators(creators)
    }
}

module.exports = getCreatorsFromNodes
