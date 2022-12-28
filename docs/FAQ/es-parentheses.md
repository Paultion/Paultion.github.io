---
title: 括号分数
group:
  title: es
---


```js
/**
1．给定一个平衡括号字符串 S，按下述规则计算该字符串的分数：
()得1分。
AB得A+B分，其中A和B 是平衡括号字符串。
(A) 得2*A分，其中 A 是平衡括号字符串。
示例：
  輸入：“()"
  输出：1
  輸入：“(())=> (1) => 2"
  輸出：2
  輸入："() ()" => 1,1 => 2
  輸出：2
  輸入: "(() (()))" => (1(1)) => (1,2) => (3) => 6
  輸出：6
  輸入: “((()))" => ((1)) => (2) => 4
  輸出：4
 */


var scoreOfParentheses = function (s) {
  const st = [0];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      st.push(0);
    } else {
      let v = st.pop();
      let top = st.pop() + Math.max(2 * v, 1);
      st.push(top);
    }
  }
  return st[0];
};

console.log(scoreOfParentheses('(()(()))'))
```