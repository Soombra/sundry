import path from 'path';
import crypto from 'crypto';
import { getOptions } from 'loader-utils';
// import logger from '../../../druid_cli_utils/logger';
import { parse, ParserOptions } from '@babel/parser';
interface ImportProcessConfig {
    start: number;
    end: number;
    importProcessed: string;
}

function hasDruidComment(comment) {
    return comment.type === 'CommentBlock' && comment.value.includes('druidSplitImport');
}

function getChunkName(moduleDir, filePath) {
    let absolutePath = '';
    if (filePath.startsWith('./') || filePath.startsWith('../')) {
        absolutePath = path.resolve(moduleDir, filePath);
    } else {
        absolutePath = filePath;
    }
    const pathHash = crypto.createHash('md5').update(absolutePath.split('.')[0]).digest('hex');
    const dirs = filePath.split('/');
    let fileName = '';
    while ((!fileName || fileName === 'index') && dirs.length) {
        fileName = dirs.pop().split('.')[0];
    }
    return `${fileName}_druid${pathHash.slice(0, 5)}`;
}

function changeImportDynamic(source, context) {
    const sourceFileName = context.resourcePath;
    const ast = getAst(source, sourceFileName);
    let processResult = '';
    const {
        program: { body },
    } = ast;
    const druidImportDeclarations: any[] = body.filter(
        ({ type, trailingComments }) =>
            type === 'ImportDeclaration' &&
            trailingComments &&
            trailingComments.some(hasDruidComment),
    );
    if (!druidImportDeclarations) {
        return source;
    }
    const importProcessConfigs: ImportProcessConfig[] = [];
    druidImportDeclarations.forEach(({ specifiers, start, end, source: fileToImport }) => {
        let importDefaultDeclaration = '';
        let ImportNamespaceDeclaration = '';
        const importSingleDeclarations: string[] = [];
        const identifiers: string[] = [];
        // 区分import default和单个import
        specifiers.forEach(({ type, local }) => {
            if (type === 'ImportDefaultSpecifier' && !importDefaultDeclaration) {
                importDefaultDeclaration = local.name;
                identifiers.push(importDefaultDeclaration);
            }
            if (type === 'ImportNamespaceSpecifier' && !ImportNamespaceDeclaration) {
                ImportNamespaceDeclaration = local.name;
                identifiers.push(ImportNamespaceDeclaration);
            }
            if (type === 'ImportSpecifier') {
                importSingleDeclarations.push(local.name);
            }
        });
        if (importSingleDeclarations.length) {
            identifiers.push(`{ ${importSingleDeclarations.join(', ')} }`);
        }
        const chunkName = getChunkName(context.context, fileToImport.value);
        const importProcessed = identifiers
            .map(
                (identifier) =>
                    `const ${identifier} = loadable(() => import(/* webpackChunkName: '${chunkName}' */ '${fileToImport.value}'));`,
            )
            .join('\n');
        if (importProcessed) {
            importProcessConfigs.push({
                start,
                end,
                importProcessed,
            });
        }
    });
    // 替换import语句
    importProcessConfigs.forEach(({ start, end, importProcessed }, index) => {
        const lastEnd = index === 0 ? 0 : importProcessConfigs[index - 1].end;
        processResult += source.slice(lastEnd, start) + importProcessed;
        if (index === importProcessConfigs.length - 1) {
            processResult += source.slice(end);
        }
    });
    // 添加loadable/component依赖
    processResult = `import loadable from '@loadable/component';\n${processResult}`;
    return processResult;
}

function getAst(source, sourceFileName) {
    const parseConfig: ParserOptions = {
        sourceType: 'module',
        plugins: [],
    };
    if (/\.tsx?/.test(sourceFileName)) {
        parseConfig.plugins!.push('typescript');
    }
    if (/\.(j|t)sx?/.test(sourceFileName)) {
        parseConfig.plugins!.push('jsx');
    }
    return parse(source, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
    });
}

export default function (source) {
    const { isNodeEnv } = getOptions(this);
    if (source.match(/druidSplitImport/) && !isNodeEnv) {
        return changeImportDynamic(source, this);
    }
    return source;
}
