import { Command } from 'commander'
import { version } from '../package.json';
import { create } from './commands/create';
import { update } from './commands/update';


const program = new Command('dagu');
program.version(version,'-v --version');

program
    .command('update')
    .description('更新脚手架 dagu-cli')
    .action(async () => {
        await update();
    });

program.command('create').description('初始化项目').argument('{name}','项目名称').action(async (name) => {
  create(name);
})

program.parse();