const combineWithNElements = function (elementToCombine, n, elements) {
    let go = function (combinations, remainingElements, elementToCombine, size) {
        if (remainingElements.length < size) return combinations;
        let combination = remainingElements.slice(0, size);
        combination.unshift(elementToCombine);
        combinations.push(combination);
        return go(combinations, remainingElements.slice(1), elementToCombine, size)
    };

    return go([], elements, elementToCombine, n);
};

const combination = function (elements) {
    return elements.flatMap((element, index) => {
        let combinationOfCurrentElement = [];
        for (let size = 1; size < elements.length - index; size++) {
            combinationOfCurrentElement = combinationOfCurrentElement.concat(combineWithNElements(element, size, elements.slice(index + 1)));
        }
        return combinationOfCurrentElement;
    });
};

const nfaToDfaFinalStates = function(nfaToDfaStates,nfaFinalStates) {
  return nfaToDfaStates.filter(nfaToDfaState => nfaFinalStates.some(finalState => nfaToDfaState.includes(finalState)));
};

const nfaToDfaStates = function (states) {
    return ['q0'].concat(states).concat(combination(states));
};


exports.combineWithNElements = combineWithNElements;
exports.nfaToDfaStates = nfaToDfaStates;
