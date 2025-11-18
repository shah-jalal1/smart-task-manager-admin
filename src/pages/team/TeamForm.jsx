import React from "react";
import {Form, Input, Button, InputNumber, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import useTeamFormHandler from "../../hooks/team/useTeamFormHandler.js";

const TeamForm = ({form, team, handleTeamSubmit}) => {

    const {onFinish} = useTeamFormHandler(form, team, handleTeamSubmit);

    return (
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            initialValues={{members: []}}
        >
            <Form.Item
                label="Team Name"
                name="name"
                rules={[{required: true, message: "Please enter team name"}]}
            >
                <Input placeholder="Enter team name" />
            </Form.Item>

            <Form.List name="members">
                {(fields, {add, remove}) => (
                    <>
                        <div style={{marginBottom: 16, fontWeight: 600}}>Team Members:</div>
                        {fields.map(({key, name, ...restField}) => (
                            <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'name']}
                                    rules={[{required: true, message: 'Name required'}]}
                                >
                                    <Input placeholder="Member Name" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'role']}
                                    rules={[{required: true, message: 'Role required'}]}
                                >
                                    <Input placeholder="Role" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'capacity']}
                                    rules={[{required: true, message: 'Capacity required'}]}
                                >
                                    <InputNumber min={0} max={5} placeholder="Capacity (0-5)" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add Member
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Form>
    );
};

export default TeamForm;
