"use client";
import axios from "axios";
import { TextField } from "@mui/material";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setActive } from "../store";
import React, { useState } from "react";
import Notification from "../components/notification/notification";


const RegisterPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ nickname: '', link: '', password: '' });
    const [errors, setErrors] = useState({ nickname: false, link: false, password: false });
    const [notification, setNotification] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();
    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [field]: event.target.value });
        setErrors({ ...errors, [field]: false });
    };

    const handleSubmit = async () => {
        const newErrors = {
            nickname: !form.nickname.trim(),
            link: !form.link.trim(),
            password: !form.password.trim(),
        };
        setErrors(newErrors);

        if (!Object.values(newErrors).includes(true)) {
            setLoading(true);
            await handleRegister();
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}/register`, {
            nickname: form.nickname,
            link: form.link.replace(/@\s?/, ""),
            password: form.password
        });
        setNotification(response.data.message);
        dispatch(setActive("notification"));
        setTimeout(() => {
            dispatch(setActive(null));
            router.push('/login');
        }, 2000);

    };

    return (
        <div className="main flex flex-col w-full h-dvh justify-center items-center">
            <Notification notification={notification} />
            <div className="logo w-70 min-h-70"></div>
            <div className="container z-1 -translate-y-15 gap-3 flex flex-col w-81 border border-[#8aa9d6] h-75 rounded-xl overflow-hidden">
                <div className="header w-full h-15 bg-[#8aa9d6] flex justify-center items-center">
                    Регистрация
                </div>
                <div className="content w-full flex flex-col gap-5 pl-3 pr-3">
                    <TextField
                        size="small"
                        label="Никнейм"
                        variant="outlined"
                        className="textfield"
                        error={errors.nickname}
                        helperText={errors.nickname ? 'Заполните поле' : ''}
                        onChange={handleChange('nickname')}
                    />
                    <TextField
                        size="small"
                        label="@Уникальное имя"
                        variant="outlined"
                        className="textfield"
                        error={errors.link}
                        helperText={errors.link ? 'Заполните поле' : ''}
                        onChange={handleChange('link')}
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
                        Зарегистрироваться
                    </Button>
                </div>
            </div>
            <Button type="text" className="btn-route -translate-y-12" onClick={() => { router.push('/login') }}>Уже есть аккаунт? Авторизоваться</Button>
        </div>
    );
}

export default RegisterPage;
