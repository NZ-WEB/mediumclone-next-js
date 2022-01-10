import {LayoutProps} from "./Layout.props";
import {Header} from "./Header/Header";
import {FunctionComponent} from "react";
import {Footer} from "./Footer/Footer";

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
        return (
            <Layuot>
                <Component {...props} />
            </Layuot>
        );
    };
};
