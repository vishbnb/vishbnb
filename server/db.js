exports.createTables = function createTables(connection) {
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
    } else {
      console.log('connected as id ' + connection.threadId);
    }
  });


  const UserQuery = `
    CREATE TABLE IF NOT EXISTS User (
      user_id VARCHAR(100),
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
      credit_card_details varchar(50),
      PRIMARY KEY (user_id)
    
    );
  `;

   const HostQuery = `
    CREATE TABLE IF NOT EXISTS Host (
      host_id VARCHAR(100),
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
      credit_card_details varchar(50),
      trip_history varchar(200),
      PRIMARY KEY (host_id)
    );
  `;

  const BillingQuery = `
    CREATE TABLE IF NOT EXISTS Billing_info (
      billing_id VARCHAR(100),
      host_id VARCHAR(100),
      user_id VARCHAR(100),
      today_date DATE,
      from_date DATE,
      to_date DATE,
      property_type varchar(50),
      total_amount varchar(50),
      location varchar(50),
      PRIMARY KEY (billing_id),
      FOREIGN KEY (host_id) REFERENCES Host(host_id),
      FOREIGN KEY (user_id) REFERENCES User(user_id)
      
    );
  `;

const AdminQuery = `
    CREATE TABLE IF NOT EXISTS Admin (
      admin_id VARCHAR(100),
      first_name varchar(100),
      last_name varchar(50),
      address varchar(200),
      city varchar(50),
      state varchar(50),
      zip_code INT(5),
      phone_number INT(10),
      email  varchar(100),
      PRIMARY KEY (admin_id)
    );
  `;

  const PropertiesQuery = `
    CREATE TABLE IF NOT EXISTS Properties (
  
      property_id VARCHAR(100),
      host_id VARCHAR(100),
      category VARCHAR(100), 
      address varchar(200),
      city varchar(50),
      state varchar(50),
      zip_code INT(5),
      quantity varchar(10),
      description varchar(200),
      PRIMARY KEY (property_id),
      FOREIGN KEY (host_id) REFERENCES Host (host_id) 
    );
  `;

const TripsQuery = `
    CREATE TABLE IF NOT EXISTS Trips (
      ride_id VARCHAR(100),
      property_id VARCHAR(100),
      user_id VARCHAR(100), 
      host_id VARCHAR(100),
      billing_id VARCHAR(100),
      PRIMARY KEY (ride_id),
      FOREIGN KEY (host_id) REFERENCES Host (host_id),
      FOREIGN KEY (user_id) REFERENCES User (user_id),
      FOREIGN KEY (billing_id) REFERENCES Billing_info (billing_id),
      FOREIGN KEY (property_id) REFERENCES Properties (property_id)
      
    );
  `;

  connection.query(UserQuery, function(err, results, fields) {
    if (err) throw err;
    console.log(results);
  });
  connection.query(HostQuery, function(err, results, fields) {
    if (err) throw err;
    console.log(results);
  });
  connection.query(BillingQuery, function(err, results, fields) {
    if (err) throw err;
    console.log(results);
  });
  
  connection.query(AdminQuery, function(err, results, fields) {
    if (err) throw err;
    console.log(results);
  });
  
  connection.query(PropertiesQuery, function(err, results, fields) {
    if (err) throw err;
    console.log(results);
  });
  
  connection.query(TripsQuery, function(err, results, fields) {
    if (err) throw err;
    console.log(results);
  });
  
  

  connection.end();
};
