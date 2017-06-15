var Editor = React.createClass({

    getDefaultProps() {
        return {
            currentContent: "Here is the currentContent",
            currentTitle: "Here is the currentTitle"
        }
    },
    render() {
        return (
            <div>
                <h2>{this.props.currentTitle}</h2>
                <textarea>{this.props.currentContent}</textarea>
            </div>
        )
    }
});