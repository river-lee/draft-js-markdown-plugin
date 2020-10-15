draft-js-markdown-plugin
==================================
支持Drafjs中Mardkdown 语法快捷方式，这个插件可以工作在[DraftJS Plugins](https://github.com/draft-js-plugins/draft-js-plugins)一起工作。这个插件是从[`draft-js-markdown-shortcuts-plugin`](https://github.com/ngs/draft-js-markdown-shortcuts-plugin)和[`draft-js-markdown-plugin`](https://github.com/withspectrum/draft-js-markdown-plugin)分叉出来。[为什么不要fork这个插件](#why-fork-the-markdown-shortcuts-plugin)

![screen](screen.gif)

[View Demo][Demo]

## Installation

```sh
npm i --save draft-js-markdown-plugin
```

## Usage

```js
import React, { Component } from 'react';
import Editor from 'draft-js-plugins-editor';
import createMarkdownPlugin from 'draft-js-markdown-plugin';
import { EditorState } from 'draft-js';

export default class DemoEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    plugins: [createMarkdownPlugin()]
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        plugins={this.state.plugins}
      />
    );
  }
}
```

### 添加代码块高亮

Using the [`draft-js-prism-plugin`](https://github.com/withspectrum/draft-js-prism-plugin) you can easily add syntax highlighting support to your code blocks!

```JS
// Install prismjs and draft-js-prism-plugin
import Prism from 'prismjs';
import createPrismPlugin from 'draft-js-prism-plugin';

class Editor extends Component {
  state = {
    plugins: [
      // Add the Prism plugin to the plugins array 
      createPrismPlugin({
        prism: Prism
      }),
      createMarkdownPlugin()
    ]
  }
}
```

## Options

The `draft-js-markdown-plugin` is configurable. Just pass a config object. Here are the available options:

### `renderLanguageSelect`

```js
renderLanguageSelect = ({
  // Array of language options
  options: Array<{ label, value }>,
  // Callback to select an option
  onChange: (selectedValue: string) => void,
  // Value of selected option
  selectedValue: string,
  // Label of selected option
  selectedLabel: string
}) => React.Node
```

Code blocks render a select to switch syntax highlighting - `renderLanguageSelect` is a render function that lets you override how this is rendered. 

#### Example:

```
import createMarkdownPlugin from 'draft-js-markdown-plugin';

const renderLanguageSelect = ({ options, onChange, selectedValue }) => (
  <select value={selectedValue} onChange={onChange}>
    {options.map(({ label, value }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
);

const markdownPlugin = createMarkdownPlugin({ renderLanguageSelect })
```

### `languages`

Dictionary for languages available to code block switcher

#### Example:

```js
const languages = {
  js: 'JavaScript'
}

const markdownPlugin = createMarkdownPlugin({ languages })
```

### `features`

A list of enabled features, by default all features are turned on.

```js
features = {
  block: Array<string>,
  inline: Array<string>,
}
```

#### Example:

```js
// this will only enable BOLD for inline and CODE
// as well as header-one for blocks
const features = {
  inline: ['BOLD'],
  block: ['CODE', 'header-one'],
}
const plugin = createMarkdownPlugin({ features })
```

*Available Inline features*:

```js
[
  'BOLD',
  'ITALIC',
  'CODE',
  'STRIKETHROUGH',
  'LINK',
  'IMAGE'
]
```

*Available Block features*:

```js
import { CHECKABLE_LIST_ITEM } from "draft-js-checkable-list-item"
[
  'CODE',
  'header-one',
  'header-two',
  'header-three',
  'header-four',
  'header-five',
  'header-six',
  'ordered-list-item',
  'unordered-list-item',
  // CHECKABLE_LIST_ITEM is a constant from 'draft-js-checkable-list-item'
  // see import statementabove
  CHECKABLE_LIST_ITEM,
  'blockquote',
]
```

### `entityType`

To interoperate this plugin with other DraftJS plugins, i.e. [`draft-js-plugins`](https://github.com/draft-js-plugins/draft-js-plugins), you might need to customize the `LINK` and `IMAGE` entity type created by `draft-js-markdown-plugin`.

#### Example:

```js
import createMarkdownPlugin from "draft-js-markdown-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import createImagePlugin from "draft-js-image-plugin";

const entityType = {
  IMAGE: "IMAGE",
};

const focusPlugin = createFocusPlugin();
const imagePlugin = createImagePlugin({
  decorator: focusPlugin.decorator,
});
// For `draft-js-image-plugin` to work, the entity type of an image must be `IMAGE`.
const markdownPlugin = createMarkdownPlugin({ entityType });

const editorPlugins = [focusPlugin, imagePlugin, markdownPlugin];
```

## Why fork the `markdown-shortcuts-plugin`?
综合来说，`markdown-shortcuts-plugin`和`markdown-plugin`都非常不错，不过前者满足我基本功能外，但是样式部分没有内置和可配置。
与此同时，我们还需要基于这个项目为基础开发大量一些功能。所以在此基础上再次fork。   

差异点:
 - 支持`draftjs-editor-plugin` 3.x
 - 增加 index.d.ts 对typescript下使用更加友好
 - 内置codeblock样式，同时支持覆盖，让你组件更好看

## License

Licensed under the MIT license, Copyright Ⓒ 2017 Space Program Inc. This plugin is forked from the excellent [`draft-js-markdown-shortcuts-plugin`](https://github.com/ngs/draft-js-markdown-shortcuts-plugin) by [Atsushi Nagase](https://github.com/ngs).

See [LICENSE] for the full license text.

[Demo]: https://markdown-plugin.spectrum.chat/
[DraftJS]: https://facebook.github.io/draft-js/
[DraftJS Plugins]: https://github.com/draft-js-plugins/draft-js-plugins
[LICENSE]: ./LICENSE
[npm]: https://www.npmjs.com/package/draft-js-markdown-plugin
