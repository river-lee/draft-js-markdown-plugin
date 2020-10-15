import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import { EditorState, EditorBlock, Modifier } from 'draft-js';
import enhanceWithClickOutside from 'react-click-outside';

const alias = {
  javascript: 'js',
  jsx: 'js',
};

const defaultRenderSelect = ({ options, onChange, selectedValue }) => (
  <select
    value={selectedValue}
    onChange={ev => {
      onChange(ev.currentTarget.value);
    }}
  >
    {options.map(({ label, value }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
);

const defaultLanguages = {
  '': '无',
  bash: 'Bash',
  c: 'C',
  cpp: 'C++',
  css: 'CSS',
  go: 'Go',
  html: 'HTML',
  java: 'Java',
  js: 'JavaScript',
  kotlin: 'Kotlin',
  mathml: 'MathML',
  perl: 'Perl',
  ruby: 'Ruby',
  scala: 'Scala',
  sql: 'SQL',
  svg: 'SVG',
  swift: 'Swift',
};

const CodeSwitchContainer = enhanceWithClickOutside(
  class SwitchContainer extends PureComponent {
    handleClickOutside() {
      this.props.onClickOutside();
    }

    render() {
      return (
        <div contentEditable={false} onClick={this.props.onClick}>
          {this.props.children}
        </div>
      );
    }
  },
);

class CodeBlock extends PureComponent {
  state = {
    isOpen: false,
  };

  onChange = value => {
    // ev.preventDefault();
    // ev.stopPropagation();
    const blockKey = this.props.block.getKey();
    const {
      getEditorState,
      setReadOnly,
      setEditorState,
    } = this.props.blockProps;

    const editorState = getEditorState();
    const selection = editorState.getSelection();
    const language = value;
    const blockSelection = selection.merge({
      anchorKey: blockKey,
      focusKey: blockKey,
    });

    this.setState({ isOpen: false });

    let content = editorState.getCurrentContent();
    content = Modifier.mergeBlockData(
      content,
      blockSelection,
      Map({ language }),
    );
    setReadOnly(false);

    const newEditorState = EditorState.push(
      editorState,
      content,
      'change-block-data',
    );

    setEditorState(EditorState.forceSelection(newEditorState, selection));
  };

  cancelClicks = event => event.preventDefault();

  onSelectClick = event => {
    this.setState({ isOpen: true });
    const { setReadOnly } = this.props.blockProps;
    event.stopPropagation();
    setReadOnly(true);
    this.setState({
      isOpen: true,
    });
  };

  onClickOutside = () => {
    if (this.state.isOpen === false) return;
    this.setState({
      isOpen: false,
    });
    const {
      getEditorState,
      setReadOnly,
      setEditorState,
    } = this.props.blockProps;

    setReadOnly(false);

    this.setState({ isOpen: false });

    const editorState = getEditorState();
    const selection = editorState.getSelection();

    setEditorState(EditorState.forceSelection(editorState, selection));
  };

  render() {
    const {
      languages = defaultLanguages,
      renderLanguageSelect = defaultRenderSelect,
      getReadOnly,
      language: _language = '',
    } = this.props.blockProps;

    const language = alias[_language] || _language;
    const selectedLabel = languages[language];
    const selectedValue = language;

    const options = Object.keys(languages).reduce(
      (acc, val) => [
        ...acc,
        {
          label: languages[val],
          value: val,
        },
      ],
      [],
    );

    return (
      <div className="codeblock-wrapper" style={{ margin: '5px 0' }}>
        {!getReadOnly() && (
          <div
            className="codeblock-header"
            style={{
              border: '1px solid #e8e8e8',
              borderBottom: 'none',
              padding: '5px 16px',
              borderRadius: 2,
            }}
          >
            <CodeSwitchContainer
              onClickOutside={this.onClickOutside}
              onClick={this.onSelectClick}
            >
              {renderLanguageSelect({
                selectedLabel,
                selectedValue,
                onChange: this.onChange,
                options,
              })}
            </CodeSwitchContainer>
          </div>
        )}
        <div
          className="codeblock-body"
          style={{
            background: '#f9f9f9',
            border: '1px solid #e8e8e8',
            borderRadius: 2,
            padding: 16,
          }}
        >
          <EditorBlock {...this.props} />
        </div>
      </div>
    );
  }
}

export default CodeBlock;
