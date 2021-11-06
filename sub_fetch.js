var parser = require('fast-xml-parser');

export default class SubFetch {
    constructor(lang) {
        this.lang = lang;
    }

    async fetch_subtitle(video_id) {
        console.log("sub_fetch: fetching for", video_id);

        let options = {
            attributeNamePrefix : "_",
            attrNodeName: "attr", //default is 'false'
            textNodeName : "node_text",
            ignoreAttributes : false,
            ignoreNameSpace : false,
            allowBooleanAttributes : false,
            parseNodeValue : true,
            parseAttributeValue : false,
            trimValues: true,
            cdataTagName: "__cdata", //default is 'false'
            cdataPositionChar: "\\c",
            parseTrueNumberOnly: false,
            numParseOptions:{
              hex: true,
              leadingZeros: true,
              //skipLike: /\+[0-9]{10}/
            },
            arrayMode: false, //"strict"fault is a=>a
            stopNodes: ["parse-me-as-string"]
        };
        
        let subtitles = await fetch("https://video.google.com/timedtext?lang=" + this.lang + "&v=" + video_id)
        .then(response => response.text())
        .catch(() => [])
        .then(data => parser.parse(data, options))
        .catch(() => [])
        .then(data => data?.transcript?.text)
        .catch(() => [])
        .then(data => data.map(subtitle => ({
            text: subtitle.node_text,
            begin: subtitle.attr._start,
            duration: subtitle.attr._dur,
          }))
        )
        .catch(() => []);

        console.log("sub_fetch: subtitles[0]=", subtitles[0]);
      
        return subtitles;
    }
}