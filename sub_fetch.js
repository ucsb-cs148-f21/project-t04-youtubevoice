import { parseSync } from 'subtitle'

export default class SubFetch {
    static INVIDIOUS_INSTANCES = ["https://invidious.namazso.eu",
    "https://invidious-us.kavin.rocks",
    "https://invidious.osi.kr"]

    constructor(lang) {
        this.lang = lang;
    }

    async fetch_subtitle(video_id) {
        console.log("sub_fetch: fetching for", video_id);

        for (const instance_url of SubFetch.INVIDIOUS_INSTANCES) {
            console.log("sub_fetch: trying instance", instance_url);

            try {
                let subtitle = await this.fetch_subtitle_with_instance(video_id, instance_url);
                return subtitle;
            } catch (error) {
                console.warn("sub_fetch: error", error);
            }
        }

        alert("Subtitle API not working right now. Please try again later");
        throw "no instances usable";
    }

    async fetch_subtitle_with_instance(video_id, instance_url) {
        let subtitle_list = await fetch(instance_url + "/api/v1/captions/" + video_id)
        .then(response => response.json());

        console.log("sub_fetch: list=", subtitle_list);
        
        for (const subtitle_item of subtitle_list.captions) {
            if (subtitle_item.languageCode == this.lang) {
                // Language found
                console.log("Subtitle for", video_id, "found: lang=", subtitle_item.label);

                let subtitle = await fetch(instance_url+subtitle_item.url)
                .then(response => response.text())
                .then(data => parseSync(data))
                .then(data => data.filter(item => item.type == "cue").map(item => item.data))
                .then(data => data.map(line => ({
                    text: line.text,
                    begin: line.start / 1000,
                    duration: (line.end - line.start) / 1000,
                  }))
                );
        
                console.log("sub_fetch: subtitles[0]=", subtitle[0]);

                return subtitle;
            }
        }

        return [];
    }
}