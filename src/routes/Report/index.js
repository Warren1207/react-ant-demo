import React from 'react'
import { Row, Col, Input, Button, Select, Table  } from 'antd';
import { fetch } from "../../libs/http";
const Option = Select.Option;
let queryParams = {
  pageIndex: 1,
  pageSize: 10
};
const statusObj = {
  1: "成功",
  2: "失败",
  0: "进行中"
};

class Report extends React.Component {
  state = {
      columns: [{
        title: '#',
        dataIndex: '',
        width: 50,
        render: (text, record, index) => {
          return index+1;
        }
      },{
        title: '任务场景',
        width: 200,
        dataIndex: 'scenesname',
      },{
        title: '报告名称',
        width: 200,
        dataIndex: 'name',
      },{
        title: '状态',
        width: 120,
        dataIndex: 'state',
        render: (text) => {
            return statusObj[text];
        }
      },{
        title: '类型',
        width: 120,
        dataIndex: 'type',
        render: (text) => {
          return text === 0 ? "手动" : "自动";
        }
      },{
        title: '进度条',
        width: 120,
        dataIndex: 'rateprogress',
        render: (text) => {
          return text+"%";
        }
      },{
        title: '创建时间',
        width: 200,
        dataIndex: 'createdate'
      },{
        title: '备注',
        width: 220,
        dataIndex: 'errormessage'
      }],
      queryData: [],   
      scenesArray: [],   
      loading: false,
      pagination: {
        showTotal : (total) => { return `共 ${total} 条` },
        showSizeChanger: true,
        total: 0,
        pageSize: 10,
      }
  }
  onNameChange = (v) => {
      queryParams.name = v.target.value;
  }
  statusChange = (v) =>{
      queryParams.status = v;
  }
  scenesChange = (v) =>{
      queryParams.scenes = v;
  }
  queryScene() {
    fetch("/scenes/index").then(res => {
      this.setState({
        scenesArray: res.Data
      });
    });
  }
  queryFn = () =>{
    this.setState({
      loading: true
    })
    fetch("/TaskReport/GetTaskReportList", queryParams).then(
      res => {
        this.setState({
          queryData: res.Data,
          pagination: {
            pageSize: 10,
            total: res.TotalCount
          },
          loading: false
        });
      }
    );
  }
  componentDidMount() {
    this.queryFn();
    this.queryScene();
  }
  render() {
    const rowSelection = {
      type: 'radio'
    }
    const { scenesArray } = this.state;
    return (
      <div className="page-wrap">
        <Row gutter={10}>
          <Col className="gutter-row" span={4}>
            <Input placeholder="报告名称" allowClear onChange={this.onNameChange} />
          </Col>
          <Col className="gutter-row" span={3}>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="状态"
              onChange={this.statusChange}              
            >
              <Option value={1}>成功</Option>
              <Option value={2}>失败</Option>
              <Option value={0}>进行中</Option>
            </Select>
          </Col>
          <Col className="gutter-row" span={3}>
            <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="任务场景"
                onChange={this.scenesChange}              
              >
                {scenesArray.map(d => <Option key={d.name}>{d.name}</Option>)}
              </Select>
          </Col>
          <Col className="gutter-row" span={4}>
            <Button type="primary" icon="search" onClick={this.queryFn}>查询</Button>
          </Col>
        </Row>
        <div className="table-wrap">
          <Table bordered rowSelection={rowSelection} rowKey={record => record.id}  columns={this.state.columns} loading={this.state.loading} dataSource={this.state.queryData} pagination={this.state.pagination} scroll={{ y: '100%' }} />
        </div>
      </div>
    )
  }
}

export default Report;