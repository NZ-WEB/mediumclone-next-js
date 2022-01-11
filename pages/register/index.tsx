import {withLayout} from "../../layout/Layout";
import {NestedValue, useForm} from "react-hook-form";
import React, {useState} from "react";
import Link from "next/link";
import UserAPI from "../../api/user";
import {useRouter} from "next/router";

const Register = (): JSX.Element => {
  const router = useRouter();
  const [ backendErrors, setBackendErrors ] = useState<string[]>([]);

  const {register, handleSubmit, formState: {errors}} = useForm<{}>({});
  const onSubmit = handleSubmit((data) => {
    const { email, password, username } = data;

    const userApi = UserAPI;
    userApi.register(username ,email, password)
      .then(i => {
        router.push('/');
      })
      .catch((e) => setBackendErrors([e]));
  });

  React.useEffect(() => {

  }, [register]);

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link href={`/register`}>
                Have an account?
              </Link>
            </p>

            <ul className="error-messages">
              {backendErrors.length !== 0 && backendErrors.map(error => {
                return <li key={error}>{ error }</li>
              })}
              {errors.email && <li> The Email field is required </li>}
              {errors.username && <li> The Username field is required </li>}
              {errors.password && <li> The Password field is required </li>}
            </ul>

            <form onSubmit={onSubmit}>

              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  {...register("username",
                    {
                      required: true,
                    })}
                />

              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  {...register("email",{
                    required: true,
                  })}
                />



              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  {...register("password",{
                    required: true,
                  })}
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign in
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default withLayout(Register);
