var Main = React.createClass({
    render() {
        return (
            <div className="row">
                <div className="desktop-6 tablet-3 mobile-3">
                    <Nav />
                </div>
                <div className="desktop-6 tablet-3 mobile-3">
                    <Editor />
                </div>
            </div>
        )
    }
});