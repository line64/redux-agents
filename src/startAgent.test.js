import expect from 'expect';

import { createStore } from 'redux';
import { startAgent } from './';

describe('startAgent()', () => {
  it('it should filter specific states and dispatch action', () => {
    const store = createStore((initialState, action) => ({ ...initialState, ...action }));

    const agent = observable => observable
      .filter(state => state.key === 'c')
      .map(state => ({ type: 'ANY', key: 'd', oldKey: state.key }));

    startAgent(store, agent);

    store.dispatch({ type: 'ANY', step1: true, key: 'a' });
    store.dispatch({ type: 'ANY', step2: true, key: 'b' });
    store.dispatch({ type: 'ANY', step3: true, key: 'c' });

    const finalState = store.getState();
    expect(finalState.key).toEqual('d');
    expect(finalState.oldKey).toEqual('c');
  });
});
