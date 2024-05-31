function generateSchema(breadcrumbInfo){
    let breadcrumbList = [];

    breadcrumbList = breadcrumbInfo.map((item,index)=>{
        let obj = {
            '@type': "ListItem",
            'position': index+1,
            'item': {
                '@id': item.url,
                'name': item.display
            }}
        return obj
    })

    return [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [...breadcrumbList]
        },
    ];
}
//export default generateSchema;
module.exports = generateSchema;