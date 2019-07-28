/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
// eslint-disable-next-line linebreak-style
// eslint-disable-next-line import/no-extraneous-dependencies
import Mock from 'mockjs';

// eslint-disable-next-line linebreak-style
// eslint-disable-next-line prefer-destructuring
// eslint-disable-next-line prefer-const
// eslint-disable-next-line prefer-destructuring
const Random = Mock.Random;
//股吧
const Posts = () => {
  // eslint-disable-next-line prefer-const
  let PostList = [];
  // eslint-disable-next-line indent
    // eslint-disable-next-line indent
    // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 30; i++) {
    const post = {
      read: Random.integer(1, 10000),
      comment: Random.integer(1, 1000),
      content: Random.ctitle(10, 30),
      author: Random.ctitle(5, 10),
      data: Random.time('a HH:mm:ss'),
      postId: Random.integer(10000, 99999),
    };
    PostList.push(post);
  }
  return PostList;
};
Mock.mock('http://www.data.com/getPost', Posts);

// 股票交易
const stockInfo = () => {
  // eslint-disable-next-line prefer-const
  let stockList = [];
  // eslint-disable-next-line indent
    // eslint-disable-next-line indent
    // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 1; i++) {
    const stockSingle = {
      stock_id: 13434,
      stock_name: '东方财富',
      price: 12.8,
      stockMinPrice: 11.5,
      // eslint-disable-next-line no-dupe-keys
      stockMinPrice: 13.5,
      balance: 12122, // 余额
      number: 123,
    };
    stockList.push(stockSingle);
  }
  return stockList;
};
Mock.mock('http://www.Stockdata.com/getPost', stockInfo);

let stockList = req => {
  let stockList = [];
  for(let i = 0;i < 8; i++){
    let stock = {
      id:Random.integer(1,10),
      name:Random.ctitle(1,5),
      price:Random.float(1,5,0,9),
      range:Random.float(1,5,0,9)
    };
    stockList.push(stock);
  }
  return stockList
};

let sList = req => {
  let sList = [];
  for(let i = 0;i < 5; i++){
    let stock = {
      id:Random.integer(1,10),
      name:Random.ctitle(1,5),
      price:Random.float(1,5,0,9),
      range:Random.float(1,5,0,9)
    };
    sList.push(stock);
  }
  return sList
};

Mock.mock('http://www.zxy.com/getStockItem',stockList);
Mock.mock('http://www.zxy.com/stockList',sList);


