
/*

Backtaking - BruteForce aproache

*/
module.exports =  function permAlone(str) {
  var perms = [];
  var arr = str.split('');
  function nonRepeated(){
    var regex = /(.)\1+/;
    return perms.filter((p)=>(!p.match(regex)));
  }

  function permALoneHelper(a,chosen){
   if(a.length==0){
     perms.push(chosen);
   }else{//choose/explore/unchoose

    //(1-letter)
    for(var i = 0; i < a.length;i++){
      //choose the letter
      var c = a[i];
      chosen += c;
      a.splice(i,1);

      //explore what's after
      permALoneHelper(a,chosen);
      //un-choose
        a.splice(i,0,c);
        chosen = chosen.substring(0,chosen.length-1);

      }
   }
  }

  permALoneHelper(arr,"");

  return nonRepeated().length;
}
