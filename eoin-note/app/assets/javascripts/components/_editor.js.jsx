var Editor = React.createClass({

    getInitialState() {
        return {
            currentContent: "Initial",
            currentTitle: "Initial title"
        }
    },
    onChange: function() {

    },
    render() {
        return (
            <div>
                <input value={this.props.currentNote.title}></input>
                <textarea onChange={this.onChange} value={this.props.currentNote.content}></textarea>
            </div>
        )
    }
});