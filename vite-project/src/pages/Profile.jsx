import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Avatar } from 'antd';
import { Tickets } from './Tickets/Tickets';
import './Profile.scss';


export const Profile = () => {
    const navigate = useNavigate()

    const [userData, setUserData] = useState({})
    const token = JSON.parse(localStorage.getItem('token'))
    const axiosConfig = {
        headers: {
            'Authorization': token
        }
    }
        useEffect(() => {
            if(!token) {
                navigate('/login')
            }
            const getUser = async () => {
                const res = await axios.get (`https://backend-ecommerce-production-ce12.up.railway.app/users/id/`, axiosConfig)
                if (res.data) {
                    const { username, email, role } = res.data
                setUserData({username, email, role})
                }
            }
            getUser()
        },[]) 

    return (
        <div className="profile-container">
            { userData &&
                <div className='container-profile'>
                <Avatar
                    size={128}
                    icon={<UserOutlined />}
                    className= 'avatar'
                />
            <Descriptions className="description-container" column={1} >
                <Descriptions.Item label="Username" className="username" layout='vertical' >
                   {userData.username}
                </Descriptions.Item>
                <Descriptions.Item label="Email" className="username">
                    {userData.email}
                </Descriptions.Item>
                <Descriptions.Item label="Role" className="username">
                   {userData.role}
                </Descriptions.Item>
            </Descriptions>
            </div>
            }
            <Tickets/>
        </div>
    );
};


