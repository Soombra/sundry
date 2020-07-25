const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const rootDir = process.env.PWD.split('/').pop();

function getFullPath (files) {
    const result = files.map(file => {
        return path.resolve(process.env.PWD, file).replace(/\/[a-zA-Z0-9_.-]+$/, ''); // 取同级目录
    });
    return result;
}

function findCard (dir) {
    if (!dir || dir.endsWith(rootDir)) {
        return null;
    }
    const files = fs.readdirSync(dir);
    if (files.includes('cli.conf.js')) {
        return dir.split('/').pop();
    }
    return findCard(dir.replace(/\/[a-zA-Z0-9_-]+$/, ''));
}

function getCardsStr (paths) {
    const cards = new Set();
    paths.forEach(dir => {
        const card = findCard(dir);
        if (card) {
            cards.add(card);
        }
    });
    const arr = Array.from(cards);
    return arr.length ? ` card%${arr.join(',')}%` : '';
}
try {
    // 获取修改文件路径
    const gitInfo = execSync('git status', {encoding: 'utf-8'});
    const reg = 'modified:\\s*([a-zA-Z0-9_.\\/-]+)\\s*';
    const filesModified = gitInfo.match(new RegExp(reg, 'g')).map(item => {
        return item.match(new RegExp(reg))[1];
    });

    // 获取cli.conf.js路径
    const cardsStr = getCardsStr(getFullPath(filesModified));
    const msgFiltPath = process.env.HUSKY_GIT_PARAMS; // commit message临时文件地址
    const msg = fs.readFileSync(msgFiltPath, 'utf-8');
    const msgProcessed = `${msg.replace(/\s$/g, '')}${cardsStr}`;
    fs.writeFileSync(msgFiltPath, msgProcessed); // 替换原有message
} catch (e) {
    console.error(e); // eslint-disable-line
}
