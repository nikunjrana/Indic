import React,{useState,useEffect} from 'react';

const DynamicComponents = React.memo((props) =>{

    const [Item,setItem] = useState('');
    //const [Item1,setItem1] = useState('');
    useEffect(()=>{
        if(Item == ''){
             window.addEventListener(props.event,temp, {passive : true})
        }
    },[])

    function temp(){ 

        switch(props.code){
            case 1 :
            import(/* webpackChunkName:"CallNow"*/"../../CallNow/container/CallNowContainer").then(module=>{setItem(() => module.default);})
            break;
            case 2 :
            import( /* webpackChunkName:"EnqBlPWANew" */ "../../EnquiryBlForms/components/EnqBlMain").then(module=>{setItem(() => module.default);})
            break;
            case 3 :
            import(/* webpackChunkName:"DeleteEnqBlPWA" */ "../../EnquiryBlForms/screens/ThankYou/DeleteToastContainer").then(module=>{setItem(() => module.default);})
            break;
            case 4 :
            import(/* webpackChunkName:"Footer" */'../../App/container/FooterContainer').then(module=>{setItem(() => module.default);})
            break;
            case 5 :
            // import(/* webpackChunkName:"MiniBL" */'../../../modules/CentralizePbr/container/MiniBlContainer').then(module =>{
            //     setItem(() => module.default);
                // import(/* webpackChunkName:"PHPJsFiles" */'../../App/components/EnqBlComponent').then(module=>{
                //     setItem1(() => module.default);
                // })
            
            //})
            break;
            case 6 :
            import(/* webpackChunkName:"Autofetch" */'./Autofetch').then(module=>{setItem(() => module.default);})
            break;
            default: 
        }
        window.removeEventListener(props.event,temp)
    }
   return(
       <>
       {createView(props,Item)}
       </>
   )
   
})

function createView(props,Item){
    //Enquiry
    if(props.code == 2){
        return props.showEnqPopup&& Item!='' ? <Item {...props}/>:''
    }
    //Mini BL,EnqBLComponent
    // else if( props.code == 5){
    //     let view = Item != '' ? <Item {...props}/>:''
    //     let view1 = Item1!= '' ? <Item1 {...props}/>:''
    //     return(
    //         <>
    //         {view1}
    //         {view}
    //         </>
    //     )
    // }
    //Default
    else{
        return Item!='' ? <Item {...props}/>:'';
    }
}

export default DynamicComponents;