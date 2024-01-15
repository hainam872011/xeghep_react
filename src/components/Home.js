import {Space, Table, Tag} from 'antd';
import axios from 'axios';
import {useEffect, useState} from "react";
import '../assets/css/common.css'
import {AWS} from "./common";

const Home = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 25,
    },
  });
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      console.log(`[fetchData] : ${AWS.API_URL}/agency`)
      try {
        axios.get(`${AWS.API_URL}/agency`)
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
      title: 'Mã tài',
      dataIndex: 'id',
      key: 'id',
      render: (text, row) => <a href={'/detail/' + row.id}>{text}</a>,
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: 'ascend',
      width: '10%'
    },
    {
      title: 'Tên nhà xe',
      dataIndex: 'name',
      key: 'name',
      render: (text, row) => <a href={'/detail/' + row.id}>{text}</a>,
      filters: data ? data.map(e => ({text: e.name, value: e.name})) : [],
      onFilter: (value, record) => record.name.startsWith(value),
      filterSearch: true,
      width: '50%'
    },
    // {
    //   title: 'Số điện thoại',
    //   dataIndex: 'phone',
    //   key: 'phone',
    // },
    // {
    //   title: 'Địa chỉ',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
    {
      title: 'Điểm',
      dataIndex: 'points',
      key: 'points',
      sorter: (a, b) => a.points - b.points,
      sortDirections: ["descend", "ascend"],
      width: '10%'
    },
    {
      title: 'Ghi chú',
      key: 'note',
      dataIndex: 'note',
      width: '30%'
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
        <h1 style={{fontSize: "16px", textTransform: "uppercase", textAlign: "center", paddingBottom: "20px" }}>Danh sách nhà xe</h1>
        <Table columns={columns}
               dataSource={data}
               pagination={tableParams.pagination}
               loading={loading}
               onChange={handleTableChange}
               rowClassName={(record) => record.points < 10 ? "warning" : ''}
               style={{fontSize: "11px"}}
        />
      </div>
    </>)
};
export default Home;
