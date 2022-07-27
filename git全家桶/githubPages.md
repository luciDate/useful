> 按照规范创建一个 repository，格式是 username.github.io

* 比如luciDate.github.io

> 创建好后，点击新建 repository 点击左边的pages

> 下载 github desktop 几乎就是哪里亮了点哪里

> 进到let's get started! 页面后选择我们刚刚创建的那个repository 选择 clone luciDate.github.io

> clone 完成后 repository 大概在这个位置

* C:\Users\AzA\Documents\GitHub\luciDate.github.io

> 之后我们随便添加一个html文件，发现desktop的changes亮了，之后点击commit to main,添加到本地repository，然后再点击publish branch 添加到远程repository。

> 回到repository的setting的pages，我们发现原来的none变为 branch:main了。
* Your site is ready to be published at https://lucidate.github.io/

> 之后调皮的我购买了一个域名 lucidate.cn，实名认证之后点击解析配置，添加记录，大概的配置为这样

* 主机记录: www 记录类型: CNAME 解析线路: 默认 记录值: lucidate.github.io TTL：10分钟

* 主机记录: @ 记录类型: CNAME 解析线路: 默认 记录值: lucidate.github.io TTL：10分钟

> 这里的TTL大概为nds的缓存，如果修改就要等上10分钟

> 之后回到github setting 里的 pages ，Custom domain 填写为 www.lucidate.cn

> 回到本地的repository 新建一个CNAME文件 内容为

* www.lucidate.cn

> 提交到远程仓库之后就可以了





