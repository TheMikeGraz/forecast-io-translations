function join_with_shared_prefix(a, b, joiner) {
  var i = 0;

  while(i !== a.length &&
        i !== b.length &&
        a.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && a.charCodeAt(i - 1) !== 32)
    --i;

  return a.slice(0, i) + a.slice(i) + joiner + b.slice(i);
}

function today_variants(scope, a, b){
  return scope.indexOf("starting-continuing-until") !== -1 ? a : b;
}


module.exports = require("../template")({
  "clear": "heiter",
  "no-precipitation": "kein Niederschlag",
  "mixed-precipitation": "wechselnder Niederschlag",
  "very-light-precipitation": "leichter Niederschlag",
  "light-precipitation": "leichter Niederschlag",
  "medium-precipitation": "Niederschlag",
  "heavy-precipitation": "schwerer Niederschlag",
  "very-light-rain": "Nieselregen",
  "light-rain": "leichter Regen",
  "medium-rain": "Regen",
  "heavy-rain": "Regenschauer",
  "very-light-sleet": "leichter Graupelregen",
  "light-sleet": "leichter Graupelregen",
  "medium-sleet": "Graupelregen",
  "heavy-sleet": "Graupelschauer",
  "very-light-snow": "leichter Schneefall",
  "light-snow": "leichter Schneefall",
  "medium-snow": "Schneefall",
  "heavy-snow": "starker Schneefall",
  "light-wind": "leichte Brise",
  "medium-wind": "frische Brise",
  "heavy-wind": "Sturm",
  "low-humidity": "niedrige Luftfeuchtigkeit",
  "high-humidity": "hohe Luftfeuchtigkeit",
  "fog": "Nebel",
  "light-clouds": "leicht bewölkt",
  "medium-clouds": "überwiegend bewölkt",
  "heavy-clouds": "schwer bewölkt",
  "today-morning":  "heute Vormittag",
  "later-today-morning": "späteren Vormittag",
  "today-afternoon": "heute Nachmittag",
  "later-today-afternoon": "am späteren Nachmittag",
  "today-evening": "heute Abend",
  "later-today-evening": "späteren Abend",
  "today-night": "heute Nacht",
  "later-today-night": "heute in der späteren Nacht",
  "tomorrow-morning": "morgen Vormittag",
  "tomorrow-afternoon": "morgen Nachmittag",
  "tomorrow-evening": "morgen Abend",
  "tomorrow-night": "morgen Nacht",
  "morning": "Vormittag",
  "afternoon": "Nachmittag",
  "evening": "Abend",
  "night": "Nacht",
  "today": "heute",
  "tomorrow": "morgen",
  "sunday": "am Sonntag",
  "monday": "am Montag",
  "tuesday": "am Dienstag",
  "wednesday": "am Mittwoch", 
  "thursday": "am Donnerstag",
  "friday": "am Freitag",
  "saturday": "am Samstag",
  "minutes": "$1 Min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 Zoll",
  "centimeters": "$1 cm",
  "less-than": "weniger als $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", und " : " und "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " bis ");
  },
  "with": "$1 mit $2",
  "range": "$1 bis $2",
  "parenthetical": "$1 ($2)",
  "for-hour": "in der kommenden Stunde $1",
  "starting-in": "in $2 $1",
  "stopping-in": "$1, endet in $2",
  "starting-then-stopping-later": "$1 beginnt in $2 und endet $3 später",
  "stopping-then-starting-later": "$1 endet in $2 und beginnt $3 später erneut",
  "for-day": "$1 den ganzen Tag",
  "starting":  function(condition, time) {
    if(this[1] === "starting")
      if(time == "Vormittag")
        return "Am "+time+" "+condition;
      else  
        return "in " + time + " " + condition;

    else if(this[1] === "and")
      return time + " " + condition;
      

    else
      return condition + " " + time;
  },
  "until": "$1 bis $2",
  
  "until-starting-again": function(condition, a, b) {
    return condition + " bis zum " + a + " und wieder " + b
  },
  //"starting-continuing-until": "$1 von $2 bleibt es bis $3",
  //"starting-continuing-until": "$1 beginnend $2 gleichbleibend bis $3",
  "starting-continuing-until": function(condition, a, b) {
    var a_new = a;
    var b_new = b;
    var bis = "bis ";
    if (a_new == "Abend" || a_new == "Vormittag") a_new = "am "+a_new;
    if (b_new == "Nacht") {
        b_new = "die ganze Nacht";
        bis = "";
    }
    if (b_new == "Abend") b_new = "zum "+b_new;
    return condition + " beginnend " + a_new + " gleichbleibend " +bis + b_new;
  },  
  "during": function(condition, time) {
    if(this[1] === "and")
      return time + " " + condition;

    else if(this[1] === "with")
      return condition + " " + time;
      
    else if(time == "Nacht")
        return condition + " in der " +time;

    else
      return condition + " am " + time;
  },
  "for-week": "die ganze Woche $1",
  "over-weekend": "$1 am Wochenende",
  "temperatures-peaking": "einem Temperaturmaximum von $1 $2",
  "temperatures-rising": "steigender Temperatur von $1 $2",
  "temperatures-valleying": "einem Temperaturminimum von $1 $2",
  "temperatures-falling": "fallender Temperatur von $1 $2",
  /* Capitalize the first letter of every word, except if that word is
   * "and". (This is a very crude bastardization of proper English titling
   * rules, but it is adequate for the purposes of this module.) */
  "title": function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  /* Capitalize the first word of the sentence and end with a period. */
  "sentence": function(str) {
    /* Capitalize. */
    str = str.charAt(0).toUpperCase() + str.slice(1);

    /* Add a period if there isn't already one. */
    if(str.charAt(str.length - 1) !== ".")
      str += ".";

    return str;
  }
});
