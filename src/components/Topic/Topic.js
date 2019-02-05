import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { filter } from '../../static/filter'
import Author from '../Author/Author'
import { Link } from 'react-router-dom'

class Topic extends Component {
  state = {
    topic: null,
    comment: '',
    otherComment: ''
  }
  getTopic = () => {
    const { id } = this.props.match.params
    axios
      .get(
        `https://cnodejs.org/api/v1/topic/${id}?accesstoken=03a29e99-00d2-43f5-a74e-9efd65197acb`
      )
      .then(res => {
        //  将该对象下的 replies 数组内的每一项添加一条属性  isShowArea 来控制该评论下的 文本输入框是否展示
        res.data.data.replies = res.data.data.replies.map(e => {
          e.isShowArea = false
          return e
        })
        this.setState({
          topic: res.data.data
        })
      })
  }
  componentDidMount() {
    // 要分成登录和未登录
    // 登陆的时候请求的文章详情是需要参数的
    const { id } = this.props.match.params
    axios
      .get(
        `https://cnodejs.org/api/v1/topic/${id}?accesstoken=03a29e99-00d2-43f5-a74e-9efd65197acb`
      )
      .then(res => {
        const arr = res.data.data.replies
        for (let i = 0; i < arr.length; i++) {
          arr[i].isShowArea = false
        }
        console.log(res.data.data)
        this.setState({
          topic: res.data.data
        })
      })
  }
  handelComment = event => {
    this.setState({
      comment: event.target.value
    })
  }
  handelOtherComment = event => {
    this.setState({
      otherComment: event.target.value
    })
  }
  showArea = (loginname, id) => {
    const { topic } = this.state
    const newTopic = { ...topic }
    newTopic.replies = newTopic.replies.map(e => {
      if (e.isShowArea) {
        e.isShowArea = false
      }
      if (e.id === id) {
        e.isShowArea = true
      }
      return e
    })
    this.setState({
      topic: newTopic,
      otherComment: `@${loginname} `
    })
  }
  addComment = id => {
    const { comment } = this.state
    const url = `https://cnodejs.org/api/v1/topic/${id}/replies`
    axios
      .post(url, {
        accesstoken: '03a29e99-00d2-43f5-a74e-9efd65197acb',
        content: comment
      })
      .then(res => {
        this.getTopic()
        this.setState({
          comment: ''
        })
      })
  }
  addOtherComment = id => {
    const { topic, otherComment } = this.state
    axios
      .post(`https://cnodejs.org/api/v1//topic/${topic.id}/replies`, {
        accesstoken: '03a29e99-00d2-43f5-a74e-9efd65197acb',
        content: otherComment,
        reply_id: id
      })
      .then(res => {
        this.getTopic()
        this.setState({
          otherComment: ''
        })
      })
  }
  ups = id => {
    const { topic } = this.state
    axios
      .post(`https://cnodejs.org/api/v1/reply/${id}/ups`, {
        accesstoken: '03a29e99-00d2-43f5-a74e-9efd65197acb'
      })
      .then(res => {
        const userId = '5c10863a7ec239239ff55fab'
        const newTopic = { ...topic }
        // 一下操作是更新本地的点赞  也就是更新了 topic.replies 下面的某条评论下的 ups 数组
        // 当返回的 action 是 up 的时候，也就说明原来没点赞，点了之后就要讲你的 id 添加到 ups 内，反之删除，在这里为什么不使用 axios 请求重新获取数据，因为可以直接对 state 进行修改，就完全和网上的数据一致了，所以不发请求更新。
        if (res.data.action === 'up') {
          newTopic.replies.find(e => e.id === id).ups.push(userId)
        } else {
          newTopic.replies.find(e => e.id === id).ups = newTopic.replies
            .find(e => e.id === id)
            .ups.filter(e => e !== userId)
        }
        this.setState({
          topic: newTopic
        })
      })
  }
  collect = id => {
    const { topic } = this.state
    const isCollect = topic.is_collect
    axios
      .post(
        `https://cnodejs.org/api/v1/topic_collect/${
          isCollect ? 'de_collect' : 'collect'
        }`,
        {
          accesstoken: '03a29e99-00d2-43f5-a74e-9efd65197acb',
          topic_id: id
        }
      )
      .then(() => {
        const newTopic = { ...topic }
        newTopic.is_collect = !newTopic.is_collect
        this.setState({
          topic: newTopic
        })
      })
  }
  render() {
    const { topic, comment, otherComment } = this.state
    const article = topic ? (
      <Wrap>
        <h2>{topic.title}</h2>
        <Ifo>
          ·作者{topic.author.loginname}·来自{filter(topic.tab)}
        </Ifo>
        <button
          onClick={() => {
            this.collect(topic.id)
          }}
        >
          {topic.is_collect ? '取消收藏' : '收藏'}
        </button>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: topic.content }}
        />
      </Wrap>
    ) : (
      <div>请稍等</div>
    )
    const replayList = !topic ? (
      <div>请稍等</div>
    ) : (
      <div>
        {topic.replies.length === 0
          ? '评论为空'
          : topic.replies.map(reply => (
              <div key={reply.id}>
                <Link to={`/user/${reply.author.loginname}`}>
                  <img
                    style={{ width: '30px', borderRadius: ' 3px' }}
                    src={reply.author.avatar_url}
                    alt=""
                  />
                </Link>
                <span style={{ marginLeft: '5px' }}>
                  {reply.author.loginname}
                </span>
                <div>
                  <button
                    onClick={() => {
                      this.ups(reply.id)
                    }}
                  >
                    点赞
                  </button>
                  {reply.ups.length}
                </div>
                <p dangerouslySetInnerHTML={{ __html: reply.content }} />
                <button
                  onClick={() => {
                    this.showArea(reply.author.loginname, reply.id)
                  }}
                >
                  回复
                </button>
                {reply.isShowArea ? (
                  <div>
                    <textarea
                      value={otherComment}
                      onChange={this.handelOtherComment}
                    />
                    <button
                      onClick={() => {
                        this.addOtherComment(reply.id)
                      }}
                    >
                      回复
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ))}
      </div>
    )

    return (
      <>
        {article}
        <Reply>
          <div className="title">回复</div>
          <div className="inner">{replayList}</div>
        </Reply>
        <CreateReply>
          <div className="title">添加回复</div>
          <div className="inner">
            <textarea value={comment} onChange={this.handelComment} />
            <button onClick={() => this.addComment(topic.id)}>回复</button>
          </div>
        </CreateReply>
        <Author topic={topic} />
      </>
    )
  }
}

export default Topic

const Wrap = styled.div`
  width: 78%;
  border-radius: 8px;
  background-color: #fff;
  padding: 20px;
  padding-bottom: 10px;
  .content img {
    width: 100%;
  }
`
const Ifo = styled.span`
  font-size: 12px;
  color: #838383;
  margin-bottom: 20px;
  display: block;
`
const Reply = styled.div`
  width: 78%;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 8px;
  > .title {
    width: 100%;
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 8px 8px 0 0;
  }
  > .inner {
    padding: 10px;
    background-color: #fff;
    border-radius: 0px 0px 8px 8px;
  }
  > .inner p {
    margin: 0;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  > .inner button {
    border-radius: 3px;
    background-color: #80bd01;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-bottom: 10px;
  }
`
const CreateReply = styled.div`
  width: 78%;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 8px;
  .title {
    width: 100%;
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 8px 8px 0 0;
  }
  .inner {
    padding: 10px;
    background-color: #fff;
    border-radius: 0px 0px 8px 8px;
  }
  .inner textarea {
    width: 200px;
    height: 100px;
    outline: none;
    border: none;
    border: 1px solid #ccc;
    border-radius: 3px;
    resize: none;
  }
  .inner button:hover {
    background-color: #05c;
  }
  .inner button {
    width: 50px;
    display: block;
    color: #fff;
    background-color: #00b3d4;
    border: none;
    border-radius: 3px;
    outline: none;
    transition: all 500ms ease;
  }
`
