import { useEffect, useState } from "react";
import styled from "styled-components";
import { instance } from "../../api/api";
import UserMovieList from "../../components/UserMovieList";
import { tablet } from "../../global/responsive";

const Account = () => {
  // const { auth, session } = useSelector((state) => state);

  const [user, setUser] = useState({});
  const session = JSON.parse(localStorage.getItem("session"));

  const types = [
    { title: "좋아요한 영화", type: "favorite" },
    { title: "평가한 영화", type: "rated" },
    { title: "시청한 영화", type: "watchlist" },
  ];

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
    <Container>
      <section>
        <ProfileWrapper>
          <AvatarWrapper>
            <img
              src={`https://image.tmdb.org/t/p/w500${user.avatar?.tmdb?.avatar_path}`}
              alt="avatar"
            />
          </AvatarWrapper>
          <h2>{user.name}</h2>
        </ProfileWrapper>
      </section>
      <ListSection>
        {types.map((type) => (
          <UserMovieList title={type.title} key={type.title} type={type.type} />
        ))}
      </ListSection>
    </Container>
  );
};
export default Account;

const Container = styled.section`
  max-width: 1280px;
  margin-inline: auto;
  padding: 0 1rem;
  margin-top: 3.125rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1rem;
`;

const AvatarWrapper = styled.div`
  width: 175px;
  height: 175px;

  ${tablet({
    width: 125,
    height: 125,
  })}

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #e5e5e5;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  }
`;

const ListSection = styled.section`
  margin-top: 2rem;
`;
