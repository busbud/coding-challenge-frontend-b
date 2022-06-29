import classes from "../style/Home.module.scss";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

function Home() {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <div className={classes.imageBanner}>
        <img
          src="https://scontent.fymy1-1.fna.fbcdn.net/v/t1.18169-9/40259_455895825861_2241393_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_ohc=QXQSIeH51q8AX8sGTfF&_nc_ht=scontent.fymy1-1.fna&oh=00_AT90N1qVMfIkk3CqLBXPQeuCKLLQFb94rmhkX1O2CfuMGg&oe=62DFB3BF"
          alt="banner"
        />
      </div>

      <div className={classes.description}>
        <div className={classes.about}>
          <h1>
            <FormattedMessage id="story" />
          </h1>
          <div className={classes.story}>
            <FormattedMessage id="textInfo" />
          </div>
        </div>

        <div className={classes.actionBtn}>
          <span>
            <FormattedMessage id="messageInfo" />
          </span>
          <button
            onClick={() => {
              navigate("/schedules");
            }}
          >
            <FormattedMessage id="getTicket" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
