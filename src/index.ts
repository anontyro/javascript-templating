import {COMPONENT_MAP} from './data/componentData';
import './styles/base.css';

const REGEX_SELECTORS = {
  COMPLETE_COMPONENT_SELECTOR: new RegExp(/.*:.*/gm),
  CLASS_SELECTOR: new RegExp(/.*\sclass\[(.*)]:/),
  TAG_SELECTOR: new RegExp(/^(.*?)/gm),
};

const testHTML = `
  h1 class[standard my-main-header]: This is the new header 
  h2: Smaller header
  p: This is a paragraph : with some stuff
  h3: Smallerer header
`;

const addClasses = (selectedComponent: any, initComponentString: any) => {
  const classList = initComponentString.match(REGEX_SELECTORS.CLASS_SELECTOR);
  if (!classList || classList.length < 2) {
    return selectedComponent;
  }
  const classesArr = classList[1].split(' ');
  let finalClassString = `class=' `;
  classesArr.forEach(
    (cls: any) => (finalClassString = `${finalClassString} ${cls} `)
  );
  finalClassString = finalClassString + `'`;
  const selectedComponentStart = selectedComponent.substring(
    0,
    selectedComponent.indexOf('>')
  );
  const selectedComponentEnd = selectedComponent.substring(
    selectedComponent.indexOf('>')
  );

  return `${selectedComponentStart} ${finalClassString} ${selectedComponentEnd}`;
};

const getTags = (htmlString = testHTML, components: any = COMPONENT_MAP) => {
  const componentTypeMatcher = new RegExp(/^(.*?):/gm);
  const componentMatcher = new RegExp(/.*:.*/gm);
  const componentList = htmlString.match(componentMatcher) || [];
  const componentListTypes = htmlString.match(componentTypeMatcher);
  let output = '';
  componentList.forEach(tag => {
    const splitByTag = new RegExp(/^(.*?):/);
    const onlyTag = new RegExp(/([A-Za-z0-9]){1,}/);
    const componentSplit = tag.trim().split(splitByTag);
    if (!componentSplit || componentSplit.length < 2) {
      return;
    }
    const foundTag = (componentSplit[1] || '').match(onlyTag);
    if (!foundTag) {
      return;
    }
    let selectedComponent = components[foundTag[0]];
    if (!selectedComponent) {
      return;
    }
    selectedComponent = addClasses(selectedComponent, tag);
    const finalComponent = selectedComponent.replace(
      '{{value}}',
      componentSplit[2]
    );

    output = output + '\n' + finalComponent;
    return;
  });

  return output;
};

const buildNoAppError = () => {
  const domBody = document.querySelector('body');
  if (!domBody) {
    console.error('nothing in the dom :( :(');
    return;
  }
  domBody.innerHTML = `<h1>No App tag found in dom</h1>`;
};

const buildApp = (htmlString = testHTML, components = COMPONENT_MAP) => {
  const app = document.querySelector('.app');

  if (!app) {
    return buildNoAppError();
  }

  const template = getTags(htmlString, components);
  app.innerHTML = template;
};

buildApp();
