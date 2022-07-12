import "antd/dist/antd.css";
import './App.css';
import {Button, Table, Modal, Input} from "antd"
import {useState} from 'react'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

function App() {

  const [isEditing, setIsEditing] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [dataSource, setdataSource] = useState([
    {
      key: '1',
      id: 1,
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
      email: 'mike@email.com'
    },
    {
      key: '2',
      id: 2,
      name: 'John',
      age: 42,
      address: '10 Downing Street',
      email: 'john@email.com'
    },
    {
      key: '3',
      id: 3,
      name: 'Paul',
      age: 16,
      address: '29 Crane Street',
      email: 'paul@email.com'
    },
    {
      key: '4',
      id: 4,
      name: 'Gladys',
      age: 23,
      address: '1 Falcon Street',
      email: 'gladys@email.com'
    },
    {
      key: '5',
      id: 5,
      name: 'Thabo',
      age: 29,
      address: '19 Makuleng Street',
      email: 'thabo@email.com'
    },
  ]);
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      key: 'action',
      title: 'Action',
      render: (record) => {
        return (
          <>
          <EditOutlined onClick={()=>{
            onEditEmployee(record)
          }}/>
          <DeleteOutlined onClick={()=>{
              onDeleteStudent(record)
          }} style={{color: 'red', marginLeft: 12}}/>
          </>
        )
      }
    }
  ]

  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure you want top delete this Employee's record?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () =>{
        setdataSource(pre => {
          return pre.filter((employee) => employee.id !== record.id)
        });
      }
    })
    
  };

  const onEditEmployee = (record) => {
    setIsEditing(true);
    setEditingEmployee({...record});
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingEmployee(null)
  }
  return (
    <div className="App">
      <header className="App-header">
        <Button>Enter a new Employee</Button>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Edit Employee"
        visible={isEditing}
        okText="Save"
        onCancel={() => {
          resetEditing()
        }}
        onOk={() => {
          setdataSource(pre=>{
            return pre.map(employee=>{
              if(employee.id === editingEmployee.id){
                return editingEmployee;
              }else{
                return employee;
              }
            })
          })
          resetEditing()
        }}
      >
        <Input value={editingEmployee?.name} onChange={(e) => {
          setEditingEmployee((pre)=>{
            return {...pre, name: e.target.value}
          })
        }}/>
        <Input value={editingEmployee?.age} onChange={(e) => {
          setEditingEmployee((pre)=>{
            return {...pre, age:e.target.value}
          })
        }}/>
        <Input value={editingEmployee?.address} onChange={(e) => {
          setEditingEmployee((pre)=>{
            return {...pre, address:e.target.value}
          })
        }}/>
        <Input value={editingEmployee?.email} onChange={(e) => {
          setEditingEmployee((pre)=>{
            return {...pre, email:e.target.value}
          })
        }}/>

      </Modal>
      </header>
    </div>
  );
}

export default App;
