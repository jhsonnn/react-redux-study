
import { useEffect } from "react";
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../firebase";
import path from "path";


const initialUserData = localStorage.getItem('userData')? JSON.parse(localStorage.getItem('userData')) : {}

const Nav = () => {

    const [show, setShow] = useState("false");
    
    const [userData, setUserData] = useState(initialUserData);

    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const {pathname} = useLocation();

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const listener = () => {
        if(window.scrollY > 50){
            setShow("true");
        }else{
            setShow("false");
        }
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(!user){
                //로그인, 페이지 이동
                navigate('/');
            }else if(user && pathname === "/"){
                navigate('/main');
            }
        })
    }, [auth, navigate, pathname])


    const handleAuth = () =>{
        signInWithPopup(auth, provider)
        //팝업에서 로그인 잘 했으면
        .then((result)=>{
            console.log(result);
            //로그인 하면 구글에서 유저데이터 받아옴
            //그러면 userData에는 유저데이터가 들어감
            setUserData(result.user);
            //로컬스토리지 저장
            localStorage.setItem('userData', JSON.stringify(result.user))
        })
        .catch((error)=>{
            alert(error.message);
        })
    }

    //로그아웃
    const handleLogOut = ()=>{
        //로그아웃 성공하면 state에 있는 userData 비워줘야함
        signOut(auth).then(()=>{
            setUserData({});
            //로그아웃할 때 로컬스토리지에 저장된 것 없애줌
            localStorage.removeItem('userData');
            //navigate(`/`);
        }).catch((error)=>{
            alert(error.message);
        });
    }


    //컴포넌트 마운트 됐을 때 한번
    useEffect(()=>{
        window.addEventListener('scroll', listener);
        return () =>{
            window.removeEventListener('scroll', listener);
        }
    }, [])

    const handleChange = (e)=>{
        setSearchValue(e.target.value)
        navigate(`/search?q=${e.target.value}`);
    }


    return (
        <NavWrapper $show={show}>
            <Logo>
                <img 
                    alt="logo"
                    src="/images/apple-logo.png"
                    onClick={()=>{(window.location.href="/")}}
                />
            </Logo>

        {pathname === "/" ? (
                <Login
                    onClick={handleAuth}
                >로그인</Login>
            ): 
            (
                <Input 
                    type="text"
                    className="nav__input"
                    value={searchValue}
                    onChange={handleChange}
                    placeholder="영화를 검색해주세요."
                />
            )
        }
{/*pathname이 로그인 페이지일 때는 dropdown 아니면 null  */}
        {pathname !== "/" ?
            <SignOut>
                <UserImg src={userData.photoURL} alt={userData.displayName} />
                {/* 호버해주면 dropdown */}
                <DropDown>
                    <span onClick={handleLogOut}>
                        Sign Out
                    </span>
                </DropDown>
            </SignOut>
            :
            null
        }

        </NavWrapper>
    )
}

const UserImg = styled.img`
    border-radius: 50%;
    width: 100%;
    height: 100%;
`;

const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: 0;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151,151,151,0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100px;
    opacity: 0;
`;

const SignOut = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;

    &:hover{
        ${DropDown} {
            opacity: 1;
            transition-duration: 1s;
        }
    }
`;


const Input = styled.input`
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: rgba(0,0,0,0.5);
    border-radius: 5px;
    color: white;
    padding: 5px;
    border: 1px solid lightgray;
`

const Login = styled.a`
    background-color: rgba(0,0,0,0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover{
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`;


const Logo = styled.a`
    padding: 0;
    width: 70px;
    font-size: 0;
    display: inline-block;
    margin-bottom: 10px;

    img{
        display: block;
        width: 100%;
    }
`;

const NavWrapper = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: ${props => (props.show === "true" ? "#000000" : "#000000")};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`


export default Nav
