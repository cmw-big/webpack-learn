# 总结

- commonjs=>commonjs 几乎不需要任何的处理
- commonjs=>esm esm 需要转化为commonjs规范
- esm=>esm 两个esm都需要转化为commonjs规范
- esm=>commonjs esm转化为commonjs规范

webpack中判断是否是commonjs模块，是webpack的exports.__esmodule的值来判断的
