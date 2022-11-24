import "./App.css";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import APIService from "./APIService";
import Profile from "./components/Profile";
import Register from "./components/Register";
import MyArticleList from "./components/MyArticleList";
import CreateArticle from "./components/CreateArticle";
import swal from "sweetalert";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  const [articles, setArticles] = useState([]);
  const [token, setToken, removeToken] = useCookies(["mytoken"]);
  const [profiledata, setProfiledata] = React.useState({ last_name: "" });
  const [like, setLike] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    if (token["mytoken"]) {
      APIService.GETProfile(token["user_id"]).then((data) => {
        setProfiledata(data);
      });
    }

    APIService.GetArticleList(token["mytoken"])
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const updateArticle = (article) => {
    console.log(article);
    const updateArticle = articles.map((my_article) => {
      if (my_article.article_id === article.article_id) {
        const art = {
          ...my_article,
          title: article.title,
          description: article.description,
        };
        console.log(art);
        return art;
      } else {
        return my_article;
      }
    });
    setArticles(updateArticle);
  };

  const updateProfile = (profile) => {
    setProfiledata(profile);
  };

  const updateLike = (article_id) => {
    const new_article = articles.map((myarticle) => {
      if (myarticle.article_id === article_id) {
        if (myarticle.user_is_liked) {
          const copyArticle = {
            ...myarticle,
            likes: myarticle.likes - 1,
            user_is_liked: false,
          };
          if (myarticle.user_likeId_for_thisArticle) {
            APIService.DeleteLike(
              {
                user: token["user_id"],
                article: myarticle.article_id,
              },
              token["mytoken"],
              myarticle.user_likeId_for_thisArticle
            );
          } else {
            const likeFilter = like.filter((like) => {
              if (like.article_id === myarticle.article_id) {
                APIService.DeleteLike(
                  {
                    user: token["user_id"],
                    article: myarticle.article_id,
                  },
                  token["mytoken"],
                  like.user_likeId_for_thisArticle
                );
                return false;
              } else {
                return true;
              }
            });
            setLike(likeFilter);
          }
          return copyArticle;
        } else {
          const copyArticle = {
            ...myarticle,
            likes: myarticle.likes + 1,
            user_is_liked: true,
          };
          APIService.CreateLike(
            {
              user: token["user_id"],
              article: myarticle.article_id,
            },
            token["mytoken"]
          ).then((data) => {
            const likeData = {
              article_id: myarticle.article_id,
              user_likeId_for_thisArticle: data.id,
            };
            setLike((prevArray) => [...prevArray, likeData]);
          });
          return copyArticle;
        }
      } else {
        return myarticle;
      }
    });
    console.log(new_article);
    setArticles(new_article);
  };

  const deleteBtn = (article) => {
    //console.log("articles : ", articles); //被刪除資料 ex:{id: 18, title: 'zxc123123zxc', description: 'zxc'}
    const new_articles = articles.filter((myarticle) => {
      if (myarticle.article_id === article.article_id) {
        return false;
      } else {
        return true;
      }
    });
    setArticles(new_articles);
  };

  const logoutBtn = () => {
    removeToken(["mytoken"]);
    removeToken(["user_id"]);
    removeToken(["user_name"]);
    removeToken(["sessionid"]);
    removeToken(["csrftoken"]);
    history("/");
    swal("已登出 ~");
  };

  return (
    <div className="App">
      <Navbar logoutBtn={logoutBtn} token={token} />
      <div className="text-center mb-1" style={{ marginTop: -10 }}>
        <a
          href="https://github.com/howard1357997531/board.github.io"
          target="_blank"
          className="text-danger mb-3"
        >
          github連結 : https://github.com/howard1357997531/board.github.io
        </a>
      </div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create_article" element={<CreateArticle />} />
        <Route
          path="/"
          element={
            <ArticleList
              articles={articles}
              profiledata={profiledata}
              updateLike={updateLike}
            />
          }
        />
        <Route
          path="/myarticle"
          element={
            <MyArticleList
              articles={articles}
              updateLike={updateLike}
              updateArticle={updateArticle}
              deleteBtn={deleteBtn}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile profiledata={profiledata} updateProfile={updateProfile} />
          }
        />
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
