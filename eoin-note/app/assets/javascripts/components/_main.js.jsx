var Main = React.createClass({
    static: {
      initialContentVariantsMap: {
          0: "You should probably write something here.",
          1: "Good thing you have EoinNote.",
          2: "Eoin has got your back, start typing.",
          3: "Notes - my favourite part of the day",
          4: "Did you know EoinNote loves you?",
          5: "Hvis du er fra Norge, hallo!"
      }
    },
    getInitialState() {
        return { notes: [], currentNote: {content: "", title: ""}, searchNotes: [] }
    },
    componentWillMount() {
        $.getJSON('/api/v1/notes.json', (response) => {
            let sortedNewState = response.sort((a,b) => b.created_at - a.created_at);

            this.setState({
                notes: sortedNewState,
                currentNote: sortedNewState[0],
                searchNotes: sortedNewState
            })
        });

    },
    createNote: function(){
        var contentMapIndex = Math.floor(Math.random() * (5 - 0) + 0);
        console.log(contentMapIndex);
        var content  = this.static.initialContentVariantsMap[contentMapIndex];
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
    editSearchStates(newSearchNotes) {
        this.setState({
            searchNotes: newSearchNotes
        })
    },
    render() {
        return (
            <div className="row" style={{width: "100%"}}>
                <div className="nav-container">
                    <Nav openInEditor={this.openInEditor} createNote={this.createNote} notes={this.state.notes}
                         currentNote={this.state.currentNote} searchNotes={this.state.searchNotes} editSearchStates={this.editSearchStates} />
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