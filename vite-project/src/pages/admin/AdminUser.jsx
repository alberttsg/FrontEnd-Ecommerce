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
  const [showFooter, setShowFooter] = useState(false);

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
      <div className='btn-container-admin-user'>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/admin")}>
          Administrador de productos
        </button>
      </div>

      <div className='admin-user-container'>
        {users.map((user) => {
          return (
            <Card
              key={user.id}
              title={user.name}
              style={{ width: 300 }}
            >
              <Card.Meta
                avatar={<Avatar src={'https://w7.pngwing.com/pngs/499/529/png-transparent-computer-icons-woman-avatar-woman-people-woman-user.png' } alt="Avatar" />}
                title={user.username}
                description={user.email}
                />
                <p className="role-user">Rol: {''} <b>{user.role}</b></p>

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
