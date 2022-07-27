# Git

[更换机器配置公钥](#tip-1)

[vscode 禁用git](#tip-2)

[gitclone 下载速度太慢](#tip-3)

[clone 下来的仓库合并master](#tip-4)

[新建仓库及远程推送](#tip-5)

[git单独操作](#tip-6)

[git多人合作](#tip-7)

---

## <a id="tip-1">更换机器配置公钥</a>

```bash
测试github是否缺少公钥,出现permission denied (publickey) 证明缺少公钥
ssh -T git@github.com

一直enter下去生成公钥，字符串填写你的git账号
ssh-keygen -t rsa -C "18878752831@163.com"

查看公钥码
cat /c/Users/aza/.ssh/id_rsa.pub

复制好公钥码之后去github头像点setting

选SSH and GPG keys

选new SSH key

title 即兴发挥 key 把git生产的公钥码粘贴进去

之后我们就可以git clone 远程创库了

```

---

## <a>vscode 禁用git</a>

```bash
vscode打开 文件 -> 首选项 -> 设置
在搜索栏中搜索git:Enabled,关闭即可
```

---

## <a id="tip-3">gitclone 下载速度太慢</a>

忍无可忍！无法接受！

在网站 https://www.ipaddress.com/ 分别搜索

获取ip Address
github.global.ssl.fastly.net
获取ip Address
github.com

Windows上的hosts文件路径在C:\Windows\System32\drivers\etc\hosts

在hosts文件末尾添加两行(对应上面查到的ip)

199.232.69.194 github.global-ssl.fastly.net
140.82.113.4 github.com

---

## <a id="tip-4">clone 下来的仓库合并master</a>

```bash
clone好自己的仓库后 
git add .
git commit -m "fixed“
git config --global user.email "18878752831@163.com"
git config --global user.name "aza"
git commit -m "fixed“
git push
```

---

## <a id="tip-5">新建仓库及远程推送</a>

github登录之后 new一个Repositories  

取个名字 选私有还是公开

找个地方新建一个文件夹，新建README.md 随意写点什么

新建一个.gitignore文件 写上node_modules/

过滤这个胖模块

git bash

```bash
git init
git add README.md
git commit -m "repair"
网页第一块最后两句复制过来 github自定义的主线是main但和我们无关，还是master为主线 
git remote add origin git@github.com:luciDate/aza-Project.git
git push -u origin master
```

---

## <a id="tip-6">git 单独操作</a>
<font color="green"></font>

git 分为本地区和暂存区 github为远程区

<font color="green">把当前目录所有文件提交到暂存区</font>

git add . 

<font color="green">将暂存区添加到本地仓库中</font>

git commit -m "repair"

<font color="green">查看git改动状态</font>

git status

<font color="green">查看git提交日志 查看提交的commit-id</font>

git log

<font color="green">查看当前配置的用户名和邮箱</font>

git config --global --list

<font color="green">删除文件后的操作</font>

git rm ./test.md

git add .

git commit -m "repair"

git push

<font color="green">处理重命名</font>

新建一个文件夹test

重命名为test1

rm 删除 rm -r 递归删除

git rm -r test

git add .

git commit -m "repair"

<font color="green">文件有变化如何查看文件具体变化</font>

git add .

git commit -m "repair"

git log 你改动的文件

git log --pretty=oneline ./test88.md

<font color="green">回滚上一次提交状态（如果没有add到暂存区就可以操作）</font>

git checkout -- ./test88.md

把文件从暂存区撤离出来

git reset HEAD ./test88.md

<font color="green">全部回滚到指定的commit</font>

查看日志 拿到你想要回滚的commit-id 复制

git log

hard 之后粘贴commit-id

git reset --hard 443208626f0948e5a3f5e4a8f4f7d1d83dbd6b6b

<font color="green">指定文件会到指定版本</font>

git log取出commit-id

git log

git checkout 775fa6a07ed97a2f9132646ccb7b4f23258fc32a -- ./test88.md

<font color="green">git 推送到远程仓库</font>

git add. 

git commit -m "repair"

git push origin master

<font color="green">创建独立的commit标签</font>

git add .

指定commit-tag需要在 "v0.5" 后面接上commit-id
git commit -m "v0.5"

git tag "v0.5"

git push origin "v0.5"

删除标签

git tag -d "v0.5"

<font color="green">git分支操作</font>

创建 git 分支

git branch dev

检查 git 分支

git branch

git 切换分支

git checkout dev

删除分支不能删除当前所在分支

软删除

git branch  -d test

硬删除

git branch -D test

合并分支

修改代码

git checkout dev 

git add .

git commit -m "dev"

git checkout master

git merge dev

如果两条分支同时修改了同一个地方的代码那么合并分支就会出现错误

忽略其他分支的改动 采用master线的改动
git merge --abort

---

## <a id="tip-7">git多人合作</a>

<font color="green">多人查看版本</font>

git log --oneline --graph

<font color="green">不同人删除不需要的分支</font>

github 操作branch 在input栏中输入branch的名字创建分支

git bash

同步远程仓库

git fetch 

查看分支

git branch -av

删除分支
git push origin --delete test101

<font color="green">不同人修改文件处理</font>

在分支test下修改文件

git add .

git commit -m "branch-test"

git push --set-upstream origin test

github上Pull request

view Pull request

merge pull request

confirm merge









































