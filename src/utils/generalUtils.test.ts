import anyTest, {TestInterface} from 'ava';
import {deepClone} from './generalUtils';

const test = anyTest as TestInterface<{}>;

test('deepClone creates a new immutable object', t => {
  const test = {id: 1, name: 'test'};
  const item2 = deepClone(test);
  item2.id = 2;
  t.not(test.id, 2);
});

test('deepClone creates a new object which is equivalent not equal', t => {
  const test = {id: 1, name: 'test'};
  const item2 = deepClone(test);
  t.deepEqual(test, item2);
});

test('deepClone works for strings', t => {
  const test = 'this is a string';
  let item2 = deepClone(test);
  t.is(test, item2);
  item2 = 'second';
  t.not(test, item2);
});

test('deepClone works for numbers', t => {
  const test = 69;
  let item2 = deepClone(test);
  t.is(test, item2);
  item2 = 55;
  t.not(test, item2);
});
