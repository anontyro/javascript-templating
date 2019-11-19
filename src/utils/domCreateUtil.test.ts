import anyTest, {TestInterface} from 'ava';
import {deepClone} from './generalUtils';
import {COMPONENT_MAP} from '../data/componentData';
import {addClasses} from './domCreateUtil';

const test = anyTest as TestInterface<{}>;

const createTestHTML = (): string => {
  const testData = `
  h1 class[standard my-main-header]: This is the new header 
  h2: Smaller header
  p: This is a paragraph : with some stuff
  h3: Smallerer header
`;
  return testData;
};

test('addClasses will sub in a new class correctly', t => {
  const testComponent = deepClone(COMPONENT_MAP.h1);
  const testTag = 'h1 class[standard]: the test stuff';
  const output = addClasses(testComponent, testTag);
  t.is(output, "<h1 class='standard' >{{value}}</h1>");
});

test('addClasses will sub in a new classes correctly', t => {
  const testComponent = deepClone(COMPONENT_MAP.h1);
  const testTag =
    'h1 class[standard my-main another-class something-classy]: the test stuff';
  const output = addClasses(testComponent, testTag);
  t.is(
    output,
    "<h1 class='standard my-main another-class something-classy' >{{value}}</h1>"
  );
});

test('addClasses will return correctly when no class(es) are present', t => {
  const testComponent = deepClone(COMPONENT_MAP.h1);
  const testTag = 'h1: the test stuff';
  const output = addClasses(testComponent, testTag);
  t.is(output, '<h1>{{value}}</h1>');
});
