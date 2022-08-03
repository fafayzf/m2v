const { src, dest } = require('gulp')
const ugfily = require('gulp-uglify')
const babel = require('gulp-babel')
const concat = require('gulp-concat')

const task = () => {
  return src('src/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(ugfily())
    .pipe(dest('lib/'))
}

exports.default = task