var Nav = React.createClass({

    getInitialState() {
        return { notes: [] }
    },

    componentDidMount() {
        $.getJSON('/api/v1/notes.json', (response) => { console.log(response); this.setState({ notes: response }) });
    },
    handleClick: function(){
        console.log("in handleNewNote");
        var content    = "No additional Text";
        var title = "New Note";
        var lastEdited = new Date();
        $.ajax({
            url: '/api/v1/notes',
            type: 'POST',
            data: { note: { content: content, title: title, lastEdited: lastEdited } },
            success: (note) => {
               var newState = this.state.notes.concat(note);
               this.setState({ notes: newState });
            }
        });

    },

    render() {
        let id = 0;
        var notes = this.state.notes.map((note) => {

            var firstLine = note.content.split('\n')[0];
            if(firstLine.length > 20){
                firstLine = firstLine.substring(0,20) + "...";
            }
            return (
                <div key={note.id}>
                    <p>{note.lastEdited}</p>
                    <h2>{note.title}</h2>
                    <p>{firstLine}</p>
                </div>
            )
        });
        return (
            <div>
                <button onClick={this.handleClick}>New Note</button>
                <ul>
                    <li>{notes}</li>
                </ul>
            </div>
        )
    }
});