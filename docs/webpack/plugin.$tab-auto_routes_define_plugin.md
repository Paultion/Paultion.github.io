---
title: AutoRoutesDefine
group: 
  title: plugin
---

```JS
const DefinePlugin = require('webpack').DefinePlugin;
const fs = require('fs');
const path = require('path');
const paths = require('../paths');

/**
 * @param definitions default definitions for DefinePlugin
 * @param pagesPath absolute path of pages
 * @param routesDefine directory name of routes
 * @param ignoreFilename ignore regular express or string of filename
 * @param ignoreExtReg ignore regular express or string of file extensible name
 * @param relativePath relative path between pages directory and routes directory
 */
class AutoRoutesDefinePlugin {
  constructor(
    definitions,
    { pagesPath, routesDefine = 'routes', relativePath = '../', ignoreFileNameReg = [], ignoreExtReg = [] }
  ) {
    this.definitions = definitions;
    this.pagesPath = pagesPath;
    this.pageName = pagesPath.match(/\/([a-z]+)$/)[1];
    this.routesDefine = routesDefine;
    this.relativePath = relativePath;

    this.ignoreFileNameReg = ignoreFileNameReg;
    this.ignoreExtReg = ignoreExtReg;
  }

  firstLetterToLowerCase(filename) {
    return filename.replace(filename[0], filename[0].toLowerCase());
  }

  covertDir(roots) {
    const defaultMap = roots.reduce((m, r) => {
      const filename = r.substring(0, r.indexOf('.'));
      if (!filename) {
        m[r] = {};
      }
      return m;
    }, {});

    /**
     * @param roots 递归的文件目录
     * @param rootDir 初始的路由目录文件存档，和最终读出来的filename拼接path
     * @param prevPath 路由叠加，用作component
     */
    const statRoots = ({ roots, rootDir, prevPath }) => {
      return roots.reduce((memo, root) => {
        const nextPath = prevPath ? `${prevPath}/${root}` : root;

        const rootDirCached = rootDir || root;
        const currentPath = path.resolve(this.pagesPath, nextPath);
        if (fs.statSync(currentPath).isDirectory()) {
          const currentDirs = fs.readdirSync(currentPath);
          statRoots({
            roots: currentDirs,
            prevPath: nextPath,
            rootDir: rootDirCached
          });
        } else {
          const filename = this.firstLetterToLowerCase(root.substring(0, root.indexOf('.')));
          const extname = root.substring(root.indexOf('.'));

          let shouldIgnore = false;
          if (this.ignoreFileNameReg.length) {
            this.ignoreFileNameReg.forEach(ignore => {
              if (ignore.exec(filename)) shouldIgnore = true;
            });
          }
          if (this.ignoreExtReg.length) {
            this.ignoreExtReg.forEach(ignore => {
              if (ignore.exec(extname)) shouldIgnore = true;
            });
          }

          if (!shouldIgnore) {
            memo[rootDirCached][`${rootDirCached}/${filename}`] = `${this.relativePath}${
              this.pageName
            }/${nextPath.substring(0, nextPath.indexOf('.'))}`;
          }
        }
        return memo;
      }, defaultMap);
    };
    return statRoots({ roots });
  }

  apply(compiler) {
    compiler.apply(
      new DefinePlugin({
        ...this.definitions,
        ...{
          [this.routesDefine]: JSON.stringify(this.covertDir(fs.readdirSync(this.pagesPath)))
        }
        /*routes: {
        account: {
          '/account/operatorList': JSON.stringify('pages/account/operator/OperatorList'),
        },
      },*/
      })
    );
  }
}

module.exports = AutoRoutesDefinePlugin;

```