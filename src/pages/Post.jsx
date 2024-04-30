import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Modal, Select, Input, Button, Popconfirm } from "antd";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

let idToUpdate = null;
const Post = () => {
  let userData = localStorage.getItem("userData");
  let email = JSON.parse(userData)?.email;
  const navigate = useNavigate();
  console.log(userData, email, "ssfjdkasdfjk");
  const [postList, setPostList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modelHeader, setModelHeader] = useState("");
  const [form] = Form.useForm();
  const getPostList = () => {
    axios.get(import.meta.env.VITE_API + "/blogData").then((res) => {
      console.log(res.data);
      setPostList(res.data);
    });
  };
  const handelDelete = (id) => {
    console.log("id: " + id);
    axios
      .delete(import.meta.env.VITE_API + "/blogData/" + id)
      .then((res) => {
        console.log(res, "response");
        if (res.status === 200) {
          getPostList();
        }
      })
      .catch((err) => console.log(err));
  };
  const actionButton = (id) => {
    return (
      <>
        <Button
          onClick={(e) => {
            console.log(e, "sfsdf", id.node.data);
            setIsOpen(true);
            idToUpdate = id.node.data.id;
            form.setFieldsValue({ ...id.node.data });
            setModelHeader("Edit Blog");
          }}
        >
          Edit
        </Button>
        <Popconfirm
          title="Delete the Blog"
          description="Are you sure to delete this Blog?"
          onConfirm={() => {
            handelDelete(id.node.data.id);
          }}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      </>
    );
  };
  const [colDefs, setColDefs] = useState([
    {
      field: "title",
    },
    {
      field: "category",
    },
    {
      field: "descrptions",
    },
    {
      headerName: "Actions",
      cellRenderer: actionButton,
    },
  ]);

  useEffect(() => {
    getPostList();
  }, []);
  const onFinish = (value) => {
    console.log("onFinish", value);
    if (modelHeader == "Create a new Bolg") {
      axios
        .post(import.meta.env.VITE_API + "/blogData", {
          ...value,
          createAt: new Date(),
        })
        .then((re) => {
          console.log(re);
          if (re.status === 201) {
            getPostList();
            setIsOpen(!isOpen);
          }
        });
    } else if (modelHeader == "Edit Blog") {
      axios
        .put(import.meta.env.VITE_API + "/blogData/" + idToUpdate, {
          ...value,
          createAt: new Date(),
        })
        .then((re) => {
          console.log(re);
          if (re.status === 200) {
            getPostList();
            setIsOpen(!isOpen);
            idToUpdate = null;
          }
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
  };
  const onFinishFailed = (value) => {
    console.log("onFinish", value);
  };

  return (
    <>
      {/* <div>Post</div> */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <h2>Blog</h2>
        <div>
          {email}
          <IoLogOutOutline
            style={{ cursor: "pointer" }}
            size={30}
            onClick={() => {
              localStorage.removeItem("userData");
              navigate("/");
            }}
          />
        </div>
      </nav>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: " 0 2rem",
          alignItems: "center",
        }}
      >
        <h1>Blogs</h1>
        <div>
          <Button
            onClick={() => {
              form.resetFields();
              setModelHeader("Create a new Bolg");
              setIsOpen(!isOpen);
            }}
          >
            Create Blog
          </Button>
        </div>
      </div>
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <AgGridReact rowData={postList} columnDefs={colDefs} />
      </div>
      <Modal
        title={modelHeader}
        open={isOpen}
        footer={[]}
        onCancel={() => setIsOpen(!isOpen)}
      >
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
          <Form.Item
            name={"title"}
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input your valid Title!",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>{" "}
          <Form.Item name={"descrptions"} label="Descrptions">
            <Input.TextArea></Input.TextArea>
          </Form.Item>{" "}
          <Form.Item
            name={"category"}
            label="Category"
            rules={[
              {
                required: true,
                message: "Please Select your valid Category!",
              },
            ]}
          >
            <Select
              options={[
                {
                  value: "Sports",
                  label: "Sports",
                },
                {
                  value: "Movies",
                  label: "Movie",
                },
                {
                  value: "Technology",
                  label: "Technology",
                },
              ]}
            ></Select>
          </Form.Item>{" "}
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
      </Modal>
      <></>
    </>
  );
};

export default Post;
