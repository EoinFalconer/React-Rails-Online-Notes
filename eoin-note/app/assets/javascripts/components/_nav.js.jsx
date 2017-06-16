var Nav = React.createClass({



    render() {
        let id = 0;
        var notes = this.props.notes.map((note) => {

            var firstLine = note.content.split('\n')[0];
            if(firstLine.length > 20){
                firstLine = firstLine.substring(0,20) + "...";
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
                    <input value="Search"></input>
                    <button onClick={this.props.createNote}>+</button>
                </div>
                <ul className="scrollable-nav">
                    {notes}

                </ul>
            </div>
        )
    }
});