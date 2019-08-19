function __runner(genFn)  {
    const itr = genFn();
    const onFullfilled = run.bind(run, 'next');
    const onRejected = run.bind(run, 'throw');

    function run(verb, arg) {
       let result;
       try{
            result = itr[verb](arg);
       }catch(err){ //If we don't catch error in generator function, it will bubble here and we will catch it only to reject it again.
           return Promise.reject(err);
       }
       if(result.done) {
            return result.value;
       }else{
            return Promise.resolve(result.value).then(onFullfilled).catch(onRejected)
       }
    }

    run('next'); //First time we run it won't throw anything
}

