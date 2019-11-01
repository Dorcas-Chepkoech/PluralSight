const doWorkPromise=new Promise((resolve,reject)=>{
    setTimeout(()=>{
       resolve([7,4,1]);
      // reject('Things went wrong');
    },5000);
});
doWorkPromise.then((result)=>{
    console.log('success!',result);

}).catch((error) => {
    console.log('Error!',error);

});