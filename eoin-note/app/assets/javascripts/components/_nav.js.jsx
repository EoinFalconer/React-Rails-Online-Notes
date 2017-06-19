var Nav = React.createClass({

    getInitialState(){
      return{
          currentSearch: "",
          searchNotes: []
      }
    },
    componentWillMount() {
        $.getJSON('/api/v1/notes.json', (response) => {
            let sortedNewState = response.sort((a,b) => b.created_at - a.created_at);
            this.setState({
                searchNotes: sortedNewState
            })
        });
    },
    editSearch() {
        var newSearchNotes = this.props.notes.filter((note) => {
            var lwrSearch = this.state.currentSearch.toLowerCase();
            var lwrTitle = note.title.toLowerCase();
            var lwrContent = note.content.toLowerCase();
            return lwrTitle.indexOf(lwrSearch) != -1 || lwrContent.indexOf(lwrSearch) != -1;
        });
        this.setState({
            searchNotes: newSearchNotes
        })
    },
    getSearch(event) {
        if(event.target.value == ""){
            this.setState({
                searchNotes: this.props.notes
            })
        }else {
            this.setState({
                currentSearch: event.target.value
            })
            this.editSearch()
        }
    },
  /*  componentWillReceiveProps(nextProps){
        this.endSearch()
    },*/


    render() {
        let id = 0;

        var notes = this.state.searchNotes.map((note) => {
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
                    <input  onChange={this.getSearch} placeholder="Search"></input>
                    <button onClick={this.props.createNote}>+</button>
                </div>
                <ul className="scrollable-nav">
                    {notes}
                </ul>
            </div>
        )
    }
});