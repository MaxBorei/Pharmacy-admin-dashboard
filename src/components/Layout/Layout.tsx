import { Outlet } from "react-router-dom";
import css from "./Layout.module.css";
import { Container } from "../Box/Box";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";

export const RootLayout = () => {
  return (
    <div className={css.layout_container}>
      <header>
        <Header />
      </header>
      <div className={css.layout_body}>
        <Sidebar />
        <main className={css.layout_container_main}>
          <Container>
            <div className={css.layout_container_content}>
              <Outlet />
              <h1>Main</h1>
            </div>
          </Container>
        </main>
      </div>
    </div>
  );
};
