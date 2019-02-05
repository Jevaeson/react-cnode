import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Header extends Component {
  state = {
    token: '03a29e99-00d2-43f5-a74e-9efd65197acb',
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
    const { token, userInfo } = this.state
    return (
      <Head>
        <div className='container'>
          <Link to='/'>
            <svg
              width='120'
              height='28'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 427.3 100.4'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill='#fff'
                d='M127.987 52.994c0-1.084-.57-2.08-1.506-2.617l-24.937-14.352a2.934 2.934 0 0 0-1.373-.396h-.258a2.973 2.973 0 0 0-1.377.396L73.598 50.377a3.023 3.023 0 0 0-1.508 2.617l.055 38.644c0 .538.279 1.038.752 1.301a1.446 1.446 0 0 0 1.496 0l14.821-8.485a3.036 3.036 0 0 0 1.507-2.613V63.784a3 3 0 0 1 1.504-2.606l6.311-3.636a3 3 0 0 1 3.008 0l6.308 3.636a3 3 0 0 1 1.506 2.606V81.84c0 1.074.578 2.062 1.51 2.613l14.816 8.485a1.464 1.464 0 0 0 1.506 0c.459-.263.748-.763.748-1.301l.049-38.643zM261.147-.129a1.508 1.508 0 0 0-2.241 1.315v38.271c0 .376-.201.724-.525.913a1.06 1.06 0 0 1-1.056 0l-6.246-3.599a3.013 3.013 0 0 0-3.01.001L223.122 51.17a3.007 3.007 0 0 0-1.506 2.607v28.801c0 1.076.573 2.07 1.505 2.609l24.946 14.408a3.011 3.011 0 0 0 3.014 0l24.95-14.408a3.012 3.012 0 0 0 1.506-2.609V10.786a3.013 3.013 0 0 0-1.545-2.631L261.147-.129zm-2.314 73.244c0 .27-.145.519-.378.651l-8.564 4.938a.749.749 0 0 1-.752 0l-8.566-4.938a.752.752 0 0 1-.377-.651v-9.891c0-.269.145-.517.376-.651l8.566-4.947a.752.752 0 0 1 .754 0l8.564 4.947a.756.756 0 0 1 .377.651v9.891zM350.4 62.966a3.011 3.011 0 0 0 1.499-2.604v-6.979a3.012 3.012 0 0 0-1.5-2.605l-24.787-14.392a3.015 3.015 0 0 0-3.02-.004l-24.938 14.397a3.012 3.012 0 0 0-1.506 2.609v28.793c0 1.083.58 2.081 1.521 2.616l24.783 14.122a3.015 3.015 0 0 0 2.954.018l14.989-8.332c.477-.266.772-.765.774-1.308a1.503 1.503 0 0 0-.755-1.315L315.32 73.576a1.503 1.503 0 0 1-.758-1.306v-9.024c0-.538.287-1.036.755-1.304l7.811-4.504a1.505 1.505 0 0 1 1.503 0l7.815 4.504c.467.268.754.766.754 1.304v7.101a1.507 1.507 0 0 0 2.263 1.303l14.937-8.684z'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill='#80bd01'
                d='M173.35 36.23a3.012 3.012 0 0 1 3.012 0l24.943 14.395a3.008 3.008 0 0 1 1.508 2.609v28.811a3.014 3.014 0 0 1-1.506 2.61L176.363 99.06a3.016 3.016 0 0 1-3.014 0l-24.938-14.405a3.014 3.014 0 0 1-1.506-2.61V53.233c0-1.076.574-2.071 1.507-2.608L173.35 36.23z'
              />
              <path
                fill='#80bd01'
                d='M398.833 99.472a4.941 4.941 0 0 1-2.468-.66l-7.853-4.646c-1.172-.656-.601-.888-.213-1.023 1.563-.543 1.881-.668 3.551-1.614.173-.099.404-.062.584.045l6.033 3.582a.775.775 0 0 0 .728 0l23.522-13.577a.739.739 0 0 0 .358-.636V53.796a.757.757 0 0 0-.364-.647l-23.513-13.565a.736.736 0 0 0-.724 0L374.97 53.152a.754.754 0 0 0-.373.644v27.146c0 .26.144.506.371.629l6.442 3.722c3.496 1.748 5.638-.31 5.638-2.379v-26.8c0-.379.305-.678.683-.678h2.983a.68.68 0 0 1 .682.678v26.8c0 4.666-2.541 7.342-6.965 7.342-1.36 0-2.43 0-5.418-1.472l-6.168-3.551a4.97 4.97 0 0 1-2.467-4.291V53.796c0-1.763.942-3.41 2.467-4.287l23.521-13.592c1.489-.841 3.468-.841 4.944 0l23.519 13.592a4.967 4.967 0 0 1 2.472 4.287v27.146a4.979 4.979 0 0 1-2.472 4.291L401.31 98.812a4.944 4.944 0 0 1-2.477.66'
              />
              <path
                fill='#80bd01'
                d='M406.099 80.771c-10.294 0-12.449-4.725-12.449-8.687 0-.377.303-.678.68-.678h3.041a.68.68 0 0 1 .675.575c.459 3.097 1.828 4.658 8.054 4.658 4.954 0 7.064-1.121 7.064-3.75 0-1.515-.598-2.64-8.299-3.394-6.437-.638-10.416-2.06-10.416-7.208 0-4.745 4-7.576 10.707-7.576 7.535 0 11.263 2.615 11.736 8.227a.688.688 0 0 1-.181.523.692.692 0 0 1-.498.217h-3.052a.679.679 0 0 1-.661-.531c-.731-3.258-2.513-4.299-7.345-4.299-5.41 0-6.039 1.885-6.039 3.297 0 1.711.742 2.209 8.047 3.176 7.229.955 10.662 2.309 10.662 7.39 0 5.125-4.274 8.06-11.726 8.06'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill='#80bd01'
                d='M323.735 61.618a.573.573 0 0 1 .577 0l4.787 2.762c.18.103.289.294.289.5v5.527a.577.577 0 0 1-.289.501l-4.787 2.763a.577.577 0 0 1-.577 0l-4.783-2.763a.577.577 0 0 1-.289-.501V64.88c0-.206.109-.397.289-.5l4.783-2.762z'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill='#fff'
                d='M36.28 61.87c1.098.65 1.358.255 1.742.035.385-.221 14.695-8.411 15.606-8.857.912-.446 1.315-1.915.114-2.61-1.201-.697-25.41-14.721-24.241-14.12 1.259.646-1.202-.829-2.626-.175-1.425.654-23.231 13.192-24.777 14.075-1.545.883-2.032 1.731-2.027 2.907.004 1.176-.078 27.253 0 28.801.078 1.548.69 2.052 1.506 2.609.816.558 22.901 13.505 24.572 14.41 1.671.907 2.768.597 3.853-.04 1.085-.639 22.727-13.003 23.593-13.554.866-.551 1.653-1.969-.157-2.992-1.811-1.022-14.779-8.693-15.279-8.943s-.796-.255-1.52.151c-.724.408-7.222 4.062-8.013 4.524s-.904.254-1.283.033c-.378-.222-7.085-4.135-7.859-4.571s-.866-.656-.868-1.25c-.001-.593-.018-8.121.023-8.998.04-.877.165-1.074.962-1.548.797-.474 6.695-3.978 7.166-4.293.47-.315 1.459-.345 2.231.108.772.452 6.184 3.647 7.282 4.298'
              />
            </svg>
          </Link>
          {userInfo ? (
            <div>
              <img src={userInfo.avatar_url} alt='' />
              <button onClick={this.logout}>登出</button>
              <Link to='/topic/create'>发布话题</Link>
            </div>
          ) : (
            <div>
              <input type='text' value={token} onChange={this.hanldeInput} />
              <button onClick={this.login}>登录</button>
            </div>
          )}
        </div>
      </Head>
    )
  }
  hanldeInput = event => {
    this.setState({
      token: event.target.value
    })
  }
  login = () => {
    const { token } = this.state
    if (token.trim()) {
      axios
        .post('https://cnodejs.org/api/v1/accesstoken', {
          accesstoken: token
        })
        .then(res => {
          // 存储信息
          sessionStorage.loginname = res.data.loginname
          sessionStorage.avatar_url = res.data.avatar_url
          this.setState({
            userInfo: {
              loginname: res.data.loginname,
              avatar_url: res.data.avatar_url
            }
          })
        })
        .catch(err => {
          alert('不对哦')
        })
    }
  }
  logout = () => {
    this.setState({
      userInfo: null
    })
    sessionStorage.clear()
  }
}

export default Header
const Head = styled.header`
  width: 100%;
  display: flex;
  height: 50px;
  align-items: center;
  background-color: #444;
  .container {
    width: 85%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .container > div {
    display: flex;
    align-items: center;
  }
  .container > div > input {
    border-radius: 3px;
    outline: none;
    border: none;
  }
  .container > div > button {
    margin-left: 10px;
    border-radius: 3px;
    background-color: #80bd01;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  .container > div > a {
    height: 24px;
    margin-left: 10px;
    border-radius: 3px;
    background-color: #80bd01;
    color: #fff;
    padding: 0px 10px;
  }
  .container > div > button:focus {
    outline: none;
  }
  .container > div > img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
  }
`
