import {withLayout} from "../../layout/Layout";
import withAuth from "../../HOC/withAuth";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import UserAPI from "../../service/user";

const Profile = (): JSX.Element => {
  const router = useRouter();
  const userService = UserAPI;
  const [user, setUser] = useState({});
  const [error, setError] = useState<Error | null>(null);
  const {username} = router.query;

  const followUser = () => {
      userService.follow(username)
          .then((res) => {
              setError(null);
              setUser({...user, following: true});
          })
          .catch((e) => setError(e));
  }

  useEffect(() => {
    if (username) {
      userService.get(username).then((user) => setUser(user));
    }

  }, [username]);

    return (
        <div className="profile-page">
          <div className="user-info">
                <div className="container">
                    <div className="row">

                        <div className="col-xs-12 col-md-10 offset-md-1">
                            {user.image !== '' ? <img src={user.image} className="user-img"/> : 'No photo' }
                            <h4>{user.username}</h4>
                            <p>
                                {user.bio}
                            </p>
                            <h4>{user.following ? 'Followed' : 'Unfollowed'}</h4>
                            <p>{error && error.message}</p>
                            <button onClick={() => followUser()} className="btn btn-sm btn-outline-secondary action-btn">
                                <i className="ion-plus-round"></i>
                                &nbsp;
                                Follow Eric Simons
                            </button>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    );
};

export default withAuth(withLayout(Profile));


