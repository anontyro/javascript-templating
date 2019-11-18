import {REGEX_SELECTORS} from '../data/regex';

export const addClasses = (
  selectedComponent: any,
  initComponentString: any
): string => {
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

export const getTags = (htmlString: string, components: any): string => {
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
