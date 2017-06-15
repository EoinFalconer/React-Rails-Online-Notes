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

                <h2>{this.state.currentTitle}</h2>
                <textarea onChange={this.onChange} value={this.state.currentTitle}></textarea>
            </div>
        )
    }
});