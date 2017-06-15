var Main = React.createClass({
    getInitialState() {
        return { notes: [], currentNote: {content: "", title: ""} }
    },
    componentWillMount() {
        $.getJSON('/api/v1/notes.json', (response) => {
            let sortedNewState = response.sort((a,b) => b.created_at - a.created_at);

            this.setState({
                notes: sortedNewState,
                currentNote: sortedNewState[0]
            })
        });

    },
    handleNew(note){
        var newState = this.state.notes.concat(note);
        let sortedNewState = newState.sort((a,b) => b.created_at - a.created_at);
        this.setState({ notes: sortedNewState });
    },
    openInEditor(note) {
        console.log("openInEditor: " + note.id);
        this.setState({
            currentNote: note
        })

    },
    updateNote(title, content){
        var editedNote = this.state.currentNote
        editedNote.title = title
        editedNote.content = content

        this.state.notes[this.state.currentNote.id] = editedNote


        this.setState({
            currentNote: editedNote
        })
    },
    render() {
        return (
            <div className="row">
                <div className="desktop-6 tablet-3 mobile-3">
                    <Nav openInEditor={this.openInEditor} handleNew={this.handleNew} notes={this.state.notes}/>
                </div>
                <div className="desktop-6 tablet-3 mobile-3">
                    <Editor updateNote={this.updateNote} currentNote={this.state.currentNote} />
                </div>
            </div>
        )
    }
});