var Nav = React.createClass({

    handleClick: function(){
        var content    = "No additional Text";
        var title = "New Note";
        $.ajax({
            url: '/api/v1/notes',
            type: 'POST',
            data: { note: { content: content, title: title } },
            success: (note) => {
                this.props.handleNew(note);
            }
        });

    },

    render() {
        let id = 0;
        var notes = this.props.notes.map((note) => {

            var firstLine = note.content.split('\n')[0];
            if(firstLine.length > 20){
                firstLine = firstLine.substring(0,20) + "...";
            }
            return (
                <li key={note.id} onClick={() => this.props.openInEditor(note)}><div>
                    <p><strong>{note.title}</strong></p>
                    <p>{firstLine}</p>
                    <div className="date">{note.updated_at}</div>
                </div></li>
            )
        });
        return (
            <div>
                <div className="search-container">
                    <input value="Search"></input>
                    <button onClick={this.handleClick}>New Note</button>
                </div>
                <ul className="scrollable-nav">
                    {notes}
                </ul>
            </div>
        )
    }
});