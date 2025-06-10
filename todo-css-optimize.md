# CSS 优化待办事项 (CSS Optimization TODO)

## 1. 总体目标 (Overall Goal)

当前项目存在多个 CSS 文件，包括 `biophilic-design.css`、`chinawords-design.css` 以及多个功能重叠的纹理和动画样式表，导致了样式冲突、冗余和维护困难。我们的核心目标是：

**将项目样式统一到以 Tailwind CSS 为核心的单一设计体系中，最大限度地利用其功能类，同时将必要的自定义样式整合到 `globals.css` 和 `tailwind.config.ts` 中。**

通过这次优化，我们期望达成以下效果：

- **移除冗余文件**：删除不再需要的设计系统和重复的样式表。
- **减少自定义 CSS**：将绝大多数组件样式迁移到 Tailwind 功能类。
- **提高可维护性**：建立一个清晰、统一的样式规范。

---

## 2. 清理与优化步骤 (Cleanup and Optimization Steps)

### 第一阶段：整合设计系统与核心变量 (Phase 1: Consolidate Design Systems & Core Variables)

**任务：** 将 `biophilic-design.css` 和 `chinawords-design.css` 中的核心设计元素（颜色、字体、边框圆角等）统一到 Tailwind 配置中。

1.  **分析并提取颜色变量**:

    - 审查 `biophilic-design.css` 和 `chinawords-design.css` 中的 `:root` 颜色定义。
    - 与产品/设计团队确认项目最终要采用的主设计风格（看起来更偏向 `chinawords-design`）。
    - 将最终确认的颜色方案添加到 `tailwind.config.ts` 的 `theme.extend.colors` 部分。

2.  **统一字体**:

    - `chinawords-design.css` 中引入了 'Noto Sans SC', 'Noto Serif SC', 'Playfair Display'。
    - 将这些字体配置到 `tailwind.config.ts` 中，并创建对应的功能类（如 `font-noto-sans`）。
    - 在 `globals.css` 中保留 `@import` 谷歌字体的链接。

3.  **移除旧的设计系统文件**:
    - 在 `tailwind.config.ts` 配置完成后，从 `app/layout.tsx` 中移除对 `biophilic-design.css` 和 `chinawords-design.css` 的导入。
    - 删除这两个 CSS 文件。

### 第二阶段：合并与去重纹理和动画 (Phase 2: Merge & Deduplicate Textures and Animations)

**任务：** 整合 `animations.css`、`paper-texture-refined.css` 和 `paper-texture.css` 到 `globals.css`，并消除冗余。

1.  **合并动画**:

    - `animations.css` 和 `globals.css` 都定义了 `@keyframes pageTurn`。保留一个版本，删除另一个。
    - 将 `animations.css` 中所有必要的 `@keyframes` 和相关类（如 `.sketch-animation`）移动到 `globals.css` 的末尾。

2.  **整合纸张纹理和装饰**:
    - `paper-texture-refined.css` 和 `paper-texture.css` 存在大量重叠，例如 `.washi-tape` 和 `.handwritten` 的定义。
    - 选择一个更完善的版本（`paper-texture-refined.css` 看起来是更新的版本），将其内容合并到 `globals.css`。
    - 删除 `paper-texture.css` 和 `animations.css` 文件，并更新 `app/layout.tsx` 中的导入。

### 第三阶段：迁移组件样式到 Tailwind (Phase 3: Migrate Component Styles to Tailwind)

**任务：** 逐步将现有组件中使用的自定义 CSS 类替换为 Tailwind 功能类。

1.  **处理通用组件样式**:

    - **按钮 (`.btn-primary`, `.btn-organic`)**: 在使用这些按钮的组件中，直接用 Tailwind 的类替换，例如 `bg-jade-green text-white py-3 px-6 rounded-md`。
    - **卡片 (`.card-chinawords`, `.card-nature`)**: 同样地，在组件中用 `bg-white rounded-lg shadow-soft overflow-hidden` 等类来重构。

2.  **处理通用布局和文本类**:
    - 替换如 `.text-heading`, `.text-body` 等自定义文本样式类为 Tailwind 的 `text-*`, `font-*`, `leading-*` 等功能类。

### 第四阶段：处理复杂和遗留的 CSS (Phase 4: Address Complex and Legacy CSS)

**任务：** 评估并处理那些难以直接用 Tailwind 替换的样式。

1.  **中式画框 (`chinese-frame.css`)**:

    - 这个组件的样式高度定制，包含多个伪元素和复杂的 `background-image` (SVG)。
    - **建议**：暂时保留 `chinese-frame.css`。可以考虑将其重构为一个独立的 React 组件 (`<ChineseFrame>`)，该组件内部封装其样式，而不是全局导入。

2.  **全局样式 (`globals.css`)**:
    - 审查 `globals.css` 中剩余的样式。像 `input:-webkit-autofill` 伪类选择器或 `::placeholder` 这样的样式是适合保留在全局文件中的。
    - 对于 `.page-turn` 等复杂的动画类，也暂时保留。

---

## 3. 建议的实施顺序 (Suggested Implementation Order)

为确保平稳过渡，建议按以下顺序操作：

1.  **[第一阶段]** 首先完成 Tailwind 配置的统一，这是后续所有工作的基础。
2.  **[第二阶段]** 接着清理和合并纹理、动画文件，减少文件数量。
3.  **[第三阶段]** 然后开始逐个组件地迁移样式。可以从最简单的组件开始，如按钮、卡片等。
4.  **[第四阶段]** 最后处理最复杂的样式，如中式画框。
5.  **[持续]** 在未来的开发中，严格遵守 **Tailwind-First** 的原则，避免创建新的一次性自定义类。
