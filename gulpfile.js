const { src, dest } = require('gulp')
const ugfily = require('gulp-uglify')
const babel = require('gulp-babel')
const concat = require('gulp-concat')

const libTask = () => {
  return src('src/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(ugfily())
    .pipe(concat('m2v.mini.js'))
    .pipe(dest('lib/'))
}

exports.default = libTask