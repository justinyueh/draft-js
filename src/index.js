import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils,ContentState, convertToRaw, convertFromHTML} from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
  }

  onChange = (editorState) => {
    this.setState({editorState});
  }

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      // return 'handled';
    }
    // return 'not-handled';
  }

  getEditorState = () => {
    const { editorState } = this.state;
    const currentContent = editorState.getCurrentContent();
    console.log(JSON.stringify(convertToRaw(currentContent), null, 2));
  }

  convertFromHTML = () => {
    const sampleMarkup =
    '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
    '<a href="http://www.facebook.com">Example link</a>';
  
    const blocksFromHTML = convertFromHTML(sampleMarkup);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    
    this.setState({
      editorState: EditorState.createWithContent(state),
    });  
  }

  render() {
    return (
      <Fragment>
        <button onClick={this.convertFromHTML}>convertFromHTML</button>
        <button onClick={this.getEditorState}>getEditorState</button>
        <button onClick={this.onBoldClick}>Bold</button>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
        />
      </Fragment>
    );
  }
}

ReactDOM.render(
  <MyEditor />,
  document.getElementById('container')
);
