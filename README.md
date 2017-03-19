# redux-agents
Hook RxJS Observers to respond directly to changes in your Redux store

## Motivation
Reactive programming is a really good match for Redux. With `redux-observables` library you can turn your stream of actions into declarative rules to handle the side-effects of your app. Nevertheless, there are some cases where it's much easier to trigger side-effects observing the already "reduced" state, instead of having to handle several different actions to compute your rule's logic.

Example use cases:

- maintain FIFO list of values in the global state with a maximum of 20 items
- try to reconnect to the server once we have been offline for 5 minutes
- buffer server-side calls and trigger them all at once when the app is idle
- any complex state-machine workflow which requires to handle several different events (actions)

> We already have middleware to process the actions before they reach the reducer, lets also have a store enhancer to respond to changes after the reducer has applied the actions into the global state.

```
                State Changes

         +-----------------------+
 Agent   |                       |   Store
+--------v----+             +----+-------+
|             |             |            |
| Filter      |             |            |
| Debounce    |             | Reducers   |
| Map         |             |            |
|             |             |            |
+--------+----+             +----^-------+
         |                       |
         +-----------------------+

             Side-Effect Actions

```