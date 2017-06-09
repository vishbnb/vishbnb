exports.createTables = function createTables(connection) {
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
    } else {
      console.log('connected as id ' + connection.threadId);
    }
  });

  const UserQuery = `
    CREATE TABLE User (
      user_id VARCHAR(100) PRIMARY KEY,
      first_name varchar(100),
      last_name varchar(50),
      address varchar(200),
      city varchar(50),
      state varchar(50),
      zip_code INT(5),
      phone_number INT(10),
      email  varchar(100),
      rating varchar(4),
      reviews varchar(500),
      profile_image varchar(100),
      credit_card_details varchar(50)
    );
  `;

  connection.query(UserQuery, function(err, results, fields) {
    if (err) throw err;
    console.log(results);
  });

  connection.end();
};
