import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

class Me extends Component {
  state = {
    userInfo: null
  }
  componentDidMount() {
    if (sessionStorage.loginname && sessionStorage.avatar_url) {
      this.setState({
        userInfo: {
          loginname: sessionStorage.loginname,
          avatar_url: sessionStorage.avatar_url
        }
      })
    }
  }
  render() {
    const { userInfo } = this.state
    const inner = userInfo ? (
      <div className="inner">
        <Link to={`/user/${userInfo.loginname}`}>
          <img src={userInfo.avatar_url} alt="" />
        </Link>
        <span>{userInfo.loginname}</span>
      </div>
    ) : (
      <div>请登录</div>
    )
    return (
      <Wrap>
        <div className="top">个人信息</div>
        {inner}
      </Wrap>
    )
  }
}

export default Me
const Wrap = styled.div`
  width: 290px;
  height: 170px;
  border-radius: 8px;
  background-color: #fff;
  .top {
    height: 40px;
    color: #51585c;
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 8px;
    border-bottom-left-radius: none;
    border-bottom-left-radius: none;
  }
  .inner {
    padding: 10px;
  }
  .inner > a > img {
    width: 48px;
    height: 48px;
    border-radius: 3px;
  }
  .inner > span {
    color: #778087;
    font-size: 16px;
    margin-left: 5px;
  }
`
