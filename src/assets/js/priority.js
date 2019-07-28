// eslint-disable-next-line linebreak-style
// 优先队列算法
function Queue() {
  this.dataStore = []; //存放队列的数组，初始化为空
  this.enqueue = enqueue; //向队列尾部添加一个元素
  this.dequeue = dequeue; //出队时，先找出优先级最高的元素，再按照先进先出出队。
  this.theFront = theFront; //读取队首的元素
  this.back = back; //对取队尾的元素
  this.toStrings = toStrings; //显示队列内的所有元素
  this.empty = empty; //判断队列是否为空
}
/*先定义存储队列元素的对象*/
function Patient(read, comment, content, author, data, postId) {
  this.comment = comment;
  this.read = read; //优先级
  this.content = content;
  this.author = author;
  this.data = data;
  this.postId = postId;
}

function enqueue(element) {
  this.dataStore.push(element);
}

function dequeue() { //出队
  var minindex = 0;
  var priority = this.dataStore[0].comment; //
  for (var i = 1; i < this.dataStore.length; i++) {
    if (this.dataStore[i].comment < priority) {
      priority = this.dataStore[i].comment;
      minindex = i;
    }
  }
  return this.dataStore.splice(minindex, 1);
}

function theFront() {
  return this.dataStore[0];
}

function back() {
  return this.dataStore[this.dataStore.length - 1];
}

function toStrings() {
  return this.dataStore;
}

function empty() {
  if (this.dataStore.length == 0) {
    return true;
  } else {
    return false;
  }
}

/*优先队列的实现*/
/* var ed = new Queue();
var p = new Patient("aa",5);
ed.enqueue(p);

var p = new Patient("bb",4);
ed.enqueue(p);

var p = new Patient("dd",3);
ed.enqueue(p);

var p = new Patient("ee",1);

ed.enqueue(p);
var p = new Patient("ww",2);
ed.enqueue(p);
var p = new Patient("ww",0);
ed.enqueue(p); */
//console.log(ed.toStrings());
//console.log(ed.dequeue());//[ Patient { name: 'ee', code: 1 } ]
//console.log(ed.dequeue());//[ Patient { name: 'cc', code: 3 } ]
//console.log(ed.dequeue());//[ Patient { name: 'dd', code: 3 } ]
/* console.log(ed.toStrings()); */
export {
  Queue,
  Patient
}
