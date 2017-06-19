var Nav = React.createClass({

    editSearch(event) {
        var currentSearch = event.target.value;
        var newSearchNotes = this.props.notes.filter((note) => {
            var lwrSearch = currentSearch.toLowerCase();
            var lwrTitle = note.title.toLowerCase();
            var lwrContent = note.content.toLowerCase();
            return lwrTitle.indexOf(lwrSearch) != -1 || lwrContent.indexOf(lwrSearch) != -1;
        });
        this.props.editSearchStates(newSearchNotes);
    },
    render() {
        let id = 0;

        var notes = this.props.searchNotes.map((note) => {
            var firstLine = note.content;
            if(note.content != null) {
                firstLine = note.content.split('\n')[0];
                if (firstLine.length > 20) {
                    firstLine = firstLine.substring(0, 40) + "...";
                }
            }
            return (
                <li className={(note.id == this.props.currentNote.id ? 'active' : '')} key={note.id} onClick={() => this.props.openInEditor(note)}><div>
                    <div><strong>{note.title}</strong></div>
                    <p>{firstLine}</p>
                </div></li>
            )
        });
        return (
            <div>
                <div className="search-container">
                    <input onChange={this.editSearch} placeholder="Search"></input>
                    <button onClick={this.props.createNote}>+</button>
                </div>
                <ul className="scrollable-nav">
                    {notes}

                </ul>
            </div>
        )
    }
});