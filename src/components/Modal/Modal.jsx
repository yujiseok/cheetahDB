import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MdOutlineClose } from "react-icons/md";
import { motion } from "framer-motion";
import { instance } from "../../api/api";
import useLocalStorage from "../../hooks/useLocalStorage";
import Spinner from "../Spinner";

const Modal = ({ setToggle, setAuth, setSession, setUserId }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const modalRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!modalRef.current || modalRef.current.contains(e.target)) {
        // eslint-disable-next-line no-useless-return
        return;
      }
      setToggle();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const getToken = async () => {
    try {
      const res = await instance.get("/authentication/token/new");
      if (res.status === 200) {
        setToken(res.data.request_token);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await instance.request({
        url: "/authentication/token/validate_with_login",
        method: "post",
        data: {
          username,
          password,
          request_token: token,
        },
      });
      const sessionRes = await instance.request({
        url: "/authentication/session/new",
        method: "post",
        data: {
          request_token: token,
        },
      });

      if (res.status === 200 && sessionRes.status === 200) {
        setUserId(username);
        setAuth((prev) => !prev);
        setSession(sessionRes.data.session_id);
        setToggle();
        setIsLoading(false);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <ModalOverlay
      initial="hidden"
      animate="visible"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <StyledModal
          ref={modalRef}
          initial={{
            opacity: 0,
            scale: 0.75,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              ease: "easeOut",
              duration: 0.15,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.75,
            transition: {
              ease: "easeIn",
              duration: 0.15,
            },
          }}
        >
          <ModalHeader>
            <CloseBtn type="button" onClick={setToggle}>
              <MdOutlineClose />
            </CloseBtn>
          </ModalHeader>
          <ModalBody>
            <Title>로그인</Title>
            <Form onSubmit={handleSubmit}>
              <input
                type="text"
                id="username"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // {...register("email")}
              />
              <input
                type="password"
                id="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // {...register("password")}
              />
              <input
                type="text"
                id="token"
                placeholder="토큰"
                // {...register("token")}
                readOnly
                value={token}
              />
              <Btn type="submit">로그인</Btn>
            </Form>
            <BtnWrapper>
              <p>로그인을 위한 토큰 생성 및 인증</p>
              <button type="button" onClick={getToken}>
                토큰생성
              </button>
              {token ? (
                <a
                  href={`https://www.themoviedb.org/authenticate/${token}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  인증
                </a>
              ) : null}
            </BtnWrapper>
          </ModalBody>
        </StyledModal>
      )}
    </ModalOverlay>
  );
};
export default Modal;

const ModalOverlay = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: grid;
  place-items: center;
`;

const StyledModal = styled(motion.div)`
  position: relative;
  background-color: #fff;
  padding: 1rem;
  height: 400px;
  width: 375px;
  border-radius: 6px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  z-index: 20;
`;

const ModalHeader = styled.header`
  text-align: right;
`;

const CloseBtn = styled.button`
  font-size: 1.25rem;

  svg {
    margin: 0.25rem;
  }
`;

const ModalBody = styled.div`
  padding: 0.75rem 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;

const Title = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
`;

const Form = styled.form`
  input {
    padding: 0.75rem;
    border-radius: 6px;
    width: 100%;
    border: 1px solid #e5e5e5;

    &:nth-of-type(2) {
      margin: 0.5rem 0;
    }
  }
`;

const Btn = styled.button`
  margin-top: 0.5rem;
  background-color: #fdd007;
  width: 100%;
  padding: 0.75rem 0;
  border-radius: 6px;
  font-weight: 600;
`;

const BtnWrapper = styled.div`
  text-align: center;

  p {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  button {
    color: gray;
    font-size: 0.75rem;
    &:first-of-type {
      margin-right: 0.5rem;
    }
  }

  a {
    color: gray;
    font-size: 0.75rem;
  }
`;
