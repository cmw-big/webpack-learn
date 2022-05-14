#!/bin/sh

# 执行类型检查
for file in ./packages/*; do
    if test -d "$file"; then
        pnpm exec tsc -p "$file"
    fi
done

for file in ./libs/*; do
    if test -d "$file"; then
        pnpm exec tsc -p "$file"
    fi
done
