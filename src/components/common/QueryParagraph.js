import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ParagraphResult from './ParagraphResult';
import { genKafka } from './CodeGenKafka';
import SyntaxCodeMirror from './SyntaxCodeMirror';

function getSparkSqlFieldType(field) {
    let ftype = "";
    if (field.dataType === "STRING" || field.dataType === "VARCHAR")
        ftype = "StringType";
    else if (field.dataType == "LONG")
        ftype = "LongType";
    else if (field.dataType == "SHORT")
        ftype = "ShortType";
    else if (field.dataType == "INTEGER")
        ftype = "LongType";
    else if (field.dataType == "BYTE")
        ftype = "ByteType";
    else if (field.dataType == "BOOLEAN")
        ftype = "BooleanType";
    else if (field.dataType == "TIMESTAMP")
        ftype = "TimestampType";
    else if (field.dataType == "DATE")
        ftype = "DateType";
    else if (field.dataType == "DECIMAL" || field.dataType == "NUMBER")
        ftype = "DecimalType";
    else if (field.dataType == "FLOAT")
        ftype = "FloatType";
    else if (field.dataType == "DOUBLE")
        ftype = "DoubleType";
    else if (field.dataType == "ARRAY")
        ftype = "ArrayType";

    return ftype;
}

function getSparkSqlSchema(fields) {
    let schema = "val dsSchema = StructType(Array(";
    fields.map((field,index) => {
        if (index > 0)
            schema += ",";
        schema += "StructField(\"" + field.name + "\"," + getSparkSqlFieldType(field) + ",true)";
    });
    schema += "))\n";
    return schema;
}

function readDataSetAttrByName(dsOptions, attrName) {
    for (var option of dsOptions) {
        if (option.optionName === attrName) {
            return option.optionValue;
        }
    }
    return null;
}

function readDataSetAttrFieldDelimiter(dsOptions) {
    for (var option of dsOptions) {
        if (option.optionName === "FIELD_DELIMITER") {
            const v = option.optionValue;
            switch (v) {
                case "COMMA": return ",";
                case "PIPE": return "|";
                case "SPACE": return " ";
                case "TAB": return "\t";
                case "TILDE": return "~";
                case "CARET": 
                case "CEDILLA":
                default: return v;
            }
        }
    }
    return null;
}

function getDSHDFSPath(data) {
    return "hdfs://" + data.hdfsHome + "/" + data.zone + "/" + data.dsgCode + "/" + data.dsCode + "/*/*";
}

function getDSInfo(dsOptions) {
    let opt = {dsType: "", header: false, delimiter: ","};
    dsOptions.map((o) => {
        if (o.optionName.toUpperCase() === "DATASETTYPE_CUSTOM") {
            opt.dsType = o.optionValue;
        }
        else if (o.optionName.toUpperCase() === "HEADER_CUSTOM") {
            opt.header = o.optionValue;
        }
        if (o.optionName.toUpperCase() === "DELIMITER_CUSTOM") {
            opt.delimiter = o.optionValue;
        }
    });
    return opt;
}

export function genSpark(data) {
    const dsInfo = getDSInfo(data.dataSetOptions);
    let value="", opt=null;
    value = "%spark\n";
    value += "import org.apache.spark.sql.types._\n";
    value += getSparkSqlSchema(data.fields);
    opt = readDataSetAttrByName(data.dataSetOptions, "HEADER_LINES");
    const delimiter = readDataSetAttrFieldDelimiter(data.dataSetOptions);
    if (dsInfo.dsType === "CSV") {
        value += "val df = spark.read.format(\"csv\")";
        value += "\n           .option(\"delimiter\",\"" + (delimiter===null ? dsInfo.delimiter : delimiter) + "\")";
        value += "\n           .option(\"header\",\"" + dsInfo.header.toLowerCase() + "\")";
        value += "\n           .schema(dsSchema)";
        value += "\n           .load(\"" + getDSHDFSPath(data) + "\")";
    }
    else if (opt != null && opt > 0) {
        value += "val df = spark.read.format(\"csv\")";
        value += "\n           .option(\"delimiter\",\"" + (delimiter===null ? dsInfo.delimiter : delimiter) + "\")";
        value += "\n           .option(\"header\",\"true\")";
        value += "\n           .schema(dsSchema)";
        value += "\n           .load(\"" + getDSHDFSPath(data) + "\")";       
    }
    else {
        value += "val df = sc.textFile(\"hdfs://" + data.hdfsHome + "/" + data.zone + "/" + data.dsgCode + "/" + data.dsCode + "/*/*\").toDF()";
    }
    value += "\n df.createOrReplacetempView(\"" + data.dsgName + "_" + data.dsName + "\")";
    value += "\n spark.sql(\"select * from " + data.dsgName + "_" + data.dsName + "\").show(20)";
    return value;
}

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: '100%',
        margin: 1,
    },
    resize: {
        fontSize: 10
    }
}

let QueryParagraph = ({index, data, noteInfo}) => {
    let name, label, onChange, placeholder, value, error;
    if (data.paragraphType === "HDFS") {
        value = genSpark(data);
    }
    else if (data.paragraphType === "KAFKA") {
        value = genKafka(data);
    }
    const nRows = value.split('\n').length;
    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += " has-error";
    }
    if (noteInfo != null && data.paragraphType === "HDFS") {
        return <ParagraphResult title={data.dsgName} paraInfo={noteInfo} />;
    }

    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <SyntaxCodeMirror
                    value={value}
                    mode='text/x-scala'
                    theme='material'
                    readOnly={true}
                    onChange={onChange}
                />
            </div>
        </div>
    )

}

QueryParagraph.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
}

export default withStyles(styles) (QueryParagraph);