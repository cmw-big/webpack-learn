#!/bin/sh

# 执行类型检查
for file in ./packages/*; do
    if test -d "$file"; then
        echo 'text here'
        pnpm exec tsc --noEmit -p "$file"
    fi
done
