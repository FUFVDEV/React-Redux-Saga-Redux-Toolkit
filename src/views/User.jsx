import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Row } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

import { ADD_ACTION, EDIT_ACTION, DELETE_ACTION } from "consts";
import {
  addUsers,
  addUser,
  clearUserState,
  createUser,
  deleteUser,
  updateUser,
} from "redux/actions/userActions";
import { inputUserAdapter, ouputUserAdapter } from "adapters/user.adapter";
import { generateEndpoint, httpAction } from "api/ApiUtils";
import CustomModal from "components/CustomModal";
import UserTable from "components/user/UserTable";
import UserForm from "components/user/UserForm";

const User = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState("");
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();
  const { users, user } = useSelector(state => state.user);

  useEffect(() => {
    httpAction(generateEndpoint("users", { searchs: { limit: 10 } }))
      .then(({ data }) => {
        const adaptedUserData = data.users.map(user => inputUserAdapter(user));
        dispatch(addUsers(adaptedUserData));
      })
      .catch(err => console.error(err));
  }, []);

  const handleAction = ({ action, data }) => {
    const options = {
      [ADD_ACTION]: () => null,
      [EDIT_ACTION]: () => dispatch(addUser(data)),
      [DELETE_ACTION]: () => setUserId(data),
    };

    options[action]();
    setMode(action);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    dispatch(clearUserState());
  };

  const handleCreate = data => {
    httpAction(generateEndpoint("user", { params: { id: "add" } }), "POST", ouputUserAdapter(data))
      .then(({ data }) => {
        dispatch(createUser(inputUserAdapter(data)));
        handleCancel();
      })
      .catch(error => {
        console.log("Error", error);
        message.error("A ocurrido un error al intentar crear el usuario.");
      });
  };

  const handleEdit = user => {
    const userId = user.id;
    httpAction(
      generateEndpoint("user", { params: { id: userId } }),
      "PATCH",
      ouputUserAdapter(user)
    )
      .then(({ data }) => {
        dispatch(updateUser(inputUserAdapter(data)));
        handleCancel();
        message.success("Usuario actualizado exisotasamente.");
      })
      .catch(error => {
        console.log("Error", error);
        message.error("A ocurrido un error al intentar actualizar el usuario.");
      });
  };

  const handleDelete = () => {
    httpAction(generateEndpoint("user", { params: { id: userId } }), "DELETE")
      .then(({ data }) => {
        dispatch(deleteUser(data.id));
        handleCancel();
        message.success("Usuario eliminado exisotasamente.");
      })
      .catch(error => {
        console.log("Error", error);
        message.error("A ocurrido un error al intentar eliminar el usuario.");
      });
  };

  return (
    <>
      <Row justify="end">
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => handleAction({ action: ADD_ACTION })}
        >
          Nuevo
        </Button>
      </Row>
      <br />

      <UserTable data={users} handleAction={handleAction} />

      <CustomModal
        title={mode === EDIT_ACTION ? "Formulario Usuario" : "Eliminar Usuario"}
        isModalVisible={isModalVisible}
        footer={mode === EDIT_ACTION || mode === ADD_ACTION ? null : undefined}
        handleOk={handleDelete}
        handleCancel={handleCancel}
      >
        {mode === ADD_ACTION || mode === EDIT_ACTION ? (
          <UserForm
            data={user}
            mode={mode}
            handleCreate={handleCreate}
            handleEdit={handleEdit}
            handleCancel={handleCancel}
          />
        ) : (
          <p>¿Está seguro que desea eliminar este usuario?</p>
        )}
      </CustomModal>
    </>
  );
};

export default User;
