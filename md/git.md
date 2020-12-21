# Git

[更换机器配置公钥](#tip-1)

[vscode 禁用git](#tip-2)

[gitclone 下载速度太慢](#tip-3)

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







