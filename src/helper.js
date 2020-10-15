export function inLink(editorState) {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(selection.getAnchorKey());
  const entityKey = block.getEntityAt(selection.getFocusOffset());
  return (
    entityKey != null && contentState.getEntity(entityKey).getType() === 'LINK'
  );
}

export function inCodeBlock(editorState) {
  const startKey = editorState.getSelection().getStartKey();
  if (startKey) {
    const currentBlockType = editorState
      .getCurrentContent()
      .getBlockForKey(startKey)
      .getType();
    if (currentBlockType === 'code-block') return true;
  }

  return false;
}
