import { CoffeeOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Menu, theme} from 'antd';
import {Header} from "antd/es/layout/layout.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Welcome', 'sub1', <CoffeeOutlined />,
        //     [
        //     getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
        //     getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
        // ]
    ),
    getItem('Manage passengers', 'sub2', <UserOutlined />,
        //     [
        //     getItem('Option 5', '5'),
        //     getItem('Option 6', '6'),
        //     getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
        // ]
    ),
    {
        type: 'divider',
    },
    // getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    //     getItem('Option 9', '9'),
    //     getItem('Option 10', '10'),
    //     getItem('Option 11', '11'),
    //     getItem('Option 12', '12'),
    // ]),
    // getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];
const MyHeader = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [current, setCurrent] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        if (current === 'sub2') {
            navigate('/passenger')
        } else if (current === 'sub1') {
            navigate('/welcome')
        }
    }, [current]);




    const mobile = useSelector(state => state.mobile)
    const dispatch = useDispatch();
    const Logout = () => {
        dispatch({type: 'CLEAR'})
        navigate('/login')
    }

    const onClickMenu = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };


    return (
        <Header>
            <div style={{
                float: 'right'
            }}>
                <span style={{
                    color: 'white'
                }}>Hello: {mobile} </span>
                <Button type='primary' onClick={Logout}>Logout</Button>
            </div>
            <Menu theme="dark" mode="horizontal" onClick={onClickMenu} selectedKeys={[current]} items={items} />

        </Header>
    );
};
export default MyHeader;