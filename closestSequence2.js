/*

      # Closest Sequence 2

      The difference between two sequences of the same length `a1, a2, a3,...,
      an` and `b1, b2, b3,..., bn` can be defined as the sum of absolute
      differences between their respective elements:

      `diff(a, b) = |a1 - b1| + |a2 - b2| + ... + |an - bn|`.

      For the given sequences `a` and `b` (not necessarily having the same
      lengths) find a subsequence[*] `b'` of `b` such that `diff(a, b')` is
      minimal. Return this difference.

      ## Example

      For `a = [1, 2, 6]` and `b = [0, 1, 3, 4, 5]`, the output should be
      `closestSequence2(a, b) = 2`.

      The best subsequence will be `b' = [1, 3, 5]` which has a difference of
      `2` with `a`.

      ## Input/Output

      - [time limit] 4000ms (js)

      - [input] array.integer a

        Constraints:
        3 ≤ a.length ≤ 1000,
        -1000 ≤ a[i] ≤ 1000.

      - [input] array.integer b

        Constraints:
        a.length ≤ b.length ≤ 1000,
        -1000 ≤ b[i] ≤ 1000.

      - [output] integer

      * A subsequence is a sequence that can be derived from another sequence
      by deleting some elements (possibly, none) without changing the order of
      the remaining elements.

*/

const closestSequence2 = (a,b) => {
  const sum = (prev, curr) => prev + curr;

  const sumA = a.reduce(sum, 0);
  const avgA = sumA / a.length;

  const sumB = b.reduce(sum, 0);
  const avgB = sumB / b.length;

  const diff = (prev, curr, i, arr) => {
    if (i < arr.length - 1) {
      const val = Math.abs(arr[i + 1] - curr);
      prev.push(val)
    }

    return prev;
  };

  const diffsA = a.reduce(diff, []);
  const sumDiffsA = diffsA.reduce(sum, 0);
  const avgDiffsA = sumDiffsA / diffsA.length;

  const diffsB = b.reduce(diff, []);
  const sumDiffsB = diffsB.reduce(sum, 0);
  const avgDiffsB = sumDiffsB / diffsB.length;

  return `
    length ratio
    ${b.length / a.length}



    arrays
           len\tsum\tavg
    a      ${a.length}\t${sumA}\t${avgA}
    b      ${b.length}\t${sumB}\t${avgB}
    diff   ${b.length - a.length}\t${Math.abs(sumA - sumB)}\t${Math.abs(avgA - avgB)}



    diffs
           len\tsum\tavg
    a      ${diffsA.length}\t${sumDiffsA}\t${avgDiffsA}
    b      ${diffsB.length}\t${sumDiffsB}\t${avgDiffsB}
    diff   ${diffsB.length - diffsA.length}\t${Math.abs(sumDiffsA - sumDiffsB)}\t${Math.abs(avgDiffsA - avgDiffsB)}
  `;
}

const tests = [
  {
    a: [1, 2, 6],
    b: [0, 1, 3, 4, 5],
    expected: 2,
  },
  {
    a: [1, 2, 1, 2, 1, 2],
    b: [3, 0, 0, 3, 0, 3, 3, 0, 0],
    expected: 7,
  },
  {
    a: [1, 1, 1, 1, 1, 1],
    b: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    expected: 0,
  },
  {
    a: [
      13, 5,  3, -1, -9, 20,  5, -17, 20, -11,
      -6, 1, 17, 18, 20, -6, 11,  12,  3,  -8
    ],
    b: [
        1,   1, -18, -3, -9, 16,  5,  13,  -2, 4,
       -9, -16, -20, 13, -3, 10, 20,  -5, -20, 2
    ],
    expected: 270,
  },
  {
    a: [
      -26, -35,  44,  23,  7, -40, -14,  18, 39, -12, -22, -5,   4,  10,  0, -11, 45,
      -16,   2,  46, -45,  2,  -3, -50, -17, 49,  47, -15, 49, -15,  16, 43,  33, 22,
      -34,  48, -41,  12, 19, -17,  31, -46, 38, -21,  16,  3, -43, -50,  4,   7
    ],
    b: [
      18, 16, -22,   4,  -5, -46, -43,  28, 50, -47, 31, -41,  35, -6, -20, -33,
      10, 34,  -7, -46,   0,  35,  29,  22, 19, -48, -4,  10, -41, 26, -33,  45, -2,
      24,  4,  39,  -2, -42,  41,  18, -28, 28, -44, 19,  34,  41, 33, -27, -26, 41
    ],
    expected: 1928,
  },
  {
    a: [1, 2, 3, 4, 5, 6, 7, 8],
    b: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    expected: 8,
  },
  {
    a: [2, 5, 8, 11, 14],
    b: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    expected: 0,
  },
  {
    a: [3, 4, 9, 10, 15],
    b: [1, 0, 3, 2, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 15, 14],
    expected: 0,
  },
  {
    a: [15, 3, 10, 4, 9],
    b: [14, 1, 15, 0, 12, 3, 13, 2, 10, 5, 11, 4, 8, 7, 9, 6],
    expected: 0,
  },
  {
    a: [15, 3, 10, 6, 9],
    b: [14, 1, 15, 0, 12, 3, 13, 2, 10, 5, 11, 4, 8, 7, 9, 6],
    expected: 1,
  },

  {
    a: [4, 8, 7, 9, 6],
    b: [14, 1, 15, 0, 12, 3, 13, 2, 10, 5, 11, 4, 8, 7, 9, 6],
    expected: 0,
  },
];

tests.forEach(({ a, b, expected }, i) => {
  console.log(`
    ------------------------------------


    Test ${i+1}
    ${closestSequence2(a, b)}
    Expected: ${expected}
  `);
});
