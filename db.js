var db_name = 'passport';

//provide a sensible default for local development
var mongodb_connection_string = 'mongodb://localhost/' + db_name;
//take advantage of openshift env vars when available:
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
	mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

module.exports = {
	'url': mongodb_connection_string
};