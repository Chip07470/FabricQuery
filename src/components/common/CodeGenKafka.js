function parseSchema(data) {
    var r = "";
    return r;
}

export function genKafka(data) {
    var r = '%spark\n';
    if (data.mode === "WRITESTREAM") {
        r += 'df.selectExpr("CAST(NULL AS STRING) AS key", "to_json(struct(*)) AS value").write.format("kafka")\n';
        r += '.option("kafka.bootstrap.servers","' + data.bootstrapServers + '")\n';
        r += '.option("topic","' + data.topic + '")\n';
        r += '.save()\n';
    }
    else if (data.mode === "READSTREAM") {
        r += 'import org.apache.spark.sql.types._\n';
        r += 'import org.apache.spark.rdd.RDD\n';
        r += 'import org.apache.spark.sql.ROW\n';
        r += 'val schema = ' + parseSchema(data) + '\n';

        r += 'val df = spark.readStream.format("kafka")\n';
        r += '.option("kafka.bootstrap.servers","' + data.bootstrapServers + '")\n';
        r += '.option("subscribe","' + data.topic + '")\n';
        r += '.option("startingOffsets","' + 'earliest' + '")\n';
        r += '.load()\n';

        r += 'val df1 = df.select(col("key").cast("string"), from_json(col("value").cast("string"), schema).alias("parsedvalue"))\n';
    }
    return r;
}