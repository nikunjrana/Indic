// Removal of text Nodes in case of Preact implementation
export const removalTextNodes=()=> {
    let fontElements = document.getElementsByTagName("font");
    let ldr = document.getElementById('translationLdr');
    if( fontElements && fontElements.length>0){
    ldr?ldr.style.display='none':'';
    let findAndReplaceTextNodes = Array.from(fontElements).reduce((acc,i)=>{ if (i.children.length>0) {acc.push(i.parentElement.childNodes)}; return acc},[]) ;
    for(let i of findAndReplaceTextNodes ){ Array.from(i).filter(function(i){return i.nodeType===3 }).map((item)=>{item.remove()}) }
    }
    if(ldr){
      setTimeout(() => {
        ldr?ldr.style.display='none':'';
    }, 3000);
    }
  }
