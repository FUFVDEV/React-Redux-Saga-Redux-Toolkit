import { useState, useEffect } from "react";
import { Col, Button, Form, Image, Input, Row, Select } from "antd";

import { ADD_ACTION, EDIT_ACTION } from "consts";

const { Option } = Select;

const UserForm = ({ data, handleCancel, handleCreate, handleEdit, mode }) => {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    age: null,
    gender: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    company: "",
    image: "",
  });

  const setItemToEdit = () => setFormData(data);

  useEffect(() => {
    mode === EDIT_ACTION && setItemToEdit();
  }, [data]);

  const handleChange = event => {
    const { name, value } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = option => {
    setFormData(prevState => ({
      ...prevState,
      gender: option,
    }));
  };

  const handleSubmit = () => {
    if (mode === ADD_ACTION) handleCreate(formData);
    if (mode === EDIT_ACTION) handleEdit(formData);
  };

  return (
    <Form layout="vertical">
      <Row justify="center">
        <Col>
          <Image width={200} src={formData.image} style={{ marginBottom: 20 }} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Usuario">
            <Input
              name="userName"
              type="text"
              placeholder="Ingrese un nombre de usuario"
              value={formData.userName}
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Nombre">
            <Input
              name="firstName"
              type="text"
              placeholder="Ingrese un nombre"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Apellido">
            <Input
              name="lastName"
              type="text"
              placeholder="Ingrese un apellido"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Edad">
            <Input
              name="age"
              type="text"
              placeholder="Ingrese una edad"
              value={formData.age}
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Género">
            <Select
              name="gender"
              placeholder="Selecciones un género"
              value={formData.gender}
              onChange={handleSelectChange}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Correo">
            <Input
              name="email"
              type="text"
              placeholder="Ingrese un correo"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Teléfono">
            <Input
              name="phone"
              type="text"
              placeholder="Ingrese un teléfono"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Calle">
            <Input
              name="street"
              type="text"
              placeholder="Ingrese una calle"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Ciudad">
            <Input
              name="city"
              type="text"
              placeholder="Ingrese una ciudad"
              value={formData.city}
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Compañia">
            <Input
              name="company"
              type="text"
              placeholder="Ingrese una compañia"
              value={formData.company}
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} justify="end">
        <Col>
          <Button onClick={handleCancel}>Cancelar</Button>
        </Col>
        <Col>
          <Button type="primary" onClick={handleSubmit}>
            {mode === ADD_ACTION ? "Agregar" : "Editar"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UserForm;
