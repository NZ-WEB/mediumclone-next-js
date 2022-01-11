import Link from 'next/link';

export const Header = (): JSX.Element => {
    return (
        <nav className="navbar navbar-light">
            <div className="container">

                <Link href={`/`}>
                    <span className="navbar-brand" style={({cursor: "pointer"})}>
                        conduit
                    </span>
                </Link>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <Link href={`/`}>
                            <span className="nav-link" style={({cursor: "pointer"})}>
                                Home
                            </span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href={`/create`}>
                            <span className="nav-link" style={({cursor: "pointer"})}>
                                <i className="ion-compose"></i>&nbsp;New Article
                            </span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href={`/settings`}>
                            <span className="nav-link" style={({cursor: "pointer"})}>
                                <i className="ion-gear-a"></i>&nbsp;Settings
                            </span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href={`/login`}>
                            <div className="nav-link" style={({cursor: "pointer"})}>
                                Sing in
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href={`/register`}>
                            <div className="nav-link" style={({cursor: "pointer"})}>
                                Sing up
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

