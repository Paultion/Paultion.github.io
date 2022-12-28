---
title: 解析DOM节点
group: 
  title: es  
---

```js
class Node {
  constructor({ id, value, children }) {
    this.id = id; // 唯一
    this.value = value; // 不唯一
    this.children = children;
  }
}

function analyzeNode(n) {
  const result = [];
  (function aNode(node, parent) {
    result.push({
      id: node.id,
      value: node.value,
      parent: parent === node.id ? null : parent
    });

    node.children &&
      node.children.forEach(n => {
        aNode(n, node.id);
      });
  })(n);

  return result;
}

function reAnalyzeNode(ary) {
  const o = {
    ...ary.splice(0, 1)[0],
    children: []
  };
  (function reANode(o) {
    const nodes = ary
      .filter(a => a.parent === o.id)
      .map(a => {
        return {
          children: [],
          ...a
        };
      });
    if (nodes.length) o.children.push(...nodes);

    o.children.forEach(c => reANode(c));
  })(o);
  return o;
}

console.log(
  analyzeNode(
    new Node({
      id: 'root',
      value: 'test',
      children: [
        {
          id: 'root2',
          value: 'test2',
          children: [
            {
              id: 'root3',
              value: 'test3'
            }
          ]
        },
        {
          id: 'root1',
          value: 'test1'
        }
      ]
    })
  )
);

console.log(
  JSON.stringify(
    reAnalazeNode([
      {
        id: 'root',
        value: 'test'
      },
      {
        id: 'root1',
        value: 'test1',
        parent: 'root'
      },
      {
        id: 'root2',
        value: 'test2',
        parent: 'root'
      },
      {
        id: 'root3',
        value: 'test3',
        parent: 'root2'
      }
    ]),
    null,
    2
  )
);

```