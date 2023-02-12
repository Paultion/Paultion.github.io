---
title: fiber
---

``````JS
 /*
    深度优先遍历，存储当前渲染的节点，等待浏览器空闲时再执行
*/

      const element = {
        type: 'div',
        props: {
          id: 'A1',
          children: [
            {
              type: 'div',
              props: {
                id: 'B1',
                children: [
                  {
                    type: 'div',
                    props: {
                      id: 'C1'
                    }
                  },
                  {
                    type: 'div',
                    props: {
                      id: 'C2'
                    }
                  }
                ]
              }
            },
            {
              type: 'div',
              props: {
                id: 'B2'
              }
            }
          ]
        }
      };

      // 获取根节点
      let container = document.getElementById('root');
      // 插入
      const PLACEMENT = 'PLACEMENT';

      // 根节点深度优先遍历
      let workInProgressRoot = {
        stateNode: container, // 此fiber对应的DOM节点
        props: { children: [element] } // fiber的属性
      };

      //把赋给下一个工作单元
      let nextUnitOfWork = workInProgressRoot;

      // 工作循环 —— 渲染DOM
      function workLoop(deadline) {
        //如果有当前的工作单元,就执行它,并返回一个工作单元
        console.log(nextUnitOfWork);
        while (nextUnitOfWork) {
          nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        }
        // 如果没有剩余工作单元则挂载元素
        !nextUnitOfWork && commitRoot();
      }

      /**
       * beginWork  1.创建此fiber的真实DOM 通过虚拟DOM创建fiber树结构
       * @param {*} workingInProgressFiber
       */
      function performUnitOfWork(workingInProgressFiber) {
        // 1创建真实DOM,并没有挂载 2.创建fiber子树
        beginWork(workingInProgressFiber);
        if (workingInProgressFiber.child) {
          // 如果有儿子,返回儿子
          return workingInProgressFiber.child;
        }
        while (workingInProgressFiber) {
          // 如果没有儿子当前节点其实就结束完成了
          completeUnitOfWork(workingInProgressFiber);
          //如果有弟弟,返回弟弟
          if (workingInProgressFiber.sibling) {
            return workingInProgressFiber.sibling;
          }
          workingInProgressFiber = workingInProgressFiber.return; //先指向父亲
        }
      }
      /**
       * 1创建真实DOM不进行挂载
       * 2.创建fiber子树
       * @params {*} workingInProgressFiber 当前工作单元
       */
      function beginWork(workingInProgressFiber) {
        // 判断是否为root根元素
        if (!workingInProgressFiber.stateNode) {
          // 创建dom节点,并赋值给当前工作单元,为渲染做铺垫
          workingInProgressFiber.stateNode = document.createElement(workingInProgressFiber.type);
          // dom属性赋值
          Object.keys(workingInProgressFiber.props)
            .filter(item => item !== 'children')
            .forEach(key => {
              workingInProgressFiber.stateNode[key] = workingInProgressFiber.props[key];
            });
        }
        //创建子fiber
        let previousFiber;
        //children是一个虚拟DOM的数组
        if (workingInProgressFiber.props.children instanceof Array) {
          workingInProgressFiber.props.children.forEach((child, index) => {
            let childFiber = {
              type: child.type, // DOM节点类型div p
              props: child.props, // 当前节点所有属性
              return: workingInProgressFiber, // 当前节点对应的父节点
              effectTag: 'PLACEMENT', // 表示此元素需要渲染
              nextEffect: null // 下一个有副作用的节点
            };
            /**
             * root - A1 - B1 - B2 - C1 - C2
             * root: { child: A1 }
             * A1 : { child: B1 }
             * B1 : { child: C1, sibling: B2 }
             * C1 : { sibling: C2 }
             */
            if (index === 0) {
              workingInProgressFiber.child = childFiber;
            } else {
              previousFiber.sibling = childFiber;
            }
            previousFiber = childFiber;
          });
        }
      }
      /**
       * 这个方法最好 从最开始打开debugger调试,多看看 ---> 倒链式
       * C1 -> C2 -> B1 -> B2 -> A1
       */
      function completeUnitOfWork(workingInProgressFiber) {
        /**
         * returnFiber -> B1 -> A1
         * swich(workingInProgressFiber){
         *  case C1:
         *    returnFiber: B1 :{firstEffect: C1,lastEffect: C1}
         *    break;
         *  case C2:
         *    returnFiber: B1 :{firstEffect: C1,lastEffect: C2}  C1: {nextEffect: C2}
         *    break;
         *  case B1:
         *    returnFiber: A1 :{firstEffect: C1,lastEffect: B1}  C2: {nextEffect: B1}
         *    break;
         *  case B2:
         *    returnFiber: A1 :{firstEffect: C1,lastEffect: B2}  B1: {nextEffect: B2}
         *    break;
         *  case A1:
         *    returnFiber: root :{firstEffect: C1,lastEffect: A1} B2: {nextEfffect: A1}
         *    break;
         * }
         * 得出渲染流程 C1 nextEfffect -> C2 nextEfffect -> B1 nextEfffect -> B2 nextEfffect -> A1 nextEfffect -> root
         */
        let returnFiber = workingInProgressFiber.return;
        if (returnFiber) {
          //把当前fiber的有副作用子链表挂载到父亲身上
          if (!returnFiber.firstEffect) {
            returnFiber.firstEffect = workingInProgressFiber.firstEffect;
          }
          if (workingInProgressFiber.lastEffect) {
            if (returnFiber.lastEffect) {
              returnFiber.lastEffect.nextEffect = workingInProgressFiber.firstEffect;
            }
            returnFiber.lastEffect = workingInProgressFiber.lastEffect;
          }
          //再把自己挂到后面
          if (workingInProgressFiber.effectTag) {
            if (returnFiber.lastEffect) {
              returnFiber.lastEffect.nextEffect = workingInProgressFiber;
            } else {
              returnFiber.firstEffect = workingInProgressFiber;
            }
            returnFiber.lastEffect = workingInProgressFiber;
          }
        }
      }
      // 挂载DOM
      function commitRoot() {
        let currentFiber = workInProgressRoot.firstEffect;
        while (currentFiber) {
          // 只要是待插入的节点都直接插入父级元素
          currentFiber.effectTag === 'PLACEMENT' && currentFiber.return.stateNode.appendChild(currentFiber.stateNode);
          currentFiber = currentFiber.nextEffect;
        }
        // 清dom缓存
        workInProgressRoot = null;
      }

      //告诉浏览器在空闲的时间行workLoop
      requestIdleCallback(workLoop);
```