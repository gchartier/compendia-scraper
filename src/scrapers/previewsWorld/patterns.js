const patterns = {
    anniversary: / ANNIV /i,
    artist: /\(A\)/i,
    artistAndCoverArtist: /\(A\/CA\)/i,
    blankCover: / BLANK CVR|COVER /i,
    collection: / COLL /i,
    cosplay: / COSPLAY /i,
    cosplayPhotoCover: / COSPLAY PHOTO CVR|COVER /i,
    cover: / CVR /i,
    coverArtist: /\(CA\)/i,
    coverLetter: / CVR [A-Z] /i,
    deluxe: / DLX /i,
    edition: / ED /i,
    graphicNovel: / GN /i,
    graphicNovelHardcover: / GN HC /i,
    graphicNovelTradePaperbackVolumeWithNum: / GN TP VOL \d+ /,
    graphicNovelTradePaperbackWithNum: / GN TP \d+ /,
    graphicNovelVolumeWithNum: / GN VOL \d+ /,
    hardcover: / HC /i,
    hardcoverBookWithNum: / HC BOOK \d+ /,
    hardcoverGraphicNovelVolumeWithNum: / HC GN VOL \d+ /,
    hardcoverGraphicNovelWithNum: / HC GN \d+ /,
    hardcoverPartWithNum: / HC PART \d+ /,
    hardcoverVolumeWithNum: / HC VOL \d+ /,
    hardcoverWithNum: / HC \d+ /,
    leadingZeros: /\b0+/,
    letter: / [A-Z] /i,
    limited: / LMT|LTD|LT /i,
    mature: / \(MR\) /i,
    miniSeries: / \(OF \d+\) /i,
    miniSeriesInd: / \(OF /i,
    miniSeriesNumber: / \d+\) /i,
    more: / More /i,
    number: / #\d+ /,
    ofThe: / O\/T /i,
    omnibus: / OMNIBUS /i,
    omnibusHardcover: / OMNIBUS HC /i,
    omnibusHardcoverVolumeWithNum: / OMNIBUS HC VOL \d+ /,
    omnibusVolumeWithNum: / OMNIBUS VOL \d+ /,
    oneShot: / ONE SHOT /i,
    operatingAs: / \(O\/A\) /i,
    original: / ORIG /i,
    photo: / Photo /i,
    reprint: / \(?NEW PTG\)? /i,
    resolicit: / \(RES\) /i,
    signature: / SGN /i,
    subsequentPrintingNum: /\d+[A-Z]+ PTG /i,
    theNextGeneration: / TNG /i,
    tradePaperback: / TP /i,
    tradePaperbackBookWithNum: / TP BOOK \d+ /,
    tradePaperbackPartWithNum: / TP PART \d+ /,
    tradePaperbackVolumeWithNum: / TP VOL \d+ /,
    tradePaperbackWithNum: / TP \d+ /,
    trailingParentheses: / \(C? /i,
    useOtherDiamondID: / \(USE [A-Z]{3}\d+\) /i,
    variant: / VAR /i,
    variantWithType: / \w+ VAR /i,
    volume: / VOL (\d+)? /i,
    years: / YRS /i,
    writer: /\(W\)/i,
}

module.exports = patterns
