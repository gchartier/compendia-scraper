const patterns = {
    adventure: / ADV /i,
    anniversary: / ANNIV /i,
    artist: /\(A\)/i,
    artistAndCoverArtist: /\(A\/CA\)/i,
    blackAndWhite: / B&W /i,
    blankCover: / BLANK (CVR|COVER) /i,
    collection: / COLL /i,
    cosplay: / COSPLAY /i,
    cosplayPhotoCover: / COSPLAY PHOTO (CVR|COVER) /i,
    cover: / (CVR|CV) /gi,
    coverArtist: /\(CA\)/i,
    coverAsEnd: / (CVR|CV) $/i,
    coverLetter: / CVR [A-Z] /i,
    deluxe: / DLX /i,
    directMarket: / DM /i,
    edition: / ED /i,
    editionWithParen: / ED\) /i,
    finalOrderCutoff: / FOC /i,
    formatAndNumberTypes: / (VOL|TP|HC|SC|GN|BOOK|PART|OMNIBUS) /i,
    formatNumber: / \d+ /i,
    formatTypes: / (TP|HC|SC|GN|OMNIBUS) /i,
    graphicNovel: / GN /i,
    graphicNovelHardcover: / GN HC /i,
    graphicNovelTradePaperbackVolumeWithNum: / GN TP VOL \d+ /i,
    graphicNovelTradePaperbackWithNum: / GN TP \d+ /i,
    graphicNovelVolumeWithNum: / GN VOL \d+ /i,
    hardcover: / HC /i,
    hardcoverBookWithNum: / HC BOOK \d+ /i,
    hardcoverGraphicNovelVolumeWithNum: / HC GN VOL \d+ /i,
    hardcoverGraphicNovelWithNum: / HC GN \d+ /i,
    hardcoverPartWithNum: / HC PART \d+ /i,
    hardcoverVolumeWithNum: / HC VOL \d+ /i,
    hardcoverWithNum: / HC \d+ /i,
    kingInBlack: / KIB /i,
    leadingZeros: /\b0+/i,
    letter: / [A-Z] /i,
    limited: / (LMT|LTD|LT) /i,
    mature: / \(MR\) /i,
    miniSeries: / \(OF \d+\) /i,
    miniSeriesInd: / \(OF /i,
    miniSeriesNumber: / \d+\) /i,
    more: / More /i,
    net: / \(NET\) /i,
    number: / #\d+ /i,
    ofThe: / O\/T /i,
    omnibus: / OMNIBUS /i,
    omnibusHardcover: / OMNIBUS HC /i,
    omnibusHardcoverVolumeWithNum: / OMNIBUS HC VOL \d+ /i,
    omnibusVolumeWithNum: / OMNIBUS VOL \d+ /i,
    oneShot: / ONE SHOT /i,
    operatingAs: / \(O\/A\) /i,
    original: / ORIG /i,
    photo: / Photo /i,
    printing: / PTG /i,
    printingNum: / \d+[A-Z]+ /i,
    r: / \(R /i,
    reprint: / \(?NEW (PTG|ED)\)? /i,
    reprintNew: / \(?NEW /i,
    reprintPrinting: / (PTG|ED)\)? /i,
    resolicit: / \(RES\) /i,
    season: / SEASON (((\(?#?\d+\)?) )+)/gi,
    signature: / SGN /i,
    softcover: / SC /i,
    subsequentPrinting: / (PTG|ED)\)? /i,
    subsequentPrintingNum: / \(?\d+[A-Z]+ (PTG|ED)\)? /i,
    theNextGeneration: / TNG /i,
    tradePaperback: / TP /i,
    tradePaperbackBookWithNum: / TP BOOK \d+ /i,
    tradePaperbackPartWithNum: / TP PART \d+ /i,
    tradePaperbackVolumeWithNum: / TP VOL \d+ /i,
    tradePaperbackWithNum: / TP \d+ /i,
    trailingParentheses: / \(C? /i,
    useOtherDiamondID: / \(USE [A-Z]{3}\d+\) /i,
    variant: / (VAR|VA) /i,
    variantWithType: / \w+ (VAR|VA) /i,
    volume: / VOL /i,
    years: / YRS /i,
    writer: /\(W\)/i,
}

module.exports = patterns
