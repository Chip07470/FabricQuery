import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelpertext from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop:  theme.spacing.unit * 2,
    }
});

let inlineStyle = {
    display: 'inline-block',
    float: 'right',
}

class QueryEngine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queryEngine: 'Spark',
            name: 'QueryEngine',
            labelWidth: 0,
        };
    }

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={inlineStyle}>
                <form className={classes.root} autoComplete="off">
                    <FormControl className={classes.formControl}>
                        <InputLabel ref={ref => {this.InputLabelRef = ref;}}
                            htmlFor="Query-engine" >Query Engine</InputLabel>
                        <Select
                            value={this.state.queryEngine}
                            onChnage={this.handleChange}
                            inputProps={{
                                name: 'queryEngine',
                                id: 'query-engine',
                            }} >
                            <MenuItem value="Spark"><em>Spark</em></MenuItem>
                            <MenuItem value="Hive">Hive</MenuItem>
                            
                        </Select>
                    </FormControl>
                </form>
            </div>
        )
    }
}

QueryEngine.propTypes = {
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

export default withStyles(styles) (connect (mapStateToProps, mapDispatchToProps)(QueryEngine));