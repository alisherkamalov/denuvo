"use client";
import "./styles.css";
import '@ant-design/v5-patch-for-react-19';
import { TextField } from "@mui/material";
import { Button } from "antd";
import { useRouter } from 'next/navigation';
import Notification from "../components/notification/notification";
import { useDispatch } from "react-redux";
import { setActive } from "../store";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import axios from "axios";
import React, { useState, useEffect } from 'react';

const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ link: '', password: '' });
    const [error, setError] = useState("");
    const [notification, setNotification] = useState<string>("");
    const [errors, setErrors] = useState({ link: false, password: false });
    const router = useRouter();
    const dispatch = useDispatch();
    const getFingerprint = async () => {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
          
            return result.visitorId;
          }
    
    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [field]: event.target.value });
        setErrors({ ...errors, [field]: false });
    };
    const handleSubmit = async () => {
        const newErrors = {
            link: !form.link.trim(),
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
        const ipres = await fetch('https://api64.ipify.org?format=json');
        const data = await ipres.json();
        const fingerprint = await getFingerprint();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}/login`, {
                link: form.link.replace(/@\s?/, ""),
                password: form.password,
                fingerprint: fingerprint,
                ip: data.ip
            });
            setNotification(response.data.message);
            window.localStorage.setItem("ip", response.data.ip);
            window.localStorage.setItem("fingerprint", response.data.fingerprint);
            window.localStorage.setItem("token", response.data.token);
            console.log(response.data.ip, response.data.token, response.data.fingerprint)
    
            dispatch(setActive("notification"));
            setTimeout(() => { 
                dispatch(setActive(null));
                router.push("/");
            }, 2000);
        }
        catch(e: any) {
            setNotification(e.response?.data?.message || e.message || "Произошла ошибка");
            dispatch(setActive("notification"));
        }
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
                        Авторизоваться
                    </Button>
                </div>
            </div>
            <Button type="text" className="btn-route -translate-y-12" onClick={() => { router.push('/register') }}>Еще нет аккаунта? Зарегистрироваться</Button>
        </div>
    );
};

export default LoginPage;
