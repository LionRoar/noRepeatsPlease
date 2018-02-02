
const expect = require('chai').expect;
const permAlone = require('../Inclusion_Exclusion/dmath-approach');
const samples = require('./test-assets/samples');


function itShouldEqual(sample){
  it( `permAlone("${sample.input}") should return ${sample.result}.`,
   function(){
    expect(permAlone(sample.input)).to.equal(sample.result);
  });
}



describe('[Inclusion/Exclusion][permAlone()][#ofPermutations]',function(){

  it( `permAlone(${samples[0].input}) should return a number.`,
  function(){
    expect(permAlone(samples[0].input)).to.be.a('Number');
 });


  for(let s in samples){
    itShouldEqual(samples[s]);
  }

  
});