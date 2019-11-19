import anyTest, {TestInterface} from 'ava';
import {deepClone} from './generalUtils';
import {COMPONENT_MAP} from '../data/componentData';
import {addClasses, getTags} from './domCreateUtil';

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

test('getTags will return the correct values', t => {
  const testComponents = deepClone(COMPONENT_MAP);
  const testHtml = createTestHTML();
  const expected = `
<h1 class='standard my-main-header' > This is the new header</h1>
<h2> Smaller header</h2>
<p> This is a paragraph : with some stuff</p>
<h3> Smallerer header</h3>`;
  const tags = getTags(testHtml, testComponents);

  t.is(tags, expected);
});

test('getTags will return the correct values and ignore components on in map', t => {
  const testComponents = deepClone(COMPONENT_MAP);
  delete testComponents['p'];
  const testHtml = createTestHTML();
  const expected = `
<h1 class='standard my-main-header' > This is the new header</h1>
<h2> Smaller header</h2>
<h3> Smallerer header</h3>`;
  const tags = getTags(testHtml, testComponents);

  t.is(tags, expected);
});
