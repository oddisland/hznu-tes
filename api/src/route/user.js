import User from '../model/User'
import express from 'express'
import authToken from '../middleware/authToken'

const router = express.Router()

router.post('/register', (req, res) => {
  const {
    account,
    userName,
    password,
    role
  } = req.body
  const user = new User({
    account,
    userName,
    role
  })

  user.setPassword(password)
  user
    .save()
    .then(r => {
      res.status(200).json({
        code: 200,
        msg: '注册成功',
      })
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        msg: '注册失败',
        data: e,
      })
    })
})

router.post('/login', (req, res) => {
  const {
    account,
    password
  } = req.body

  User.findOne({
      account,
    })
    .then(r => {
      if (r && r.isValidPassword(password)) {
        res.status(200).json({
          code: 200,
          msg: '登录成功',
          data: r.toAuthJSON(),
        })
      } else {
        throw Error()
      }
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        msg: '登录失败',
        data: e,
      })
    })
})

router.post('/resetPwd', authToken, (req, res) => {
  const {
    newPwd,
    oldPwd
  } = req.body
  const {
    _id
  } = req.currentUser

  User.findOne({
      _id,
    })
    .then(r => {
      if (r.isValidPassword(oldPwd)) {
        r.setPassword(newPwd)
        r.save().then(() => {
          res.status(200).json({
            code: 200,
            msg: '修改密码成功',
            data: [],
          })
        })
      } else {
        throw Error()
      }
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        msg: '修改密码失败',
        data: e,
      })
    })
})

router.get('/fetch', (req, res) => {
  const role = req.query.role

  User
    .find({ role })
    .select('_id account userName role')
    .exec()
    .then(r => {
      res.status(200).json({
        code: 200,
        data: r
      })
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        data: e
      })
    })
})

router.get('/menu', (req, res) => {
  const role = parseInt(req.query.role)

  if (role === 0) {
    res.status(200).json({
      code: 200,
      data: [{
          title: '打分评价',
          icon: 'form',
          path: '/evaluate'
        },
        {
          title: '成绩管理',
          icon: 'dashboard',
          path: '/scoremanage'
        }
      ]
    })
  } else if (role === 1) {
    res.status(200).json({
      code: 200,
      data: [{
          title: '任务管理',
          icon: 'project',
          path: '/taskmanage'
        },
        {
          title: '打分评价',
          icon: 'form',
          path: '/evaluate'
        },
        {
          title: '成绩管理',
          icon: 'dashboard',
          path: '/scoremanage'
        },
        {
          title: '标准管理',
          icon: 'calculator',
          path: '/standardmanage'
        },
        {
          title: '班级管理',
          icon: 'team',
          path: '/classmanage'
        }
      ]
    })
  } else if (role === 2) {
    res.status(200).json({
      code: 200,
      data: [{
          title: '我的任务',
          icon: 'folder-open',
          path: '/mytask'
        },
        {
          title: '打分评价',
          icon: 'form',
          path: '/evaluate'
        },
        {
          title: '我的成绩',
          icon: 'audit',
          path: '/myscore'
        }
      ]
    })
  } else {
    res.status(500).json({
      code: -1,
      data: []
    })
  }
})

export default router