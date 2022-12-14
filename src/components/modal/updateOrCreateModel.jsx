/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import callApi from "../../api/endpoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalCreateTable = ({
  openUpdate = false,
  togleModal = () => {},
  getList,
  idUpdate,
}) => {
  const [createEmployeeList, setCreateEmployeeList] = useState({
    name: "",
    dept: "",
    phone: "",
    address: "",
  });
  const [dataEmployeeList, setDataEmployeeList] = useState({})
  const toggleOff = useCallback(() => {
    togleModal();
  }, []);

  const handleChange = (e) => {
    setCreateEmployeeList({
      ...createEmployeeList,
      [e?.target?.name]: e?.target?.value,
    });
  };

  const createDataEmployee = async () => {
    try {
      const data = await callApi.create(createEmployeeList);
      if (data?.message) {
        togleModal();
        notify(data?.message);
        getList();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateDataEmployee = async (dataUpdate) => {
    try {
      const data = await callApi.update(idUpdate, dataUpdate);
      if (data?.message) {
        togleModal();
        notify(data?.message);
        getList();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const submitData = () => {
    let dataUpdate = {}
    if (createEmployeeList.name !== dataEmployeeList.name) {
      dataUpdate.name = createEmployeeList.name
    }
    if (createEmployeeList.dept !== dataEmployeeList.dept) {
      dataUpdate.dept = createEmployeeList.dept
    }
    if (createEmployeeList.phone !== dataEmployeeList.phone) {
      dataUpdate.phone = createEmployeeList.phone
    }
    if (createEmployeeList.address !== dataEmployeeList.address) {
      dataUpdate.address = createEmployeeList.address
    }
    updateDataEmployee(dataUpdate)
  }

  const getDetailEmployees = async (id) => {
    try {
      const data = await callApi.get(id);
      if (data?.data) {
        setCreateEmployeeList(data?.data);
        setDataEmployeeList(data?.data)
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (idUpdate) {
      getDetailEmployees(idUpdate);
    }
  }, [idUpdate]);

  const notify = (message) => toast.success(message);
  return (
    <div>
      <ToastContainer />
      <Modal isOpen={openUpdate} size="lg">
        <ModalHeader>
          {idUpdate ? "Update Employee: " + idUpdate : "Add new employee"}
        </ModalHeader>
        <ModalBody>
          <Form name="updateEmployee">
            <FormGroup>
              <Label for="exampleEmail">Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                value={createEmployeeList.name || ""}
                onChange={(e) => handleChange(e)}
                valid={createEmployeeList.name}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleEmail">Dept</Label>
              <Input
                type="text"
                name="dept"
                placeholder="Dept"
                value={createEmployeeList.dept || ""}
                onChange={(e) => handleChange(e)}
                valid={createEmployeeList.dept}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleEmail">Phone</Label>
              <Input
                type="number"
                name="phone"
                placeholder="Phone"
                value={createEmployeeList?.phone || ""}
                onChange={(e) => handleChange(e)}
                valid={createEmployeeList?.phone}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleEmail">Address</Label>
              <Input
                type="text"
                name="address"
                placeholder="Address"
                value={createEmployeeList?.address || ""}
                onChange={(e) => handleChange(e)}
                valid={createEmployeeList?.address}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={idUpdate ? submitData : createDataEmployee}
            disabled={
              !(createEmployeeList.name &&
                createEmployeeList.dept &&
                createEmployeeList.phone &&
                createEmployeeList.address)
            }
          >
            Ok
          </Button>
          <Button color="secondary" onClick={toggleOff}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalCreateTable;
