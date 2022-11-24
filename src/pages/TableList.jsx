import React, { useEffect, useState } from "react";
import callApi from "../api/endpoints";
import UpdateModel from "../components/modal/updateOrCreateModel";
import EmployeeTable from "../components/tables/table";
import { Button, Spinner } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TableList = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState("");
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  const togleModal = (id = "") => {
    setOpenUpdate(!openUpdate);
    setIdUpdate(id);
  };

  const functionA = () => {
    
  }

  const deleteData = async (id) => {
    try {
      const data = await callApi.delete(id);
      if (data?.status) {
        notify("Delete succeed");
        getList();
      } else {
        notifyError("Delete failed");
      }
    } catch (e) {
      notifyError("Delete failed");
      console.log(e);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    try {
      const data = await callApi.getList();
      if (data) {
        setListData(data?.data);
      }
      setLoading(false);
    } catch (e) {
      notifyError("Error");
      setLoading(false);
    }
  };
  const notify = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  return (
    <div className="employees">
      <ToastContainer />
      <div className="col-12">
        <div className="css-title">
          <div></div>
          <h1>TABLE EMPLOYEES </h1>
          <div>
            <Button
              color="primary"
              className="button-add"
              onClick={() => {
                togleModal(null);
              }}
            >
              Add
            </Button>
          </div>
        </div>

        {loading ? (
          <Spinner color="secondary">Loading...</Spinner>
        ) : (
          <React.Fragment>
            <EmployeeTable
              listData={listData}
              togleModal={togleModal}
              deleteData={deleteData}
            />
            {openUpdate && (
              <UpdateModel
                openUpdate={openUpdate}
                togleModal={togleModal}
                idUpdate={idUpdate}
                getList={getList}
              />
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default TableList;
