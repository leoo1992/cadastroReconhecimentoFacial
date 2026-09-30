import { existsSync } from 'node:fs';
const required=['.env.example','ARCHITECTURE.md','LICENSE','quality/Dockerfile','quality/package-lock.json'];
const missing=required.filter((file)=>!existsSync(file));
if(missing.length){console.error(`Missing quality files: ${missing.join(', ')}`);process.exit(1)}
console.log('Repository quality baseline verified.');
