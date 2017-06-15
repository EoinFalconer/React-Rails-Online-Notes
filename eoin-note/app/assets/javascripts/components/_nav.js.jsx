var Nav = React.createClass({

    getInitialState() {
        return { notes: [] }
    },
    componentDidMount() {
        $.getJSON('/api/v1/notes.json', (response) => { console.log(response); this.setState({ notes: response }) });
    },
    render() {

        var notes = this.state.notes.map((note) => {
            return (
                <div>
                    <h2>{note.title}</h2>
                    <p>{note.content}</p>
                </div>
            )
        });
        return (
            <div>
                <h1>{notes}</h1>
            </div>
        )
    }
});