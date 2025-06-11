'use client';
import "reflect-metadata";
import Dashboard from "./Dashboard/page";
import TeacherLu from "./TeacherLu/page";
import UserManagePage from "./user/page";
// import LoginPage from "./login/page";
import AuthPage from "./Dashboard/components/json/page";
import Shouye from "./Shouye/zhuye";

/*
  UserManagePage：用户管理
  TeacherLu：老师演示
  Dashboard：首页
  LoginPage：登录
*/

export default function Home() {
  return (
    <>
      <Shouye />
    </>    
  )
}