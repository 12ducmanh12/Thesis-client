import React, { useState } from 'react';
import axios from 'axios';
import './create.css'
import { Button, message, Steps, theme, Input, Select } from 'antd';
import { json } from 'stream/consumers';
interface cols {
  colsname: string;
  type: string;
}

const CreateTable: React.FC = () => {
  const [Tablename, setTableName] = useState<string>("");
  const [fields, setFields] = useState<cols[]>([{ colsname: "", type: "" }]);

  const handleFieldNameChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newFields = [...fields];
    newFields[index].colsname = event.target.value;
    setFields(newFields);
  };

  const handleFieldTypeChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFields = [...fields];
    newFields[index].type = event.target.value;
    setFields(newFields);
  };
  const handleAddField = () => {
    setFields([...fields, { colsname: '', type: '' }]);
  };

  const handleRemoveField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleTableNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTableName(event.target.value);
  };

  const handleAddRow = () => {

    // var request: any = {
    // };
    // var cols: any = {
    // }
    // for (var i in fields) {
    //   cols[String(fields[i].colsname)] = fields[i].type;
    // }
    // request["name"] = name;
    // request["cols"] = cols;
    // try {
    //   await axios.post('https://ze784hzaxd.execute-api.ap-southeast-2.amazonaws.com/khoa/add', request);
    //   console.log(request);
    //   console.log('Add row successfully');
    // } catch (error) {
    //   console.error('Add row failed', error);
    // }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var request: any = {
    };
    var cols: any = {}
    cols["ID"] = "SERIAL PRIMARY KEY"
    for (var i in fields) {
      cols[String(fields[i].colsname)] = fields[i].type;
    }

    request["name"] = Tablename;
    request["cols"] = cols;
    try {
      await axios.post('https://ze784hzaxd.execute-api.ap-southeast-2.amazonaws.com/khoa/', request);
      console.log(request);
      console.log('Table created successfully!');
    } catch (error) {
      console.error('Error creating table:', error);
    }
  };

  return (
    <form  onSubmit={handleSubmit} className="create">
      <label style={{paddingLeft: "0px"}}> 
        Table name:
        <Input style={{width: "50%", paddingLeft: "0px"}}  type="text" value={Tablename} onChange={handleTableNameChange} />
      </label>
      <table >
        <thead>
          <tr>
            <th>Field name</th>
            <th>Field type</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={index}>
              <td>
                <Input  type="text" value={field.colsname} onChange={(event) => handleFieldNameChange(index, event)} />
              </td>
              <td>
                <select  value={field.type} onChange={(event) => handleFieldTypeChange(index, event)}>
                  <option value="">-- Select Data Type --</option>
                  <option value="text">Text</option>
                  <option value="integer">Integer</option>
                  <option value="boolean">Boolean</option>
                  <option value="serial">Autonumber</option>
                  <option value="date">Date</option>
                </select>
              </td>
              <td>
                <Input  type="text"  />
              </td>
              <td>
                {index > 0 && (
                  <button  type="button" onClick={() => handleRemoveField(index)}>
                    Remove
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={handleAddField} className="createbtt">
        Add field
      </button>
      <button type="submit" className="createbtt">Create table</button>
    </form>
  );
};

export default CreateTable;
