import {Col, Row, Space, Table, Tag, Button, Form, Input} from 'antd';
import { Pie } from "@ant-design/charts";
import axios from 'axios';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AWS} from "./common";

const DetailAgency = () => {
  const [data, setData] = useState([])
  const [dataAgency, setDataAgency] = useState({id: '', name: '', phone: '', note: '', address: '', points: ''})
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const { id } = useParams()
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        axios.get(`${AWS.API_URL}/historyByAgency/${id}`)
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
        axios.get(`https://ejpz448cwe.execute-api.ap-southeast-1.amazonaws.com/Prod/agency/${id}`)
          .then(res => {
            setDataAgency(res.status === 200 ? res.data : null)
            setLoading(false);
          })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [JSON.stringify(tableParams)])

  const columns = [
    {
      title: 'Từ nhà xe',
      dataIndex: 'fromName',
      key: 'fromName',
    },
    {
      title: 'Tới nhà xe',
      dataIndex: 'toName',
      key: 'toName',
    },
    {
      title: 'Điểm',
      dataIndex: 'points',
      key: 'points',
    },
    {
      title: 'Ngày',
      key: 'createdAt',
      dataIndex: 'createdAt',
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

  let receivedPoints = 0
  let giftPoints = 0
  let points = 0
  if (data && data.length) {
    for (const e of data) {
      points += e.points
      if (e.fromId === parseInt(id)) {
        giftPoints += e.points
      }
      else receivedPoints += e.points
    }
  }

  const pieChartData = [
    {
      type: "Cho",
      value: giftPoints
    },
    {
      type: "Nhận",
      value: receivedPoints
    }
  ];

  const config = {
    appendPadding: 10,
    data: pieChartData,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.5,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14
      }
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        },
        formatter: function formatter() {
          return `total\n${points}`;
        }
      }
    }
  };
  return (
    <>
      <div className={"main-content"}>
        <h2 style={{fontSize: "20px", textTransform: "uppercase", textAlign: "center", paddingBottom: "20px" }}>Thông tin chi tiết</h2>
        <Row>
          <Col xs={24} xl={12}>
            <Form.Item label={<label style={{ fontWeight: "bold", paddingRight: "10px" }}>Mã tài:</label>} colon={false}>
              <span>{dataAgency.id}</span>
            </Form.Item>
            <Form.Item label={<label style={{ fontWeight: "bold", paddingRight: "10px" }}>Tên nhà xe:</label>} colon={false}>
              <span>{dataAgency.name}</span>
            </Form.Item>
            <Form.Item label={<label style={{ fontWeight: "bold", paddingRight: "10px" }}>Số điện thoại:</label>} colon={false}>
              <span>{dataAgency.phone}</span>
            </Form.Item>
            <Form.Item label={<label style={{ fontWeight: "bold", paddingRight: "10px" }}>Địa chỉ:</label>} colon={false}>
              <span>{dataAgency.address}</span>
            </Form.Item>
            <Form.Item label={<label style={{ fontWeight: "bold", paddingRight: "10px" }}>Điểm:</label>} colon={false}>
              <span>{dataAgency.points}</span>
            </Form.Item>
            <Form.Item label={<label style={{ fontWeight: "bold", paddingRight: "10px" }}>Ghi chú:</label>} colon={false}>
              <span>{dataAgency.note}</span>
            </Form.Item>
          </Col>
          <Col xs={24} xl={12}>
            <Pie {...config} />
          </Col>
        </Row>
        <h2 style={{fontSize: "20px", textTransform: "uppercase", textAlign: "center", paddingBottom: "20px" }}>Chi tiết cho nhận</h2>
        <Table columns={columns}
               dataSource={data}
               pagination={tableParams.pagination}
               loading={loading}
               onChange={handleTableChange}
        />
      </div>
    </>)
};
export default DetailAgency;
