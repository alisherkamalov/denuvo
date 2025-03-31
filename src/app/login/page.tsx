"use client";
import "./styles.css";
import '@ant-design/v5-patch-for-react-19';
import { TextField } from "@mui/material";
import { Button } from "antd";
import { useRouter } from 'next/navigation';
import Notification from "../components/notification/notification";
import { useDispatch } from "react-redux";
import { setActive } from "../store";
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState("");
    const [notification, setNotification] = useState<string>("");
    const [errors, setErrors] = useState({ email: false, password: false });
    const router = useRouter();
    const dispatch = useDispatch();

    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [field]: event.target.value });
        setErrors({ ...errors, [field]: false });
    };

    const handleSubmit = async () => {
        const newErrors = {
            email: !form.email.trim(),
            password: !form.password.trim(),
        };
        setErrors(newErrors);

        if (!Object.values(newErrors).includes(true)) {
            setLoading(true);
            await handleAuthorization();
            setLoading(false);
        }
    };

    const handleAuthorization = async () => {
        setError("");
        setNotification("");
        

        
        //if (!user.email_confirmed_at) {
            //dispatch(setActive("notification"));
            //setError("Email не подтвержден");
            //setNotification("Подтвердите email перед входом");
            //setTimeout(() => dispatch(setActive(null)), 2000);
            //return;
        //}

        
        
        //if (sessionError || !session.session) {
            //dispatch(setActive("notification"));
            //setError("Ошибка входа");
            //setNotification("Неверный email или пароль");
            //setTimeout(() => dispatch(setActive(null)), 2000);
            //return;
        //}
        

        //document.cookie = `token=${session.session.access_token}; path=/; max-age=86400; Secure; HttpOnly`;
        //localStorage.setItem("user_email", form.email);

        dispatch(setActive("notification"));
        setNotification("Вы успешно авторизовались!");
        setTimeout(() => {
            dispatch(setActive(null));
            router.push("/");
        }, 2000);
    };


    return (
        <div className="main flex flex-col w-full h-dvh justify-center items-center">
            <Notification notification={notification} />
            <div className="logo w-80 h-80"></div>
            <div className="container z-1 -translate-y-15 gap-3 flex flex-col w-81 border border-[#8aa9d6] h-60 rounded-xl overflow-hidden">
                <div className="header w-full h-15 bg-[#8aa9d6] flex justify-center items-center">
                    Авторизация
                </div>
                <div className="content w-full flex flex-col gap-5 pl-3 pr-3">
                    <TextField
                        size="small"
                        label="Email"
                        variant="outlined"
                        className="textfield"
                        error={errors.email}
                        helperText={errors.email ? 'Заполните поле' : ''}
                        onChange={handleChange('email')}
                    />
                    <TextField
                        size="small"
                        label="Пароль"
                        type="password"
                        variant="outlined"
                        className="textfield"
                        error={errors.password}
                        helperText={errors.password ? 'Заполните поле' : ''}
                        onChange={handleChange('password')}
                    />
                    <Button
                        type="primary"
                        loading={loading}
                        onClick={handleSubmit}
                        disabled={Object.values(errors).includes(true) || Object.values(form).some(val => !val.trim())}
                    >
                        Авторизоваться
                    </Button>
                </div>
            </div>
            <Button type="text" className="btn-route -translate-y-12" onClick={() => { router.push('/register') }}>Еще нет аккаунта? Зарегистрироваться</Button>
        </div>
    );
};

export default LoginPage;
