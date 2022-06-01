import vue from '@vitejs/plugin-vue';
import styleImport, { VantResolve } from 'vite-plugin-style-import';

export default {
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
  
  ], 
  
  server:{
    proxy: {
      '/target': {
        target: 'https://api.inscarry.com/insProject/api/wechat/common',	//实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/target/, '')
      },
    }
  },

  build: {
    minify: 'terser',
    // 进行压缩计算
    brotliSize: true,
    outDir: "./target",
    sourcemap: false,
    terserOptions: {
      compress: {
        // 打包自动删除console
        drop_console: true,
        // drop_debugger: true
      },
      keep_classnames:true,
    },
  } ,

  productionSourceMap: false 
  


};
