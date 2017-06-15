var Editor = React.createClass({

    onTitleChange(event){
        var title = event.target.value;
        this.props.updateNote(title, this.props.currentNote.content)
    },
    onContentChange(event){
        var content = event.target.value;
        this.props.updateNote(this.props.currentNote.title, content)
    },
    render() {
        return (
            <div>
                <input onChange={this.onTitleChange} value={this.props.currentNote.title}></input>
                <textarea onChange={this.onContentChange} value={this.props.currentNote.content}></textarea>
            </div>
        )
    }
});