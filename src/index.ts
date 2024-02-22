import { Command } from 'commander'
import { version } from '../package.json';
import { create } from './commands/create';


const program = new Command('dagu');
program.version(version,'-v --version');
program.command('create').description('初始化项目').argument('{name}','项目名称').action(async (name) => {
  create(name);
})

program.parse();