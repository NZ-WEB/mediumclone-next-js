import {LayoutProps} from "./Layout.props";
import {Header} from "./Header/Header";
import {FunctionComponent, useState} from "react";
import {Footer} from "./Footer/Footer";
import { AppContextProvider } from "../context";
import {UserInterface} from "../interfaces/user.interface";
import {useRouter} from "next/router";

export const Layuot = ({children}: LayoutProps): JSX.Element => {
    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
      const [authorized, setAuthorizes] = useState<boolean>(
        process.browser && (localStorage.getItem('user') ? true : false)
      );

      let user = [];

      if (process.browser) {
        const localStorageUserData = localStorage.getItem('user');
        if (authorized) {
          user = JSON.parse(localStorageUserData);
        }
      }
        return (
          <AppContextProvider user={ user ? user : [] } >
            <Layuot>
                <Component {...props} />
            </Layuot>
          </AppContextProvider>
        );
    };
};
