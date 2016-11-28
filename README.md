# jsKeyword

* jsKeyword provide you a easy way to find a string from long text or thousands of tags by fuzzy query.
* jsKeyword 可以从大量标签中迅速进行模糊检索，或从超长文本中检索标签，轻松实现搜索和自动完成功能。

[![npm version](https://badge.fury.io/js/js-keyword.svg)](https://badge.fury.io/js/js-keyword)

## Demo

[http://lab.rijnx.com/jsKeyword/](http://lab.rijnx.com/jsKeyword/) 

## Install

```
npm install --save js-keyword
```

## Usage

### Require Module

```
var keyword = require('js-keyword');
```

### Push Keywords

`Push` will exclude duplicated data automatically. It will return number of successful push.

```
keyword.push(["a", "b", "c", ...]);
keyword.push("a", "b", "c", ...);       // { count: 1 }
```

### Remove

```
keyword.remove(["a", "b", "c", ...]);
keyword.remove("a", "b", "c", ...);
```

### Check

`Check` whether the keyword is in the pool.

```
keyword.check(["a", "b", "c", ...]);
keyword.check("a", "b", "c", ...);
```

It will return a boolean array of existence.

```
[true, false, true, ...]
```

### Search

Use `Search` to find the keyword in a long content. It is like `indexOf` but is much faster.

```
keyword.search("this is a test text.");
```

If succeed, it will return the position of keyword.

```
[
    {
        keyword: "keyword",
        position: {
            start: xxx,
            end:   xxx,
        },
    },
    {
        keyword: "keyword",
        position: {
            start: xxx,
            end:   xxx,
        },
    },
    ...
]
```

### autoComplete

It will return all the keywords which include the input string.

```
keyword.autoComplete(input);
```

Will return an array of string.

```
["keyword", "keyword", ...]
```

## Screenshots

![](http://lab.rijnx.com/jsKeyword/image/1.png)
![](http://lab.rijnx.com/jsKeyword/image/2.png)
