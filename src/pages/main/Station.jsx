import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Modal, notification, Popconfirm, Space, Table} from 'antd';
import axios from "axios";
const Station = () => {

    const columns = [
        {
            title: 'Station name',
            dataIndex: 'name',
            key: 'name',
            // render: (text) => <a>{text}</a>,
        },
        // {
        //     title: 'ID',
        //     dataIndex: 'idCard',
        //     key: 'idCard',
        // },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Action',
            key: 'action',
            // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引 function(text, record, index) {}
            render(text, record){
                return (
                    <Space size="middle">
                        {/*<a onClick={onEdit}>{record.name}</a>*/}
                        <a onClick={() => {
                            setIsModalOpen(true)
                            console.log("编辑：" + record.id)
                            setStation({id: record.id, name: record.name, city: record.city})
                            myForm.setFieldsValue(record);
                        }}>edit</a>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={() => {
                                axios.delete('http://localhost:8000/business/admin/station/delete/' + record.id).then((response) => {
                                    const data = response.data
                                    if (data.success) {
                                        notification.success({description: "Deleted!"})
                                        handleQuery({
                                            page: pagination.current,
                                            size: pagination.pageSize
                                        })
                                    } else {
                                        notification.error({description: data.message})
                                    }
                                })
                                console.log("删除" + record)
                            }}
                            onCancel={cancelDelete}
                            okText="Yes"
                            cancelText="No"
                        >
                            <a>Delete</a>
                        </Popconfirm>
                    </Space>
                )
            }
        },
    ];

    // dataSource of list
    const [stations,setStations] = useState([])

    // for modal
    const [station, setStation] = useState({
        id: undefined,
        name: undefined,
        city: undefined,
        createTime: undefined,
        updateTime: undefined,
    })

    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [myForm] = Form.useForm();

    const [pagination, setPagination] = useState({total:0, current: 1, pageSize: 3})

    // const [loading, setLoading] = useState(false);



    const onAdd = () => {
        setIsModalOpen(true)
    }

    const cancelDelete = (e) => {
        console.log(e);
        // message.error('Click on No');
    };




    // 点击分页按钮
    const handleTableChange = (data) => {
        console.log("看看自带的分页参数都有啥：" + data.current);
        // handleQuery({
        //     page: data.current,
        //     size: data.pageSize
        // })
        setPagination({...pagination, current:data.current })
    }

    // 发送后端请求带分页参数
    const handleQuery = (param) => {
        // setLoading(true)
        axios.get('http://localhost:8000/business/admin/station/query-list', {
            params: {
                page: param.page,
                size: param.size
            }
        }).then((response) => {
            // setLoading(false)
            let data = response.data
            console.log(data)
            if (data.success) {
                setStations(data.content.list)
                setPagination({...pagination, current: param.page})
                setPagination({...pagination,total: data.content.total})
            } else {
                notification.error({description: data.message})
            }
        })

    }

    useEffect(() => {
        handleQuery({page:pagination.current, size: pagination.pageSize })
    },[pagination.current])

    useEffect(() => {
        if (!isModalOpen) {
            setStation({})
        }
    }, [isModalOpen])



    return (
        <>
            <p>
                <Button type="primary" onClick={onAdd}>
                    Create
                </Button>
            </p>

            <Table
                columns={columns} dataSource={stations} rowKey={(record, index) => index.toString() }
                pagination={pagination} onChange={handleTableChange}
            />
            {/*<Pagination defaultCurrent={pagination.current} pageSize={pagination.pageSize} total={pagination.total} />;*/}
            <Modal title="Station" open={isModalOpen}
                   onOk={() => {
                       console.log('modal ok 按钮')
                       myForm.submit();
                   }}
                   maskClosable={false}
                   destroyOnClose
                   onCancel={() => {
                       setIsModalOpen(false)
                   }}>
                <Form
                    // 表单配合modal一起使用的时候，需要设置这个属性，要不然关了窗口之后不会清空数据
                    preserve={false}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={ async (record) => {
                        record.id = station.id
                        axios.post('http://localhost:8000/business/admin/station/save', record).then(response => {
                            let data = response.data
                            if (data.success) {
                                notification.success({description: 'Successfully saved'})
                                setIsModalOpen(false);
                                handleQuery({
                                    page: pagination.current,
                                    size: pagination.pageSize
                                })
                            } else {
                                notification.error({description: data.message})
                            }
                        })
                        setIsModalOpen(false)
                    }}
                    autoComplete="off"
                    form={myForm}
                >
                    <Form.Item
                        label="Station name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input station name!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="city"
                        name="city"
                        rules={[
                            {
                                required: true,
                                message: 'Please input city!',
                            },
                        ]}
                    >
                        {/*<Input.Password />*/}
                        <Input/>
                    </Form.Item>

                    {/*<Form.Item*/}
                    {/*    name="type"*/}
                    {/*    label="Type"*/}
                    {/*    rules={[*/}
                    {/*        {*/}
                    {/*            required: true,*/}
                    {/*        },*/}
                    {/*    ]}*/}
                    {/*>*/}
                    {/*    <Select*/}
                    {/*        placeholder="Select a option and change input text above"*/}
                    {/*        onChange={onTypeChange}*/}
                    {/*        allowClear*/}
                    {/*    >*/}
                    {/*        <Select.Option value="3">student</Select.Option>*/}
                    {/*        <Select.Option  value="2">child</Select.Option>*/}
                    {/*        <Select.Option  value="1">adult</Select.Option>*/}
                    {/*    </Select>*/}
                    {/*</Form.Item>*/}
                </Form>
            </Modal>
        </>
    );
};
export default Station;
