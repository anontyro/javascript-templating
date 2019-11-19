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
  let finalClassString = `class='`;
  classesArr.forEach(
    (cls: any) => (finalClassString = `${finalClassString}${cls} `)
  );
  finalClassString = finalClassString.trim() + `'`;
  const selectedComponentStart = selectedComponent.substring(
    0,
    selectedComponent.indexOf('>')
  );
  const selectedComponentEnd = selectedComponent.substring(
    selectedComponent.indexOf('>')
  );

  return `${selectedComponentStart} ${finalClassString} ${selectedComponentEnd}`;
};

const replacePlaceholderValue = (
  userComponent: string,
  replaceValue: string,
  placeholder: string = '{{value}}'
): string => userComponent.replace(placeholder, replaceValue);

const matchAvaliableComponents = (
  htmlString: string,
  componentMatcher = REGEX_SELECTORS.COMPLETE_COMPONENT_SELECTOR
): string[] => htmlString.match(componentMatcher) || [];

const splitTagIntoSections = (
  tag: string,
  splitByTag = REGEX_SELECTORS.TAG_SELECTOR
): {htmlTag: string; value: string} => {
  const componentSplit = tag.trim().split(splitByTag);
  if (!componentSplit || componentSplit.length < 2) {
    return {
      htmlTag: '',
      value: '',
    };
  }
  return {
    htmlTag: componentSplit[1],
    value: componentSplit[2],
  };
};

const mapComponentsToTags = (
  componentList: string[],
  components: any
): string => {
  let output = '';
  componentList.forEach(tag => {
    const onlyTag = REGEX_SELECTORS.TAG_SECTION_SELECTOR;

    const {htmlTag, value} = splitTagIntoSections(tag);
    const foundTag = htmlTag.match(onlyTag) || [];

    let selectedComponent: string = components[foundTag[0]];
    if (!selectedComponent) {
      return;
    }
    selectedComponent = addClasses(selectedComponent, tag);
    const finalComponent = replacePlaceholderValue(selectedComponent, value);

    output = output + '\n' + finalComponent;
    return;
  });
  return output;
};

export const getTags = (htmlString: string, components: any): string => {
  const componentList = matchAvaliableComponents(htmlString);

  return mapComponentsToTags(componentList, components);
};
