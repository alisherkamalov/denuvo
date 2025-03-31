"use client";
import "./styles.css";
import '@ant-design/v5-patch-for-react-19';
import { TextField } from "@mui/material";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
import Notification from "../components/notification/notification";
import { useDispatch } from "react-redux";
import { setActive } from "../store";
import React, { useEffect, useState } from 'react';


const RegisterPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ nickname: '', link: '', password: '' });
    const [errors, setErrors] = useState({ nickname: false, link: false, password: false });
    const [nickname, setNickname] = useState("");
    const [link, setLink] = useState("");
    const [notification, setNotification] = useState<string>("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");;
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
        setError("");

        axios.post('https://denuvobackend.vercel.app/register', {
            headers: {
              'Content-Type': 'application/json'
            },
            
            nickname: form.nickname,
            link: form.link,
            password: form.password
          })
          .then(function (response) {
            console.log(response);
            dispatch(setActive("notification"));
            setNotification("Вы успешно зарегистрировались");
            setTimeout(() => dispatch(setActive(null)), 2000);
            return;
          })
          .catch(function (error) {
            console.log(error); 
            dispatch(setActive("notification"));
            setNotification("Ошибка регистрации");
            console.error("Ошибка регистрации:", error.message);
            setError(error.message);
            setTimeout(() => dispatch(setActive(null)), 2000);
            return;
          });
        

        



        dispatch(setActive("notification"));
        setNotification("Подтвердите свою почту, мы подождем!");
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
                        label="@Линк"
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
