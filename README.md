从 Github 仓库（[**https://github.com/grid-oaa/codex-skill-spec**](https://github.com/grid-oaa/codex-skill-spec)）下载后，

在 skills 目录下有 design、requirements、tasks 三个文件夹。

（code-review-pro 是我代码审查的 skill，感兴趣的也可以添加上。）

把这三个文件夹复制到你的 codex 安装目录下的skills目录下 

> windows示例：C:\Users\Lenovo\.codex\skills

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/289564/1768202755180-dafe63e9-ce28-4239-985e-3b081d490183.png)

然后打开codex，输入`$`就能看到了。（如果你的 codex 还不支持 skill，将 codex 升级成最新版）

**操作案例：**

1、生成 requirements.md 文档

输入`$`，选择 requirements 后，输入你的开发需求

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/289564/1768203107065-4feed7f3-45c1-46ec-9109-5811ad8f5908.png)

> `--module` 是我自定义的参数，是用来指定将生成好的 requirements.md 文档放到当前目录doc下的哪个目录下。

然后 codex 会向你询问有关需求的详细设计要求，回复后就会生成 requirements.md 了。

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/289564/1768203225226-3ebc0b9b-c8fd-4c6f-858e-b13b980a18fb.png)

2、生成 design.md 文档

输入`$`，选择 design 后，只需输入 `--module user`即可。

design会根据 `user`目录下的 requirements.md 文档来做设计

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/289564/1768203825766-1499893c-f949-4266-89c8-0c866b6d6288.png)

3、生成 tasks.md 文档

输入`$`，选择 design 后，只需输入 `--module user`即可。

---

之后你就可以告诉 ai 来执行 tasks.md 中的某一个任务了。

**强烈建议！：** 可以使用另外的一个 ai 来对任务的执行情况进行监督，具体可以参考 tasks-detail.md 中的模板及提示词。

## 使用必看

生成md文件使用的是node.js，一定要提前安装！

