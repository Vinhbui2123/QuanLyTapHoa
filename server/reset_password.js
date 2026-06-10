const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function reset() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'quanlytaphoa'
    });

    const newPassword = '123456';
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [result] = await connection.execute(
      'UPDATE users SET password = ? WHERE username = ?',
      [hashedPassword, 'admin']
    );

    if (result.affectedRows > 0) {
      console.log(`\n>>> SUCCESS! Password for user "admin" has been reset to "123456" <<<\n`);
    } else {
      console.log('\nCould not find user "admin" to reset password.\n');
    }

    await connection.end();
  } catch (err) {
    console.error('Error:', err.message);
  }
}

reset();
