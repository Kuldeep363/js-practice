

async function priorityResolve(promises) {
    return new Promise((res,rej)=>{
        let mostPriority = 0;
        const tasksCompleted = {};
        let completed = 0;
        promises.forEach((promise,index)=>{
            promise
            .then((val)=>{
                if(index === mostPriority) return res(val);
                tasksCompleted[index] = val;
                completed++;
            })
            .catch(()=>{
                if(index === mostPriority){
                    mostPriority++;
                    if(tasksCompleted[mostPriority]) return res(tasksCompleted[mostPriority]);
                }
                completed++;
                if(completed>= promises.length) return rej("Error!!")
            })
        })   
    })
}

const p0 = new Promise((res, rej) => setTimeout(() => rej('A'), 400));
const p1 = new Promise((res, rej) => setTimeout(() => res('B'), 100));
const p2 = new Promise((res, rej) => setTimeout(() => res('C'), 200));


priorityResolve([p0, p1, p2])
  .then(console.log).catch(err => {console.log(err)});