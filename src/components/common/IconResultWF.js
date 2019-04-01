import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import toastr from 'toastr';
import Tooltip from '@material-ui/core/Tooltip';
import GridOnIcon from '@material-ui/icons/GridOn';
import BarChartIcon from '@material-ui/icons/BarChart';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

class IconResultWF extends React.Component {
    constructor(props) {
        super(props);
         this.state = {
         };

        this.onTable = this.onTable.bind(this);
        this.onBarChart = this.onBarChart.bind(this);
    }

    onTable(e) {
    }

    onBarChart(e) {
    }

    render() {
        const { classes } = this.props;
        let showWFToolbar = 
            <div>
                <Tooltip title="Table" >
                    <GridOnIcon onClick={this.onTable} />
                </Tooltip>
                <Tooltip title="BarChart" >
                    <GridOnIcon onClick={this.onBarChart} />
                </Tooltip>
            </div>
        return (
            <div>
                { showWFToolbar }
            </div>
        )
    }
}

IconResultWF.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default withStyles(styles) (connect (mapStateToProps, mapDispatchToProps)(IconResultWF));