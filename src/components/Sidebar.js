import React, {Component} from 'react'

export default class Sidebar extends Component {
    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-3 col-lg-2">
                        <nav class="navbar navbar-default navbar-fixed-side">
                            {/* <!-- normal collapsible navbar markup --> */}
                        </nav>
                    </div>
                    <div class="col-sm-9 col-lg-10">
                    {/* <!-- your page content --> */}
                    something
                    </div>
                </div>
            </div>
        )
    }
}