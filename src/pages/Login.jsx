import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (value) => {
    console.log("onFinish", value);
    try {
      axios.post(import.meta.env.VITE_API + "/userData", value).then((res) => {
        if (res.status === 201) {
          localStorage.setItem("userData", JSON.stringify(res.data));
          navigate("/blog");
        }
        console.log(res, "res");
      });
    } catch (error) {}
  };
  const onFinishFailed = (value) => {
    console.log("onFinish", value);
  };
  return (
    <>
      <Form
        form={form}
        style={{ maxWidth: "600px" }}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <Form.Item
          name={"email"}
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your valid Email!",
            },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          name={"password"}
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password></Input.Password>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>{" "}
      </Form>
    </>
  );
};

export default Login;
