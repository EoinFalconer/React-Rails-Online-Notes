var Editor = React.createClass({

    onTitleChange(event){
        var title = event.target.value;
        this.props.updateNote(title, this.props.currentNote.content)
    },
    onContentChange(event){
        var content = event.target.value;
        this.props.updateNote(this.props.currentNote.title, content)
    },
    handleDelete() {
        var id = this.props.currentNote.id;
        $.ajax({
            url: `/api/v1/notes/${id}`,
            type: 'DELETE',
            success() {
                this.props.handleArrayRemove()
            }
        });
    },
    render() {
        return (
            <div>
                <div className="options-bar">
                    <div onClick={this.handleDelete} className="delete">Delete</div>
                    <div className="date">{this.props.currentNote.created_at}</div>
                </div>
                <input className="title-editor" onChange={this.onTitleChange} value={this.props.currentNote.title}></input>
                <textarea className="content-editor" onChange={this.onContentChange} value={this.props.currentNote.content}></textarea>
            </div>
        )
    }
});