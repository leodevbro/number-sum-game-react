const utils = {
    sum: (arr) => arr.reduce(
        (accumu, curr) => accumu + curr,
        0,
    ),
  
    // create an array of numbers between min and max (edges included)
    range: (min, max) => Array.from( // if input is (4, 9), output will be [4, 5, 6, 7, 8, 9]
        { length: max - min + 1 },
        (_, i) => min + i
    ),
  
    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),
  
  
    // Given an array of numbers and a max...
    // Pick a random sum (<= max) from the set of all available sums in arr. [4, 8, 9], 999
    randomSumIn: (arr, max) => {
        const sets = [[]];
        const sums = [];
        for(let i = 0; i < arr.length; i += 1) {
            for(let j = 0, len = sets.length; j < len; j += 1) {
                const candidateSet = sets[j].concat(arr[i]);
                const candidateSum = utils.sum(candidateSet);
                if(candidateSum <= max) {
                    sets.push(candidateSet);
                    sums.push(candidateSum);
                }
            }
        }
        console.log(sets);
        // console.log(sums);
        return sums[utils.random(0, sums.length - 1)];
    },
};

export default utils;