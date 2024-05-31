import { eventTracking, gaTrack,prevname } from "./GaTracking";
import { goToRoute } from "./routingFunction";
import { VOICE_LANGUAGES } from "../constants/voiceLanguages";
import { getCookie } from "./CookieManager";

var gVoice = "";
if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
  gVoice = new webkitSpeechRecognition();
}
var isStart = false;
var isAbort = false;

export const setlang = () => {
  var langpref_1 = VOICE_LANGUAGES;
  if (!localStorage.getItem("langpref_1"))
    localStorage.setItem("langpref_1", JSON.stringify(langpref_1));
};
export const getLang = (lang, default_call) => {
  if (!localStorage.getItem("langpref_1")) setlang();
  var language = JSON.parse(localStorage.getItem("langpref_1"));
  for (var i = 0; i < language.length; i++) {
    if (language[i][1] == lang) {
      break;
    }
  }
  if (typeof default_call != "undefined" && default_call != false) {
    localStorage.setItem("lang", JSON.stringify(language[i]));
    document.getElementById("lang_text")
      ? (document.getElementById("lang_text").innerHTML = language[i][3])
      : "";
    document.getElementById("retry_text_val")
      ? (document.getElementById("retry_text_val").innerHTML = language[i][4])
      : "";
    document.getElementById("catch_text")
      ? (document.getElementById("catch_text").innerHTML = language[i][5])
      : "";
  } else {
    return [language[i], i];
  }
};
export const customComparator = (a, b) => {
  if (a[0] > b[0]) return 1;
  else if (a[0] < b[0]) return -1;
  return 0;
};
export const modifylang = (lang, val = false) => {
  if (!localStorage.getItem("langpref_1")) setlang();
  var language = JSON.parse(localStorage.getItem("langpref_1"));
  var get_selected_lang = getLang(lang);
  var preference = get_selected_lang[0];
  var i = get_selected_lang[1];
  document.getElementById("lang_text")
    ? (document.getElementById("lang_text").innerHTML = preference[3])
    : "";
  document.getElementById("retry_text_val")
    ? (document.getElementById("retry_text_val").innerHTML = preference[4])
    : "";
  document.getElementById("catch_text")
    ? (document.getElementById("catch_text").innerHTML = preference[5])
    : "";
  language.splice(i, 1);
  let new_lang = language;
  // var new_lang = language.sort(customComparator)
  new_lang.unshift(preference);
  localStorage.setItem("langpref_1", JSON.stringify(new_lang));
  //To Manipulate State in Lang chooser, we need to return new_lang
  if (val) return new_lang;
};
export const lang_input_for_voice = (eventCategory = "Voice-Search-PWA",form = "",type="",page='',EnqBlTrack={}) => {
  // var Iploc = getImCookie({
  //     name: "iploc",
  //     flag: 1
  // });
  var Iploc = getCookie("iploc", "object");
  var p = document;
  var pageLabel = "";
  if (window.location.href.indexOf("messages") > 0) {
    pageLabel = "_Messages";
  } else {
    pageLabel = "";
  }
  if (localStorage.getItem("lang")) {
    var voice_lang = JSON.parse(localStorage.getItem("lang"));
    voicesearch(voice_lang[1], eventCategory,form,type,page,EnqBlTrack);
  } else if (Iploc && Iploc.gcnnm == "India") {
    p.getElementById("selectLang"+type)?document.body.style.overflow = "hidden":'';
    eventTracking(
      eventCategory,
      "Select_Language_Page" + pageLabel,
      "Open",
      false
    );
    p.getElementById("selectLang"+type)
      ? (p.getElementById("selectLang"+type).style.display = "block")
      : "";
    if (p.getElementById("close_langPopup")) {
      p.getElementById("close_langPopup").onclick = function () {
        if(page == 'Message'){
          document.body.style.overflow = "";
        }
        else{
          document.body.style.overflow = "";
        }
        p.getElementById("selectLang"+type)?p.getElementById("selectLang"+type).style.display = "none":'';
        eventTracking(
          eventCategory,
          "Select_Language_Page" + pageLabel,
          "Closed",
          false
        );
      };
    }
  } else {
    voicesearch("en-IN", eventCategory,form,type,page,EnqBlTrack);
  }
};
export const voicesearch = (lang, eventCategory = "Voice-Search-PWA",form="",type="",page='',EnqBlTrack={}) => {
  //In order to close the lang popup divs
  document.getElementById("selectLang"+type)
    ? (document.getElementById("selectLang"+type).style.display = "none")
    : "";
  if ("webkitSpeechRecognition" in window) {
    if (isStart) {
      gVoice.abort();
      isAbort = true;
    }
    document.body.style.overflow = "";
    //This sets language on voice search popup
    getLang(lang, true);
    document.getElementById("retry_new")
      ? (document.getElementById("retry_new").style.display = "none")
      : "";
    var waves = document.getElementById("waves");
    gVoice.continuous = false;
    gVoice.interimResults = true;
    gVoice.lang = lang;
    gVoice.maxAlternatives = 1;
    if (!isStart) {
      try {
        gVoice.start();
      } catch (e) {}
    }
    var e = "";
    var i = false;
    var pageLabel = "";
    if (window.location.href.indexOf("messages") > 0) {
      pageLabel = "_Messages";
    } else {
      pageLabel = "";
    }
    gVoice.onresult = function (b) {
      e = b.results[0][0].transcript;
      if (document.getElementById("catch_text"))
        document.getElementById("catch_text").innerHTML = e;
      isStart = false;
    };
    gVoice.onstart = function (b) {
      if (!isAbort) {
        isStart = true;
        gaTrack.trackEvent([
          eventCategory,
          "Microphone_allowed" + pageLabel,
          "",
          0,
          true,
        ]);
        waves&&waves.classList.add("waveAni");
        document.getElementById("retry_new")?document.getElementById("retry_new").style.display = "none":'';
        document.getElementById("catch_text")?document.getElementById("catch_text").style.display = "block":'';
        if (document.getElementById("vSrhMain")&&document.getElementById("vSrhMain").style.display != "block")
          gaTrack.trackEvent([
            eventCategory,
            "Voice_Input_Page" + pageLabel,
            "Open",
            0,
            true,
          ]);
          let vClsElement = document.getElementById("vCls");
          if(vClsElement){
          vClsElement.onclick = function () {
          document.getElementById("vSrhMain")?document.getElementById("vSrhMain").style.display = "none":"";
          gVoice.stop();
          isStart = false;
          gaTrack.trackEvent([
            eventCategory,
            "Voice_Input_Page" + pageLabel,
            "Closed",
            0,
            true,
          ]);
        };}
        document.getElementById("vSrhMain")?document.getElementById("vSrhMain").style.display = "block":"";
      }
      gVoice.onend = function (b) {
        var vSrhMainId = 1;
        if (isAbort) {
          isAbort = false;
          gVoice.start();
        } else {
          if (
            e &&
            document.getElementById("vSrhMain").style.display == "block"
          ) {
            gaTrack.trackEvent([
              eventCategory,
              "Voice-input" + pageLabel,
              e,
              0,
              true,
            ]);
            document.getElementById("vSrhMain").style.display = "none";
            document.getElementById("tempht")?document.getElementById("tempht").style.display = "block":''
            vSrhMainId = 0;
            if (window.location.href.indexOf("messages") > 0 && !document.getElementById("prd_name_enq")) {
              document.getElementById("replybox").value = e;
              if(document.getElementById("msgCall") && document.getElementById("sbmtbtn")){
                document.getElementById("msgCall").classList.add("dn")
                document.getElementById("sbmtbtn").classList.remove("dn")
              }
              if(/(android)/i.test(navigator.userAgent) && navigator.userAgent.indexOf("Firefox") < 0){
                document.getElementById('cameraIcon')?document.getElementById('cameraIcon').classList.add("dn"):'';
                document.getElementById('fileIcon')?document.getElementById('fileIcon').style.right="73px":'';
                document.getElementById('payIcon')?document.getElementById('payIcon').classList.add("dn"):'';
              }
              else{
              document.getElementById('payIcon')?document.getElementById('payIcon').classList.add("dn"):document.getElementById('fileIcon')?document.getElementById('fileIcon').style.right=" ":'';
              document.getElementById('payIcon')&&document.getElementById('fileIcon')?document.getElementById('fileIcon').style.right="73px":'';
              }
              if (
                document.getElementById("callIcon") &&
                document.getElementById("sbmtbtn")
              ) {
                document.getElementById("sbmtbtn").classList.remove("dn");
                document.getElementById("callIcon").classList.add("dn");
              }
              gaTrack.trackEvent([
                "Messages",
                "Voice_Input",
                document.getElementById("replybox").value,
                0,
                true,
              ]);
              return;
            }
            if (page == 'Message') {
              document.body.style.overflow = "hidden";
              document.getElementById("inlineReply") ? document.getElementById("inlineReply").value = e : '';
              gaTrack.trackEvent([
                "Messages",
                "Voice_Input",
                document.getElementById("inlineReply").value,
                0,
                true,
              ]);
              return;
            }
            if (page == 'InMessage') {
              document.body.style.overflow = "hidden";
              document.getElementById("inlineReply") ? document.getElementById("inlineReply").value = e : '';
              gaTrack.trackEvent([
                "Messages",
                "Voice_Input",
                document.getElementById("inlineReply").value,
                0,
                true,
              ]);
              return;
            }
            if (eventCategory && eventCategory.search("Faq") > -1) {
              let faqInput = document.getElementById("faqInput");
              if (faqInput) faqInput.value = e;
              return;
            }
            
            if (
              ((document.getElementById("ProdNum") &&
                document.getElementById("ProdNum").style.display != "none" &&
                document.getElementById("prd_name_enq")) ||document.getElementById("prd_name_enq" + type)||
              document.getElementById("name_enq") || document.getElementById("name_enqmbl") ||
              document.getElementById("specific_desc_isq") || document.getElementById("prd_name"+type) ) && form == "Enq"
            ) {
              let langtrack= lang=="en-IN"?"English":"Other";
              Object.keys(EnqBlTrack).length!=0 ? gaTrack.trackEvent([EnqBlTrack.eventCategory, EnqBlTrack.eventAction, EnqBlTrack.eventLabel+`_${langtrack}`, 0, true]):'';
             if(type) {
               let id = "prd_name_enq" + type;
               let newId = "prd_name" + type;
               document.getElementById(id) ? document.getElementById(id).value = e: ''; 
               document.getElementById(newId) ? document.getElementById(newId).value = e: ''; 
               document.getElementById(id)
               ? document.getElementById(id).focus()
               : "";
               document.getElementById(newId)
               ? document.getElementById(newId).focus()
               : "";
              }
              if(document.getElementById("ProdSugsName") &&  document.getElementById("ProdSugsName").classList){
                document.getElementById("prd_name_enq")
                ? (document.getElementById("prd_name_enq").value = e)
                : "";
              document.getElementById("prd_name_enq")
                ? document.getElementById("prd_name_enq").focus()
                : "";
                document.getElementById("ProdSugsName").classList.add('lFocused');
              }
              document.getElementById("name_enq")
                ? (document.getElementById("name_enq").value = e)
                : "";
              document.getElementById("name_enq")
                ? document.getElementById("name_enq").focus()
                : "";
              document.getElementById("name_enqmbl")
                ? (document.getElementById("name_enqmbl").value = e)
                : "";
              document.getElementById("name_enqmbl")
                ? document.getElementById("name_enqmbl").focus()
                : "";
              document.getElementById("specific_desc_isq")
                ? (document.getElementById("specific_desc_isq").value = e)
                : "";
              document.getElementById("specific_desc_isq")
                ? document.getElementById("specific_desc_isq").focus()
                : "";
              document.getElementById("prd_name")
                ? (document.getElementById("prd_name").value = e)
                : "";
              document.getElementById("prd_name")
                ? document.getElementById("prd_name").focus()
                : "";

              // gaTrack.trackEvent(["", "Voice_Input", e, 0, true]);
              return;
            }
            if (
              document.getElementById("autosug_div") &&
              document.getElementById("autosug_div").style.display === "block"
            ) {
              document.getElementById("autosug_div").style.display = "none";
            }
            
            if ((window.location.href.indexOf("/bl") > 0)&&window.pagename=="buylead") {
              location.replace(
                window.location.origin + "/bl/search.php?s=" + e
              );
            }
            let langSelected = localStorage.getItem("lang");
            if(langSelected){
              langSelected = JSON.parse(langSelected);
              langSelected = (langSelected && langSelected[1]) ? langSelected[1].split('-')[0] :'';
              langSelected ? langSelected = "&lang=" + langSelected : '';
            }
            var c = "/isearch.php?s=" + e + "&src=vs"+langSelected;history.replaceState("", "", c);location.reload();
            if(!(document.getElementById("prd_name_enq")||document.getElementById("prd_name"))){var c = "/isearch.php?s=" + e + "&src=vs"+langSelected;goToRoute(c);}
          } else {
            document.getElementById("retry_new")?document.getElementById("retry_new").style.display = "block":'';
            document.getElementById("catch_text")?document.getElementById("catch_text").style.display = "none":'';
          }
          gVoice.stop();
          isStart = false;
          waves.classList.remove("waveAni");
          if (e) {
            if (vSrhMainId) {
              gaTrack.trackEvent([
                "Voice-Search-PWA",
                "Voice-input" + pageLabel,
                e,
                0,
                true,
              ]);
            }
            let langSelected = localStorage.getItem("lang");
            if(langSelected){
              langSelected = JSON.parse(langSelected);
              langSelected = (langSelected && langSelected[1]) ? langSelected[1].split('-')[0] :'';
              langSelected ? langSelected = "&lang=" + langSelected : '';
            }
            var c = "/isearch.php?s=" + e + "&src=vs" + langSelected;
            document.getElementById("vSrhMain").style.display = "none";
            if (eventCategory && eventCategory.search("Faq") > -1) {
              let faqInput = document.getElementById("faqInput");
              if (faqInput) faqInput.value = e;
              return;
            }
            if (window.location.href.indexOf("messages") > 0) {
              document.getElementById("replybox").value = e;
              gaTrack.trackEvent([
                "Messages",
                "Voice_Input",
                document.getElementById("replybox").value,
                0,
                true,
              ]);
              return;
            }
            if(page == 'InMessage'){
              document.body.style.overflow = "hidden";
              document.getElementById("inlineReply") ? document.getElementById("inlineReply").value = e : '';
              gaTrack.trackEvent([
                "Messages",
                "Voice_Input",
                document.getElementById("inlineReply").value,
                0,
                true,
              ]);
              return;
            }
            if(page == 'Message'){
              document.body.style.overflow = "hidden";
              document.getElementById("inlineReply") ? document.getElementById("inlineReply").value = e : '';
              gaTrack.trackEvent([
                "Messages",
                "Voice_Input",
                document.getElementById("inlineReply").value,
                0,
                true,
              ]);
              return;
            }
            if (
              document.getElementById("prd_name_enq") ||
              document.getElementById("name_enq") || document.getElementById("name_enqmbl") ||
              document.getElementById("specific_desc_isq") ||
              document.getElementById("prd_name")
            ) {
              let langtrack= lang=="en-IN"?"English":"Other";
              Object.keys(EnqBlTrack).length!=0 ? gaTrack.trackEvent([EnqBlTrack.eventCategory, EnqBlTrack.eventAction, EnqBlTrack.eventLabel+`_${langtrack}`, 0, true]):'';
              document.getElementById("prd_name_enq")
                ? (document.getElementById("prd_name_enq").value = e)
                : "";
              document.getElementById("name_enq")
                ? (document.getElementById("name_enq").value = e)
                : "";
              document.getElementById("name_enq")
                ? document.getElementById("name_enq").focus()
                : "";
              document.getElementById("name_enqmbl")
                ? (document.getElementById("name_enqmbl").value = e)
                : "";
              document.getElementById("name_enqmbl")
                ? document.getElementById("name_enqmbl").focus()
                : "";
              document.getElementById("specific_desc_isq")
                ? (document.getElementById("specific_desc_isq").value = e)
                : "";
              document.getElementById("specific_desc_isq")
                ? document.getElementById("specific_desc_isq").focus()
                : "";
              document.getElementById("prd_name")
                ? (document.getElementById("prd_name").value = e)
                : "";
              document.getElementById("prd_name")
                ? document.getElementById("prd_name").focus()
                : "";

              // gaTrack.trackEvent(["", "Voice_Input", e, 0, true]);
              return;
            }
            if (
              document.getElementById("autosug_div") &&
              document.getElementById("autosug_div").style.display === "block"
            ) {
              document.getElementById("autosug_div").style.display = "none";
            }

            if ((window.location.href.indexOf("/bl") > 0)&&window.pagename=="buylead") {
              location.replace(
                window.location.origin + "/bl/search.php?s=" + e
              );
            }
            goToRoute(c);
            // if(!(document.getElementById("prd_name_enq")||document.getElementById("prd_name"))){ goToRoute(c);}
          } else {
            if (!i) {
              gaTrack.trackEvent([
                eventCategory,
                "Listening-timeout" + pageLabel,
                "",
                0,
                false,
              ]);
            }
            document.getElementById("retry_new")?document.getElementById("retry_new").style.display = "block":'';
            document.getElementById("catch_text")?document.getElementById("catch_text").style.display = "none":'';
          }
        }
      };
    };
    gVoice.onerror = function (b) {
        i = true;
        if (b.error == "not-allowed") {
          gaTrack.trackEvent([
            eventCategory,
            "Microphone_blocked" + pageLabel,
            "",
            0,
            true,
          ]);
          document.getElementById("offline_span") ? document.getElementById("offline_span").innerHTML =
            "Please allow access to microphone from settings" : '';
            document.getElementById("offline_pop") ? document.getElementById("offline_pop").style.display = "block" : '';
          setTimeout(function () {
            document.getElementById("offline_pop") ? document.getElementById("offline_pop").style.display = "none" : '';
            document.getElementById("offline_span") ? document.getElementById("offline_span").innerHTML =
              "You seem to be 'Offline'" : '';
          }, 4000);
        }
        if (b.error == "no-speech") {
          gaTrack.trackEvent([
            eventCategory,
            "Listening-timeout" + pageLabel,
            "",
            0,
            false,
          ]);
        }
        if (!isAbort) {
          isStart = false;
          gVoice.stop();
          waves&&waves.classList.add("waveAni");
          document.getElementById("retry_new")?document.getElementById("retry_new").style.display = "block":'';
          document.getElementById("catch_text")?document.getElementById("catch_text").style.display = "none":'';
        }
      };
  }
};