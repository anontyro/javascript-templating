export const REGEX_SELECTORS = {
  /**
   * Selects the complete line with the whole tag value
   */
  COMPLETE_COMPONENT_SELECTOR: new RegExp(/.*:.*/gm),
  /**
   * Looks for only the specific 'class' keyword and will
   * capture only the values found within the brackets
   */
  CLASS_SELECTOR: new RegExp(/.*\sclass\[(.*)]:/),
  /**
   * Only select the complete tag with no value segment present
   * basically everything before the :
   */
  TAG_SELECTOR: new RegExp(/^(.*?):/),
  /**
   * Selects just the specific tag name to be used to match the
   * key against the component map
   */
  TAG_SECTION_SELECTOR: new RegExp(/([A-Za-z0-9]){1,}/),
};
