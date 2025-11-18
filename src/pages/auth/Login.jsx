import {useContext} from 'react';
import {Form, Input, Button, Card} from "antd";
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import {useNavigate} from "react-router-dom";
import "./auth.scss";

const Login = () => {
    const [form] = Form.useForm();
    const {login, loading} = useContext(AuthContext);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const success = await login(values);
        if (success) {
            navigate("/dashboard");
        }
    };

    return (
        <div className="auth-container">
            <Card title="Login" className="auth-card">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
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
                        rules={[{required: true, message: "Please enter your password"}]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Login
                        </Button>
                    </Form.Item>

                    <div style={{textAlign: "center"}}>
                        Don't have an account? <a onClick={() => navigate("/register")}>Register</a>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
