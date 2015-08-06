
// Reference: http://stackoverflow.com/a/7958422
// This is the micro-set rather than the miniSet.

// Preempt namespace conflicts by favoring whatever came first.
var set = set || {};

// This one we don't really need a prototype for.
set = function(sequence)
{

    obj = {};

    for (index = 0; index < sequence.length; index++)
    {
        obj[sequence[index]] = true;
    }

    return obj;

};

test_set = set([1, 1, 2, 3, 4, 1, 2, 6, 7, 1, 4, 9, 8]);

console.log(test_set);
