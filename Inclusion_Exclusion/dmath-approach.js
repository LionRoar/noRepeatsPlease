
'use strict';
//factorial
function f(number){
  let $ = 1 , _ = 1;
  while($<=number){
    _*=$;
    $++;
  }
  return _;
}

function getRepeatedLetters(str){

  let reg = /([a-zA-Z]).*(\1)/gm;
  let repeats = {};

  for(let x =0 ; x<str.length;x++){
    var l = str.charAt(x);
    repeats[l] = (isNaN(repeats[l]) ? 1 : repeats[l] + 1);
  }

  let reTotal = 0;

  for(let k in repeats){
    if(repeats[k]<=1)
      delete repeats[k];
    else reTotal+=repeats[k];
  }

return {
        repeats,
        length:Object.keys(repeats).length,
        totalRepeated:reTotal
        };

}

module.exports = function permAlone(str) {
  let n = str.length;
  //total permutations
  let total = f(n);
  //string info
  let re = getRepeatedLetters(str);
  //if there's only one letter return :P
  if(n === 1 ) return 1 ;
  //if the string is the same letter e.g: zzzzzzzz
  if(n==re.totalRepeated && re.length === 1 ) return 0;


  let invalid = 0;
  let overlapCounter = 1;
  let letter = re.repeats;
  let un_mod_letter = {... re.repeats};
  //for letters
  for(let i in letter){
    //for letters repeates more than two times
    while (letter[i] > 1) {
      overlapCounter*=f(letter[i]);
      invalid+= f(n - letter[i]+1) * f(letter[i]--);
    }
  }
  /*
   if the we reached this far that means there's permutation
   promblem need to be solved so first we check if there's overlap
   and that could be known by the number of the letters in repeated in the string
  */
  if(re.length == 1 ) overlapCounter = 0;
  /*
  OVERLAP :
  here we check if the letters overlaping on each others that
  means that all the letters in the string are repeated
  and if they are repeated equally
  => overlaped = re.length; // # of repeated letters
  or if not:
  => overlaped = 1;
  else if not all the letters in the string are Repeated
  then overlaping is happing over them so we need to calculate them too!
  => overlaped = f(n-re.totalRepeated+re.length);
  */

  let overlaped =
    n === re.totalRepeated ?
      (n === (un_mod_letter[Object.keys(un_mod_letter)[0]]*re.length)) ?
        re.length : 1
          :f(n-re.totalRepeated+re.length);

  let overlap = overlaped * overlapCounter;
  /*

  finally stright forward
  N(C1' U C2') = S0 - S1 + S3

  or ...

  N' =  TOTAL   - INVALID + OVERLAP

  */
  // result
  return total - invalid + overlap;


}

//console.log(permAlone('aabb'));
