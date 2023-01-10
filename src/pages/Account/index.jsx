import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { instance } from "../../api/api";

const Account = () => {
  // const { auth, session } = useSelector((state) => state);

  const [user, setUser] = useState({});
  const session = JSON.parse(localStorage.getItem("session"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.request({
          url: `/account?&session_id=${session}`,
          method: "get",
          data: {
            session_id: session,
          },
        });

        if (res.status === 200) {
          setUser(res.data);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    };

    fetchData();
    return () => {};
  }, []);

  return (
    <Section>
      <ProfileWrapper>
        <h2>{user.name}</h2>
        <AvatarWrapper>
          <img
            src={`https://image.tmdb.org/t/p/w500${user.avatar?.tmdb?.avatar_path}`}
            alt="avatar"
          />
        </AvatarWrapper>
      </ProfileWrapper>
    </Section>
  );
};
export default Account;

const Section = styled.section`
  max-width: 1280px;
  margin-inline: auto;
  padding: 0 1rem;
  margin-top: 3.125rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  padding-bottom: 1rem;
`;

const AvatarWrapper = styled.div`
  width: 64px;
  height: 64px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid lightgray;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  }
`;
