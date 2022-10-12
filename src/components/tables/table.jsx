import React from "react";
import { Table, Button } from "reactstrap";

const EmployeeTable = ({ listData, togleModal, deleteData }) => {
  return (
    <Table striped bordered hover className="tableFont">
      <thead>
        <tr>
          <th>No</th>
          <th>name</th>
          <th>dept</th>
          <th>phone </th>
          <th>address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {listData?.length > 0 ? (
          listData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.dept}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>
                  <Button color="primary" onClick={() => togleModal(item.uuid)}>
                    Update
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => deleteData(item.uuid)}
                    style={{ marginLeft: 5 }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={6}>No-data</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default EmployeeTable;
