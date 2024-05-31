if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}

export const convertIndianNumericFormatToNumeric = (price) => {

    let splittedInput = price ? price.split('/'): "";
    let input = splittedInput[0];
    // Remove the currency symbol (₹) and any extra spaces
    const cleanedInput = input ? input.replace(/₹|,/g, '').trim():"";
  
    // Check if the input contains the word "Lakh" or "Crore"
    if (cleanedInput && cleanedInput.toLowerCase().includes('lakh')) {
      // Extract the numeric part before "Lakh"
      const numericValue = parseFloat(cleanedInput);
      if (!isNaN(numericValue)) {
        // Multiply by 100,000 to convert Lakh to the numeric format
        return formatINRPrice(Math.floor(numericValue) * 100000) + (splittedInput[1] ? ' / ' + splittedInput[1]:'');
      }
    } else if (cleanedInput && cleanedInput.toLowerCase().includes('crore')) {
      // Extract the numeric part before "Crore"
      const numericValue = parseFloat(cleanedInput);
      if (!isNaN(numericValue)) {
        // Multiply by 10,000,000 to convert Crore to the numeric format
        return formatINRPrice(Math.floor(numericValue) * 10000000)  + (splittedInput[1] ?  ' / ' +  splittedInput[1]:'');
      }
    }
  
    // If the input doesn't contain "Lakh" or "Crore," parse it as a regular number
    const numericValue = parseFloat(cleanedInput);
    if (!isNaN(numericValue)) {
      return formatINRPrice(Math.floor(numericValue)) + (splittedInput[1] ?  ' / ' +  splittedInput[1]:'');
    }
  
    // If parsing fails, return null or an appropriate error message
    return null;
  }

  export const formatINRPrice = (price='') => {
    const prceStr = price.toString();
    let PriceDec = prceStr && prceStr.split('.') ? prceStr.split('.') : ''
    let priceStr = PriceDec && PriceDec[0] ? PriceDec[0] : '';
    let formattedPrice = '';
    let i = priceStr.length - 1;
    let count = 0;
    let flag=1
    while (i >= 0) {
      if ((flag==1 && count === 3) || (flag==0 && count===2)) {
        formattedPrice = ',' + formattedPrice;
        flag=0;
        count = 0;
      }
      formattedPrice = priceStr[i] + formattedPrice;
      i--;
      count++;
    }
   return formattedPrice + (PriceDec[1]?`.${PriceDec[1]}`:"")
  }
export const getPriceWithoutCurrency = (fobprice,searchPrice = false) => {
    if ( searchPrice && fobprice >= 10000000) {
        if( fobprice % 10000000)
            fobprice = fobprice.toFixed(2);
        // fobprice = fobprice / 10000000;
        // fobprice = fobprice.toString() + " Crore";
        let newprice = fobprice.toString().split('.');
        let num = 0;
        let dec = 0;
        if (newprice[0])
            num = parseInt(newprice[0]);
        if (newprice[1]) {
            dec = parseInt(newprice[1]);
        }
        if (num > 10000000 && num % 10000000 == 0)
            fobprice = Math.floor((num / 10000000)).toString() + ',' + '00' + ','+ '00' + ',' + '000';
        else if (num > 10000000)
            fobprice = Math.floor((num / 10000000)).toString() + ',' + `${(num % 10000000) ? Math.floor((num % 10000000)/100000).toString():'00'}` + ',' + `${(num % 100000) ? Math.floor((num % 100000)/1000).toString() : '00'}`+ ',' + (num%1000).toString().padStart(3, "0");
        else
            fobprice = num.toString();
        if (dec != 0)
            fobprice = fobprice + '.' + dec.toString();
    }
    else if(searchPrice && fobprice >= 100000){
        // if( fobprice % 100000)
        //     fobprice = fobprice.toFixed(2);
        // fobprice = fobprice / 100000;
        // fobprice = fobprice.toString() + " Lakh";
        if( fobprice % 100000)
            fobprice = fobprice.toFixed(2);
        let newprice = fobprice.toString().split('.');
        let num = 0;
        let dec = 0;
        if (newprice[0])
            num = parseInt(newprice[0]);
        if (newprice[1]) {
            dec = parseInt(newprice[1]);
        }
        if (num > 100000 && num % 100000 == 0)
            fobprice = Math.floor((num / 100000)).toString() + ',' + '00' + ',' + '000';
        else if (num > 100000)
            fobprice = Math.floor((num / 100000)).toString() + ',' + Math.floor((num % 100000)/1000).toString()+ ',' + (num%1000).toString().padStart(3, "0");
        else
            fobprice = num.toString();
        if (dec != 0)
            fobprice = fobprice + '.' + dec.toString();
    }
    else if (fobprice >= 100000) {
        fobprice = fobprice.toFixed(2);
        fobprice = fobprice / 100000;
        fobprice = fobprice.toFixed(2);
        fobprice = fobprice.toString() + " Lakh";
    }
    else {
        fobprice = fobprice.toFixed(2);
        let newprice = fobprice.toString().split('.');
        let num = 0;
        let dec = 0;
        if (newprice[0])
            num = parseInt(newprice[0]);
        if (newprice[1]) {
            dec = parseInt(newprice[1]);
        }
        if (num > 1000 && num % 1000 == 0)
            fobprice = Math.floor((num / 1000)).toString() + ',' + '000';
        else if (num > 1000)
            fobprice = Math.floor((num / 1000)).toString() + ',' + (num % 1000).toString().padStart(3, "0");
        else
            fobprice = num.toString();
        if (dec != 0)
            fobprice = fobprice + '.' + dec.toString();

    }
    return fobprice;
}

export const getPrice = (fobprice, currency, quantity) => {
    fobprice = fobprice.toFixed(2);
    if(fobprice>100000){
        fobprice = fobprice/100000;
        fobprice = fobprice.toFixed(2);
        fobprice = fobprice.toString()+"Lakh";
    }
    else
    {
        let newprice = fobprice.toString().split('.');
        let num = 0;
        let dec = 0;
        let dec_val=0;
        if(newprice[0])
            num = parseInt(newprice[0]); 
        if(newprice[1])
        {   
            dec = parseInt(newprice[1]);                   
            if(dec>0){ 
               dec_val= dec.toString().substring(0,2);
            }
        }
        if(dec_val>0) { 
            fobprice = num+"."+parseInt(dec_val);
        } else {
            fobprice = num;
        }
        // if(num > 1000 && num%1000==0)
        //     fobprice = Math.floor((num/1000)).toString() +','+'000';
        // else if (num > 1000)
        //     fobprice = Math.floor((num/1000)).toString() +','+(num%1000).toString();
        // else
        //     fobprice = num.toString();
        // if(dec != 0)
        //     fobprice = fobprice+'.'+dec.toString();
        if(Math.floor(fobprice/1000)!=0) {
           fobprice= new Intl.NumberFormat('en-IN').format(fobprice);
           fobprice=fobprice.trim();
        }
    }
    return currency +' '+ fobprice + (quantity ? ' / ' + quantity : '');
}
