import { Button, Table } from "antd";

import { EDIT_ACTION, DELETE_ACTION } from "consts";

const UserTable = ({ data, handleAction }) => {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Usuario",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Nombre",
      key: "name",
      render: ({ firstName, lastName }) => (
        <span>
          {firstName} {lastName}
        </span>
      ),
    },
    {
      title: "Edad",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Género",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Teléfono",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Dirección",
      key: "address-city",
      render: ({ address, city }) => (
        <span>
          {address}, {city}
        </span>
      ),
    },
    {
      title: "Compañia",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Acciones",
      key: "actions",
      render: item => (
        <div>
          <Button type="link" onClick={() => handleAction({ action: EDIT_ACTION, data: item })}>
            Editar
          </Button>
          <Button
            type="link"
            onClick={() => handleAction({ action: DELETE_ACTION, data: item.id })}
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return <Table rowKey="id" columns={columns} dataSource={data} bordered />;
};

export default UserTable;
