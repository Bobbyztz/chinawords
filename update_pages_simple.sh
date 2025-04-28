#!/bin/bash

# 查找所有导入 StandardUnderConstruction 的页面
files=$(find app -name "page.tsx" -type f -exec grep -l "StandardUnderConstruction" {} \;)

# 遍历找到的文件
for file in $files; do
  echo "Updating $file..."
  
  # 替换导入语句
  sed -i '' 's/StandardUnderConstruction/ContentPageLayout/g' "$file"
  
  # 替换组件使用
  sed -i '' 's/title="[^"]*"/tabs={getUnderConstructionTabs()}/g' "$file"
  
  # 添加导入 getUnderConstructionTabs
  if ! grep -q "UnderConstructionContent" "$file"; then
    # 获取导入路径的相对深度
    depth=$(echo "$file" | tr -cd '/' | wc -c)
    prefix=""
    for ((i=1; i<depth-1; i++)); do
      prefix="../$prefix"
    done
    
    # 添加导入语句
    sed -i '' "/ContentPageLayout/a\\
import { getUnderConstructionTabs } from '$prefix"components/UnderConstructionContent';" "$file"
  fi
  
  echo "Updated $file"
done

echo "All pages updated successfully!"
