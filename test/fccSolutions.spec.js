
const expect = require('chai').expect;
const basicPermAlone = require('../freecodecam_solutions/fccBasic');
const advancedPermAlone = require('../freecodecam_solutions/fccAdvanced');
const samples = require('./test-assets/samples');


function itShouldEqual(sample,permAlone){
  it( `permAlone("${sample.input}") should return ${sample.result}.`,
   function(){
    expect(permAlone(sample.input)).to.equal(sample.result);
  });
}

describe('[FreeCodeCamp][permAlone()]',function(){

  describe('[BasicSolution]',function(){
    it( `permAlone(${samples[0].input}) should return a number.`,
    function(){
      expect(basicPermAlone(samples[0].input)).to.be.a('Number');
   });
    for(let s in samples){
      //skip or you will kill your V8 :P
      if(samples[s].input.length < 7) 
      itShouldEqual(samples[s],basicPermAlone);
    }
  });

    describe('[AdvancedSolution]',function(){
      it( `permAlone(${samples[0].input}) should return a number.`,
      function(){
        expect(advancedPermAlone(samples[0].input)).to.be.a('Number');
     });

      for(let s in samples){
        itShouldEqual(samples[s],advancedPermAlone);
      }
  });
});
