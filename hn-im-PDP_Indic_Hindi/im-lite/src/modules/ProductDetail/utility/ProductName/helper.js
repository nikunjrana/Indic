import React from 'react';
export function decodeEntityCode(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
export function getProdNames(langtype, hindiDispName, dispName, isFix) {
    let names = [];
    if (langtype === 'LangHi' && hindiDispName && isFix) {
        names = [
            <h1 className="fw mxht1000 fs18 pdb5 wr txtElip">{hindiDispName}</h1>,
        ];
    }
    else if ((langtype === 'LangHi' && !hindiDispName && isFix) || (langtype === 'LangEn' && isFix)) {
        names = [
            <h1 className="fw mxht1000 fs18 pdb5 wr txtElip">{dispName}</h1>,
        ];
    }
    else if (langtype === 'LangHi' && hindiDispName) {
        names = [
            <h1 className="fw mxht1000 fs18 pdb5 wr">{hindiDispName}</h1>,
            <p className="fs13 pdb5">{dispName}</p>
        ]
    }
    else if (langtype === 'LangHi' && !hindiDispName) {
        names = [
            <h1 className="fw mxht1000 fs18 pdb5 wr">{dispName}</h1>
        ]
    }
    else if (langtype === 'LangEn' && hindiDispName) {
        names = [
            <h1 className="fw mxht1000 fs18 pdb5 wr">{dispName}</h1>,
            <p className="fs13 mxht1000 pdb5">{hindiDispName}</p>
        ]
    }
    else {
        names = [
            <h1 className="fw mxht1000 fs18 pdb5 wr">{dispName}</h1>
        ]
    }
    return names;
}