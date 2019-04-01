import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col} from 'reactstrap';
import classnames from 'classnames';
import NotebookList from '../notebook/NotebookList';
import {fqClick} from '../../actions/dataDomains';
import QueryPage from '../query/QueryPage';

export default class LeftNav extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: 1,
        };
    }
    toggle(tab) {
        if (this.state.activeTab !== tab){
            this.setState({activeTab: tab})
        }
    }

    render() {
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({active: this.state.activeTab === '1'})}
                            onClick={()=>{this.toggle('1');}}
                        > Workflows </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({active: this.state.activeTab === '2'})}
                            onClick={()=>{this.toggle('2');}}
                        > Data Sources </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <NotebookList />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      {/* <App /> */}
                      {/* <QueryPage /> */}
                     </TabPane>
                </TabContent>
            </div>
        );
    }
}