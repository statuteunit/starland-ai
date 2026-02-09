import { app, BrowserWindow, screen } from 'electron';
import path from 'path';

function createWindow() {
  // 1. 获取用户屏幕的尺寸（用于自适应初始大小）
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;

  // 2. 定义窗口初始尺寸（适配媒体查询）
  // 策略：初始为屏幕的 80% 大小，同时设置最小尺寸避免缩放过小
  const windowConfig = {
    // 初始宽高：适配大屏，同时留有余量
    width: Math.floor(screenWidth * 0.8),
    height: Math.floor(screenHeight * 0.8),
    // 最小宽高：匹配网页媒体查询的最小断点（如手机端 375px）
    minWidth: 375,
    minHeight: 667,
    // 窗口居中显示
    center: true,
    // 允许缩放（关键：让网页媒体查询生效）
    resizable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false // 调试用，生产环境关闭
    }
  };

  // 3. 针对小屏幕设备（如笔记本）的特殊适配
  if (screenWidth < 1200) {
    windowConfig.width = screenWidth - 100; // 更紧凑的初始大小
    windowConfig.height = screenHeight - 100;
  }

  // 创建窗口
  const mainWindow = new BrowserWindow(windowConfig);
  // 隐藏菜单栏（无论环境如何）
  mainWindow.setMenu(null);

  // 加载网页
  mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));

  // 可选：模拟移动端尺寸（调试时用）
  // mainWindow.setSize(375, 667); // 模拟 iPhone 尺寸
  // mainWindow.webContents.openDevTools();

  // 监听窗口大小变化（可选：调试媒体查询时用）
  mainWindow.on('resize', () => {
    const [width, height] = mainWindow.getSize();
    console.log('窗口尺寸：', width, height); // 查看当前尺寸，匹配网页媒体查询断点
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});