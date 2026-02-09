# 项目上下文

### 样式覆盖
- 对于组件默认样式，优先使用 Tailwind 类覆盖
- 必要时使用内联样式实现精确布局控制
- 注意样式优先级，避免不必要的 `!important`

## 主要技术栈
- Next.js：16.1.6
- React：19.2.3
- React DOM：19.2.3
- TypeScript：^5
- Tailwind CSS：^4
- Vitest：^4.0.18（用于测试）
- Electron：^40.2.1（用于桌面应用打包）
- 其他依赖：axios、lucide-react、react-markdown

## 脚本命令
- dev：启动 Next.js 开发服务器
- build：构建 Next.js 应用
- start：启动 Next.js 生产服务器
- lint：运行 ESLint
- create-app：运行创建应用脚本
- test:unit：运行 Vitest 单元测试
- test:tag：运行 Git 标签测试
- test：运行所有测试
- electron:start：启动 Electron 开发模式
- electron:build：构建 Electron 应用

## 开发规范
1. **称呼用户为"主人"**
2. **只告诉用户怎么做，不要直接修改代码**（除非明确要求）
3. **不添加任何代码注释**
4. **保持代码简洁，避免冗余逻辑**
5. **遵循组件化开发原则，拆分复杂功能**
6. ** 保持客观**
7. **分析请求：识别核心目标和所有显式约束**
8. **拆解：将问题分解为逻辑子任务或变量**
9. **制定策略：列出解决每个子任务的分步方法。**
10. **验证：检查计划是否存在逻辑漏洞或边缘情况。**
11. **包管理工具：如果需要新增包，全程使用yarn安装。**

## 常用命令

```bash
yarn shadcn add <component>
yarn dev
yarn build
Remove-Item -Recurse -Force .next  # 清除缓存
```
