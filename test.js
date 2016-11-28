var keyword = require('./jsKeyword');

console.log(keyword.push(["a1", "b1", "c1"]));
console.log(keyword.push("a2", "b2", "c2"));

keyword.remove(["a1"]);
keyword.remove("b1");

console.log(keyword.check(["a1", "b1", "c1"]));

console.log(keyword.search("a1 a2 b1 b2 c1 c2 test."));

console.log(keyword.autoComplete("c"));
console.log(keyword.autoComplete("2"));

keyword.clear();

console.log(keyword.check(["a1", "b1", "c1"]));