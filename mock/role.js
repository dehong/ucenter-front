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
      name: `角色${i}`,
      description: `角色描述${i}`,
      authority:'应用1,应用2,应用3,应用4',
    });
  }

  export function getRoleList(req, res, u) {
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


  export function addRole(req, res, u, b) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }
  
    const body = (b && b.body) || req.body;
    const { name, description } = body;
  
    const id = Math.ceil(Math.random() * 10000);
    tableListDataSource.unshift({
        id: id,
        name: name,
        description:description,
    });

    actionResult.data = id;
    const result = {...actionResult};
  
    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
  }


  export function removeRole(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }

    const body = (b && b.body) || req.body;
    const { name, description } = body;
    
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
    getRoleList,
  };