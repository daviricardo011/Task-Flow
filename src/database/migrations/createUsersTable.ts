import { connection } from "../../config/database";

async function createUsersTable() {
  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );`);

    console.log('OK - Tabela "users" criada com sucesso.');
  } catch (error) {
    console.error('ERROR - Erro ao criar a tabela "users":', error);
  } finally {
    process.exit();
  }
}

createUsersTable();
