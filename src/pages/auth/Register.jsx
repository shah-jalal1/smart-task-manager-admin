import {useContext} from 'react';
import {Form, Input, Button, Card} from "antd";
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import {useNavigate} from "react-router-dom";
import "./auth.scss";

const Register = () => {
    const [form] = Form.useForm();
    const {register, loading} = useContext(AuthContext);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const success = await register(values);
        if (success) {
            navigate("/dashboard");
        }
    };

    return (
        <div className="auth-container">
            <Card title="Register" className="auth-card">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{required: true, message: "Please enter your name"}]}
                    >
                        <Input placeholder="Enter your name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {required: true, message: "Please enter your email"},
                            {type: "email", message: "Please enter a valid email"}
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {required: true, message: "Please enter your password"},
                            {min: 6, message: "Password must be at least 6 characters"}
                        ]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Register
                        </Button>
                    </Form.Item>

                    <div style={{textAlign: "center"}}>
                        Already have an account? <a onClick={() => navigate("/login")}>Login</a>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default Register;
