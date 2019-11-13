const testHTML = `
  h1: This is the header
  h2: Smaller header
  p: This is a paragraph : with some stuff
  h3: Smallerer header
`;

const componentMap = {
  h1: "<h1>{{value}}</h1>",
  h2: "<h2>{{value}}</h2>",
  h3: "<h3>{{value}}</h3>"
};

const getTags = (htmlString = testHTML, components = componentMap) => {
  const componentTypeMatcher = new RegExp(/^(.*?):/gm);
  const componentMatcher = new RegExp(/.*:.*/gm);
  const componentList = htmlString.match(componentMatcher);
  const componentListTypes = htmlString.match(componentTypeMatcher);
  let output = "";
  componentList.forEach(tag => {
    const splitByTag = new RegExp(/^(.*?):/);
    const componentSplit = tag.trim().split(splitByTag);
    const selectedComponent = componentMap[componentSplit[1]];
    if (!selectedComponent) {
      return;
    }
    const finalComponent = selectedComponent.replace(
      "{{value}}",
      componentSplit[2]
    );
    output = output + "\n" + finalComponent;
    return;
  });

  return output;
};

const buildNoAppError = () => {
  const domBody = document.querySelector("body");
  domBody.innerHTML = `<h1>No App tag found in dom</h1>`;
};

const buildApp = (htmlString = testHTML, components = componentMap) => {
  const app = document.querySelector(".app");

  if (!app) {
    return buildNoAppError();
  }

  const template = getTags(htmlString, components);
  app.innerHTML = template;
};

buildApp();
