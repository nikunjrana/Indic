function generateMeta(metaData, hostname, path, image, canonicalUrls, isCrawlable){

    //META TAGS

    const metaTags = [
        {
            name: "description",
            content: metaData.desc
        },
        {
            name: "keywords",
            content: metaData.keyword
        },
    ]
    const ogTags = [
        {
            property: "og:title",
            content: metaData.title
        },
        {
            property: "og:site_name",
            content: "IndiaMART"
        },
        {
            property: "og:url",
            content: `https://${hostname + decodeURIComponent(path)}`
        },
        {
            property: "og:image",
            content: image ? image : "https://m.imimg.com/gifs/background_image.jpg"
        },
        {
            property: "og:image:url",
            content: image ? image : "https://m.imimg.com/gifs/background_image.jpg"
        },
        {
            property: "og:image:width",
            content: "250"
        },
        {
            property: "og:image:height",
            content: "250"
        },
        {
            property: "og:type",
            content: "website"
        },
        {
            property: "og:description",
            content: metaData.desc
        },
        {
            property: "twitter:card",
            content: "summary"
        },
        {
            property: "twitter:site",
            content: "@IndiaMART"
        },
        {
            property: "twitter:title",
            content: metaData.title
        },
        {
            property: "twitter:url",
            content: `https://${hostname + decodeURIComponent(path)}`
        },
        {
            property: "twitter:image:src",
            content: image ? image : "https://m.imimg.com/gifs/background_image.jpg"
        },
        {
            property: "twitter:image:width",
            content: "250"
        },
        {
            property: "twitter:image:height",
            content: "250"
        },
        {
            property: "twitter:description",
            content: metaData.desc
        },
       
    ];
    if(isCrawlable == 0){
        metaTags.push({
            name:"ROBOTS",
            content: "NOINDEX, FOLLOW"
        })
    }
    let metaTagString = "";    

    for(let i=0; i<metaTags.length; i++){

        metaTagString += "<meta";

        let tag = metaTags[i];

        for(const property in tag) {

            metaTagString += ` ${property}="${tag[property]}"`;

        }

        metaTagString += "/>";
        metaTagString += "\n";

    }
    //OGTags
    let ogTagString = "";    

    for(let i=0; i<ogTags.length; i++){

        ogTagString += "<meta";

        let tag = ogTags[i];

        for(const property in tag) {

            ogTagString += ` ${property}="${tag[property]}"`;

        }

        ogTagString += "/>";
        ogTagString += "\n";

    }

    //LINK TAGS

    const linkTags = [
       
        {
            rel: "apple-touch-icon",
            href: "https://m.imimg.com/apple-touch-icon.png"
        },
        {
            rel: "apple-touch-icon-precomposed",
            href: "https://m.imimg.com/apple-touch-icon-precomposed.png"
        },
        {
            rel: "icon",
            sizes: "192x192",
            href: "https://m.imimg.com/gifs/im2-192.png"
        }
    ];

    let linkTagString = "";

    for(let i=0; i<linkTags.length; i++){

        linkTagString += "<link";

        let tag = linkTags[i];

        for(const property in tag) {

            linkTagString += ` ${property}="${tag[property]}"`;

        }

        linkTagString += "/>";
        linkTagString += "\n";

    }
    //CANONICAL TAGS
    const canonicalTags = '';
    /*
    const canonicalTags = [
        {
            rel: "canonical",
            href: `https://dir.indiamart.com${canonicalUrls.includes("city")?canonicalUrls.replace("city/",""):canonicalUrls}`
        },
        {
            rel : "alternate",
            href : `https://m.indiamart.com${canonicalUrls}`,
            media : "only screen and (max-width:640px)"
        },
        {
            rel: "alternate",
            href: `android-app://com.indiamart.m/https/m.indiamart.com${canonicalUrls}`
        },
    ];
    */

    let canonicalTagString = "";
    for(let i=0;i<canonicalTags.length;i++){
        canonicalTagString += "<link";
        let tag = canonicalTags[i];
        for(const property in tag){
            canonicalTagString += ` ${property}="${tag[property]}"`;
        }
        canonicalTagString += "/>";
        canonicalTagString += "\n";
    }

    
    return (`${metaTagString}${canonicalTagString}${ogTagString}${linkTagString}`);

}

module.exports =  generateMeta;