import {COMPONENT_MAP} from './data/componentData';
import './styles/base.css';
import {getTags} from './utils/domCreateUtil';

const testHTML = `
  h1 class[standard my-main-header]: This is the new header 
  h2: Smaller header
  p: This is a paragraph : with some stuff
  h3: Smallerer header
`;

const buildNoAppError = () => {
  const domBody = document.querySelector('body');
  if (!domBody) {
    console.error('nothing in the dom :( :(');
    return;
  }
  domBody.innerHTML = `<h1>No App tag found in dom</h1>`;
};

const buildApp = (
  htmlString = testHTML,
  components = COMPONENT_MAP,
  appClass = '.app'
) => {
  const app = document.querySelector(appClass);

  if (!app) {
    return buildNoAppError();
  }

  const template = getTags(htmlString, components);
  app.innerHTML = template;
};

buildApp();
