---
title: setState
---

```html
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      const batchingStrategy = {
        isBatchingUpdates: false,
        dirtyComponent: [],
        batchingUpdates() {
          this.dirtyComponent.forEach(component => component.updateComponent());
        },
      };

      class Transaction {
        constructor(wrappers) {
          this.wrappers = wrappers;
        }
        perform(method) {
          this.wrappers.forEach(wrapper => wrapper.initialize());
          method.call();
          this.wrappers.forEach(wrapper => wrapper.close());
        }
      }

      const transaction = new Transaction([
        {
          initialize() {
            batchingStrategy.isBatchingUpdates = true;
          },
          close() {
            batchingStrategy.isBatchingUpdates = false;
            batchingStrategy.batchingUpdates();
          },
        },
      ]);

      class Updater {
        constructor(component) {
          this.component = component;
          this.pendingStates = [];
        }

        addState(partialState) {
          this.pendingStates.push(partialState);
          if (batchingStrategy.isBatchingUpdates) {
            batchingStrategy.dirtyComponent.push(this.component);
          } else {
            this.component.updateComponent();
          }
        }
      }

      window.trigger = function (event, method) {
        const component = event.target.component;
        transaction.perform(component[method].bind(component));
      };

      class Component {
        constructor(props) {
          this.props = props;
          this.$updater = new Updater(this);
        }

        setState(partialState) {
          this.$updater.addState(partialState);
        }

        updateComponent() {
          this.$updater.pendingStates.forEach(state =>
            Object.assign(this.state, state)
          );
          this.$updater.pendingStates.length = 0;

          const oldElement = this.domElement;
          console.log(oldElement);
          const newElement = this.createDOMFromDOMString();
          oldElement.parentElement.replaceChild(newElement, oldElement);
        }

        createDOMFromDOMString() {
          const domString = this.render();
          const div = document.createElement('div');
          div.innerHTML = domString;
          this.domElement = div.children[0];
          this.domElement.component = this;
          return this.domElement;
        }

        mount(container) {
          container.appendChild(this.createDOMFromDOMString());
        }
      }

      class Counter extends Component {
        constructor(props) {
          super(props);
          this.state = { number: 0 };
        }

        add() {
          this.setState({ number: this.state.number + 1 });
          console.log(this.state); //0
          this.setState({ number: this.state.number + 1 });
          console.log(this.state); //0
          setTimeout(() => {
            this.setState({ number: this.state.number + 1 });
            console.log(this.state); //5
            this.setState({ number: this.state.number + 1 });
            console.log(this.state); //9
          }, 1000);
        }
        render() {
          return `<button onclick="trigger(event,'add')">
                        ${this.props.name}:${this.state.number}
                        </button>`;
        }
      }
      new Counter({ name: 'Paultion' }).mount(document.getElementById('root'));
    </script>
  </body>
</html>
```
