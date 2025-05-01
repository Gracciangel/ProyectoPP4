// src/Context.ts
import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, '../biblioteca.db');

export const SQL = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error('Error al abrir la base de datos:', err.message);
    } else {
      console.log('Conectado a biblioteca.db');
      
      SQL.run('PRAGMA journal_mode = WAL;');
      
      SQL.run('PRAGMA busy_timeout = 5000;');
    }
  }
);
