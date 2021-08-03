export const $ = ({ selector, parent = document }) =>
  parent.querySelector(selector);

export const $$ = selectors => document.querySelectorAll(selectors);
