import React from 'react';
import { EditorPlugin } from 'draft-js-plugins-editor';

export interface RenderLanguageSelectOption {
  // Array of language options
  options: Array<{ label: string; value: string }>;
  // Callback to select an option
  onChange: (selectedValue: string) => void;
  // Value of selected option
  selectedValue: string;
  // Label of selected option
  selectedLabel: string;
}

export interface MarkdownPluginConfig {
  renderLanguageSelect?: (
    options: RenderLanguageSelectOption,
  ) => React.ReactComponentElement<any>;
  languages?: {};
  features?: {};
  entityType?: {};
}
export type MarkdownPlugin = EditorPlugin;

declare const createMarkdownPlugin: (
  config?: MarkdownPluginConfig,
) => MarkdownPlugin;

export default createMarkdownPlugin;
