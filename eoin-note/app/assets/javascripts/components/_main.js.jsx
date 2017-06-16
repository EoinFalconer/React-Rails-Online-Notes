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
    createNote: function(){
        var content    = "No additional Text";
        var title = "New Note";
        $.ajax({
            url: '/api/v1/notes',
            type: 'POST',
            data: { note: { content: content, title: title } },
            success: (note) => {
                this.handleNew(note);
            }
        });

    },
    handleNew(note){
        var newState = this.state.notes.concat(note);
        let sortedNewState = newState.sort((a,b) => b.created_at - a.created_at);
        this.setState({
            notes: sortedNewState,
            currentNote: note
        });

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
    handleDelete() {

        var id = this.state.currentNote.id;
        console.log("to delete: " + id);
        $.ajax({
            url: `/api/v1/notes/${id}`,
            type: 'DELETE',
            success(response) {
                console.log("removeFromArray need to occur here")
            }
        });
        this.removeFromArray()
    },
    removeFromArray: function(){
        var id = this.state.notes.indexOf(this.state.currentNote);
        var newNotes = this.state.notes.filter((note) => {
           return note.id !=  this.state.currentNote.id;
        });
        this.setState({notes: newNotes});
        console.log("number of notes: " + this.state.notes.length);
        if(this.state.notes.length > 1) { //more than the one to be deleted
            var currNote = this.getNextNote(id)

            console.log("moving to: " + currNote.id);
            this.setState({currentNote: currNote})
        }else{
            console.log("")
            this.createNote()
        }
        console.log("number of notes2: " + this.state.notes);
    },
    render() {
        return (
            <div className="row" style={{width: "100%"}}>
                <div className="nav-container">
                    <Nav openInEditor={this.openInEditor} createNote={this.createNote} notes={this.state.notes} currentNote={this.state.currentNote} />
                </div>
                <div className="editor-container">
                    <Editor handleDelete={this.handleDelete} updateNote={this.updateNote} currentNote={this.state.currentNote} />
                </div>
            </div>
        )
    },
    getNextNote: function(id){
        var count = id+1;

            while (!this.state.notes[count]) {
                count++;
                console.log("count: " + count);
                if (count >= this.state.notes.length) {
                    count = 0;
                }
            }
            return this.state.notes[count]

    }
});