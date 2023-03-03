import React from 'react';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext/UserState';
import './AdminUser.scss';
import {DeleteTwoTone , EditTwoTone } from '@ant-design/icons';
import EditProduct from '../../componentes/EditProduct';
import { useNavigate } from 'react-router-dom';

const AdminUser = () => {
    const navigate = useNavigate();
    const {getUsers, users , getUserById , deleteUser} = useContext(UserContext);

    useEffect(()=>{
        getUsers();
    },[])
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (id) => {
    getUserById(id)

    setIsModalVisible(true);

};
const handleDeleteUser = (userId)=>{
    deleteUser(userId)
    console.log(`borrandooo ${userId}`);
}
    return (
        <div className="container-users">
            <div className='btn-container'>

            <button onClick={()=>navigate('/')}>Home</button>
            <button onClick={()=>navigate('/admin')}>Administrador de productos</button>
            </div>

        <div className='admin-user-container'>
            {users.map(user=>{
                return(
                    <div key={user._id} className="user-card-container">
                        <div className='info-container-user'>
                        <h3>{user.username}</h3>
                        <h4>{user.email}</h4>
                        <h5>{user.role}</h5>
                        </div>
                        <div className='action-container-user'>
                        <DeleteTwoTone onClick={()=>handleDeleteUser(user._id)}/>
                        <EditTwoTone onClick={() => {showModal(user._id)
                        console.log('editando')
                    }}/>
                        </div>
                    </div>

)
})}       
            <EditProduct visible={isModalVisible} setVisible={setIsModalVisible}/>
        </div>
        </div>
    );
};

export default AdminUser;