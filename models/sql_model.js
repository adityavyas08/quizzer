var result_sql = {
	set_name : "result_"
};

module.exports.create_result_table = function ( db, Qid) {
	/*
		Init for result data to be
		inserted for Quiz Creator 
	*/
	db.query("create table " + result_sql.set_name + Qid + "(user varchar(30) primary key, username varchar(30), total varchar(5));", function  ( err, status) {
		if( !err ){
			/* success in inserting data*/
			//callback( null, 1);
			console.log( status + 'for Qid :::' + Qid );
		}else{
			console.log("ERR AT create_result_table INSIDE sql_model.js");
			//callback( 1, null);
		}
	});
}


function add_section_coloumn( db, Qid, section_name) {
	db.query("alter table " + result_sql.set_name + Qid + " add " + section_name + " varchar(25);", function ( err, status){
		if( !err ){
			/* success in updating table*/
			//callback( null, 1);
			console.log( status + 'of add for Qid, section_name' + Qid + section_name );
		}else{
			console.log("ERR AT add_section_coloumn INSIDE sql_model.js");
			//callback( 1, null);
		}
	});
}

module.exports.add_section_coloumn =  add_section_coloumn;

function drop_section_coloumn( db, Qid, section_name) {
	db.query("alter table " + result_sql.set_name + Qid + " drop " + section_name + ";", function ( err, status){
		if( !err ){
			/* success in updating table*/
			//callback( null, 1);
			console.log( status + 'of drop for Qid, section_name' + Qid + section_name );
		}else{
			console.log("ERR AT drop_section_coloumn INSIDE sql_model.js");
			//callback( 1, null);
		}
	});
}

module.exports.drop_section_coloumn =  drop_section_coloumn;


module.exports.insert_data =  function( db, Qid, user, username, marks) {
	var str = '"' + user  + '"' +','+ '"' + username + '"' + ','; 
	var temp = "";
	var total = 0;
	for( var i = 0; i < marks.length; i++){
		temp += marks[i]+",";
		total += parseInt( marks[i]); 
	}
	str += total + "," + temp.slice( 0 , -1);
	console.log( str);
	var query = "insert into " + result_sql.set_name + Qid + " values(" + str + ");";
	console.log( query);
	db.query(query, function ( err, status){
		if( !err ){
			/* success in updating table*/
			console.log( status + ' for Qid, user' + Qid + " " + user);
			//callback( null, 1);
		}else{
			console.log("ERR AT insert_data INSIDE sql_model.js");
			//callback( 1, null);
		}
	});
}


module.exports.fetch_all = function( db, Qid, callback){
	var query = "select  * from " + result_sql.set_name + Qid + " order by total;";
	console.log(query);
	db.query(query, function ( err, data){
		if( !err ){
			/* success in updating table*/
			callback( null, data);
		}else{
			console.log("ERR AT insert_data INSIDE sql_model.js");
			callback( 1, null);
		}
	});
}	