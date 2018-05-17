import { configure } from '@storybook/react';

const stories = require.context('../src', true, /\.story\.js$/);

function loadStories() {
  stories.keys().forEach(filename => stories(filename));
}

configure(loadStories, module);
