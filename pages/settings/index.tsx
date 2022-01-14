import {withLayout} from "../../layout/Layout";
import withAuth from "../../HOC/withAuth";
import {useEffect, useState} from "react";
import UserAPI from "../../service/user";
import {log} from "util";
import {useForm} from "react-hook-form";

const Settings = (): JSX.Element => {
    const {register, handleSubmit, formState: {errors}} = useForm<{}>({});
    const [user, setUser] = useState([]);
    const userService = UserAPI;

    const getUser = () => {
        userService.current()
            .then((newUser) => setUser(newUser))
            .catch((e) => console.log(e))
    }

    const onSubmit = handleSubmit((data) => {
        const cleanedObj = cleanObj(data);

        userService.save(cleanedObj)
            .then((user) => console.log(user))
            .catch((e) => console.log(e));
    });

    useEffect(() => {
        getUser();
    }, []);

    const cleanObj = (obj) => {
        return Object.fromEntries(Object.entries(obj).filter((arr) => arr[1] !== ''));
    }

    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>

                        <form onSubmit={onSubmit}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="URL of profile picture"
                                        {...register("image",)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Your Name"
                                        {...register("username",)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                            <textarea
                                className="form-control form-control-lg"
                                rows="8"
                                placeholder="Short bio about you"
                                {...register("bio",)}
                            ></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Email"
                                        {...register("email",)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="password"
                                        placeholder="Password"
                                        {...register("password",)}
                                    />
                                </fieldset>
                                <button
                                    className="btn btn-lg btn-primary pull-xs-right"
                                    type="submit"
                                >
                                    Update Settings
                                </button>
                            </fieldset>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default withAuth(withLayout(Settings));
