var Editor = React.createClass({
    statics: {
        dayToStringMap: {
            0: 'Sunday',
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday'
        },
        monthToStringMap: {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December'
        }
    },
    onTitleChange(event){
        var title = event.target.value;
        this.props.updateNote(title, this.props.currentNote.content)
    },
    onContentChange(event){
        var content = event.target.value;
        this.props.updateNote(this.props.currentNote.title, content)
    },
    getStringDay: function(index){
        return Editor.dayToStringMap[index];
    },
    getStringMonth: function(index){
        return Editor.monthToStringMap[index];
    },
    render() {

        var date = new Date(this.props.currentNote.created_at);
        var dateString = this.getStringDay(date.getDay()) + " - " + this.getStringMonth(date.getMonth()) +
            " " + date.getDay() + " " + date.getFullYear() + " at " + (date.getUTCHours() - (date.getTimezoneOffset()/60)) + ":" + date.getUTCMinutes();

        return (
            <div>
                <div className="options-bar">
                    <div onClick={this.props.handleDelete} className="delete"><img src="https://maxcdn.icons8.com/Share/icon/Editing//delete1600.png"/></div>
                    <div className="date">{dateString}</div>
                </div>
                <input className="title-editor" onChange={this.onTitleChange} value={this.props.currentNote.title}></input>
                <textarea className="content-editor" onChange={this.onContentChange} value={this.props.currentNote.content}></textarea>
            </div>
        )
    }
});