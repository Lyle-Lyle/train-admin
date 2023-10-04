import {CoffeeOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
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
    getItem('Welcome', 'sub1', <CoffeeOutlined />, ),
    // getItem('Manage Stations', 'sub2', <UserOutlined />, [
    //     getItem('Option 5', '5'),
    //     getItem('Option 6', '6'),
    //     getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    // ]),
    {
        type: 'divider',
    },
    getItem('Manage Stations', 'sub2', <CoffeeOutlined />),
    getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];
const SideBar = () => {
    const [current, setCurrent] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        if (current === 'sub1') {
            navigate('/welcome')
        } else if (current === 'sub2') {
            navigate('/station')
        }
    }, [current]);

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key)
    };
    return (
        <Menu
            onClick={onClick}
            style={{
                width: 256,
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    );
};
export default SideBar;