use myblog;

-- 基本查询

select * from users;

select id,username from users;

select * from users where username="dahl" and `password`="123";

select * from users where `password` like '%1%' order by id desc;

--基本更改

update users set realname='李四' where username='lisi';

-- 基本插入

insert into blogs(title,content,createtime)values("标题A","内容B",1546870368066,"dahl");