import React, { Fragment, Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import PropTypes from 'prop-types';


export default class FormsEditor extends Component {
constructor(props){
	super(props);
	
}
	onEditorStateChange = editorState => {
		this.props.onChange(editorState)
	};

	render() {
		const { editorState } = this.props;

		return (
			<Fragment>
				<Editor
					editorState={editorState}
					wrapperClassName="demo-wrapper"
					editorClassName="demo-editor"
					onEditorStateChange={this.onEditorStateChange}
				/>
				<div className="divider my-4" />
				
			</Fragment>
		);
	};
}
FormsEditor.propTypes = {
	onChange:PropTypes.func, //was symbol
	editorState:PropTypes.shape({  //was string
		_immutable: PropTypes.objectOf(
			PropTypes.any
		),
		getAllowUndo: PropTypes.func,
		getBlockTree: PropTypes.func,
		getCurrentContent: PropTypes.func,
		getCurrentInLineStyle: PropTypes,
		getDecorator: PropTypes.func,
		getDirectionMap: PropTypes.func,
		getImmutable: PropTypes.func,
		getInLineStyleOverride: PropTypes.func,
		getLastChangeType: PropTypes.func,
		getNativelyRenderedContent: PropTypes.func,
		getRedoStack: PropTypes.func,
		getSelection: PropTypes.func,
		getUndoStack: PropTypes.func,
		isInCompositionMode: PropTypes.func,
		isSelectionAtEndOfContent: PropTypes.func,
		mustForceSelection: PropTypes.func,
		toJS: PropTypes.func,
	}),
}
