#!/bin/bash

# 更新所有使用 StandardUnderConstruction 的页面
# 这个脚本会查找所有导入 StandardUnderConstruction 的页面，并将其替换为 ContentPageLayout

# 查找所有导入 StandardUnderConstruction 的页面
files=$(grep -l "import StandardUnderConstruction from" --include="*.tsx" -r app/)

# 遍历找到的文件
for file in $files; do
  echo "Updating $file..."
  
  # 替换导入语句
  sed -i '' 's/import StandardUnderConstruction from/import ContentPageLayout from/g' "$file"
  
  # 替换组件使用
  sed -i '' 's/<StandardUnderConstruction title="[^"]*" \/>/<ContentPageLayout tabs={getUnderConstructionTabs()} \/>/g' "$file"
  
  # 添加导入 getUnderConstructionTabs
  sed -i '' '/import ContentPageLayout from/a\\
import { getUnderConstructionTabs } from "../components/UnderConstructionContent";' "$file"
  
  echo "Updated $file"
done

echo "All pages updated successfully!"
