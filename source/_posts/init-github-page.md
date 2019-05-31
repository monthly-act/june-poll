---
title: Github page 만들기
date: 2019-05-31 15:29:10
tags: 
---

### Git 
``` bash
$ git init
$ git checkout -b docs
$ git remote add origin https://github.com/monthly-act/frontend.git
$ git push -u origin docs
```


### hexo 설치
https://hexo.io/docs/setup  

``` bash
$ npm install -g hexo-cli
$ hexo init june2019
$ cd june2019
$ npm install
```

### Run server
``` bash
$ hexo server
```

### Generate static files
``` bash
$ hexo generate
```

### Deploy to remote sites
``` bash
$ npm install hexo-deployer-git --save 
$ hexo deploy
```

### Theme 변경
https://github.com/tiaanduplessis/hexo-theme-brewski
```
$ git submodule add https://github.com/lotabout/very-simple themes/very-simple

$ npm install --save hexo-renderer-jade hexo-renderer-sass
```

### Writing
https://hexo.io/docs/writing  
- markdown 형식으로 작성

- 작성중인 문서는 _drafts 에 작성
``` bash
$ hexo new draft "title"
```

- 바로 공개할 문서는 _posts 에 작성
``` bash
$ hexo new post "title"
```