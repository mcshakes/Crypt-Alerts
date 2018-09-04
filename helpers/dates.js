function ISODateString(d){
 function pad(n){return n<10 ? '0'+n : n}
 return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate() - 1)+'T'
      + pad(d.getUTCHours() - 1)+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())+'Z'
}

function encode(date) {
  return encodeURIComponent(date);
}

module.exports = { ISODateString, encode }
