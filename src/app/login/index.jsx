import React from 'react'
import { observer, inject } from 'mobx-react'
import { Form, Button, Input, Icon } from 'antd'
import { GlobalFooter } from 'ant-design-pro'

import Logo from '../../constant/image/logo.png'
import './index.less'

const FormItem = Form.Item

@Form.create()
@inject('userActions', 'userStore')
@observer
class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.actions = props.userActions
    this.store = props.userStore
  }

  handleSubmit = e => {
    e.preventDefault()

    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        let r = await this.actions.login(values)
        if (r && r.code === 200) {
          window.location.assign(
            location.origin + location.pathname + '#' + '/home'
          )
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const footerLinks = [
      {
        key: 'github',
        title: <Icon type="github" />,
        href: 'https://github.com/oddisland/hznu-tes',
        blankTarget: true,
      },
      {
        key: 'email',
        title: <Icon type="mail" />,
        href: 'mailto:toby.islanddd@gmail.com',
        blankTarget: false,
      },
      {
        key: 'share',
        title: <Icon type="share-alt" />,
        href: '#',
        blankTarget: false,
      }
    ]

    return (
      <div className='login__container'>
        <div className='login__content'>
          <div className='login__header'>
            <img alt='logo' src={Logo} />
            <span>学科竞赛评价系统</span>
          </div>

          <div className='login__form'>
            <Form onSubmit={this.handleSubmit}>
              <FormItem hasFeedback>
                {getFieldDecorator('account', {
                  rules: [{ required: true, message: '请输入账号' }]
                })(
                  <Input
                    name='account'
                    prefix={<Icon type='user' />}
                    placeholder='请输入账号'
                  />
                )}
              </FormItem>
              <FormItem hasFeedback>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码！' }]
                })(
                  <Input.Password
                    prefix={<Icon type='lock' />}
                    name='password'
                    type='password'
                    placeholder='请输入密码'
                  />
                )}
              </FormItem>

              <Form.Item>
                <Button
                  className='login__btn'
                  type='primary'
                  htmlType='submit'
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className='login__footer'>
          <GlobalFooter links={footerLinks} copyright='学科竞赛评价系统 © 2020 oddisland' />
        </div>
      </div>
    )
  }
}

export default LoginForm
