import Rx from 'rx-lite';

export default (store, agent) => {
  const observable = Rx.Observable.create((observer) => {
    store.subscribe(() => observer.next(store.getState()));
  });

  agent(observable).subscribe(action => store.dispatch(action));
};
