function kmp(source, pattern) {
  let table = new Array(pattern.length).fill(0)
  {
    let i = 0, j = 1
    while (j < pattern.length) {
      if (pattern[j] === pattern[i]) {
        ++i, ++j
        table[j] = i
      } else {
        if (i > 0) {
          i = table[i]
        } else {
          ++j
        }
      }
    }
    console.log(table);
  }
  {
    let i = 0, j = 0
    while (j < source.length) {
      if (pattern[i] === source[j]) {
        ++j, ++i
      } else {
        if (i > 0)
          i = table[i]
        else
          ++j
      }
      if (i === pattern.length)
        return true
    }
  }
  return false
}

console.log(kmp('abcdabce', 'abcdabce'))
console.log(kmp('abcdabcexx', 'abcdabce'))
console.log(kmp('xxabcdabce', 'abcdabce'))
console.log(kmp('abc', 'abc'))
console.log(kmp('aabaaacxx', 'aabaaac'))
console.log(kmp('xxaabaaac', 'aabaaac'))
