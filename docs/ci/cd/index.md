---
title: CI/CD
order: 9
group:
  title: gitlab
---

##### gitlab与github双向同步问题
> https://www.jianshu.com/p/cf61a7408175

##### docker安装gitlab(ubuntu)
> 1. start
```sh
sudo docker run --detach \
    --hostname 62.234.22.126 \
    --publish 443:443 --publish 80:80 --publish 2222:22 \
    --name gitlab \
    --restart always \
    --volume $HOME/docker/gitlab/config:/etc/gitlab \
    --volume $HOME/docker/gitlab/logs:/var/log/gitlab \
    --volume $HOME/docker/gitlab/data:/var/opt/gitlab \
    gitlab/gitlab-ce:latest
``` 

> 2. 容器运行成功之后
```sh
vim /srv/gitlab/config/gitlab.rb

#  配置http协议所使用的访问地址,不加端口号默认为80
external_url 'http://62.234.22.126'
# 配置ssh协议所使用的访问地址和端口
gitlab_rails['gitlab_ssh_host'] = 'http://62.234.22.126'
# 此端口是run时22端口映射的端口
gitlab_rails['gitlab_shell_ssh_port'] = 2222   
```
> 3. docker restart gitlab
> 4. done

##### gitlab

> 1. 查看root密码
```sh
# 进入容器
docker exec -it {CONTAINER ID/NAME} /bin/bash

# 容器内
vim /etc/gitlab/initial_root_password

```

> 2. 导入项目 Admin Area > Settings > General > Visibility and access controls

> 3. 双向同步 Settings > Repository > Mirroring repositories
> Git repository URL
> Password > Github personal access token
