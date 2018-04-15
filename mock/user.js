import { parse } from 'url';
import moment from 'moment';

// mock userListDataSource
let actionResult = {
	"success": true,
	"msg": "操作成功!",
	"status": null,
	"data": null
}

let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
    tableListDataSource.push({
      id: i,
      code: Math.floor(Math.random() * 1000),
      userName: `qulili${i}`,
      name: '曲丽丽',
      phone:'13000000000',
      dept:'信息科',
      userFrom:'HR',
      status: Math.floor(Math.random() * 10) % 2,
      updateTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
      createTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    });
  }

  export function getUserList(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }
  
    const params = parse(url, true).query;
  
    let dataSource = [...tableListDataSource];
  
    if (params.sorter) {
      const s = params.sorter.split('_');
      dataSource = dataSource.sort((prev, next) => {
        if (s[1] === 'descend') {
          return next[s[0]] - prev[s[0]];
        }
        return prev[s[0]] - next[s[0]];
      });
    }
  
    if (params.status) {
      const status = params.status.split(',');
      let filterDataSource = [];
      status.forEach((s) => {
        filterDataSource = filterDataSource.concat(
          [...dataSource].filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
        );
      });
      dataSource = filterDataSource;
    }
  
    if (params.no) {
      dataSource = dataSource.filter(data => data.no.indexOf(params.no) > -1);
    }
  
    let pageSize = 10;
    if (params.pageSize) {
      pageSize = params.pageSize * 1;
    }
  

    const data = {
        list: dataSource,
        pagination: {
          total: dataSource.length,
          pageSize,
          current: parseInt(params.currentPage, 10) || 1,
        },
      };
    
    actionResult.data = data;
    const result = {...actionResult};
  
    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
  }


  export function postUser(req, res, u, b) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }
  
    const body = (b && b.body) || req.body;
    const { method, id, description } = body;
  
    switch (method) {
      /* eslint no-case-declarations:0 */
      case 'delete':
        tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);
        break;
      case 'post':
        const i = Math.ceil(Math.random() * 10000);
        tableListDataSource.unshift({
            id: i,
            code: Math.floor(Math.random() * 1000),
            userName: description,
            name: '曲丽丽',
            phone:'13000000000',
            dept:'信息科',
            userFrom:'HR',
            status: Math.floor(Math.random() * 10) % 2,
            updateTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
            createTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
        });
        break;
      default:
        break;
    }
  

    const data = {
        list: tableListDataSource,
        pagination: {
          total: tableListDataSource.length,
        },
      };
    
    actionResult.data = data;
    const result = {...actionResult};
  
    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
  }


  export function getUser(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }
    
    var index = url.lastIndexOf("\/");
    var id  = parseInt(url.substring(index + 1, url.length));

    var data = tableListDataSource.find(function(value, index, arr) {  
      if(value.id == id){
        return value;
      }
      });

    data = {
      ...data,
      email:"12345@qq.com",
      validDate:new Date('2099-01-01'),
      gender:0,
    }
    
    actionResult.data = data;
    const result = {...actionResult};
  
    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
  }


  export function removeUser(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }
    
    var index = url.lastIndexOf("\/");
    var id  = parseInt(url.substring(index + 1, url.length));

    tableListDataSource = tableListDataSource.filter(item => item.id != id);
    actionResult.data = id;
    const result = {...actionResult};

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
  }

  export default {
    getUserList,
    postUser,
    getUser,
  };