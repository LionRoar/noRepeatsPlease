
const expect = require('chai').expect;
const permAlone = require('../BackTrack_BruteForce/backtrack');
const samples = require('./test-assets/samples');


function itShouldEqual(sample){
  it( `permAlone("${sample.input}") should return ${sample.result}.`,
   function(){
     //skip or you will kill your V8 :P
     if(sample.input.length > 8) this.skip();
    expect(permAlone(sample.input)).to.equal(sample.result);
  });
}



describe('[BackTracking][permAlone()][#ofPermutations]',function(){

  it( `permAlone(${samples[0].input}) should return a number.`,
  function(){
    expect(permAlone(samples[0].input)).to.be.a('Number');
 });


  for(let s in samples){
    itShouldEqual(samples[s]);
  }


});
