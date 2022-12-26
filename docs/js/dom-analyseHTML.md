---
title: 解析DOM
group: 
  title: dom
---

```html
<html>
  <head></head>
  <body>
    <div style="display: flex; align-items: center; justify-content: center; width: 100px; height: 100px">
      <span>test</span>
    </div>
    <div>
      <span>
        <a></a>
      </span>
      <span>1</span>
      <span>2</span>
    </div>
    <script>
      /* function AnlyseHtml() {
          const htmlNode = document.documentElement;
          let maxTreeDepth = 0, maxChildrenCount = 0,totalElementCount = 0;

          function nodeAnalyse(node) {
              const childNodes = node.children;
              const nodesLength = childNodes.length;
              if (!childNodes || !nodesLength) return 1;

              maxChildrenCount = nodesLength > maxChildrenCount ? nodesLength : maxChildrenCount;
              totalElementCount += nodesLength;

              const depth = [...childNodes].map(n => nodeAnalyse(n));
              return 1 + Math.max(...depth);
          };
          maxTreeDepth = nodeAnalyse(htmlNode);
          return {
              maxTreeDepth, maxChildrenCount, totalElementCount
          }
      }
      console.log(AnlyseHtml()) */

      /* function AnalyseHTML() {
        const root = document.documentElement;
        function exec(node) {
          const childNodes = node.children;
          if (!childNodes || !childNodes.length) return 1;

          const depths = [...childNodes].map(childNode => exec(childNode));
          console.log(depths);
          return Math.max(...depths) + 1;
        }
        return exec(root);
      }
      console.log(AnalyseHTML()); */

      const maxCountTagName = (() => {
        let tagMap = {},
          root = document.documentElement,
          min = 1;
        console.log(root);

        function calcTagName(node) {
          tagMap[node.tagName] = tagMap[node.tagName] ? tagMap[node.tagName] + 1 : 1;
          node.children && [...node.children].forEach(n => calcTagName(n));
        }
        calcTagName(root);
        return Object.keys(tagMap).reduce((memo, tagName) => {
          if (tagMap[tagName] >= min) {
            memo = tagName;
            min = tagMap[tagName];
          }
          return memo;
        }, '');
      })();
      console.log(maxCountTagName);
    </script>
  </body>
</html>
```
