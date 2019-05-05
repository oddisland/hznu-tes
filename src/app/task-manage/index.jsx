import React from 'react'
import { inject, observer } from 'mobx-react'
import { Card, Button, List, Tag, Radio, Input } from 'antd'
import moment from 'moment'

import EditTaskModal from './component/EditTaskModal'
import './index.less'

@inject('taskManageActions', 'taskManageStore')
@observer
class TaskManage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalVisible: false,
      status: '',
      listLoading: false,
      currentTask: {}
    }
  }

  componentDidMount() {
    this.props.taskManageActions.fetch()
  }

  handleSearch = e => {
    console.log(e)
    this.props.taskManageActions.search({
      query: e
    })
  }

  getTag = endDate => {
    return moment() > moment(endDate) ?
      <Tag className='status-tag' color='#f50'>已截止</Tag> :
      <Tag className='status-tag' color='#87d068'>进行中</Tag>
  }

  render() {
    const { listLoading, status, isModalVisible, currentTask } = this.state
    const { tasks } = this.props.taskManageStore

    const ListContent = ({ data: { startDate, endDate, taskClass } }) => (
      <div className='list-content'>
        <div>
          <span>起始日期：</span>
          {moment(startDate).format('YYYY-MM-DD')}
        </div>
        <div>
          <span>截止日期：</span>
          {moment(endDate).format('YYYY-MM-DD')}
        </div>
      </div>
    )

    const extraContent = (
      <div className='extraContent'>
        <Input.Search
          className='extraContentSearch'
          placeholder='请输入任务名称检索'
          onSearch={this.handleSearch}
        />
      </div>
    )

    return (
      <Card title='任务管理' bordered={false} extra={extraContent}>
        <Button
          type='dashed'
          icon='plus'
          className='create-btn'
          onClick={() =>
            this.setState({ isModalVisible: true, status: 'create' })
          }
        >
          新建
        </Button>

        <List
          size='middle'
          rowKey='id'
          loading={listLoading}
          dataSource={tasks}
          pagination={{
            pageSize: 5,
            showQuickJumper: true
          }}
          renderItem={item => (
            <List.Item
              className='list-item'
              key={item._id}
              actions={[
                <a onClick={() => this.setState({ isModalVisible: true, status: 'edit', currentTask: item })}>编辑</a>,
                <a>删除</a>
              ]}
            >
              <List.Item.Meta
                title={
                  <>
                    {this.getTag(item.endDate)}
                    <span style={{marginLeft: 4}}>{item.taskName}</span>
                  </>
                }
                description={item.taskDesc}
              />
              <ListContent data={item} />
            </List.Item>
          )}
        />

        <EditTaskModal
          status={status}
          visible={isModalVisible}
          data={status === 'edit' ? currentTask : {}}
          onCancel={() => this.setState({ isModalVisible: false })}
        />
      </Card>
    )
  }
}

export default TaskManage