import { input, select } from '@inquirer/prompts';
import {clone} from '../utils/clone';
import path from 'path';
import fs from 'fs-extra';

export interface TemplateInfo {
  name: string; // 模板名称
  downloadUrl: string; // 模板下载地址
  description: string; // 模板描述
  branch: string; // 模板分支
}
export const templates: Map<string, TemplateInfo> = new Map([
  [
      'Vite-Vue3-Typescript-tempalte',
      {
          name: 'Vite-Vue3-Typescript-tempalte',
          downloadUrl: 'https://gitee.com/gcpwork/dagu-cli.git',
          description: 'Vue3技术栈开发模板',
          branch: 'master',
      },
  ],
  [
      'Vite-Vue3-移动端模板',
      {
          name: 'Vite-Vue3-Typescript-tempalte',
          downloadUrl: 'https://gitee.com/gcpwork/dagu-cli.git',
          description: 'Vue3技术栈开发模板',
          branch: 'master',
      },
  ],
]);

const isOverWrite = (projectName: string) => {
  return select({
    message: '文件夹已存在，是否覆盖？',
    choices: [
      {value:'ture', name: '是'},
      {value:'false', name: '否'}
    ]
  })
}

export async function create(projectName: string) {
  const templateList = Array.from(templates).map((item:[string,TemplateInfo]) => {
    const [name,info] = item;
    return {
      name:name,
      value: info,
      description: info.description,
    }
  });

  if(!projectName){
    projectName =  await input({
      message: '请输入项目名称',
    })
  }

  // 如果文件夹存在，则提示是否覆盖
  const filePath = path.resolve(process.cwd(), projectName);
  if(fs.existsSync(filePath)){
    const run = await isOverWrite(projectName)
    if(run){
      await fs.remove(filePath);
    }else{
      return
    }
  }

  const templateName = await select({
    message: '请选择模板',
    choices: templateList,
    
  });

  

  const info = templateName;
  if(info){
    clone(info.downloadUrl, projectName, ['-b', info.branch])
  }
  console.log('create', projectName);
}