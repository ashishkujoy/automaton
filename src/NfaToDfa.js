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

const nfaToDfaFinalStates = function (nfaToDfaStates, nfaFinalStates) {
    return nfaToDfaStates.filter(nfaToDfaState => nfaFinalStates.some(finalState => nfaToDfaState.includes(finalState)));
};

const nfaToDfaStates = function (states) {
    return states.concat(combination(states));
};

const nfaToDfaTuple = function (nfaTuple) {
    let dfaTuple = {
        alphabets: nfaTuple.alphabets,
        'start-state': nfaTuple['start-state']
    };
    dfaTuple['states'] = nfaToDfaStates(nfaTuple.states);
    dfaTuple['final-states'] = nfaToDfaFinalStates(dfaStates, nfaTuple.finalStates);
    dfaTuple.delta = getDfaDelta(nfaTuple.delta);
    return dfaTuple;
};

const removeDuplicates = function (array) {
    let uniqueArray = [];
    new Set(array).forEach(value => uniqueArray.push(value));
    return uniqueArray.sort();
};

const getDfaDelta = function (nfa, dfaStates) {
    return dfaStates.reduce((dfaDelta, dfaState) => {
        nfa.alphabets.forEach(alphabet => {
            let nextStates = dfaState.flatMap(state => {
                return nfa.next(state, alphabet);
            });
            if (dfaDelta[dfaState] === undefined) dfaDelta[dfaState] = {};
            if (nextStates.length !== 0) dfaDelta[dfaState][alphabet] = removeDuplicates(nextStates).toString().replace(/,/g, '');
        });
        return dfaDelta;
    }, {});
};

exports.combineWithNElements = combineWithNElements;
exports.nfaToDfaStates = nfaToDfaStates;
exports.getDfaDelta = getDfaDelta;
