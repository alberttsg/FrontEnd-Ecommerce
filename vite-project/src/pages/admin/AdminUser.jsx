import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext/UserState";
import "./AdminUser.scss";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import EditUser from "../../componentes/EditUser";
import { useNavigate } from "react-router-dom";
import { Card, Avatar } from "antd";

const AdminUser = () => {
  const navigate = useNavigate();
  const { getUsers, users, getUserById, deleteUser } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, []);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (id) => {
    getUserById(id);

    setIsModalVisible(true);
  };
  const handleDeleteUser = (userId) => {
    deleteUser(userId);
    console.log(`borrandooo ${userId}`);
  };
  return (
    <div className='container-users'>
      <div className='btn-container'>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/admin")}>
          Administrador de productos
        </button>
      </div>

      <div className='admin-user-container'>
        {users.map((user) => {
          return (
            <Card
            //   className='user-card-container'
              key={user.id}
              title={user.name}
              style={{ width: 300 }}
            >
              <Card.Meta
                avatar={<Avatar src={ user.avatar ||'https://upload.wikimedia.org/wikipedia/commons/8/87/Avatar_poe84it.png' } alt="Avatar" />}
                title={user.name}
                description={user.email}
              />
              <p>Rol: {user.role}</p>

              <div className='action-container-user'>
                <DeleteTwoTone onClick={() => handleDeleteUser(user._id)} />
                <EditTwoTone
                  onClick={() => {
                    showModal(user._id);
                    console.log("editando");
                  }}
                />
              {console.log(user.avatar)}
              </div>
            </Card>
          );
        })}
        <EditUser visible={isModalVisible} setVisible={setIsModalVisible} />
      </div>
    </div>
  );
};

export default AdminUser;
