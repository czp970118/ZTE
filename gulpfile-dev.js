// 加载gulp，并结构需要的方法
let {task,src,dest,watch,series,parallel} = require('gulp')
let load = require('gulp-load-plugins')()
let del = require('del')//删除文件

// 删除dist目录
task('delDist',async ()=>{
  await del('./dist')
})

// 处理html
task('html',async ()=>{
  src('./views/*.html')
  .pipe(dest('./dist'))
  .pipe(load.connect.reload())
})

// 处理data
task('data',async ()=>{
  src('./data/*.json')
  .pipe(dest('./dist/data'))
  .pipe(load.connect.reload())
})

// // 处理css
task('style',async ()=>{
  src('./style/*.css')
  .pipe(dest('./dist/style'))
  .pipe(load.connect.reload())
}) 

// 处理js
task('script',async ()=>{
  src('./script/*.js')
  .pipe(dest('./dist/script'))
  .pipe(load.connect.reload())
})

// 处理img
task('image',async ()=>{
  src('./img/*.*')
  .pipe(dest('./dist/img'))
  .pipe(load.connect.reload())
})

// 启动一个服务，实现自动刷新
task('reload',async ()=>{
  load.connect.server({
    root: './dist',//设置根目录
    livereload: true//开启自动刷新
  })
})

// 监听文件变化
task('watch',async ()=>{
  watch('./views/*.html',series('html'))
  watch('./style/*.css',series('style'))
  watch('./script/*.js',series('script'))
  watch('./data/*.json',series('data'))
  watch('./img/*.*',series('image'))
})

// 打包（开发环境）
task('dev',series('delDist','html','style','script','data','image'))

// 启动项目
task('start',series('dev','reload','watch'))

