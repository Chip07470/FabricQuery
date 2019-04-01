import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {fade} from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ReorderIcon from '@material-ui/icons/Reorder';
import {Link} from 'react-router-dom';

import QueryPage from '../query/QueryPage';
import Login from '../auth/LoginPage';
import Workflows from '../query/Workflows';

import {store} from '../../index';
import {notebooksShow, initWorkflows} from '../../actions/notebooks';
import {updateNaviPage} from '../../actions/naviPage';
import LoginPage from '../auth/LoginPage';
import HadoopDialog from '../datasource/HadoopDialog';
import KafkaDialog from '../datasource/KafkaDialog';

function TabContainer(props) {
    return (
        <div style={{ padding: 8 * 3 }}>
            {props.children}
        </div>
    );
}

function renderContent({ getTabContentProps, index, value }) {
    const Content = "div";
    if (index === 0) {
        updateNaviPage("Query");
        return (
            // <QueryPage />
            null
        );
    }
    if (index === 1) {
        updateNaviPage("Workflows");
        return (
            // <Workflows />
            null
        );
    }
    if (index === 2) {
        updateNaviPage("Login");
        return (
            // <LoginPage />
            null
        );
    } 

    return (
        <Content {...getTabContentProps({style: {textDecoration: 'underline' }})} index={index} />
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        width: '100%',
    },
    workflow: {
        width: '30%',
        backgroundColor: 'coral',
        alignContent: 'center',       
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        }
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        }
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        }
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        }
    }
});

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            anchorEl: null,
            mobileMoreAnchorEl: null,
            logined: true,
            anchorSettings: null,
            isOpenHadoop: false,
            isOpenKafka: false,
        };
        this.toggleHadoopModal = this.toggleHadoopModal.bind(this);
        this.toggleKafkaModal = this.toggleKafkaModal.bind(this);
    }
    toggleHadoopModal = (e) => {
        this.setState({isOpenHadoop: !this.state.isOpenHadoop});
    }
    toggleKafkaModal = (e) => {
        this.setState({toggleKafkaModal: !this.state.toggleKafkaModal});
    }
    handleChange = (event, value) => {
        this.setState({value});
        if (value === 1)
            store.dispatch(initWorkflows());
    }

    handleProfileMenuOpen = event => {
        this.setState({anchorEl: event.currentTarget });
    }

    handleMenuClose = (event) => {
        this.setState({ anchorEl: null });
        this.handleMenuClose();
        if (event.currentTarget.innerText.trim() === 'Login') {
            // do login
        }
    }

    handleAdminMenuOpen = event => {
        this.setState({anchorSettings: event.currentTarget });
    }

    handleAdminMenuClose = (event) => {
        this.setState({ anchorSettings: null });
        this.handleMobileMenuClose();
        if (event.currentTarget.innerText.trim() === 'Hadoop') {
            this.toggleHadoopModal();
        }
        else if (event.currentTarget.innerText.trim() === 'Kafka') {
            this.toggleKafkaModal();
        }
    }

    handleMobileMenuOpen = event => {
        this.setState({mobileMoreAnchorEl: event.currentTarget });
    }

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    }

    onLogin = (e) => {
        this.setState({"logined": false });
    }

    render() {
        const { anchorEl, mobileMoreAnchorEl, anchorSettings } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
        const isAdminMenuOpen = Boolean(anchorSettings);

        const renderMenu = (
            <Menu  anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose} component={Link} to="/login" > Login </MenuItem>
                <MenuItem onClick={this.handleMenuClose} component={Link}  > Profile </MenuItem>
                <MenuItem onClick={this.handleMenuClose} component={Link}  > My account </MenuItem>               
            </Menu>
        );

        const renderAdminMenu = (
            <Menu  anchorEl={anchorSettings}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isAdminMenuOpen}
                onClose={this.handleAdminMenuClose}
            >
                <MenuItem onClick={this.handleAdminMenuClose} > Hadoop </MenuItem>
                <MenuItem onClick={this.handleAdminMenuClose} > Kafka </MenuItem>
                <MenuItem onClick={this.handleAdminMenuClose} > Dremio </MenuItem>               
            </Menu>
        );

        const renderMobileMenu = (
            <Menu  anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
            </Menu>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                        Fabric Query
                        </Typography>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Tabs value={this.state.value}
                            onChange={this.handleChange}
                            //scrollable
                            //scrollButtons="on"
                            indicateColor="primary"
                            textColor="primary"
                            className={classes.workflow}
                            >
                            <Tab label="Design" icon={<FavoriteIcon />} className={classes.labelWrapped} />
                            <Tab label="My Workflows" icon={<ReorderIcon />} className={classes.labelWrapped} />
                        </Tabs>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop} >
                            <IconButton color="inherit">
                                <Badge badgeContent={1} color="secondary"><MailIcon /></Badge>
                            </IconButton>

                            <IconButton aria-owns={isMenuOpen ? 'material-appbar' : null}
                                aria-haspopup="true"
                                onClick={this.handleAdminMenuOpen}
                                color="inherit"
                                >
                                <SettingsIcon />
                            </IconButton>

                            <IconButton aria-owns={isMenuOpen ? 'material-appbar' : null}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                                >
                                <AccountCircle />
                            </IconButton> 
                        </div> 
                        <div className={classes.sectionMobile} >
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMenu}
                {renderAdminMenu}
                {renderMobileMenu}
                {this.state.value === 0 && <TabContainer><QueryPage /></TabContainer>}
                {this.state.value === 1 && <TabContainer><Workflows /></TabContainer>}
                <HadoopDialog show={this.state.isOpenHadoop} onClose={this.toggleHadoopModal} />
                <KafkaDialog show={this.state.isOpenKafka} onClose={this.toggleKafkaModal} />
            </div>
        )
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    getTabContentProps: PropTypes.func,
    index: PropTypes.number,
    value: PropTypes.string,
    naviPage: PropTypes.string.isRequired,
}

const mapStateToProps = state => {
    return {
        naviPage: state.naviPage
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default withStyles(styles) (connect (mapStateToProps, mapDispatchToProps)(HomePage));