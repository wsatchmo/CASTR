//      TEST OBJECT--
//     post_title: DataTypes.STRING,
//     post_type: DataTypes.STRING,
//     post_user: DataTypes.STRING,
//     post_body: DataTypes.STRING,
//     time_created: DataTypes.DATE

 //Object for SQL statements

var orm = {
    all: function(posts, cb){  //ALL - 
        var queryString = "SELECT * FROM " + posts;

        connection.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    create: function(posts, cols, vals, cb){ // CREATE -
        var queryString = "INSERT INTO " + posts;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);
        connection.query(queryString, vals, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    updateOne: function(posts, condition, cb){
	var queryString = "UPDATE " + posts;
	queryString += " SET devoured = true WHERE ";
	queryString += condition;

	console.log(queryString);
	connection.query(queryString, function(err, result){
		if(err){
			throw err;
		}
		cb(result);
	});
 },
};

module.exports = orm;