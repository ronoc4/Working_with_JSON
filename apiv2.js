/**
 * Created by conor on 12/8/16.
 */


/*
 Conversation from this blog:
 https://davidwalsh.name/convert-xml-json
 */
function xmlToJson(xml) {

    // Create the return object
    let obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let j = 0; j < xml.attributes.length; j++) {
                let attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for(let i = 0; i < xml.childNodes.length; i++) {
            let item = xml.childNodes.item(i);
            let nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    let old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
};

function jobs() {
    let transactionCode = 'xxxxxxxxxx';
    let requestURL = xmlToJson('https://conorpro.catsone.com/api/get_joborders?transaction_code=' + transactionCode);
    let request = new XMLHttpRequest();

    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        console.log(request.response);
    };
}

