module.exports =  function permAlone(str) {
  if(str=='') return 1
  const bag=new Map()
  for(const c of str){
    bag.set(c,(bag.get(c)||0)+1)
  }
  const essence=[]
  for(let v of bag.values()){
    essence[--v]=(essence[v]||0)+1
  }
  let fact
  {const f=[1]
    fact= n=>f[n]||(f[n]=n*fact(n-1))
  }
  const essL=essence.length
  let bits=essL//essence.reduce((s,v)=>s+v,essL)
  let bExp=-1// essence as a bits expression
  let pFact=1, bMask=1
  for(let i=0;i<essL && bits<=32;i++){
    if(essence[i]==null) essence[i]=0
    const v=essence[i]; bits+=v
    pFact*= fact(i+1)**v * fact(v)
    bExp-=bMask; bMask<<=v+1
  }
  if(bits>32)
    throw `Too many bits requiered: ${bits} >32`
  bExp+=bMask--
  // console.log(essence)
  // console.log(bExp.toString(2))

  class MapA extends Map{
    set(key, idx, value){
      if(value==null)
        return super.set(key, idx),this
      let ar=super.get(key)
      if(typeof ar!='object')
        {ar=[]; super.set(key, ar)}
      ar[idx]=value
      return this
    }
  }
  let crMap=new MapA()
  crMap.set((3<<bits-essL-1)-1, 0, 1)
  for(let lcrM=1;lcrM<str.length; lcrM++){
    const nxMap=new MapA()
    for(const [key, value] of crMap){
      const bDiff=key^bExp,
        bnSprout=~((~key&bMask)>>>1 & key),
        bnImp=~bDiff&bnSprout,
        sum=value.reduce((s,v)=>s+v,0)
      let i=0, v=0, allowed=0
      for(let crBit=1;crBit&bMask;crBit<<=1){
        if(crBit&key) v++; else {i++; v=0}
        if(crBit&bnImp) continue
        cLabel:{
          if(crBit&bDiff)
            if(crBit&key)allowed++
            else allowed--
          else break cLabel
          if(crBit&bnSprout) continue
        }if(allowed)
          nxMap.set(key+crBit, i, i?v*sum-value[i-1]:sum)
      }
    }
    //could be done: recycle crMap
    crMap=nxMap;
  }
  return pFact*crMap.get(bExp).reduce((s,v)=>s+v,0)
}
