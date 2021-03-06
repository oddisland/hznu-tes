import Standard from '../model/Standard'
import Single from '../model/Single'
import express from 'express'
import authToken from '../middleware/authToken'

const router = express.Router()

router.use(authToken)

router.get('/fetch', (req, res) => {
  Standard
    .find()
    .sort([['createdAt', -1]])
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

router.get('/fetchSingle', (req, res) => {
  const { standardId } = req.query
  Single
    .find({ standardId })
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


router.get('/delete', (req, res) => {
  const { id } = req.query
  Standard
    .deleteOne({ _id: id })
    .then(r => {
      res.status(200).json({
        code: 200,
        msg: '删除成功',
        data: r
      })
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        data: e,
        msg: '删除失败'
      })
    })
})

router.post('/create', (req, res) => {
  const { title } = req.body
  const standard = new Standard({ title })
  standard
    .save()
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

router.post('/createSingle', (req, res) => {
  const { title, content, point, standardId } = req.body
  const single = new Single({ title, content, point, standardId })
  single
    .save()
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

router.post('/updateSingle', (req, res) => {
  const { title, content, point, _id } = req.body
  Single
    .findOneAndUpdate({ _id }, {$set: {
      title, content, point
    }})
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

router.get('/deleteSingle', (req, res) => {
  const { id } = req.query
  Single
    .deleteOne({ _id: id })
    .then(r => {
      res.status(200).json({
        code: 200,
        data: r,
        msg: '删除成功'
      })
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        data: e,
        msg: '删除失败'
      })
    })
})

export default router
