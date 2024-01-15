import {Space, Table, Tag} from 'antd';
import axios from 'axios';
import {useEffect, useState} from "react";
import '../assets/css/common.css'
import {AWS} from "./common";

const History = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        axios.get(`${AWS.API_URL}/history`)
          .then(res => {
            setData(res.status === 200 ? res.data : null)
            setLoading(false);
            setTableParams({
              ...tableParams,
              pagination: {
                ...tableParams.pagination,
                total: res.data.length,
              },
            });
          })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [JSON.stringify(tableParams)])
  const columns = [
    {
      title: 'Người cho',
      dataIndex: 'fromName',
      key: 'fromName',
      width: '30%',
    },
    {
      title: 'Người nhận',
      dataIndex: 'toName',
      key: 'toName',
      width: '30%',
    },
    {
      title: 'Điểm',
      dataIndex: 'points',
      key: 'points',
      sorter: (a, b) => a.points - b.points,
      sortDirections: ["descend", "ascend"],
      width: '10%',
    },
    {
      title: 'Ngày',
      key: 'createdAt',
      dataIndex: 'createdAt',
      sorter: (a, b) => a.createdAt - b.createdAt,
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: 'descend',
      width: '30%',
    },
  ];
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  return (
    <>
      <div className={"main-content"}>
        <h1 style={{fontSize: "16px", textTransform: "uppercase", textAlign: "center", paddingBottom: "20px" }}>Lịch sử cho nhận</h1>
        <Table columns={columns}
               dataSource={data}
               pagination={tableParams.pagination}
               loading={loading}
               onChange={handleTableChange}
               style={{fontSize: "11px"}}
        />
      </div>
    </>)
};
export default History;
