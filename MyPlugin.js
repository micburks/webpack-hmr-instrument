const ImportDependency = require('webpack/lib/dependencies/ImportDependency');
const ImportDependencyTemplate = require('webpack/lib/dependencies/ImportDependency')
  .Template;

class InstrumentedImportDependencyTemplate extends ImportDependencyTemplate {
  apply(dep, source, runtime) {
    const depBlock = dep.block;
    const content = runtime.moduleNamespacePromise({
      block: dep.block,
      module: dep.module,
      request: dep.request,
      strict: dep.originModule.buildMeta.strictHarmonyModule,
      message: 'import()',
    });

    const rand = Math.random().toString(16).substring(7);
    const customContent = `Object.defineProperties(${content}, {
      "BUILD_TIME_DATA": {value:${JSON.stringify([rand])}},
    })`;

    source.replace(depBlock.range[0], depBlock.range[1] - 1, customContent);
  }
}

class InstrumentedImportDependencyTemplatePlugin {
  constructor(opts /*: InstrumentationPluginOpts*/) {
    this.opts = opts;
  }
  apply(compiler /*: any */) {
    const name = this.constructor.name;
    compiler.hooks.make.tapAsync(name, (compilation, done) => {
      compilation.dependencyTemplates.set(
        ImportDependency,
        new InstrumentedImportDependencyTemplate()
      );
      done();
    });
  }
}

module.exports = InstrumentedImportDependencyTemplatePlugin;
