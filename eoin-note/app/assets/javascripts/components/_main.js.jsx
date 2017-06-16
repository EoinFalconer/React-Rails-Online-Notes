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
        this.setState({
            currentNote: note
        })

    },

    updateNote(title, content){
        var editedNote = this.state.currentNote
        editedNote.title = title
        editedNote.content = content

        this.state.notes[this.state.currentNote.id] = editedNote


        $.ajax({
            url: `/api/v1/notes/${this.state.currentNote.id}`,
            type: 'PUT',
            data: { note: this.state.currentNote },
            success: () => {
                this.setState({
                    currentNote: editedNote
                })
            }
        })
    },


    render() {
        return (
            <div className="row" style={{width: "100%"}}>
                <div className="nav-container">
                    <Nav openInEditor={this.openInEditor} handleNew={this.handleNew} notes={this.state.notes}/>
                </div>
                <div className="editor-container">
                    <Editor updateNote={this.updateNote} currentNote={this.state.currentNote} />
                </div>
            </div>
        )
    }
});