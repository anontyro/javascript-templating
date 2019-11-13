const REGEX_SELECTORS = {
  COMPLETE_COMPONENT_SELECTOR: new RegExp(/.*:.*/gm),
  CLASS_SELECTOR: new RegExp(/.*\sclass\[(.*)]:/),
  TAG_SELECTOR: new RegExp(/^(.*?)/gm),
};

const testHTML = `
  h1 class[standard my-main-header]: This is the header
  h2: Smaller header
  p: This is a paragraph : with some stuff
  h3: Smallerer header
`;

const componentMap = {
  h1: '<h1>{{value}}</h1>',
  h2: '<h2>{{value}}</h2>',
  h3: '<h3>{{value}}</h3>',
};

const addClasses = (selectedComponent, initComponentString) => {
  const classList = initComponentString.match(REGEX_SELECTORS.CLASS_SELECTOR);
  if (!classList || classList.length < 2) {
    return selectedComponent;
  }
  const classesArr = classList[1].split(' ');
  let finalClassString = `class=' `;
  classesArr.forEach(cls => (finalClassString = `${finalClassString} ${cls} `));
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

const getTags = (htmlString = testHTML, components = componentMap) => {
  const componentTypeMatcher = new RegExp(/^(.*?):/gm);
  const componentMatcher = new RegExp(/.*:.*/gm);
  const componentList = htmlString.match(componentMatcher);
  const componentListTypes = htmlString.match(componentTypeMatcher);
  let output = '';
  componentList.forEach(tag => {
    const splitByTag = new RegExp(/^(.*?):/);
    const onlyTag = new RegExp(/([A-Za-z0-9]){1,}/);
    const componentSplit = tag.trim().split(splitByTag);
    const foundTag = componentSplit[1].match(onlyTag)[0];
    let selectedComponent = componentMap[foundTag];
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
  domBody.innerHTML = `<h1>No App tag found in dom</h1>`;
};

const buildApp = (htmlString = testHTML, components = componentMap) => {
  const app = document.querySelector('.app');

  if (!app) {
    return buildNoAppError();
  }

  const template = getTags(htmlString, components);
  app.innerHTML = template;
};

buildApp();
