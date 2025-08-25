const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// 从环境变量获取数据库连接信息
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

async function runMigrations() {
  const client = await pool.connect();
  
  try {
    console.log('开始执行数据库迁移...');
    
    // 获取所有迁移文件并按名称排序
    const migrationsDir = path.join(__dirname, '../sql/migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();
    
    if (migrationFiles.length === 0) {
      console.log('没有找到迁移文件');
      return;
    }
    
    // 按顺序执行每个迁移文件
    for (const file of migrationFiles) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      
      console.log(`执行迁移: ${file}`);
      
      try {
        await client.query(sql);
        console.log(`✅ ${file} 执行成功`);
      } catch (error) {
        console.error(`❌ ${file} 执行失败:`, error.message);
        throw error;
      }
    }
    
    console.log('🎉 所有数据库迁移执行完成！');
    
  } catch (error) {
    console.error('数据库迁移失败:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

// 运行迁移
runMigrations();